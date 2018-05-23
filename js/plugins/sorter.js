var Sorter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.sorted = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        sortTarget: null,
        sortContent: null,
        sortDir: "asc",
        sortStart: true,
        onSortStart: Metro.noop,
        onSortStop: Metro.noop,
        onSortItemSwitch: Metro.noop,
        onSorterCreate: Metro.noop
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

        this._createStructure();

        Utils.exec(o.onSorterCreate, [element]);
    },

    _createStructure: function(){
        var element = this.element, o = this.options;

        if (o.sortTarget === null) {
            o.sortTarget = element.children()[0].tagName;
        }

        if (o.sortStart === true) {
            this.sort(o.sortDir);
        }
    },

    _getItemContent: function(el){
        var o = this.options;
        var content = "", items;
        var $el = $(el);

        if (o.sortContent === null) {
            content = el.textContent;
        } else {
            items = $el.find(o.sortContent);
            if (items.length === 0) {
                content = el.textContent;
            } else {
                $.each(items, function(){
                    content += " " + this.textContent;
                })
            }
        }

        return content.toLowerCase().replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
    },

    sort: function(dir){
        var element = this.element, o = this.options;
        var switching = true, items, i, shouldSwitch, content_1, content_2;

        if (dir === undefined) {
            dir = o.sortDir;
        }

        this.sorted = false;

        Utils.exec(o.onSortStart, [element], element[0]);

        while (switching) {
            switching = false;
            items = element.find(o.sortTarget);
            if (items.length === 0) {
                break;
            }

            for(i = 0; i < items.length - 1; i++) {
                shouldSwitch = false;

                content_1 = this._getItemContent(items[i]);
                content_2 = this._getItemContent(items[i + 1]);

                if (dir === "asc" ? content_1 > content_2 : content_1 < content_2) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                items[i].parentNode.insertBefore(items[i + 1], items[i]);
                switching = true;
                Utils.exec(o.onSortItemSwitch, [items[i + 1], items[i]], element[0]);
            }
        }

        this.sorted = true;

        Utils.exec(o.onSortStop, [element], element[0]);
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeSortDir = function() {
            var dir = element.attr("data-sort-dir").trim();
            if (dir === "") return;
            o.sortDir = dir;
            that.sort();
        };

        var changeSortContent = function(){
            var content = element.attr("data-sort-content").trim();
            if (content === "") return ;
            o.sortContent = content;
            that.sort();
        };

        switch (attributeName) {
            case "data-sort-dir": changeSortDir(); break;
            case "data-sort-content": changeSortContent(); break;
        }
    },

    destroy: function(){}
};

Metro.plugin('sorter', Sorter);

Metro['sorter'] = {
    create: function(el, op){
        return $(el).sorter(op);
    },

    isSorter: function(el){
        return Utils.isMetroObject(el, "sorter");
    },

    sort: function(el, dir){
        if (!this.isSorter(el)) {
            return false;
        }
        var sorter = $(el).data("sorter");
        if (dir === undefined) {
            dir = "asc";
        }
        sorter.sort(dir);
    }
};