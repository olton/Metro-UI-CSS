require.config({
    baseUrl: "scripts",
    paths: {
        jquery: "jquery",
        metro: "metro"
    },
    shim: {
        metro: ["jquery"]
    }
});

require(
    ['jquery', 'metro'],
    function($){
        $(function(){
            $.Metro.initWidgets();
        });
    }
);