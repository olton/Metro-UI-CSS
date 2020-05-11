/* global Metro, Utils, Component */
var ListViewDefaultConfig = {
    listviewDeferred: 0,
    selectable: false,
    checkStyle: 1,
    duration: 100,
    view: Metro.listView.LIST,
    selectCurrent: true,
    structure: {},
    onNodeInsert: Metro.noop,
    onNodeDelete: Metro.noop,
    onNodeClean: Metro.noop,
    onCollapseNode: Metro.noop,
    onExpandNode: Metro.noop,
    onGroupNodeClick: Metro.noop,
    onNodeClick: Metro.noop,
    onNodeDblClick: Metro.noop,
    onListViewCreate: Metro.noop
};

Metro.listViewSetup = function (options) {
    ListViewDefaultConfig = $.extend({}, ListViewDefaultConfig, options);
};

if (typeof window["metroListViewSetup"] !== undefined) {
    Metro.listViewSetup(window["metroListViewSetup"]);
}

Component('listview', {
    init: function( options, elem ) {
        this._super(elem, options, ListViewDefaultConfig);

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, this.name);

        this._createView();
        this._createEvents();

        Utils.exec(o.onListViewCreate, null, element[0]);
        element.fire("listviewcreate");
    },

    _createIcon: function(data){
        var icon, src;

        src = Utils.isTag(data) ? $(data) : $("<img>").attr("src", data);
        icon = $("<span>").addClass("icon");
        icon.html(src.outerHTML());

        return icon;
    },

    _createCaption: function(data){
        return $("<div>").addClass("caption").html(data);
    },

    _createContent: function(data){
        return $("<div>").addClass("content").html(data);
    },

    _createToggle: function(){
        return $("<span>").addClass("node-toggle");
    },

    _createNode: function(data){
        var that = this, o = this.options;
        var node;

        node = $("<li>");

        if (data.caption !== undefined || data.content !== undefined ) {
            var d = $("<div>").addClass("data");
            node.prepend(d);
            if (data.caption !== undefined) d.append(that._createCaption(data.caption));
            if (data.content !== undefined) d.append(that._createContent(data.content));
        }

        if (data.icon !== undefined) {
            node.prepend(this._createIcon(data.icon));
        }

        if (Utils.objectLength(o.structure) > 0) $.each(o.structure, function(key, val){
            if (data[key] !== undefined) {
                $("<div>").addClass("node-data item-data-"+key).addClass(data[val]).html(data[key]).appendTo(node);
            }
        });

        return node;
    },

    _createView: function(){
        var that = this, element = this.element, o = this.options;
        var nodes = element.find("li");
        var struct_length = Utils.objectLength(o.structure);

        element.addClass("listview");
        element.find("ul").addClass("listview");

        $.each(nodes, function(){
            var node = $(this);

            if (node.data("caption") !== undefined || node.data("content") !== undefined) {
                var data = $("<div>").addClass("data");
                node.prepend(data);
                if (node.data("caption") !== undefined) data.append(that._createCaption(node.data("caption")));
                if (node.data("content") !== undefined) data.append(that._createContent(node.data("content")));
            }

            if (node.data('icon') !== undefined) {
                node.prepend(that._createIcon(node.data('icon')));
            }

            if (node.children("ul").length > 0) {
                node.addClass("node-group");
                node.append(that._createToggle());
                if (node.data("collapsed") !== true) node.addClass("expanded");
            } else {
                node.addClass("node");
            }

            if (node.hasClass("node")) {
                var cb = $("<input type='checkbox' data-role='checkbox' data-style='"+o.checkStyle+"'>");
                cb.data("node", node);
                node.prepend(cb);
            }

            if (struct_length > 0) $.each(o.structure, function(key){
                if (node.data(key) !== undefined) {
                    $("<div>").addClass("node-data item-data-"+key).addClass(node.data(key)).html(node.data(key)).appendTo(node);
                }
            });
        });

        this.toggleSelectable();

        this.view(o.view);
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;

        element.on(Metro.events.click, ".node", function(){
            var node = $(this);
            element.find(".node").removeClass("current");
            node.toggleClass("current");
            if (o.selectCurrent === true) {
                element.find(".node").removeClass("current-select");
                node.toggleClass("current-select");
            }
            Utils.exec(o.onNodeClick, [node], element[0]);
            element.fire("nodeclick", {
                node: node
            });
        });

        element.on(Metro.events.click, ".node-toggle", function(){
            var node = $(this).closest("li");
            that.toggleNode(node);
        });

        element.on(Metro.events.click, ".node-group > .data > .caption", function(){
            var node = $(this).closest("li");
            element.find(".node-group").removeClass("current-group");
            node.addClass("current-group");
            Utils.exec(o.onGroupNodeClick, [node], element[0]);
            element.fire("groupnodeclick", {
                node: node
            });
        });

        element.on(Metro.events.dblclick, ".node-group > .data > .caption", function(){
            var node = $(this).closest("li");
            that.toggleNode(node);
            Utils.exec(o.onNodeDblClick, [node], element[0]);
            element.fire("nodedblclick", {
                node: node
            });
        });
    },

    view: function(v){
        var element = this.element, o = this.options;

        if (v === undefined) {
            return o.view;
        }

        o.view = v;

        $.each(Metro.listView, function(i, v){
            element.removeClass("view-"+v);
            element.find("ul").removeClass("view-"+v);
        });

        element.addClass("view-" + o.view);
        element.find("ul").addClass("view-" + o.view);
    },

    toggleNode: function(node){
        var element = this.element, o = this.options;
        var func;

        node=$(node);

        if (!node.hasClass("node-group")) {
            return ;
        }

        node.toggleClass("expanded");

        func = node.hasClass("expanded") !== true ? "slideUp" : "slideDown";
        Utils.exec(o.onCollapseNode, [node], element[0]);
        element.fire("collapsenode", {
            node: node
        });

        node.children("ul")[func](o.duration);
    },

    toggleSelectable: function(){
        var element = this.element, o = this.options;
        var func = o.selectable === true ? "addClass" : "removeClass";
        element[func]("selectable");
        element.find("ul")[func]("selectable");
    },

    add: function(node, data){
        var element = this.element, o = this.options;
        var target;
        var new_node;
        var toggle;

        if (node === null) {
            target = element;
        } else {

            node=$(node);

            if (!node.hasClass("node-group")) {
                return ;
            }

            target = node.children("ul");
            if (target.length === 0) {
                target = $("<ul>").addClass("listview").addClass("view-"+o.view).appendTo(node);
                toggle = this._createToggle();
                toggle.appendTo(node);
                node.addClass("expanded");
            }
        }

        new_node = this._createNode(data);

        new_node.addClass("node").appendTo(target);

        var cb = $("<input type='checkbox'>");
        cb.data("node", new_node);
        new_node.prepend(cb);
        Metro.makePlugin(cb, "checkbox", {});

        Utils.exec(o.onNodeInsert, [new_node, node, target], element[0]);
        element.fire("nodeinsert", {
            newNode: new_node,
            parentNode: node,
            list: target
        });

        return new_node;
    },

    addGroup: function(data){
        var element = this.element, o = this.options;
        var node;

        delete data['icon'];

        node = this._createNode(data);
        node.addClass("node-group").appendTo(element);
        node.append(this._createToggle());
        node.addClass("expanded");
        node.append($("<ul>").addClass("listview").addClass("view-"+o.view));

        Utils.exec(o.onNodeInsert, [node, null, element], element[0]);
        element.fire("nodeinsert", {
            newNode: node,
            parentNode: null,
            list: element
        });

        return node;
    },

    insertBefore: function(node, data){
        var element = this.element, o = this.options;
        var new_node, parent_node, list;

        node=$(node);

        if (!node.length) {return;}

        new_node = this._createNode(data);
        new_node.addClass("node").insertBefore(node);
        parent_node = new_node.closest(".node");
        list = new_node.closest("ul");

        Utils.exec(o.onNodeInsert, [new_node, parent_node, list], element[0]);
        element.fire("nodeinsert", {
            newNode: new_node,
            parentNode: parent_node,
            list: list
        });

        return new_node;
    },

    insertAfter: function(node, data){
        var element = this.element, o = this.options;
        var new_node, parent_node, list;

        node=$(node);

        if (!node.length) {return;}

        new_node = this._createNode(data);
        new_node.addClass("node").insertAfter(node);
        parent_node = new_node.closest(".node");
        list = new_node.closest("ul");

        Utils.exec(o.onNodeInsert, [new_node, parent_node, list], element[0]);
        element.fire("nodeinsert", {
            newNode: new_node,
            parentNode: parent_node,
            list: list
        });

        return new_node;
    },

    del: function(node){
        var element = this.element, o = this.options;

        node=$(node);

        if (!node.length) {return;}

        var parent_list = node.closest("ul");
        var parent_node = parent_list.closest("li");
        node.remove();
        if (parent_list.children().length === 0 && !parent_list.is(element)) {
            parent_list.remove();
            parent_node.removeClass("expanded");
            parent_node.children(".node-toggle").remove();
        }
        Utils.exec(o.onNodeDelete, [node], element[0]);
        element.fire("nodedelete", {
            node: node
        });
    },

    clean: function(node){
        var element = this.element, o = this.options;

        node=$(node);

        if (!node.length) {return;}

        node.children("ul").remove();
        node.removeClass("expanded");
        node.children(".node-toggle").remove();
        Utils.exec(o.onNodeClean, [node], element[0]);
        element.fire("nodeclean", {
            node: node
        });
    },

    getSelected: function(){
        var element = this.element;
        var nodes = [];

        $.each(element.find(":checked"), function(){
            var check = $(this);
            nodes.push(check.closest(".node")[0])
        });

        return nodes;
    },

    clearSelected: function(){
        this.element.find(":checked").prop("checked", false);
        this.element.trigger('change');
    },

    selectAll: function(mode){
        this.element.find(".node > .checkbox input").prop("checked", mode !== false);
        this.element.trigger('change');
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeView = function(){
            var new_view = "view-"+element.attr("data-view");
            that.view(new_view);
        };

        var changeSelectable = function(){
            o.selectable = JSON.parse(element.attr("data-selectable")) === true;
            that.toggleSelectable();
        };

        switch (attributeName) {
            case "data-view": changeView(); break;
            case "data-selectable": changeSelectable(); break;
        }
    },

    destroy: function(){
        var element = this.element;

        element.off(Metro.events.click, ".node");
        element.off(Metro.events.click, ".node-toggle");
        element.off(Metro.events.click, ".node-group > .data > .caption");
        element.off(Metro.events.dblclick, ".node-group > .data > .caption");

        return element;
    }
});
