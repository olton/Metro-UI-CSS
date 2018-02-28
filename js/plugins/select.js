var Select = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onSelectCreate, [this.element]);

        return this;
    },
    options: {
        duration: 100,
        clsElement: "",
        clsSelect: "",
        clsPrepend: "",
        clsOption: "",
        clsOptionGroup: "",
        prepend: "",
        copyInlineStyles: true,
        dropHeight: 200,
        disabled: false,
        onChange: Metro.noop,
        onSelectCreate: Metro.noop,
        onUp: Metro.noop,
        onDrop: Metro.noop
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
        this._createSelect();
        this._createEvents();
    },

    _createSelect: function(){
        var that = this, element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("select " + element[0].className).addClass(o.clsElement);
        var multiple = element.prop("multiple");
        var select_id = Utils.uniqueId();

        container.attr("id", select_id).addClass("dropdown-toggle");

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        element.addClass(o.clsSelect);

        if (multiple === false) {
            var input = $("<input>").attr("type", "text").attr("name", "__" + element.attr("name") + "__").prop("readonly", true);
            var list = $("<ul>").addClass("d-menu").css({
                "max-height": o.dropHeight
            });

            function addOption(item, parent){
                var option = $(item);
                var l, a;

                l = $("<li>").addClass(o.clsOption).data("text", item.text).data('value', item.value).appendTo(list);
                a = $("<a>").html(item.text).appendTo(l).addClass(item.className);

                if (option.is(":selected")) {
                    element.val(item.value);
                    input.val(item.text).trigger("change");
                    element.trigger("change");
                }

                a.appendTo(l);
                l.appendTo(parent);
            }

            function addOptionGroup(item, parent){
                var group = $(item);
                var optgroup = $("<li>").html(item.label).addClass("group-title").appendTo(parent);
                $.each(group.children(), function(){
                    addOption(this, parent);
                })
            }

            $.each(element.children(), function(){
                if (this.tagName === "OPTION") {
                    addOption(this, list);
                } else if (this.tagName === "OPTGROUP") {
                    addOptionGroup(this, list);
                } else {

                }
            });

            container.append(input);
            container.append(list);
            list.dropdown({
                duration: o.duration,
                toggleElement: "#"+select_id,
                onDrop: function(){
                    var selects = $(".select ul");
                    $.each(selects, function(){
                        var l = $(this);
                        if (l.is(list)) {
                            return ;
                        }
                        l.data('dropdown').close();
                    });
                    Utils.exec(o.onDrop, [list, element]);
                },
                onUp: function(){
                    Utils.exec(o.onUp, [list, element]);
                }
            });
        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (o.disabled === true || element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.closest(".select");
        var input = element.siblings("input");
        var list = element.siblings("ul");

        container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        });

        input.on(Metro.events.blur, function(){container.removeClass("focused");});
        input.on(Metro.events.focus, function(){container.addClass("focused");});

        list.on(Metro.events.click, "li", function(e){
            if ($(this).hasClass("group-title")) {
                e.preventDefault();
                e.stopPropagation();
                return ;
            }
            var val = $(this).data('value');
            var txt = $(this).data('text');
            var list_obj = list.data('dropdown');
            input.val(txt).trigger("change");
            element.val(val);
            element.trigger("change");
            list_obj.close();
            Utils.exec(o.onChange, [val]);
        });
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    changeAttribute: function(attributeName){

    }
};

$(document).on(Metro.events.click, function(e){
    var selects = $(".select ul");
    $.each(selects, function(){
        $(this).data('dropdown').close();
    });
});

Metro.plugin('select', Select);

