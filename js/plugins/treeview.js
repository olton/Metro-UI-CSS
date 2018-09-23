var Treeview = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        effect: "slide",
        duration: 100,
        onNodeClick: Metro.noop,
        onNodeDblClick: Metro.noop,
        onNodeDelete: Metro.noop,
        onNodeInsert: Metro.noop,
        onNodeClean: Metro.noop,
        onCheckClick: Metro.noop,
        onRadioClick: Metro.noop,
        onExpandNode: Metro.noop,
        onCollapseNode: Metro.noop,
        onTreeviewCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        this._createTree();
        this._createEvents();

        $.each(element.find("input"), function(){
            if (!$(this).is(":checked")) return;
            that._recheck(this);
        });

        Utils.exec(o.onTreeviewCreate, [element], element[0]);
    },

    _createIcon: function(data){
        var icon, src;

        src = Utils.isTag(data) ? $(data) : $("<img>").attr("src", data);
        icon = $("<span>").addClass("icon");
        icon.html(src);

        return icon;
    },

    _createCaption: function(data){
        return $("<span>").addClass("caption").html(data);
    },


    _createToggle: function(){
        return $("<span>").addClass("node-toggle");
    },


    _createNode: function(data){
        var node;

        node = $("<li>");

        if (data.caption !== undefined) {
            node.prepend(this._createCaption(data.caption));
        }

        if (data.icon !== undefined) {
            node.prepend(this._createIcon(data.icon));
        }

        if (data.html !== undefined) {
            node.append(data.html);
        }

        return node;
    },

    _createTree: function(){
        var that = this, element = this.element, o = this.options;
        var nodes = element.find("li");

        element.addClass("treeview");

        $.each(nodes, function(){
            var node = $(this);


            if (node.data("caption") !== undefined) {
                node.prepend(that._createCaption(node.data("caption")));
            }

            if (node.data("icon") !== undefined) {
                node.prepend(that._createIcon(node.data("icon")));
            }

            if (node.children("ul").length > 0) {
                node.append(that._createToggle());
                if (node.data("collapsed") !== true) {
                    node.addClass("expanded");
                } else {
                    node.children("ul").hide();
                }
            }

        });
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".node-toggle", function(e){
            var toggle = $(this);
            var node = toggle.parent();

            that.toggleNode(node);

            e.preventDefault();
        });

        element.on(Metro.events.click, "li > .caption", function(e){
            var node = $(this).parent();

            that.current(node);

            Utils.exec(o.onNodeClick, [node, element], node[0]);

            e.preventDefault();
        });

        element.on(Metro.events.dblclick, "li > .caption", function(e){
            var node = $(this).closest("li");
            var toggle = node.children(".node-toggle");
            var subtree = node.children("ul");

            if (toggle.length > 0 || subtree.length > 0) {
                that.toggleNode(node);
            }

            Utils.exec(o.onNodeDblClick, [node, element], node[0]);

            e.preventDefault();
        });

        element.on(Metro.events.click, "input[type=radio]", function(e){
            var check = $(this);
            var checked = check.is(":checked");
            var node = check.closest("li");

            that.current(node);

            Utils.exec(o.onRadioClick, [checked, check, node, element], this);
        });

        element.on(Metro.events.click, "input[type=checkbox]", function(e){
            var check = $(this);
            var checked = check.is(":checked");
            var node = check.closest("li");

            that._recheck(check);

            Utils.exec(o.onCheckClick, [checked, check, node, element], this);
        });
    },

    _recheck: function(check){
        var element = this.element;
        var checked, node, checks;

        if (!Utils.isJQueryObject(check)) {
            check = $(check);
        }

        checked = check.is(":checked");
        node = check.closest("li");

        this.current(node);

        // down
        checks = check.closest("li").find("ul input[type=checkbox]");
        checks.attr("data-indeterminate", false);
        checks.prop("checked", checked);

        checks = [];

        $.each(element.find(":checkbox"), function(){
            checks.push(this);
        });

        $.each(checks.reverse(), function(){
            var ch = $(this);
            var children = ch.closest("li").children("ul").find(":checkbox").length;
            var children_checked = ch.closest("li").children("ul").find(":checkbox:checked").length;

            if (children > 0 && children_checked === 0) {
                ch.attr("data-indeterminate", false);
                ch.prop("checked", false);
            }

            if (children_checked === 0) {
                ch.attr("data-indeterminate", false);
            } else {
                if (children_checked > 0 && children > children_checked) {
                    ch.attr("data-indeterminate", true);
                } else if (children === children_checked) {
                    ch.attr("data-indeterminate", false);
                    ch.prop("checked", true);
                }
            }
        });
    },

    current: function(node){
        var element = this.element, o = this.options;

        if (node === undefined) {
            return element.find("li.current")
        }

        element.find("li").removeClass("current");
        node.addClass("current");
    },

    toggleNode: function(node){
        var element = this.element, o = this.options;
        var func;

        node.toggleClass("expanded");

        if (o.effect === "slide") {
            func = node.hasClass("expanded") !== true ? "slideUp" : "slideDown";
            Utils.exec(o.onCollapseNode, [node, element]);
        } else {
            func = node.hasClass("expanded") !== true ? "fadeOut" : "fadeIn";
            Utils.exec(o.onExpandNode, [node, element]);
        }

        node.children("ul")[func](o.duration);
    },

    addTo: function(node, data){
        var that = this, element = this.element, o = this.options;
        var target;
        var new_node;
        var toggle;

        if (node === null) {
            target = element;
        } else {
            target = node.children("ul");
            if (target.length === 0) {
                target = $("<ul>").appendTo(node);
                toggle = this._createToggle();
                toggle.appendTo(node);
                node.addClass("expanded");
            }
        }

        new_node = this._createNode(data);

        new_node.appendTo(target);

        Utils.exec(o.onNodeInsert, [new_node, element], new_node[0]);

        return new_node;
    },

    insertBefore: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);
        new_node.insertBefore(node);
        Utils.exec(o.onNodeInsert, [new_node, element], new_node[0]);
        return new_node;
    },

    insertAfter: function(node, data){
        var element = this.element, o = this.options;
        var new_node = this._createNode(data);
        new_node.insertAfter(node);
        Utils.exec(o.onNodeInsert, [new_node, element], new_node[0]);
        return new_node;
    },

    del: function(node){
        var element = this.element, o = this.options;
        var parent_list = node.closest("ul");
        var parent_node = parent_list.closest("li");
        node.remove();
        if (parent_list.children().length === 0 && !parent_list.is(element)) {
            parent_list.remove();
            parent_node.removeClass("expanded");
            parent_node.children(".node-toggle").remove();
        }
        Utils.exec(o.onNodeDelete, [element], element[0]);
    },

    clean: function(node){
        var element = this.element, o = this.options;
        node.children("ul").remove();
        node.removeClass("expanded");
        node.children(".node-toggle").remove();
        Utils.exec(o.onNodeClean, [node, element], node[0]);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            default: console.log(attributeName);
        }
    }
};

Metro.plugin('treeview', Treeview);