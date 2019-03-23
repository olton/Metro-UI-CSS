var File = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onFileCreate, [this.element], elem);

        return this;
    },
    options: {
        mode: "input",
        buttonTitle: "Choose file(s)",
        filesTitle: "file(s) selected",
        dropTitle: "<strong>Choose a file</strong> or drop it here",
        dropIcon: "<span class='default-icon-upload'></span>",
        prepend: "",
        clsComponent: "",
        clsPrepend: "",
        clsButton: "",
        clsCaption: "",
        copyInlineStyles: true,
        onSelect: Metro.noop,
        onFileCreate: Metro.noop
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
        this._createStructure();
        this._createEvents();
    },

    _createStructure: function(){
        var element = this.element, o = this.options;
        var container = $("<label>").addClass((o.mode === "input" ? " file " : " drop-zone ") + element[0].className).addClass(o.clsComponent);
        var caption = $("<span>").addClass("caption").addClass(o.clsCaption);
        var files = $("<span>").addClass("files").addClass(o.clsCaption);
        var icon, button;


        container.insertBefore(element);
        element.appendTo(container);

        if (o.mode === "input") {
            caption.insertBefore(element);

            button = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.buttonTitle);
            button.appendTo(container);
            button.addClass(o.clsButton);

            if (element.attr('dir') === 'rtl' ) {
                container.addClass("rtl");
            }

            if (o.prepend !== "") {
                var prepend = $("<div>").html(o.prepend);
                prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
            }
        } else {
            icon = $(o.dropIcon).addClass("icon").appendTo(container);
            caption.html(o.dropTitle).insertAfter(icon);
            files.html("0" + " " + o.filesTitle).insertAfter(caption);
        }

        element[0].className = '';

        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var element = this.element, o = this.options;
        var container = element.closest("label");
        var caption = container.find(".caption");
        var files = container.find(".files");

        container.on(Metro.events.click, "button", function(){
            element.trigger("click");
        });

        element.on(Metro.events.change, function(){
            var fi = this;
            var file_names = [];
            var entry;
            if (fi.files.length === 0) {
                return ;
            }

            Array.from(fi.files).forEach(function(file){
                file_names.push(file.name);
            });

            if (o.mode === "input") {

                entry = file_names.join(", ");

                caption.html(entry);
                caption.attr('title', entry);
            } else {
                files.html(element[0].files.length + " " +o.filesTitle);
            }

            Utils.exec(o.onSelect, [fi.files, element], element[0]);
        });

        element.on(Metro.events.focus, function(){container.addClass("focused");});
        element.on(Metro.events.blur, function(){container.removeClass("focused");});

        if (o.mode !== "input") {
            container.on('drag dragstart dragend dragover dragenter dragleave drop', function(e){
                e.preventDefault();
            });

            container.on('dragenter dragover', function(){
                container.addClass("drop-on");
            });

            container.on('dragleave', function(){
                container.removeClass("drop-on");
            });

            container.on('drop', function(e){
                element[0].files = e.originalEvent.dataTransfer.files;
                files.html(element[0].files.length + " " +o.filesTitle);
                container.removeClass("drop-on");
                element.trigger("change");
            });
        }
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    toggleDir: function(){
        if (this.element.attr("dir") === 'rtl') {
            this.element.parent().addClass("rtl");
        } else {
            this.element.parent().removeClass("rtl");
        }
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'dir': this.toggleDir(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var parent = element.parent();
        element.off(Metro.events.change);
        parent.off(Metro.events.click, "button");
        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('file', File);