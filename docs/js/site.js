(function() {
    "use strict";

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

    setTimeout(function(){
        var b = $(".adsbygoogle");
        var target = $("main > h1 + .text-leader");
        var div = $("<div>").addClass("example no-border p-0");

        if (Metro.utils.isLocalhost()) {
            return ;
        }

        if (b.length === 0) {
            // div.html("<div class='bg-red fg-white p-4 text-center h3 text-light'>With your help, I can make Metro 4 even better! Please, disable AdBlock or AdGuard.<br>Thank you for your support!</div>");
            // div.insertAfter(target);
        } else {
            $.each(b, function(){
                var bl = $(this);
                if (bl.height() < 50 || Metro.utils.getStyleOne(bl, 'display') === 'none') {
                    // div.html("<div class='bg-red fg-white p-4 text-center h3 text-light'>With your help, I can make Metro 4 even better! Please, disable AdBlock or AdGuard.<br>Thank you for your support!</div>");
                    // div.insertAfter(target);
                }
            });
        }
    }, 1000)
}());