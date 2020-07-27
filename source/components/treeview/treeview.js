/* global Metro */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var TreeViewDefaultConfig = {
        treeviewDeferred: 0,
        showChildCount: false,
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
        onTreeViewCreate: Metro.noop
    };

    Metro.treeViewSetup = function (options) {
        TreeViewDefaultConfig = $.extend({}, TreeViewDefaultConfig, options);
    };

    if (typeof window["metroTreeViewSetup"] !== undefined) {
        Metro.treeViewSetup(window["metroTreeViewSetup"]);
    }

    Metro.Component('tree-view', {
        init: function( options, elem ) {
            this._super(elem, options, TreeViewDefaultConfig);
            return this;
        },

        _create: function(){
            var that = this, element = this.element;

            this._createTree();
            this._createEvents();

            $.each(element.find("input"), function(){
                if (!$(this).is(":checked")) return;
                that._recheck(this);
            });

            this._fireEvent("tree-view-create", {
                element: element
            });
        },

        _createIcon: function(data){
            var icon, src;

            src = Utils.isTag(data) ? $(data) : $("<img src='' alt=''>").attr("src", data);
            icon = $("<span>").addClass("icon");
            icon.html(src.outerHTML());

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
                var caption, icon;

                caption = node.data("caption");
                icon = node.data("icon");

                if (caption !== undefined) {
                    if (node.children("ul").length > 0 && o.showChildCount === true) {
                        caption += " ("+node.children("ul").children("li").length+")"
                    }
                    node.prepend(that._createCaption(caption));
                }

                if (icon !== undefined) {
                    node.prepend(that._createIcon(icon));
                }

                if (node.children("ul").length > 0) {

                    node.addClass("tree-node");

                    node.append(that._createToggle());

                    if (Utils.bool(node.attr("data-collapsed")) !== true) {
                        node.addClass("expanded");
                    } else {
                        node.children("ul").hide();
                    }
                }

            });
        },

        _createEvents: function(){
            var that = this, element = this.element;

            element.on(Metro.events.click, ".node-toggle", function(e){
                var toggle = $(this);
                var node = toggle.parent();

                that.toggleNode(node);

                e.preventDefault();
            });

            element.on(Metro.events.click, "li > .caption", function(e){
                var node = $(this).parent();

                that.current(node);

                that._fireEvent("node-click", {
                    node: node[0]
                });

                e.preventDefault();
            });

            element.on(Metro.events.dblclick, "li > .caption", function(e){
                var node = $(this).closest("li");
                var toggle = node.children(".node-toggle");
                var subtree = node.children("ul");

                if (toggle.length > 0 || subtree.length > 0) {
                    that.toggleNode(node);
                }

                that._fireEvent("node-dbl-click", {
                    node: node[0]
                })

                e.preventDefault();
            });

            element.on(Metro.events.click, "input[type=radio]", function(){
                var check = $(this);
                var checked = check.is(":checked");
                var node = check.closest("li");

                that.current(node);

                that._fireEvent("radio-click", {
                    checked: checked,
                    check: check[0],
                    node: node[0]
                });
            });

            element.on(Metro.events.click, "input[type=checkbox]", function(){
                var check = $(this);
                var checked = check.is(":checked");
                var node = check.closest("li");

                that._recheck(check);

                that._fireEvent("check-click", {
                    checked: checked,
                    check: check[0],
                    node: node[0]
                });
            });
        },

        _recheck: function(check){
            var element = this.element;
            var checked, node, checks, all_checks;

            check = $(check);

            checked = check.is(":checked");
            node = check.closest("li");

            this.current(node);

            // down
            checks = check.closest("li").find("ul input[type=checkbox]");
            checks.attr("data-indeterminate", false);
            checks.prop("checked", checked);
            checks.trigger('change');

            all_checks = [];

            $.each(element.find("input[type=checkbox]"), function(){
                all_checks.push(this);
            });

            $.each(all_checks.reverse(), function(){
                var ch = $(this);
                var children = ch.closest("li").children("ul").find("input[type=checkbox]").length;
                var children_checked = ch.closest("li").children("ul").find("input[type=checkbox]").filter(function(el){
                    return el.checked;
                }).length;

                if (children > 0 && children_checked === 0) {
                    ch.attr("data-indeterminate", false);
                    ch.prop("checked", false);
                    ch.trigger('change');
                }

                if (children_checked === 0) {
                    ch.attr("data-indeterminate", false);
                } else {
                    if (children_checked > 0 && children > children_checked) {
                        ch.attr("data-indeterminate", true);
                    } else if (children === children_checked) {
                        ch.attr("data-indeterminate", false);
                        ch.prop("checked", true);
                        ch.trigger('change');
                    }
                }
            });
        },

        current: function(node){
            var element = this.element;

            if (node === undefined) {
                return element.find("li.current")
            }

            element.find("li").removeClass("current");
            node.addClass("current");
        },

        toggleNode: function(n){
            var node = $(n);
            var o = this.options;
            var func;
            var toBeExpanded = !node.data("collapsed");//!node.hasClass("expanded");

            node.toggleClass("expanded");
            node.data("collapsed", toBeExpanded);

            func = toBeExpanded === true ? "slideUp" : "slideDown";

            if (!toBeExpanded) {

                this._fireEvent("expand-node", {
                    node: node[0]
                });

            } else {

                this._fireEvent("collapse-node", {
                    node: node[0]
                });

            }

            node.children("ul")[func](o.duration);
        },

        addTo: function(node, data){
            var element = this.element;
            var target;
            var new_node;
            var toggle;

            if (node === null) {
                target = element;
            } else {
                node = $(node);
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

            this._fireEvent("node-insert", {
                node: new_node[0],
                parent: node ? node[0] : null
            });

            return new_node;
        },

        insertBefore: function(node, data){
            var new_node = this._createNode(data);

            if (Utils.isNull(node)) {
                return this.addTo(node, data);
            }

            node = $(node);
            new_node.insertBefore(node);

            this._fireEvent("node-insert", {
                node: new_node[0],
                parent: node ? node[0] : null
            });

            return new_node;
        },

        insertAfter: function(node, data){
            var new_node = this._createNode(data);

            if (Utils.isNull(node)) {
                return this.addTo(node, data);
            }

            node = $(node);
            new_node.insertAfter(node);

            this._fireEvent("node-insert", {
                node: new_node[0],
                parent: node[0]
            });

            return new_node;
        },

        del: function(node){
            var element = this.element;
            node = $(node);
            var parent_list = node.closest("ul");
            var parent_node = parent_list.closest("li");

            this._fireEvent("node-delete", {
                node: node[0]
            });

            node.remove();

            if (parent_list.children().length === 0 && !parent_list.is(element)) {
                parent_list.remove();
                parent_node.removeClass("expanded");
                parent_node.children(".node-toggle").remove();
            }
        },

        clean: function(node){
            node = $(node);
            node.children("ul").remove();
            node.removeClass("expanded");
            node.children(".node-toggle").remove();

            this._fireEvent("node-clean", {
                node: node[0]
            });
        },

        changeAttribute: function(){
        },

        destroy: function(){
            var element = this.element;

            element.off(Metro.events.click, ".node-toggle");
            element.off(Metro.events.click, "li > .caption");
            element.off(Metro.events.dblclick, "li > .caption");
            element.off(Metro.events.click, "input[type=radio]");
            element.off(Metro.events.click, "input[type=checkbox]");

            return element;
        }
    });
}(Metro, m4q));