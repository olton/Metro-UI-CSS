/* global Metro */
(function(Metro, $) {
    'use strict';

    var TokenizerDefaultConfig = {
        spaceSymbol: "",
        spaceClass: "space",
        tokenClass: "",
        splitter: "",
        tokenElement: "span",
        useTokenSymbol: true,
        useTokenIndex: true,
        prependText: "",
        appendText: "",
        clsTokenizer: "",
        clsToken: "",
        clsTokenOdd: "",
        clsTokenEven: "",
        onTokenCreate: Metro.noop,
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
            this._createStructure();
            this._fireEvent('tokenizer-create');
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            var result = "", text, index = 0;

            text = element.text().trim().replace(/[\r\n\t]/gi, '').replace(/\s\s+/g, " ");

            $.each(text.split(o.splitter), function(i){
                var symbol = this;
                var isSpace = symbol === " ";
                var token;

                token = $("<"+o.tokenElement+">")
                    .html(isSpace ? o.spaceSymbol : symbol)
                    .attr("aria-hidden", true)
                    .addClass(isSpace ? o.spaceClass : "")
                    .addClass(isSpace && o.useTokenSymbol ? "" : "ts-"+symbol.replace(" ", "_"))
                    .addClass(isSpace && o.useTokenIndex ? "" : "ti-" + (i + 1))
                    .addClass(o.tokenClass ? o.tokenClass : "")
                    .addClass(!isSpace ? o.clsToken : "");

                if (!isSpace) {
                    index++;
                    token.addClass(index % 2 === 0 ? "te-even" : "te-odd");
                    token.addClass(index % 2 === 0 ? o.clsTokenEven : o.clsTokenOdd);
                }

                that._fireEvent("token-create", {
                    token: token[0]
                })

                result += o.prependText + token.outerHTML() + o.appendText +"\n";
            });

            element
                .attr("aria-label", text)
                .addClass(o.clsTokenizer)
                .clear()
                .html(result);
        },

        destroy: function(){
            this.element.remove();
        }
    });
}(Metro, m4q));