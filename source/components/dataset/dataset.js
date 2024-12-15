(function(Metro, $) {
    'use strict';
    
    var DatasetDefaultConfig = {
        caption: "",
        url: "",
        searchUrl: "",
        method: "GET",
        limit: 10,
        offset: 0,
        fields: "",
        captions: null,
        limitKey: "limit",
        offsetKey: "offset",
        searchKey: "search",
        totalKey: "total",
        dataKey: "data",
        
        clsTable: "",
        clsPagination: "",
        
        onLoad: f => f,
        onDrawRow: Metro.noop,
        onDrawCell: Metro.noop,
        onDatasetCreate: Metro.noop
    };

    Metro.datasetSetup = function (options) {
        DatasetDefaultConfig = $.extend({}, DatasetDefaultConfig, options);
    };

    if (typeof window["metroDatasetSetup"] !== undefined) {
        Metro.datasetSetup(window["metroDatasetSetup"]);
    }

    Metro.Component('dataset', {
        init: function( options, elem ) {
            this._super(elem, options, DatasetDefaultConfig, {
                // define instance vars here
                data: null,
                total: 0,
            });
            return this;
        },

        _create: function(){
            var that = this, element = this.element, o = this.options;

            this.limit = o.limit
            this.offset = o.offset
            this.fields = o.fields.split(",").map(f => f.trim()).filter(f => f !== "")
            this.captions = o.captions ? o.captions.split(",").map(f => f.trim()).filter(f => f !== "") : null
            
            this._createStructure();
            this._createEvents();
            
            this._loadData().then(() => {});

            this._fireEvent('dataset-create');
        },

        _loadData: async function (){
            const o = this.options
            if (!o.url) {
                return ;
            }
            const url = o.url + "?" + o.limitKey + "=" + this.limit + "&" + o.offsetKey + "=" + this.offset;
            const response = await fetch(url, {
                method: o.method
            })
            if (response.ok === false) {
                return ;
            }
            this.data = Metro.utils.exec(o.onLoad, [await response.json()], this);
            this._createEntries()
        },
        
        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            let entries
            
            element.append(entries = $("<div>").addClass("dataset-entries"))
            
            entries.html(`
                <table class="table striped ${o.clsTable}">
                    <caption>${o.caption}</caption>
                    <thead></thead>
                    <tbody></tbody>
                </table>
            `)
            this.header = entries.find("thead")
            this.body = entries.find("tbody")
            
            element.append(
                this.pagination = $("<div>").addClass("dataset-pagination").addClass(o.clsPagination)
            )
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            element.on("click", ".page-link", function(){
                const parent = $(this).parent()
                if (parent.hasClass("service")) {
                    if (parent.hasClass("prev-page")) {
                        that.offset -= that.limit;
                    } else {
                        that.offset += that.limit;
                    }
                    that._loadData().then(() => {})
                    return
                }
                that.offset = $(this).data("page") * that.limit - that.limit;
                that._loadData().then(() => {})
            })
        },

        _createEntries: function (){
            var that = this, element = this.element, o = this.options;
            
            if (!this.data) {
                return ;
            }

            this.entries = this.data[o.dataKey];
            this.total = this.data[o.totalKey];

            this.header.clear()
            this.body.clear()
            
            const headerRow = $("<tr>").addClass("dataset-header").appendTo(this.header);
            let hIndex = 0;
            for (let key of Object.keys(this.entries[0])) {
                if (this.fields.length && !this.fields.includes(key)) {
                    continue;
                }
                const cell = $("<th>").html(this.captions ? this.captions[hIndex] : key);
                cell.appendTo(headerRow);
                hIndex++
            }
            
            this.entries.forEach((entry, index) => {
                const row = $("<tr>").addClass("dataset-row");
                this.body.append(row);
                Metro.utils.exec(o.onDrawRow, [row, entry, index], this);
                for (let key in entry) {
                    if (this.fields.length && !this.fields.includes(key)) {
                        continue;
                    }
                    const cell = $("<td>").addClass("dataset-cell").html(entry[key]);
                    row.append(cell);
                    Metro.utils.exec(o.onDrawCell, [cell, entry[key], key, entry, index], this);
                }
            });
            
            Metro.pagination({
                length: this.total,
                rows: this.limit,
                current: this.offset === 0 ? 1 : Math.round(this.offset / this.limit) + 1,
                target: this.pagination,
            })
        },
        
        changeAttribute: function(attr, newValue){
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));