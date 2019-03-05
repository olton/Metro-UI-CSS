var Panel = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    dependencies: ['draggable', 'collapse'],

    options: {
        titleCaption: "",
        titleIcon: "",
        collapsible: false,
        collapsed: false,
        collapseDuration: METRO_ANIMATION_DURATION,
        width: "auto",
        height: "auto",
        draggable: false,

        customButtons: null,
        clsCustomButton: "",

        clsPanel: "",
        clsTitle: "",
        clsTitleCaption: "",
        clsTitleIcon: "",
        clsContent: "",
        clsCollapseToggle: "",

        onCollapse: Metro.noop,
        onExpand: Metro.noop,
        onDragStart: Metro.noop,
        onDragStop: Metro.noop,
        onDragMove: Metro.noop,
        onPanelCreate: Metro.noop
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
        var element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var panel = $("<div>").addClass("panel").addClass(o.clsPanel);
        var id = Utils.uniqueId();
        var original_classes = element[0].className;
        var title, buttons;


        if (prev.length === 0) {
            parent.prepend(panel);
        } else {
            panel.insertAfter(prev);
        }

        panel.attr("id", id).addClass(original_classes);

        element[0].className = '';
        element.addClass("panel-content").addClass(o.clsContent).appendTo(panel);

        if (o.titleCaption !== "" || o.titleIcon !== "" || o.collapsible === true) {
            title = $("<div>").addClass("panel-title").addClass(o.clsTitle);

            if (o.titleCaption !== "") {
                $("<span>").addClass("caption").addClass(o.clsTitleCaption).html(o.titleCaption).appendTo(title)
            }

            if (o.titleIcon !== "") {
                $(o.titleIcon).addClass("icon").addClass(o.clsTitleIcon).appendTo(title)
            }

            if (o.collapsible === true) {
                var collapseToggle = $("<span>").addClass("dropdown-toggle marker-center active-toggle").addClass(o.clsCollapseToggle).appendTo(title);
                element.collapse({
                    toggleElement: collapseToggle,
                    duration: o.collapseDuration,
                    onCollapse: o.onCollapse,
                    onExpand: o.onExpand
                });

                if (o.collapsed === true) {
                    this.collapse();
                }
            }

            title.appendTo(panel);
        }

        if (title && Utils.isValue(o.customButtons)) {
            var customButtons = [];

            if (Utils.isObject(o.customButtons) !== false) {
                o.customButtons = Utils.isObject(o.customButtons);
            }

            if (typeof o.customButtons === "string" && o.customButtons.indexOf("{") > -1) {
                customButtons = JSON.parse(o.customButtons);
            } else if (typeof o.customButtons === "object" && Utils.objectLength(o.customButtons) > 0) {
                customButtons = o.customButtons;
            } else {
                console.log("Unknown format for custom buttons");
            }

            buttons = $("<div>").addClass("custom-buttons").appendTo(title);

            $.each(customButtons, function(){
                var item = this;
                var customButton = $("<span>");

                customButton
                    .addClass("button btn-custom")
                    .addClass(o.clsCustomButton)
                    .addClass(item.cls)
                    .attr("tabindex", -1)
                    .html(item.html);

                customButton.data("action", item.onclick);

                buttons.prepend(customButton);
            });

            title.on(Metro.events.click, ".btn-custom", function(e){
                if (Utils.isRightMouse(e)) return;
                var button = $(this);
                var action = button.data("action");
                Utils.exec(action, [button], this);
            });
        }

        if (o.draggable === true) {
            var dragElement;

            if (title) {
                dragElement = title.find(".caption, .icon");
            } else {
                dragElement = panel;
            }

            panel.draggable({
                dragElement: dragElement,
                onDragStart: o.onDragStart,
                onDragStop: o.onDragStop,
                onDragMove: o.onDragMove
            });
        }

        if (o.width !== "auto" && parseInt(o.width) >= 0) {
            panel.outerWidth(parseInt(o.width));
        }

        if (o.height !== "auto" && parseInt(o.height) >= 0) {
            panel.outerHeight(parseInt(o.height));
            element.css({overflow: "auto"});
        }

        this.panel = panel;

        Utils.exec(o.onPanelCreate, [this.element]);
    },

    collapse: function(){
        var element = this.element;
        if (Utils.isMetroObject(element, 'collapse') === false) {
            return ;
        }
        element.data('collapse').collapse();
    },

    expand: function(){
        var element = this.element;
        if (Utils.isMetroObject(element, 'collapse') === false) {
            return ;
        }
        element.data('collapse').expand();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
        }
    }
};

Metro.plugin('panel', Panel);