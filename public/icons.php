<? include("header.php")?>

    <style>
        #icons-list li {
            font-size: 18px;
            line-height: 32px;
        }
    </style>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Icons<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="span10">
                    <p>
                        In the "images" folder you can find animated preloaders in windows 8 style.
                    </p>

                    <div class="padding20">
                        <img src="/images/preloader-w8-cycle-black.gif" />
                        <img src="/images/preloader-w8-line-black.gif" />
                    </div>

                    <p>
                        Also now <code>333</code> icons in one font file. Icons support zoom (over css:font-size), colored (over css:color), css effects for text.
                    </p>

                    <h3>Icons now resizable and colorable</h3>
                    <div class="grid">
                        <div class="row">
                            <div class="span3" style="padding-top: 35px;">
                                <div id="slider1" class="slider" data-role="slider" data-param-init-value="50"></div>
                            </div>
                            <div class="span3">
                                <h1 id="icon-resize-sample" class="icon-compass"></h1>
                            </div>
                        </div>
                    </div>

                    <h3>Icons list</h3>
                    <ol class="unstyled three-columns" id="icons-list">
                        <li><i class="icon-home"></i> icon-home</li>
                        <li><i class="icon-newspaper"></i> icon-newspaper</li>
                        <li><i class="icon-pencil"></i> icon-pencil</li>
                        <li><i class="icon-droplet"></i> icon-droplet</li>
                        <li><i class="icon-pictures"></i> icon-pictures</li>
                        <li><i class="icon-camera"></i> icon-camera</li>
                        <li><i class="icon-music"></i> icon-music</li>
                        <li><i class="icon-film"></i> icon-film</li>
                        <li><i class="icon-camera-2"></i> icon-camera-2</li>
                        <li><i class="icon-spades"></i> icon-spades</li>
                        <li><i class="icon-clubs"></i> icon-clubs</li>
                        <li><i class="icon-diamonds"></i> icon-diamonds</li>
                        <li><i class="icon-broadcast"></i> icon-broadcast</li>
                        <li><i class="icon-mic"></i> icon-mic</li>
                        <li><i class="icon-book"></i> icon-book</li>
                        <li><i class="icon-file"></i> icon-file</li>
                        <li><i class="icon-new"></i> icon-new</li>
                        <li><i class="icon-copy"></i> icon-copy</li>
                        <li><i class="icon-folder"></i> icon-folder</li>
                        <li><i class="icon-folder-2"></i> icon-folder-2</li>
                        <li><i class="icon-tag"></i> icon-tag</li>
                        <li><i class="icon-cart"></i> icon-cart</li>
                        <li><i class="icon-basket"></i> icon-basket</li>
                        <li><i class="icon-calculate"></i> icon-calculate</li>
                        <li><i class="icon-support"></i> icon-support</li>
                        <li><i class="icon-phone"></i> icon-phone</li>
                        <li><i class="icon-mail"></i> icon-mail</li>
                        <li><i class="icon-location"></i> icon-location</li>
                        <li><i class="icon-compass"></i> icon-compass</li>
                        <li><i class="icon-history"></i> icon-history</li>
                        <li><i class="icon-clock"></i> icon-clock</li>
                        <li><i class="icon-bell"></i> icon-bell</li>
                        <li><i class="icon-calendar"></i> icon-calendar</li>
                        <li><i class="icon-printer"></i> icon-printer</li>
                        <li><i class="icon-mouse"></i> icon-mouse</li>
                        <li><i class="icon-screen"></i> icon-screen</li>
                        <li><i class="icon-laptop"></i> icon-laptop</li>
                        <li><i class="icon-mobile"></i> icon-mobile</li>
                        <li><i class="icon-cabinet"></i> icon-cabinet</li>
                        <li><i class="icon-drawer"></i> icon-drawer</li>
                        <li><i class="icon-drawer-2"></i> icon-drawer-2</li>
                        <li><i class="icon-box"></i> icon-box</li>
                        <li><i class="icon-box-add"></i> icon-box-add</li>
                        <li><i class="icon-box-remove"></i> icon-box-remove</li>
                        <li><i class="icon-download"></i> icon-download</li>
                        <li><i class="icon-upload"></i> icon-upload</li>
                        <li><i class="icon-database"></i> icon-database</li>
                        <li><i class="icon-flip"></i> icon-flip</li>
                        <li><i class="icon-flip-2"></i> icon-flip-2</li>
                        <li><i class="icon-undo"></i> icon-undo</li>
                        <li><i class="icon-redo"></i> icon-redo</li>
                        <li><i class="icon-forward"></i> icon-forward</li>
                        <li><i class="icon-reply"></i> icon-reply</li>
                        <li><i class="icon-reply-2"></i> icon-reply-2</li>
                        <li><i class="icon-comments"></i> icon-comments</li>
                        <li><i class="icon-comments-2"></i> icon-comments-2</li>
                        <li><i class="icon-comments-3"></i> icon-comments-3</li>
                        <li><i class="icon-comments-4"></i> icon-comments-4</li>
                        <li><i class="icon-comments-5"></i> icon-comments-5</li>
                        <li><i class="icon-user"></i> icon-user</li>
                        <li><i class="icon-user-2"></i> icon-user-2</li>
                        <li><i class="icon-user-3"></i> icon-user-3</li>
                        <li><i class="icon-busy"></i> icon-busy</li>
                        <li><i class="icon-loading"></i> icon-loading</li>
                        <li><i class="icon-loading-2"></i> icon-loading-2</li>
                        <li><i class="icon-search"></i> icon-search</li>
                        <li><i class="icon-zoom-in"></i> icon-zoom-in</li>
                        <li><i class="icon-zoom-out"></i> icon-zoom-out</li>
                        <li><i class="icon-key"></i> icon-key</li>
                        <li><i class="icon-key-2"></i> icon-key-2</li>
                        <li><i class="icon-locked"></i> icon-locked</li>
                        <li><i class="icon-unlocked"></i> icon-unlocked</li>
                        <li><i class="icon-wrench"></i> icon-wrench</li>
                        <li><i class="icon-equalizer"></i> icon-equalizer</li>
                        <li><i class="icon-cog"></i> icon-cog</li>
                        <li><i class="icon-pie"></i> icon-pie</li>
                        <li><i class="icon-bars"></i> icon-bars</li>
                        <li><i class="icon-stats-up"></i> icon-stats-up</li>
                        <li><i class="icon-gift"></i> icon-gift</li>
                        <li><i class="icon-trophy"></i> icon-trophy</li>
                        <li><i class="icon-diamond"></i> icon-diamond</li>
                        <li><i class="icon-coffee"></i> icon-coffee</li>
                        <li><i class="icon-rocket"></i> icon-rocket</li>
                        <li><i class="icon-meter-slow"></i> icon-meter-slow</li>
                        <li><i class="icon-meter-medium"></i> icon-meter-medium</li>
                        <li><i class="icon-meter-fast"></i> icon-meter-fast</li>
                        <li><i class="icon-dashboard"></i> icon-dashboard</li>
                        <li><i class="icon-fire"></i> icon-fire</li>
                        <li><i class="icon-lab"></i> icon-lab</li>
                        <li><i class="icon-remove"></i> icon-remove</li>
                        <li><i class="icon-briefcase"></i> icon-briefcase</li>
                        <li><i class="icon-briefcase-2"></i> icon-briefcase-2</li>
                        <li><i class="icon-cars"></i> icon-cars</li>
                        <li><i class="icon-bus"></i> icon-bus</li>
                        <li><i class="icon-cube"></i> icon-cube</li>
                        <li><i class="icon-cube-2"></i> icon-cube-2</li>
                        <li><i class="icon-puzzle"></i> icon-puzzle</li>
                        <li><i class="icon-glasses"></i> icon-glasses</li>
                        <li><i class="icon-glasses-2"></i> icon-glasses-2</li>
                        <li><i class="icon-accessibility"></i> icon-accessibility</li>
                        <li><i class="icon-accessibility-2"></i> icon-accessibility-2</li>
                        <li><i class="icon-target"></i> icon-target</li>
                        <li><i class="icon-target-2"></i> icon-target-2</li>
                        <li><i class="icon-lightning"></i> icon-lightning</li>
                        <li><i class="icon-power"></i> icon-power</li>
                        <li><i class="icon-power-2"></i> icon-power-2</li>
                        <li><i class="icon-clipboard"></i> icon-clipboard</li>
                        <li><i class="icon-clipboard-2"></i> icon-clipboard-2</li>
                        <li><i class="icon-playlist"></i> icon-playlist</li>
                        <li><i class="icon-grid-view"></i> icon-grid-view</li>
                        <li><i class="icon-tree-view"></i> icon-tree-view</li>
                        <li><i class="icon-cloud"></i> icon-cloud</li>
                        <li><i class="icon-cloud-2"></i> icon-cloud-2</li>
                        <li><i class="icon-download-2"></i> icon-download-2</li>
                        <li><i class="icon-upload-2"></i> icon-upload-2</li>
                        <li><i class="icon-upload-3"></i> icon-upload-3</li>
                        <li><i class="icon-link"></i> icon-link</li>
                        <li><i class="icon-link-2"></i> icon-link-2</li>
                        <li><i class="icon-flag"></i> icon-flag</li>
                        <li><i class="icon-flag-2"></i> icon-flag-2</li>
                        <li><i class="icon-attachment"></i> icon-attachment</li>
                        <li><i class="icon-eye"></i> icon-eye</li>
                        <li><i class="icon-bookmark"></i> icon-bookmark</li>
                        <li><i class="icon-bookmark-2"></i> icon-bookmark-2</li>
                        <li><i class="icon-star"></i> icon-star</li>
                        <li><i class="icon-star-2"></i> icon-star-2</li>
                        <li><i class="icon-star-3"></i> icon-star-3</li>
                        <li><i class="icon-heart"></i> icon-heart</li>
                        <li><i class="icon-heart-2"></i> icon-heart-2</li>
                        <li><i class="icon-thumbs-up"></i> icon-thumbs-up</li>
                        <li><i class="icon-thumbs-down"></i> icon-thumbs-down</li>
                        <li><i class="icon-plus"></i> icon-plus</li>
                        <li><i class="icon-minus"></i> icon-minus</li>
                        <li><i class="icon-help"></i> icon-help</li>
                        <li><i class="icon-help-2"></i> icon-help-2</li>
                        <li><i class="icon-blocked"></i> icon-blocked</li>
                        <li><i class="icon-cancel"></i> icon-cancel</li>
                        <li><i class="icon-cancel-2"></i> icon-cancel-2</li>
                        <li><i class="icon-checkmark"></i> icon-checkmark</li>
                        <li><i class="icon-minus-2"></i> icon-minus-2</li>
                        <li><i class="icon-plus-2"></i> icon-plus-2</li>
                        <li><i class="icon-enter"></i> icon-enter</li>
                        <li><i class="icon-exit"></i> icon-exit</li>
                        <li><i class="icon-loop"></i> icon-loop</li>
                        <li><i class="icon-arrow-up-left"></i> icon-arrow-up-left</li>
                        <li><i class="icon-arrow-up"></i> icon-arrow-up</li>
                        <li><i class="icon-arrow-up-right"></i> icon-arrow-up-right</li>
                        <li><i class="icon-arrow-right"></i> icon-arrow-right</li>
                        <li><i class="icon-arrow-down-right"></i> icon-arrow-down-right</li>
                        <li><i class="icon-arrow-down"></i> icon-arrow-down</li>
                        <li><i class="icon-arrow-down-left"></i> icon-arrow-down-left</li>
                        <li><i class="icon-arrow-left"></i> icon-arrow-left</li>
                        <li><i class="icon-arrow-up-2"></i> icon-arrow-up-2</li>
                        <li><i class="icon-arrow-right-2"></i> icon-arrow-right-2</li>
                        <li><i class="icon-arrow-down-2"></i> icon-arrow-down-2</li>
                        <li><i class="icon-arrow-left-2"></i> icon-arrow-left-2</li>
                        <li><i class="icon-arrow-up-3"></i> icon-arrow-up-3</li>
                        <li><i class="icon-arrow-right-3"></i> icon-arrow-right-3</li>
                        <li><i class="icon-arrow-down-3"></i> icon-arrow-down-3</li>
                        <li><i class="icon-arrow-left-3"></i> icon-arrow-left-3</li>
                        <li><i class="icon-menu"></i> icon-menu</li>
                        <li><i class="icon-enter-2"></i> icon-enter-2</li>
                        <li><i class="icon-backspace"></i> icon-backspace</li>
                        <li><i class="icon-backspace-2"></i> icon-backspace-2</li>
                        <li><i class="icon-tab"></i> icon-tab</li>
                        <li><i class="icon-tab-2"></i> icon-tab-2</li>
                        <li><i class="icon-checkbox"></i> icon-checkbox</li>
                        <li><i class="icon-checkbox-unchecked"></i> icon-checkbox-unchecked</li>
                        <li><i class="icon-checkbox-partial"></i> icon-checkbox-partial</li>
                        <li><i class="icon-radio-checked"></i> icon-radio-checked</li>
                        <li><i class="icon-radio-unchecked"></i> icon-radio-unchecked</li>
                        <li><i class="icon-font"></i> icon-font</li>
                        <li><i class="icon-paragraph-left"></i> icon-paragraph-left</li>
                        <li><i class="icon-paragraph-center"></i> icon-paragraph-center</li>
                        <li><i class="icon-paragraph-right"></i> icon-paragraph-right</li>
                        <li><i class="icon-paragraph-justify"></i> icon-paragraph-justify</li>
                        <li><i class="icon-left-to-right"></i> icon-left-to-right</li>
                        <li><i class="icon-right-to-left"></i> icon-right-to-left</li>
                        <li><i class="icon-share"></i> icon-share</li>
                        <li><i class="icon-new-tab"></i> icon-new-tab</li>
                        <li><i class="icon-new-tab-2"></i> icon-new-tab-2</li>
                        <li><i class="icon-embed"></i> icon-embed</li>
                        <li><i class="icon-code"></i> icon-code</li>
                        <li><i class="icon-bluetooth"></i> icon-bluetooth</li>
                        <li><i class="icon-share-2"></i> icon-share-2</li>
                        <li><i class="icon-share-3"></i> icon-share-3</li>
                        <li><i class="icon-mail-2"></i> icon-mail-2</li>
                        <li><i class="icon-google"></i> icon-google</li>
                        <li><i class="icon-google-plus"></i> icon-google-plus</li>
                        <li><i class="icon-google-drive"></i> icon-google-drive</li>
                        <li><i class="icon-facebook"></i> icon-facebook</li>
                        <li><i class="icon-instagram"></i> icon-instagram</li>
                        <li><i class="icon-twitter"></i> icon-twitter</li>
                        <li><i class="icon-feed"></i> icon-feed</li>
                        <li><i class="icon-youtube"></i> icon-youtube</li>
                        <li><i class="icon-vimeo"></i> icon-vimeo</li>
                        <li><i class="icon-flickr"></i> icon-flickr</li>
                        <li><i class="icon-picassa"></i> icon-picassa</li>
                        <li><i class="icon-dribbble"></i> icon-dribbble</li>
                        <li><i class="icon-deviantart"></i> icon-deviantart</li>
                        <li><i class="icon-github"></i> icon-github</li>
                        <li><i class="icon-github-2"></i> icon-github-2</li>
                        <li><i class="icon-github-3"></i> icon-github-3</li>
                        <li><i class="icon-github-4"></i> icon-github-4</li>
                        <li><i class="icon-github-5"></i> icon-github-5</li>
                        <li><i class="icon-github-6"></i> icon-github-6</li>
                        <li><i class="icon-git"></i> icon-git</li>
                        <li><i class="icon-wordpress"></i> icon-wordpress</li>
                        <li><i class="icon-joomla"></i> icon-joomla</li>
                        <li><i class="icon-blogger"></i> icon-blogger</li>
                        <li><i class="icon-tumblr"></i> icon-tumblr</li>
                        <li><i class="icon-yahoo"></i> icon-yahoo</li>
                        <li><i class="icon-amazon"></i> icon-amazon</li>
                        <li><i class="icon-tux"></i> icon-tux</li>
                        <li><i class="icon-apple"></i> icon-apple</li>
                        <li><i class="icon-finder"></i> icon-finder</li>
                        <li><i class="icon-android"></i> icon-android</li>
                        <li><i class="icon-windows"></i> icon-windows</li>
                        <li><i class="icon-soundcloud"></i> icon-soundcloud</li>
                        <li><i class="icon-skype"></i> icon-skype</li>
                        <li><i class="icon-reddit"></i> icon-reddit</li>
                        <li><i class="icon-linkedin"></i> icon-linkedin</li>
                        <li><i class="icon-lastfm"></i> icon-lastfm</li>
                        <li><i class="icon-delicious"></i> icon-delicious</li>
                        <li><i class="icon-stumbleupon"></i> icon-stumbleupon</li>
                        <li><i class="icon-pinterest"></i> icon-pinterest</li>
                        <li><i class="icon-xing"></i> icon-xing</li>
                        <li><i class="icon-flattr"></i> icon-flattr</li>
                        <li><i class="icon-foursquare"></i> icon-foursquare</li>
                        <li><i class="icon-paypal"></i> icon-paypal</li>
                        <li><i class="icon-yelp"></i> icon-yelp</li>
                        <li><i class="icon-libreoffice"></i> icon-libreoffice</li>
                        <li><i class="icon-file-pdf"></i> icon-file-pdf</li>
                        <li><i class="icon-file-openoffice"></i> icon-file-openoffice</li>
                        <li><i class="icon-file-word"></i> icon-file-word</li>
                        <li><i class="icon-file-excel"></i> icon-file-excel</li>
                        <li><i class="icon-file-powerpoint"></i> icon-file-powerpoint</li>
                        <li><i class="icon-file-zip"></i> icon-file-zip</li>
                        <li><i class="icon-file-xml"></i> icon-file-xml</li>
                        <li><i class="icon-file-css"></i> icon-file-css</li>
                        <li><i class="icon-html5"></i> icon-html5</li>
                        <li><i class="icon-html5-2"></i> icon-html5-2</li>
                        <li><i class="icon-css3"></i> icon-css3</li>
                        <li><i class="icon-chrome"></i> icon-chrome</li>
                        <li><i class="icon-firefox"></i> icon-firefox</li>
                        <li><i class="icon-IE"></i> icon-IE</li>
                        <li><i class="icon-opera"></i> icon-opera</li>
                        <li><i class="icon-safari"></i> icon-safari</li>
                        <li><i class="icon-IcoMoon"></i> icon-IcoMoon</li>
                        <li><i class="icon-sunrise"></i> icon-sunrise</li>
                        <li><i class="icon-sun"></i> icon-sun</li>
                        <li><i class="icon-moon"></i> icon-moon</li>
                        <li><i class="icon-sun-2"></i> icon-sun-2</li>
                        <li><i class="icon-windy"></i> icon-windy</li>
                        <li><i class="icon-wind"></i> icon-wind</li>
                        <li><i class="icon-snowflake"></i> icon-snowflake</li>
                        <li><i class="icon-cloudy"></i> icon-cloudy</li>
                        <li><i class="icon-cloud-3"></i> icon-cloud-3</li>
                        <li><i class="icon-weather"></i> icon-weather</li>
                        <li><i class="icon-weather-2"></i> icon-weather-2</li>
                        <li><i class="icon-weather-3"></i> icon-weather-3</li>
                        <li><i class="icon-lines"></i> icon-lines</li>
                        <li><i class="icon-cloud-4"></i> icon-cloud-4</li>
                        <li><i class="icon-lightning-2"></i> icon-lightning-2</li>
                        <li><i class="icon-lightning-3"></i> icon-lightning-3</li>
                        <li><i class="icon-rainy"></i> icon-rainy</li>
                        <li><i class="icon-rainy-2"></i> icon-rainy-2</li>
                        <li><i class="icon-windy-2"></i> icon-windy-2</li>
                        <li><i class="icon-windy-3"></i> icon-windy-3</li>
                        <li><i class="icon-snowy"></i> icon-snowy</li>
                        <li><i class="icon-snowy-2"></i> icon-snowy-2</li>
                        <li><i class="icon-snowy-3"></i> icon-snowy-3</li>
                        <li><i class="icon-weather-4"></i> icon-weather-4</li>
                        <li><i class="icon-cloudy-2"></i> icon-cloudy-2</li>
                        <li><i class="icon-cloud-5"></i> icon-cloud-5</li>
                        <li><i class="icon-lightning-4"></i> icon-lightning-4</li>
                        <li><i class="icon-sun-3"></i> icon-sun-3</li>
                        <li><i class="icon-moon-2"></i> icon-moon-2</li>
                        <li><i class="icon-cloudy-3"></i> icon-cloudy-3</li>
                        <li><i class="icon-cloud-6"></i> icon-cloud-6</li>
                        <li><i class="icon-cloud-7"></i> icon-cloud-7</li>
                        <li><i class="icon-lightning-5"></i> icon-lightning-5</li>
                        <li><i class="icon-rainy-3"></i> icon-rainy-3</li>
                        <li><i class="icon-rainy-4"></i> icon-rainy-4</li>
                        <li><i class="icon-windy-4"></i> icon-windy-4</li>
                        <li><i class="icon-windy-5"></i> icon-windy-5</li>
                        <li><i class="icon-snowy-4"></i> icon-snowy-4</li>
                        <li><i class="icon-snowy-5"></i> icon-snowy-5</li>
                        <li><i class="icon-weather-5"></i> icon-weather-5</li>
                        <li><i class="icon-cloudy-4"></i> icon-cloudy-4</li>
                        <li><i class="icon-lightning-6"></i> icon-lightning-6</li>
                        <li><i class="icon-thermometer"></i> icon-thermometer</li>
                        <li><i class="icon-compass-2"></i> icon-compass-2</li>
                        <li><i class="icon-none"></i> icon-none</li>
                        <li><i class="icon-Celsius"></i> icon-Celsius</li>
                        <li><i class="icon-Fahrenheit"></i> icon-Fahrenheit</li>
                        <li><i class="icon-forrst"></i> icon-forrst</li>
                        <li><i class="icon-headphones"></i> icon-headphones</li>
                        <li><i class="icon-bug"></i> icon-bug</li>
                        <li><i class="icon-cart-2"></i> icon-cart-2</li>
                        <li><i class="icon-earth"></i> icon-earth</li>
                        <li><i class="icon-battery"></i> icon-battery</li>
                        <li><i class="icon-list"></i> icon-list</li>
                        <li><i class="icon-grid"></i> icon-grid</li>
                        <li><i class="icon-alarm"></i> icon-alarm</li>
                        <li><i class="icon-location-2"></i> icon-location-2</li>
                        <li><i class="icon-pointer"></i> icon-pointer</li>
                        <li><i class="icon-diary"></i> icon-diary</li>
                        <li><i class="icon-eye-2"></i> icon-eye-2</li>
                        <li><i class="icon-console"></i> icon-console</li>
                        <li><i class="icon-location-3"></i> icon-location-3</li>
                        <li><i class="icon-move"></i> icon-move</li>
                        <li><i class="icon-gift-2"></i> icon-gift-2</li>
                        <li><i class="icon-monitor"></i> icon-monitor</li>
                        <li><i class="icon-mobile-2"></i> icon-mobile-2</li>
                        <li><i class="icon-switch"></i> icon-switch</li>
                        <li><i class="icon-star-4"></i> icon-star-4</li>
                        <li><i class="icon-address-book"></i> icon-address-book</li>
                        <li><i class="icon-shit"></i> icon-shit</li>
                        <li><i class="icon-cone"></i> icon-cone</li>
                        <li><i class="icon-credit-card"></i> icon-credit-card</li>
                        <li><i class="icon-type"></i> icon-type</li>
                        <li><i class="icon-volume"></i> icon-volume</li>
                        <li><i class="icon-volume-2"></i> icon-volume-2</li>
                        <li><i class="icon-locked-2"></i> icon-locked-2</li>
                        <li><i class="icon-warning"></i> icon-warning</li>
                        <li><i class="icon-info"></i> icon-info</li>
                        <li><i class="icon-filter"></i> icon-filter</li>
                        <li><i class="icon-bookmark-3"></i> icon-bookmark-3</li>
                        <li><i class="icon-bookmark-4"></i> icon-bookmark-4</li>
                        <li><i class="icon-stats"></i> icon-stats</li>
                        <li><i class="icon-compass-3"></i> icon-compass-3</li>
                        <li><i class="icon-keyboard"></i> icon-keyboard</li>
                        <li><i class="icon-award-fill"></i> icon-award-fill</li>
                        <li><i class="icon-award-stroke"></i> icon-award-stroke</li>
                        <li><i class="icon-beaker-alt"></i> icon-beaker-alt</li>
                        <li><i class="icon-beaker"></i> icon-beaker</li>
                        <li><i class="icon-move-vertical"></i> icon-move-vertical</li>
                        <li><i class="icon-move-horizontal"></i> icon-move-horizontal</li>
                        <li><i class="icon-steering-wheel"></i> icon-steering-wheel</li>
                        <li><i class="icon-volume-3"></i> icon-volume-3</li>
                        <li><i class="icon-volume-mute"></i> icon-volume-mute</li>
                        <li><i class="icon-play"></i> icon-play</li>
                        <li><i class="icon-pause"></i> icon-pause</li>
                        <li><i class="icon-stop"></i> icon-stop</li>
                        <li><i class="icon-eject"></i> icon-eject</li>
                        <li><i class="icon-first"></i> icon-first</li>
                        <li><i class="icon-last"></i> icon-last</li>
                        <li><i class="icon-play-alt"></i> icon-play-alt</li>
                        <li><i class="icon-battery-empty"></i> icon-battery-empty</li>
                        <li><i class="icon-battery-half"></i> icon-battery-half</li>
                        <li><i class="icon-battery-full"></i> icon-battery-full</li>
                        <li><i class="icon-battery-charging"></i> icon-battery-charging</li>
                        <li><i class="icon-left-quote"></i> icon-left-quote</li>
                        <li><i class="icon-right-quote"></i> icon-right-quote</li>
                        <li><i class="icon-left-quote-alt"></i> icon-left-quote-alt</li>
                        <li><i class="icon-right-quote-alt"></i> icon-right-quote-alt</li>
                        <li><i class="icon-smiley"></i> icon-smiley</li>
                        <li><i class="icon-umbrella"></i> icon-umbrella</li>
                        <li><i class="icon-info-2"></i> icon-info-2</li>
                        <li><i class="icon-chart-alt"></i> icon-chart-alt</li>
                    </ol>

                    <br />
                    <br />
                    <div class="padding20 bg-color-pink fg-color-white">
                        <h2 class="fg-color-white">License info:</h2>
                        <br />Icon Set:	Broccolidry -- http://dribbble.com/shots/587469-Free-16px-Broccolidryiconsaniconsetitisfullof-icons
                        <br />License:	Aribitrary -- http://licence.visualidiot.com/
                        <br />

                        <br />Icon Set:	Meteocons -- http://www.alessioatzeni.com/meteocons/
                        <br />License:	Arbitrary -- http://www.alessioatzeni.com/meteocons/#about

                        <br />
                        <br />Icon Set:	IcoMoon - Free -- http://keyamoon.com/icomoon/
                        <br />License:	CC BY-SA 3.0 -- http://creativecommons.org/licenses/by-sa/3.0/

                        <br />
                        <br />Icon Set:	Iconic -- http://somerandomdude.com/work/iconic/
                        <br />License:	CC BY-SA 3.0 -- http://creativecommons.org/licenses/by-sa/3.0/us/
                    </div>
                </div>
            </div>
        </div>
    </div>

<? include("footer.php")?>

    <script type="text/javascript">
        $(function(){
            $("#slider1").on("change", function(e, val){
                color = 'green';
                if (val > 30) {
                    color = 'orange';
                }
                if (val > 70) {
                    color = 'red';
                }

                $("#icon-resize-sample").css({
                    "font-size": +val,
                    "color": color
                });
            });
        })
    </script>


