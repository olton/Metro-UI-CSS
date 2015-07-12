require.config({
    paths: {
        jquery: "jquery",
        metro: "../../../build/js/metro"
    },
    shim: {
        metro: ["jquery"]
    }
});

require(
    ['jquery', 'metro'],
    function($){}
);