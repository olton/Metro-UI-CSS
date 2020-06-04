/* global Metro */
(function(Metro, $) {
    'use strict';
    Metro.pagination = function(c){
        var defConf = {
            length: 0,
            rows: 0,
            current: 0,
            target: "body",
            clsPagination: "",
            prevTitle: "Prev",
            nextTitle: "Next",
            distance: 5
        }, conf;
        var pagination;
        var pagination_wrapper;
        var i, prev, next;
        var shortDistance;

        conf = $.extend( {}, defConf, c);

        shortDistance = parseInt(conf.distance);
        pagination_wrapper = $(conf.target);
        pagination_wrapper.html("");
        pagination = $("<ul>").addClass("pagination").addClass(conf.clsPagination).appendTo(pagination_wrapper);

        if (conf.length === 0) {
            return ;
        }

        if (conf.rows === -1) {
            return ;
        }

        conf.pages = Math.ceil(conf.length / conf.rows);

        var add_item = function(item_title, item_type, data){
            var li, a;

            li = $("<li>").addClass("page-item").addClass(item_type);
            a  = $("<a>").addClass("page-link").html(item_title);
            a.data("page", data);
            a.appendTo(li);

            return li;
        };

        prev = add_item(conf.prevTitle, "service prev-page", "prev");
        pagination.append(prev);

        pagination.append(add_item(1, conf.current === 1 ? "active" : "", 1));

        if (shortDistance === 0 || conf.pages <= 7) {
            for (i = 2; i < conf.pages; i++) {
                pagination.append(add_item(i, i === conf.current ? "active" : "", i));
            }
        } else {
            if (conf.current < shortDistance) {
                for (i = 2; i <= shortDistance; i++) {
                    pagination.append(add_item(i, i === conf.current ? "active" : "", i));
                }

                if (conf.pages > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }
            } else if (conf.current <= conf.pages && conf.current > conf.pages - shortDistance + 1) {
                if (conf.pages > shortDistance) {
                    pagination.append(add_item("...", "no-link", null));
                }

                for (i = conf.pages - shortDistance + 1; i < conf.pages; i++) {
                    pagination.append(add_item(i, i === conf.current ? "active" : "", i));
                }
            } else {
                pagination.append(add_item("...", "no-link", null));

                pagination.append(add_item(conf.current - 1, "", conf.current - 1));
                pagination.append(add_item(conf.current, "active", conf.current));
                pagination.append(add_item(conf.current + 1, "", conf.current + 1));

                pagination.append(add_item("...", "no-link", null));
            }
        }

        if (conf.pages > 1 || conf.current < conf.pages) pagination.append(add_item(conf.pages, conf.current === conf.pages ? "active" : "", conf.pages));

        next = add_item(conf.nextTitle, "service next-page", "next");
        pagination.append(next);

        if (conf.current === 1) {
            prev.addClass("disabled");
        }

        if (conf.current === conf.pages) {
            next.addClass("disabled");
        }

        if (conf.length === 0) {
            pagination.addClass("disabled");
            pagination.children().addClass("disabled");
        }

        return pagination;
    };
}(Metro, m4q));