require.config({
    paths: {
        jquery: "jquery",
        metro: "../../../build/js/metro"
    },
    shim: {
        jquery: {
            exports: "jQuery"
        },
        metro: {
            deps: ['jquery']
        },
        'metro.accordion': ['jquery'],
        'metro.countdown': ['jquery']
    }
});

require(
    ["jquery", "metro"],
    function($){

    },
    function(err){
        console.log(err);
    }
);