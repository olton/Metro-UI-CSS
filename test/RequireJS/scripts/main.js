require.config({
    baseUrl: "scripts",
    paths: {
        jquery: "jquery",
        metro_global: "metro/global",
        widget_factory: "metro/widget",
        widget_initiator: "metro/initiator",
        widget_countdown: "metro/widgets/countdown",
        widget_accordion: "metro/widgets/accordion"
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