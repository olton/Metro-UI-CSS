$.fn.reverse = Array.prototype.reverse;

$.Metro = function(params){
    params = $.extend({
    }, params);
};

$.Metro.initWidgets = function(){
    var widgets = $("[data-role]");

    $.each(widgets, function(){
        var $this = $(this), w = this;
        var roles = $this.data('role').split(/\s*,\s*/);
        roles.map(function(func){
            try {
                //$(w)[func]();
                if ($.fn[func] !== undefined) {
                    $.fn[func].call($this);
                } else {
                    console.log('$.fn['+func+'] is not a function');
                }
            } catch(e) {
                if (window.METRO_DEBUG) {
                    console.log(e.message, e.stack);
                }
            }
        });
    });
};

$.Metro.init = function(){
    $.Metro.initWidgets();

    if (window.METRO_AUTO_REINIT) {
        if (!window.canObserveMutation) {
            var originalDOM = $('body').html(),
                actualDOM;

            setInterval(function () {
                actualDOM = $('body').html();

                if (originalDOM !== actualDOM) {
                    originalDOM = actualDOM;

                    $.Metro.initWidgets();
                }
            }, 100);
        } else {
            //console.log('observable');
            var observer, observerOptions, observerCallback;
            observerOptions = {
                'childList': true,
                'subtree': true
            };
            observerCallback = function(mutations){
                //console.log('hi from observer');

                mutations.map(function(record){
                    if (record.addedNodes) {

                        /*jshint loopfunc: true */
                        var obj, widgets, plugins;

                        for(var i = 0, l = record.addedNodes.length; i < l; i++) {
                            obj = $(record.addedNodes[i]);
                            plugins = obj.find("[data-role]");

                            if (obj.data('role') !== undefined) {
                                widgets = $.merge(plugins, obj);
                            } else {
                                widgets = plugins;
                            }

                            if (widgets.length) {
                                $.each(widgets, function(){
                                    var _this = $(this);
                                    var roles = _this.data('role').split(/\s*,\s*/);
                                    roles.map(function(func){
                                        try {
                                            if ($.fn[func] !== undefined) {
                                                $.fn[func].call(_this);
                                            } else {
                                                console.log('$.fn['+func+'] is not a function');
                                            }
                                        } catch(e) {
                                            if (window.METRO_DEBUG) {
                                                console.log(e.message, e.stack);
                                            }
                                        }
                                    });
                                });
                            }
                        }
                    }
                });
            };
            observer = new MutationObserver(observerCallback);
            observer.observe(document, observerOptions);
        }
    }
};
