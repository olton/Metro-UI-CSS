/* global Metro, Utils */
var AdblockDefaultConfig = {
    adblockDeferred: 0,
    checkInterval: 1000,
    fireOnce: true,
    checkStop: 10,
    onBite: Metro.noop
};

Metro.adblockSetup = function(options){
    AdblockDefaultConfig = $.extend({}, AdblockDefaultConfig, options);
};

if (typeof window["metroAdblockSetup"] !== undefined) {
    Metro.adblockSetup(window["metroAdblockSetup"]);
}

var Adblock = {
    bite: function(){
        var classes = "adblock-bite adsense google-adsense dblclick advert topad top_ads topAds textads sponsoredtextlink_container show_ads right-banner rekl mpu module-ad mid_ad mediaget horizontal_ad headerAd contentAd brand-link bottombanner bottom_ad_block block_ad bannertop banner-right banner-body b-banner b-article-aside__banner b-advert adwrapper adverts advertisment advertisement:not(body) advertise advert_list adtable adsense adpic adlist adleft adinfo adi adholder adframe addiv ad_text ad_space ad_right ad_links ad_body ad_block ad_Right adTitle adText";
        $("<div>")
            .addClass(classes.split(" ").shuffle().join(" "))
            .css({
                position: "absolute",
                height: 1,
                width: 1,
                overflow: "hidden",
                visibility: "visible"
            })
            .append($("<a href='https://dblclick.net'>").html('dblclick.net'))
            .appendTo($('body'));

        if (Adblock.options.adblockDeferred > 0) {
            setTimeout(function () {
                Adblock.fishing();
            }, Adblock.options.adblockDeferred);
        } else this.fishing();
    },

    fishing: function(){
        var checks = typeof Adblock.options.fireOnce === "number" ? Adblock.options.fireOnce : 0;
        var checkStop = Adblock.options.checkStop;
        var interval = false;
        var run = function(){
            var a = $(".adsense.google-adsense.dblclick.advert.adblock-bite");
            var b = a.find("a");
            var done = function(){
                clearInterval(interval);
                a.remove();
            };

            if (   !a.length
                || !b.length
                || a.css("display").indexOf('none') > -1
                || b.css("display").indexOf('none') > -1
            ) {
                Utils.exec(Adblock.options.onBite);
                $(window).fire("adblockalert");
                if (Adblock.options.fireOnce === true) {
                    done();
                } else {
                    checks--;
                    if (checks === 0) {
                        done();
                    }
                }
            } else {
                if (checkStop !== false) {
                    checkStop--;
                    if (checkStop === 0) {
                        done();
                    }
                }
            }
        };

        interval = setInterval(function(){
            run();
        }, Adblock.options.checkInterval);

        run();
    }
};

Metro.Adblock = Adblock;

$(function(){
    Adblock.options = $.extend({}, AdblockDefaultConfig);
    $(window).on("metroinitied", function(){
        Adblock.bite();
    });
});
