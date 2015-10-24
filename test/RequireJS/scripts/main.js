require.config({
    paths: {
        jquery: "jquery",
        metro: "../../../build/js/metro"
    },
    shim: {
        metro: {
            deps: ['jquery']
        }
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