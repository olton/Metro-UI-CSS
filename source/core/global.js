(function($) {
    'use strict';

    var meta_init = $.meta('metro4:init').attr("content");
    var meta_locale = $.meta('metro4:locale').attr("content");
    var meta_week_start = $.meta('metro4:week_start').attr("content");
    var meta_date_format = $.meta('metro4:date_format').attr("content");
    var meta_date_format_input = $.meta('metro4:date_format_input').attr("content");
    var meta_animation_duration = $.meta('metro4:animation_duration').attr("content");
    var meta_callback_timeout = $.meta('metro4:callback_timeout').attr("content");
    var meta_timeout = $.meta('metro4:timeout').attr("content");
    var meta_scroll_multiple = $.meta('metro4:scroll_multiple').attr("content");
    var meta_cloak = $.meta('metro4:cloak').attr("content");
    var meta_cloak_duration = $.meta('metro4:cloak_duration').attr("content");
    var meta_global_common = $.meta('metro4:global_common').attr("content");
    var meta_blur_image = $.meta('metro4:blur_image').attr("content");

    if (window.METRO_BLUR_IMAGE === undefined) {
        window.METRO_BLUR_IMAGE = meta_blur_image !== undefined ? JSON.parse(meta_global_common) : false;
    }

    if (window.METRO_GLOBAL_COMMON === undefined) {
        window.METRO_GLOBAL_COMMON = meta_global_common !== undefined ? JSON.parse(meta_global_common) : false;
    }

    var meta_jquery = $.meta('metro4:jquery').attr("content"); //undefined
    window.jquery_present = typeof jQuery !== "undefined";
    if (window.METRO_JQUERY === undefined) {
        window.METRO_JQUERY = meta_jquery !== undefined ? JSON.parse(meta_jquery) : true;
    }
    window.useJQuery = window.jquery_present && window.METRO_JQUERY;


    /* Added by Ken Kitay https://github.com/kens-code*/
    var meta_about = $.meta('metro4:about').attr("content");
    if (window.METRO_SHOW_ABOUT === undefined) {
        window.METRO_SHOW_ABOUT = meta_about !== undefined ? JSON.parse(meta_about) : true;
    }
    /* --- end ---*/

    var meta_compile = $.meta('metro4:compile').attr("content");
    if (window.METRO_SHOW_COMPILE_TIME === undefined) {
        window.METRO_SHOW_COMPILE_TIME = meta_compile !== undefined ? JSON.parse(meta_compile) : true;
    }

    if (window.METRO_INIT === undefined) {
        window.METRO_INIT = meta_init !== undefined ? JSON.parse(meta_init) : true;
    }

    if (window.METRO_DEBUG === undefined) {window.METRO_DEBUG = true;}

    if (window.METRO_WEEK_START === undefined) {
        window.METRO_WEEK_START = meta_week_start !== undefined ? parseInt(meta_week_start) : 0;
    }
    if (window.METRO_DATE_FORMAT === undefined) {
        window.METRO_DATE_FORMAT = meta_date_format !== undefined ? meta_date_format : "%Y-%m-%d";
    }
    if (window.METRO_DATE_FORMAT_INPUT === undefined) {
        window.METRO_DATE_FORMAT_INPUT = meta_date_format_input !== undefined ? meta_date_format_input : "%Y-%m-%d";
    }
    if (window.METRO_LOCALE === undefined) {
        window.METRO_LOCALE = meta_locale !== undefined ? meta_locale : 'en-US';
    }
    if (window.METRO_ANIMATION_DURATION === undefined) {
        window.METRO_ANIMATION_DURATION = meta_animation_duration !== undefined ? parseInt(meta_animation_duration) : 100;
    }
    if (window.METRO_CALLBACK_TIMEOUT === undefined) {
        window.METRO_CALLBACK_TIMEOUT = meta_callback_timeout !== undefined ? parseInt(meta_callback_timeout) : 500;
    }
    if (window.METRO_TIMEOUT === undefined) {
        window.METRO_TIMEOUT = meta_timeout !== undefined ? parseInt(meta_timeout) : 2000;
    }
    if (window.METRO_SCROLL_MULTIPLE === undefined) {
        window.METRO_SCROLL_MULTIPLE = meta_scroll_multiple !== undefined ? parseInt(meta_scroll_multiple) : 20;
    }
    if (window.METRO_CLOAK_REMOVE === undefined) {
        window.METRO_CLOAK_REMOVE = meta_cloak !== undefined ? (""+meta_cloak).toLowerCase() : "fade";
    }
    if (window.METRO_CLOAK_DURATION === undefined) {
        window.METRO_CLOAK_DURATION = meta_cloak_duration !== undefined ? parseInt(meta_cloak_duration) : 300;
    }

    if (window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE === undefined) {window.METRO_HOTKEYS_FILTER_CONTENT_EDITABLE = true;}
    if (window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS === undefined) {window.METRO_HOTKEYS_FILTER_INPUT_ACCEPTING_ELEMENTS = true;}
    if (window.METRO_HOTKEYS_FILTER_TEXT_INPUTS === undefined) {window.METRO_HOTKEYS_FILTER_TEXT_INPUTS = true;}
    if (window.METRO_HOTKEYS_BUBBLE_UP === undefined) {window.METRO_HOTKEYS_BUBBLE_UP = false;}
    if (window.METRO_THROWS === undefined) {window.METRO_THROWS = true;}

    window.METRO_MEDIA = [];

}(m4q));