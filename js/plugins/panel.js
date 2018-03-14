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
        var prev = element.prev();
        var parent = element.parent();
        var panel = $("<div>").addClass("panel").addClass(o.clsPanel);
        var id = Utils.uniqueId();
        var original_classes = element[0].className;


        if (prev.length === 0) {
            parent.prepend(panel);
        } else {
            panel.insertAfter(prev);
        }

        panel.attr("id", id).addClass(original_classes);

        element[0].className = '';
        element.addClass("panel-content").addClass(o.clsContent).appendTo(panel);

        if (o.titleCaption !== "" || o.titleIcon !== "" || o.collapsible === true) {
            var title = $("<div>").addClass("panel-title").addClass(o.clsTitle);

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

        if (o.draggable === true) {
            panel.draggable({
                dragElement: title || panel,
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
        var element = this.element, o = this.options;
        if (Utils.isMetroObject(element, 'collapse') === false) {
            return ;
        }
        element.data('collapse').collapse();
    },

    expand: function(){
        var element = this.element, o = this.options;
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