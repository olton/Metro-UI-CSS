var Select = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.list = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onSelectCreate, [this.element]);

        return this;
    },
    options: {
        duration: 100,
        prepend: "",
        append: "",
        placeholder: "",
        filterPlaceholder: "",
        filter: true,
        copyInlineStyles: true,
        dropHeight: 200,

        clsSelect: "",
        clsSelectInput: "",
        clsPrepend: "",
        clsAppend: "",
        clsOption: "",
        clsOptionActive: "",
        clsOptionGroup: "",
        clsDropList: "",
        clsSelectedItem: "",
        clsSelectedItemRemover: "",

        onChange: Metro.noop,
        onUp: Metro.noop,
        onDrop: Metro.noop,
        onItemSelect: Metro.noop,
        onItemDeselect: Metro.noop,
        onSelectCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

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
        this._createSelect();
        this._createEvents();
    },

    _addOption: function(item, parent){
        var option = $(item);
        var l, a;
        var element = this.element, o = this.options;
        var multiple = element[0].multiple;
        var input = element.siblings(".select-input");
        var html = Utils.isValue(option.attr('data-template')) ? option.attr('data-template').replace("$1", item.text):item.text;
        var tag;

        l = $("<li>").addClass(o.clsOption).data("option", item).attr("data-text", item.text).attr('data-value', Utils.isValue(item.value) ? item.value : "").appendTo(parent);
        a = $("<a>").html(html).appendTo(l).addClass(item.className);

        if (option.is(":selected")) {
            if (multiple) {
                l.addClass("d-none");
                tag = $("<div>").addClass("selected-item").addClass(o.clsSelectedItem).html("<span class='title'>"+html+"</span>").appendTo(input);
                tag.data("option", l);
                $("<span>").addClass("remover").addClass(o.clsSelectedItemRemover).html("&times;").appendTo(tag);
            } else {
                element.val(item.value);
                input.html(html);
                element.trigger("change");
                l.addClass("active");
            }
        }

        a.appendTo(l);
        l.appendTo(parent);
    },

    _addOptionGroup: function(item, parent){
        var that = this;
        var group = $(item);

        $("<li>").html(item.label).addClass("group-title").appendTo(parent);

        $.each(group.children(), function(){
            that._addOption(this, parent);
        })
    },

    _createOptions: function(){
        var that = this, element = this.element, select = element.parent();
        var list = select.find("ul").html("");

        $.each(element.children(), function(){
            if (this.tagName === "OPTION") {
                that._addOption(this, list);
            } else if (this.tagName === "OPTGROUP") {
                that._addOptionGroup(this, list);
            }
        });
    },

    _createSelect: function(){
        var that = this, element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var container = $("<label>").addClass("select " + element[0].className).addClass(o.clsSelect);
        var multiple = element[0].multiple;
        var select_id = Utils.elementId("select");
        var buttons = $("<div>").addClass("button-group");
        var input, drop_container, list, filter_input;

        container.attr("id", select_id).addClass("dropdown-toggle");

        if (multiple) {
            container.addClass("multiple");
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        buttons.appendTo(container);

        input = $("<div>").addClass("select-input").addClass(o.clsSelectInput).attr("name", "__" + select_id + "__");
        drop_container = $("<div>").addClass("drop-container");
        list = $("<ul>").addClass("d-menu").addClass(o.clsDropList).css({
            "max-height": o.dropHeight
        });
        filter_input = $("<input type='text' data-role='input'>").attr("placeholder", o.filterPlaceholder);

        container.append(input);
        container.append(drop_container);

        drop_container.append(filter_input);

        if (o.filter !== true) {
            filter_input.hide();
        }

        drop_container.append(list);

        this._createOptions();

        drop_container.dropdown({
            duration: o.duration,
            toggleElement: "#"+select_id,
            onDrop: function(){
                var dropped, target;

                dropped = $(".select .drop-container");
                $.each(dropped, function(){
                    var drop = $(this);
                    if (drop.is(drop_container)) {
                        return ;
                    }
                    drop.data('dropdown').close();
                });

                filter_input.val("").trigger(Metro.events.keyup).focus();

                target = list.find("li.active").length > 0 ? $(list.find("li.active")[0]) : undefined;
                if (target !== undefined) {
                    list.scrollTop(0);
                    setTimeout(function(){
                        list.animate({
                            scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                        }, 100);
                    }, 200);
                }

                Utils.exec(o.onDrop, [list, element], list[0]);
            },
            onUp: function(){
                Utils.exec(o.onUp, [list, element], list[0]);
            }
        });

        this.list = list;

        if (o.prepend !== "") {
            var prepend = $("<div>").html(o.prepend);
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.append !== "") {
            var append = $("<div>").html(o.append);
            append.addClass("append").addClass(o.clsAppend).appendTo(container);
        }

        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.closest(".select");
        var drop_container = container.find(".drop-container");
        var input = element.siblings(".select-input");
        var filter_input = drop_container.find("input");
        var list = drop_container.find("ul");

        container.on(Metro.events.click, function(e){
            $(".focused").removeClass("focused");
            container.addClass("focused");
            e.preventDefault();
            e.stopPropagation();
        });

        input.on(Metro.events.click, function(e){
            $(".focused").removeClass("focused");
            container.addClass("focused");
            e.preventDefault();
            e.stopPropagation();
        });

        // filter_input.on(Metro.events.blur, function(){container.removeClass("focused");});
        // filter_input.on(Metro.events.focus, function(){container.addClass("focused");});

        list.on(Metro.events.click, "li", function(e){
            if ($(this).hasClass("group-title")) {
                e.preventDefault();
                e.stopPropagation();
                return ;
            }
            var leaf = $(this);
            var val = leaf.data('value');
            var txt = leaf.data('text');
            var html = leaf.children('a').html();
            var selected_item;
            var option = leaf.data("option");
            var options = element.find("option");

            if (element[0].multiple) {
                leaf.addClass("d-none");
                selected_item = $("<div>").addClass("selected-item").addClass(o.clsSelectedItem).html("<span class='title'>"+html+"</span>").appendTo(input);
                selected_item.data("option", leaf);
                $("<span>").addClass("remover").addClass(o.clsSelectedItemRemover).html("&times;").appendTo(selected_item);
            } else {
                list.find("li.active").removeClass("active").removeClass(o.clsOptionActive);
                leaf.addClass("active").addClass(o.clsOptionActive);
                input.html(html);
                drop_container.data("dropdown").close();
            }

            $.each(options, function(){
                if (this === option) {
                    this.selected = true;
                }
            });

            element.trigger("change");

            Utils.exec(o.onItemSelect, [val, option, leaf], element[0]);
            Utils.exec(o.onChange, [that.getSelected()], element[0]);
        });

        input.on("click", ".selected-item .remover", function(e){
            var item = $(this).closest(".selected-item");
            var leaf = item.data("option");
            var option = leaf.data('option');
            leaf.removeClass("d-none");
            $.each(element.find("option"), function(){
                if (this === option) {
                    this.selected = false;
                }
            });
            item.remove();

            element.trigger("change");

            Utils.exec(o.onItemDeselect, [option], element[0]);
            Utils.exec(o.onChange, [that.getSelected()], element[0]);
            e.preventDefault();
            e.stopPropagation();
        });

        filter_input.on(Metro.events.keyup, function(){
            var filter = this.value.toUpperCase();
            var li = list.find("li");
            var i, a;
            for (i = 0; i < li.length; i++) {
                if ($(li[i]).hasClass("group-title")) continue;
                a = li[i].getElementsByTagName("a")[0];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });

        drop_container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        });
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.closest(".select").addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.closest(".select").removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    reset: function(to_default){
        var element = this.element, o = this.options;
        var options = element.find("option");
        var select = element.closest('.select');

        $.each(options, function(){
            console.log(this.defaultSelected);
            this.selected = !Utils.isNull(to_default) ? this.defaultSelected : false;
        });

        this.list.find("li").remove();
        select.find(".select-input").html('');

        this._createOptions();

        element.trigger('change');
        Utils.exec(o.onChange, [this.getSelected()], element[0]);
    },

    getSelected: function(){
        var element = this.element;
        var result = [];

        element.find("option:selected").each(function(){
            result.push(this.value);
        });

        return result;
    },

    val: function(val){
        var that = this, element = this.element, o = this.options;
        var input = element.siblings(".select-input");
        var options = element.find("option");
        var list_items = this.list.find("li");
        var result = [];
        var multiple = element.attr("multiple") !== undefined;
        var option;
        var i, html, list_item, option_value, tag;

        if (Utils.isNull(val)) {
            $.each(options, function(){
                if (this.selected) result.push(this.value);
            });
            return multiple ? result : result[0];
        }

        $.each(options, function(){this.selected = false;});
        list_items.removeClass("active");
        input.html('');

        if (Array.isArray(val) === false) {
            val  = [val];
        }

        $.each(val, function(){
            for (i = 0; i < options.length; i++) {
                option = options[i];
                html = Utils.isValue(option.getAttribute('data-template')) ? option.getAttribute('data-template').replace("$1", option.text) : option.text;
                if (""+option.value === ""+this) {
                    option.selected = true;
                    break;
                }
            }

            for(i = 0; i < list_items.length; i++) {
                list_item = $(list_items[i]);
                option_value = list_item.attr("data-value");
                if (""+option_value === ""+this) {
                    if (multiple) {
                        list_item.addClass("d-none");
                        tag = $("<div>").addClass("selected-item").addClass(o.clsSelectedItem).html("<span class='title'>"+html+"</span>").appendTo(input);
                        tag.data("option", list_item);
                        $("<span>").addClass("remover").addClass(o.clsSelectedItemRemover).html("&times;").appendTo(tag);
                    } else {
                        list_item.addClass("active");
                        input.html(html);
                    }
                    break;
                }
            }
        });

        element.trigger('change');
        Utils.exec(o.onChange, [this.getSelected()], element[0]);
    },

    data: function(op){
        var element = this.element;
        var option_group;

        element.html("");

        if (typeof op === 'string') {
            element.html(op);
        } else if (Utils.isObject(op)) {
            $.each(op, function(key, val){
                if (Utils.isObject(val)) {
                    option_group = $("<optgroup>").attr("label", key).appendTo(element);
                    $.each(val, function(key2, val2){
                        $("<option>").attr("value", key2).text(val2).appendTo(option_group);
                    });
                } else {
                    $("<option>").attr("value", key).text(val).appendTo(element);
                }
            });
        }

        this._createOptions();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var container = element.closest(".select");
        var drop_container = container.find(".drop-container");
        var input = element.siblings(".select-input");
        var filter_input = drop_container.find("input");
        var list = drop_container.find("ul");

        container.off(Metro.events.click);
        container.off(Metro.events.click, ".input-clear-button");
        input.off(Metro.events.click);
        filter_input.off(Metro.events.blur);
        filter_input.off(Metro.events.focus);
        list.off(Metro.events.click, "li");
        filter_input.off(Metro.events.keyup);
        drop_container.off(Metro.events.click);

        Metro.destroyPlugin(drop_container, "dropdown");

        element.insertBefore(container);
        container.remove();
    }
};

$(document).on(Metro.events.click, function(){
    var selects = $(".select .drop-container");
    $.each(selects, function(){
        $(this).data('dropdown').close();
    });
    $(".select").removeClass("focused");
});

Metro.plugin('select', Select);

