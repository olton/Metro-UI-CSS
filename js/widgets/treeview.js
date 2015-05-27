(function ( $ ) {

    "use strict";

    $.widget( "metro.treeview" , {

        version: "3.0.0",

        options: {
            doubleClick: true,
            onClick: function(leaf, node, pnode, tree){},
            onExpand: function(leaf, node, pnode, tree){},
            onCollapse: function(leaf, node, pnode, tree){}
        },

        _create: function () {
            var that = this, element = this.element, o = this.options;

            $.each(element.data(), function(key, value){
                if (key in o) {
                    try {
                        o[key] = $.parseJSON(value);
                    } catch (e) {
                        o[key] = value;
                    }
                }
            });

            this._initTree();
            this._createEvents();

            element.data('treeview', this);
        },


        _createCheckbox: function(leaf, parent){
            var input, checkbox, check;

            input = $("<label/>").addClass("input-control checkbox small-check").insertBefore(leaf);
            checkbox = $("<input/>").attr('type', 'checkbox').appendTo(input);
            check = $("<span/>").addClass('check').appendTo(input);
            if (parent.data('name') !== undefined) {
                checkbox.attr('name', parent.data('name'));
            }
            if (parent.data('id') !== undefined) {
                checkbox.attr('id', parent.data('id'));
            }
            if (parent.data('checked') !== undefined) {
                checkbox.prop('checked', parent.data('checked'));
            }
            if (parent.data('readonly') !== undefined) {
                checkbox.prop('disabled', parent.data('readonly'));
            }
            if (parent.data('disabled') !== undefined) {
                checkbox.prop('disabled', parent.data('disabled'));
                if (parent.data('disabled') === true) {
                    parent.addClass('disabled');
                }
            }
            if (parent.data('value') !==  undefined) {
                checkbox.val(parent.data('value'));
            }
        },

        _createRadio: function(leaf, parent){
            var input, checkbox, check;

            input = $("<label/>").addClass("input-control radio small-check").insertBefore(leaf);
            checkbox = $("<input/>").attr('type', 'radio').appendTo(input);
            check = $("<span/>").addClass('check').appendTo(input);
            if (parent.data('name') !== undefined) {
                checkbox.attr('name', parent.data('name'));
            }
            if (parent.data('id') !== undefined) {
                checkbox.attr('id', parent.data('id'));
            }
            if (parent.data('checked') !== undefined) {
                checkbox.prop('checked', parent.data('checked'));
            }
            if (parent.data('readonly') !== undefined) {
                checkbox.prop('disabled', parent.data('readonly'));
            }
            if (parent.data('disabled') !== undefined) {
                checkbox.prop('disabled', parent.data('disabled'));
                if (parent.data('disabled') === true) {
                    parent.addClass('disabled');
                }
            }
            if (parent.data('value') !==  undefined) {
                checkbox.val(parent.data('value'));
            }
        },

        _initTree: function(){
            var that = this, element = this.element, o = this.options;
            var leafs = element.find('.leaf');
            $.each(leafs, function(){
                var leaf = $(this), parent = leaf.parent('li'), ul = leaf.siblings('ul'), node = $(leaf.parents('.node')[0]);
                //var input, checkbox, check;

                if (parent.data('mode') === 'checkbox') {
                    that._createCheckbox(leaf, parent);
                }

                if (parent.data('mode') === 'radio') {
                    that._createRadio(leaf, parent);
                }

                if (ul.length > 0) {
                    if (!parent.hasClass('node')) {
                        parent.addClass('node');
                    }
                }
                if (parent.hasClass('collapsed')) {
                    ul.hide();
                }
            });
        },

        _renderChecks: function(check){
            var element = this.element, that = this, o = this.options;
            var state = check.is(":checked");
            var parent = $(check.parent().parent());
            var children_checks = parent.children('ul').find('[type="checkbox"]');

            children_checks.prop('checked', state).removeClass('indeterminate');

            $.each(element.find('.node[data-mode=checkbox]').reverse(), function(){
                var node = $(this),
                    ch = node.children('.input-control').find('[type="checkbox"]'),
                    children_all = node.children('ul').find('[type="checkbox"]'),
                    children_checked = node.children('ul').find('[type="checkbox"]:checked');

                ch.removeClass('indeterminate');
                if (children_checked.length === 0) {
                    ch.prop("checked", false);
                    ch.removeClass('indeterminate');
                } else
                if (children_checked.length > 0 && children_all.length > children_checked.length) {
                    ch.prop('checked', true);
                    ch.addClass('indeterminate');
                }
            });

        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;

            element.on('change', 'input:checkbox', function(){
                that._renderChecks($(this));
            });

            element.on('click', 'input', function(){
                var leaf = $(this),
                    node = $(leaf.parents('.node')[0]),
                    parent = leaf.parent('li'),
                    check = leaf.siblings('.input-control').find('input:checkbox'),
                    radio = leaf.siblings('.input-control').find('input:radio'),
                    new_check_state,
                    check_disabled;

                if (check.length > 0) {
                    new_check_state = !check.is(":checked");
                    check_disabled = check.is(":disabled");
                    if (!check_disabled) {check.prop('checked', new_check_state);}
                    that._renderChecks(check);
                }
                if (radio.length > 0) {
                    check_disabled = radio.is(":disabled");
                    if (!check_disabled) {radio.prop('checked', true);}
                }

                if (typeof o.onClick === 'string') {
                    window[o.onClick](leaf, parent, node, that);
                } else {
                    o.onClick(leaf, parent, node, that);
                }
            });

            element.on('click', '.leaf', function(){
                var leaf = $(this),
                    node = $(leaf.parents('.node')[0]),
                    parent = leaf.parent('li');

                element.find('.leaf').parent('li').removeClass('active');
                parent.addClass('active');

                if (typeof o.onClick === 'string') {
                    window[o.onClick](leaf, parent, node, that);
                } else {
                    o.onClick(leaf, parent, node, that);
                }
            });

            if (o.doubleClick) {
                element.on('dblclick', '.leaf', function (e) {
                    var leaf = $(this), parent = leaf.parent('li'), node = $(leaf.parents('.node')[0]);

                    if (parent.hasClass("keep-open")) {
                        return false;
                    }

                    parent.toggleClass('collapsed');
                    if (!parent.hasClass('collapsed')) {
                        parent.children('ul').slideDown('fast');
                        if (typeof o.onExpand === 'string') {
                            window[o.onExpand](parent, leaf, node);
                        } else {
                            o.onExpand(parent, leaf, node);
                        }
                    } else {
                        parent.children('ul').slideUp('fast');
                        if (typeof o.onCollapse === 'string') {
                            window[o.onCollapse](leaf, parent, node, that);
                        } else {
                            o.onCollapse(leaf, parent, node, that);
                        }
                    }
                    e.stopPropagation();
                    e.preventDefault();
                });
            }

            element.on('click', '.node-toggle', function(e){
                var leaf = $(this).siblings('.leaf'), parent = $(this).parent('li'), node = $(leaf.parents('.node')[0]);

                if (parent.hasClass("keep-open")) {return false;}

                parent.toggleClass('collapsed');
                if (!parent.hasClass('collapsed')) {
                    parent.children('ul').slideDown('fast');
                    if (typeof o.onExpand === 'string') {
                        window[o.onExpand](leaf, parent, node, that);
                    } else {
                        o.onExpand(leaf, parent, node, that);
                    }
                } else {
                    parent.children('ul').slideUp('fast');
                    if (typeof o.onCollapse === 'string') {
                        window[o.onCollapse](leaf, parent, node, that);
                    } else {
                        o.onCollapse(leaf, parent, node, that);
                    }
                }
                e.stopPropagation();
                e.preventDefault();
            });
        },

        addLeaf: function(parent, name, data){
            var element = this.element;
            var leaf, li, ul;

            if (parent) {
                if (parent[0].tagName === "LI") {parent.addClass('node');}
                if (parent.children('.node-toggle').length === 0) {
                    $("<span/>").addClass('node-toggle').appendTo(parent);
                }
            }

            ul = parent ? $(parent).children('ul') : element.children('ul');

            if (ul.length === 0) {
                ul = $("<ul/>").appendTo(parent ? parent : element);
            }

            li = $("<li/>").appendTo( ul );

            if (data !== undefined) {
                if (data.tagName !== undefined) {
                    leaf = $("<"+data.tagName+"/>").addClass("leaf").appendTo(li);
                } else {
                    leaf = $("<span/>").addClass("leaf").appendTo(li);
                }
            } else {
                leaf = $("<span/>").addClass("leaf").appendTo(li);
            }

            leaf.html(name);

            if (data !== undefined) {
                $.each(data, function(key, value){
                    li.attr("data-"+key, value);
                });
                if (data.mode !== undefined) {
                    switch (data.mode) {
                        case 'checkbox' : this._createCheckbox(leaf, li); break;
                        case 'radio' : this._createRadio(leaf, li); break;
                    }
                }
            }

            return this;
        },

        _destroy: function () {
        },

        _setOption: function ( key, value ) {
            this._super('_setOption', key, value);
        }
    });

})( jQuery );