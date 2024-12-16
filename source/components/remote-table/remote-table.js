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
        searchKey: "query",
        totalKey: "total",
        dataKey: "data",
        shortPagination: false,
        rows: 10,
        rowsSteps: "10,25,50,100",
        
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
            this.fields = o.fields.toArray(",")
            this.captions = o.captions ? o.captions.toArray(",") : null
            this.rowSteps = o.rowsSteps.toArray(",")
            
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
            
            element.addClass("table-component remote-table")
            element.append(entries = $("<div>").addClass("table-entry"))
            
            entries.html(`
                <div class="search-block row">
                    <div class="cell-sm-8">
                        <input type="text" data-role="input" 
                            data-prepend="${this.strings.label_search}" 
                            data-search-button="true" 
                            />
                    </div>
                    <div class="cell-sm-4">
                        <select data-role="select" data-prepend="${this.strings.label_rows_count}" data-filter="false">
                            ${this.rowSteps.map(step => `<option value="${step}">${step}</option>`).join("")}
                        </select>
                    </div>
                </div>
                <table class="table ${o.clsTable}">
                    <caption>${o.caption}</caption>
                    <thead></thead>
                    <tbody></tbody>
                </table>
            `)
            this.header = entries.find("thead")
            this.body = entries.find("tbody")
            
            element.append(
                this.pagination = $("<div>").addClass("table-pagination").addClass(o.clsPagination)
            )
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;
            element.on("click", ".page-link", function(){
                const parent = $(this).parent()
                if (parent.hasClass("service")) {
                    if (parent.hasClass("prev-page")) {
                        that.offset -= that.limit;
                        if (that.offset < 0) {
                            that.offset = 0;
                        } 
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

            const usePagination = Metro.utils.isValue(this.data[o.totalKey])
            
            this.entries = this.data[o.dataKey];
            this.total = this.data[o.totalKey];

            this.header.clear()
            this.body.clear()
            
            const headerRow = $("<tr>").addClass("table-header").appendTo(this.header);
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
                const row = $("<tr>").addClass("table-row");
                this.body.append(row);
                Metro.utils.exec(o.onDrawRow, [row, entry, index], this);
                let hIndex = 0;
                for (let key in entry) {
                    if (this.fields.length && !this.fields.includes(key)) {
                        continue;
                    }
                    const cell = $("<td>").attr("data-label", this.captions ? this.captions[hIndex] : key).addClass("table-cell").html(entry[key]);
                    row.append(cell);
                    Metro.utils.exec(o.onDrawCell, [cell, entry[key], key, entry, index], this);
                    hIndex++
                }
            });
            
            if (usePagination && !o.shortPagination) {
                Metro.pagination({
                    length: this.total,
                    rows: this.limit,
                    current: this.offset === 0 ? 1 : Math.round(this.offset / this.limit) + 1,
                    target: this.pagination,
                })
            } else {
                this.pagination.html(`
                    <div class="short-pagination">
                        <div class="button service prev-page"><a href="javascript:void(0)" class="page-link">${this.strings.label_prev}</a></div>
                        <div class="button service next-page"><a href="javascript:void(0)" class="page-link">${this.strings.label_next}</a></div>
                    </div>
                `)
            }
            
        },
        
        changeAttribute: function(attr, newValue){
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));