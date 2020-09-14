/* global Metro */
(function(Metro, $) {
    'use strict';
    var FileDefaultConfig = {
        fileDeferred: 0,
        label: "",
        mode: "input",
        buttonTitle: "Choose file(s)",
        filesTitle: "file(s) selected",
        dropTitle: "<strong>Choose a file(s)</strong> or drop it here",
        dropIcon: "<span class='default-icon-upload'></span>",
        prepend: "",
        clsComponent: "",
        clsPrepend: "",
        clsButton: "",
        clsCaption: "",
        clsLabel: "",
        copyInlineStyles: false,
        onSelect: Metro.noop,
        onFileCreate: Metro.noop
    };

    Metro.fileSetup = function (options) {
        FileDefaultConfig = $.extend({}, FileDefaultConfig, options);
    };

    if (typeof window["metroFileSetup"] !== undefined) {
        Metro.fileSetup(window["metroFileSetup"]);
    }

    Metro.Component('file', {
        init: function( options, elem ) {
            this._super(elem, options, FileDefaultConfig);

            return this;
        },

        _create: function(){
            var element = this.element;

            this._createStructure();
            this._createEvents();

            this._fireEvent("file-create", {
                element: element
            });
        },

        _createStructure: function(){
            var element = this.element, o = this.options;
            var container = $("<label>").addClass((o.mode === "input" ? " file " : o.mode === "button" ? " file-button " : " drop-zone ") + element[0].className).addClass(o.clsComponent);
            var caption = $("<span>").addClass("caption").addClass(o.clsCaption);
            var files = $("<span>").addClass("files").addClass(o.clsCaption);
            var icon, button;


            container.insertBefore(element);
            element.appendTo(container);

            if (o.mode === 'drop' || o.mode === 'dropzone') {
                icon = $(o.dropIcon).addClass("icon").appendTo(container);
                caption.html(o.dropTitle).insertAfter(icon);
                files.html("0" + " " + o.filesTitle).insertAfter(caption);
            } else if (o.mode === 'button') {

                button = $("<span>").addClass("button").attr("tabindex", -1).html(o.buttonTitle);
                button.appendTo(container);
                button.addClass(o.clsButton);

            } else {
                caption.insertBefore(element);

                button = $("<span>").addClass("button").attr("tabindex", -1).html(o.buttonTitle);
                button.appendTo(container);
                button.addClass(o.clsButton);

                if (element.attr('dir') === 'rtl' ) {
                    container.addClass("rtl");
                }

                if (o.prepend !== "") {
                    var prepend = $("<div>").html(o.prepend);
                    prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
                }
            }

            element[0].className = '';

            if (o.copyInlineStyles === true) {
                for (var i = 0, l = element[0].style.length; i < l; i++) {
                    container.css(element[0].style[i], element.css(element[0].style[i]));
                }
            }

            if (o.label) {
                var label = $("<label>").addClass("label-for-input").addClass(o.clsLabel).html(o.label).insertBefore(container);
                if (element.attr("id")) {
                    label.attr("for", element.attr("id"));
                }
                if (element.attr("dir") === "rtl") {
                    label.addClass("rtl");
                }
            }

            if (element.is(":disabled")) {
                this.disable();
            } else {
                this.enable();
            }
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            var container = element.closest("label");
            var caption = container.find(".caption");
            var files = container.find(".files");
            var form = element.closest("form");

            if (form.length) {
                form.on("reset", function(){
                    that.clear();
                })
            }

            container.on(Metro.events.click, "button", function(){
                element[0].click();
            });

            element.on(Metro.events.change, function(){
                var fi = this;
                var file_names = [];
                var entry;

                // if (fi.files.length === 0) {
                //     return ;
                // }

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

                that._fireEvent("select", {
                    files: fi.files
                });
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
                    element[0].files = e.dataTransfer.files;
                    files.html(element[0].files.length + " " +o.filesTitle);
                    container.removeClass("drop-on");
                    element.trigger("change");
                });
            }
        },

        clear: function(){
            var element = this.element, o = this.options;
            if (o.mode === "input") {
                element.siblings(".caption").html("");
            } else {
                element.siblings(".caption").html(o.dropTitle);
                element.siblings(".files").html("0" + " " + o.filesTitle);
            }

            element.val("");
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
            return element;
        }
    });
}(Metro, m4q));