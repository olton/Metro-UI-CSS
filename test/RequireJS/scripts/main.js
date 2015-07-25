require.config({
    paths: {
        jquery: "jquery",
        metro: "metro"
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