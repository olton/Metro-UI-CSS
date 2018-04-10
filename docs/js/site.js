(function() {
    "use strict";

    var body = $("body");
    var sidenav = $("#sidenav");
    var search;

    try {
        $.get('header.html', function (data) {
            body.prepend(data);
        });
    } catch (e) {}

    try {
        $.get('footer.html', function (data) {
            // body.append(data);
        });
    } catch (e) {}

    if (sidenav.length > 0) $.get('sidenav.html', function(data){
        sidenav.html(data);

        setTimeout(function(){
            search = docsearch({
                apiKey: window.location.hostname === 'getmetroui.com' ? '4209c8f6f5de768837f024b387b77ff6' : '00a53b92ba6ed063bec0a9320e60d4e6',
                indexName: window.location.hostname === 'getmetroui.com' ? 'getmetroui' : 'metroui',
                inputSelector: '#search_input',
                debug: false // Set debug to true if you want to inspect the dropdown
            });
        }, 500);
    });

    var form = $(".need-validation");
    form.on("submit", function(event) {
        event.preventDefault();
        event.stopPropagation();
    }, false);

    $.each($("pre"), function(){
        var pre = $(this);
        pre.prepend($("<button>").addClass("button square copy-button rounded").attr("title", "Copy").html("<span class='mif-copy'></span>"));
    });

    hljs.initHighlightingOnLoad();

    new Clipboard('.copy-button', {
        target: function(trigger) {
            return trigger.nextElementSibling;
        }
    });

    Metro.utils.cleanPreCode("pre code, textarea");

    // setTimeout(function(){
    //     var b = $(".adsbygoogle");
    //     var h = 0;
    //     $.each(b, function(){
    //         var bl = $(this);
    //         if (bl.height() < 50 || Metro.utils.getStyleOne(bl, 'display') === 'none') {
    //             bl.parent().html("<div class='bg-red fg-white p-4 text-center h3 text-light'>With your help, I can make Metro 4 even better! Please, disable AdBlock or AdGuard. Thank you for support!</div>");
    //         }
    //     });
    // }, 1000)
}());


