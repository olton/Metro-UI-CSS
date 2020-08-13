/* global Metro */
/* eslint-disable */
(function(Metro, $) {
    'use strict';

    var TokenizerDefaultConfig = {
        spaceSymbol: "",
        spaceClass: "",
        tokenClass: "",
        splitter: "",
        tokenElement: "span",
        clsTokenizer: "",
        clsToken: "",
        clsTokenOdd: "",
        clsTokenEven: "",
        onTokenizerCreate: Metro.noop
    };

    Metro.tokenizerSetup = function (options) {
        TokenizerDefaultConfig = $.extend({}, TokenizerDefaultConfig, options);
    };

    if (typeof window["metroTokenizerSetup"] !== undefined) {
        Metro.tokenizerSetup(window["metroTokenizerSetup"]);
    }

    Metro.Component('tokenizer', {
        init: function( options, elem ) {
            this._super(elem, options, TokenizerDefaultConfig, {
                // define instance vars here
            });
            return this;
        },

        _create: function(){
            var that = this, element = this.element, o = this.options;

            this._createStructure();
            this._createEvents();

            this._fireEvent('tokenizer-create');
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            var result = "", text, index = 1;

            text = element.text().trim().replace(/[\r\n\t]/gi, '').replace(/\s\s+/g, " ");

            $.each(text.split(o.splitter), function(i){
                var symbol = this;
                var isSpace = symbol === " ";
                var token;

                token = $("<"+o.tokenElement+">")
                    .html(isSpace ? o.spaceSymbol : symbol)
                    .attr("aria-hidden", true)
                    .addClass(isSpace ? o.spaceClass : "")
                    .addClass(isSpace ? "" : "item-"+symbol.replace(" ", "_").toLowerCase())
                    .addClass(o.tokenClass !== "" ? o.tokenClass + "-" + (i+1) : "")
                    .addClass(o.clsToken);

                if (!isSpace) {
                    index++;
                }

                if (!isSpace) {
                    token.addClass(index % 2 === 0 ? "item-even" : "item-odd");
                }

                result += token.outerHTML()+"\n";

            });

            element
                .attr("aria-label", text)
                .addClass("tokenizer")
                .addClass(o.clsTokenizer)
                .clear()
                .html(result);
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;

        },

        changeAttribute: function(){
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));