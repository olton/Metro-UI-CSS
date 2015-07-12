require.config({
    baseUrl: "scripts",
    paths: {
        jquery: "jquery",
        metro_global: "metro/global",
        widget_factory: "metro/widget",
        widget_initiator: "metro/initiator",
        widget_countdown: "metro/widgets/countdown",
        widget_accordion: "metro/widgets/accordion"
    },
    shim: {
        metro_global: ["jquery"],
        widget_factory: ["jquery"],
        widget_initiator: ["jquery"],
        widget_countdown: ["jquery"],
        widget_accordion: ["jquery"]
    }
});

require(
    ['jquery', 'metro_global', 'widget_factory', 'widget_initiator', 'widget_countdown', 'widget_accordion'],
    function($){
        $(function(){
            $.Metro.initWidgets();
        });
    }
);