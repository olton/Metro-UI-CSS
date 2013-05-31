/*  Author: Kation
 *  Description: Function to create page list.
 *  Version: 0.1.1
 *
 *  Tutorial:
 *      var page = $("#page").pagelist();
 *      page.total = 10;  //Total pages
 *      page.current = 5;  //Current page
 *      page.showcount = 2;  //Default is 2
 *      page.url = "/List?page={page}";  //Jump url
 *      page.ajax = "#contnet";  //if you want to use ajax, set value to target element, defaul is null
 *      //If you want to use your own template
 *      //page.pageTemplate = '...';
 *      //page.pageSideTemplate = '...';
 *      //page.pageItemTemplate = '...';
 *      //page.pageCurrentTemplate = '...';
 *      //page.pageMoreTemplate = '...';
 *      //page.pageJumpTemplate = '...';
 *      page.create(); //Create page list
 */

(function ($) {
    $.extend($.fn, {
        pagelist: function () {
            //Invoke element
            this.element = $(this);
            //Total Page
            this.total = 1;
            //Current Page
            this.current = 1;
            //Url with {page} parameter
            //Example : /List?page={page}
            this.url = '';
            //If showcount = 2, current = 5, total = 10
            //You will see like this
            //1 ... 3 4 5 6 7 ... 10
            //Show 3 to 7
            this.showcount = 2;
            //Page list Template
            //Must have {previous},{content},{next}
            //Optional {jump}
            this.pageTemplate = '<div class="pagelist"><div class="pagePrevious">{previous}</div><div class="pageContent">{content}</div><div class="pageNext">{next}</div><div class="pageJump">{jump}</div></div>';
            //Previous, Next Button Template
            this.pageSideTemplate = '<a class="button">{page}</a>';
            //Each Page Item Template, 1,2,3,4...
            this.pageItemTemplate = '<a class="tool-button">{page}</a>';
            //Current Page Item Template
            this.pageCurrentTemplate = '<a class="pageCurrent tool-button">{page}</a>';
            //'...' Template
            this.pageMoreTemplate = '<span>...</span>';
            //Jump Template
            //Must have id="pageGoValue", id="pageGo"
            this.pageJumpTemplate = '<input type="text" id="pageGoValue" /><button class="tool-button" id="pageGo"></button>';
            //Ajax target , example : '#content'
            this.ajax = null;
            //Ajax success execute function
            this.ajaxResult = function (pageList, result) {
                $(pageList.ajax).html(result);
            };
            //Display text of buttons
            this.text = {
                previous: 'Previous',
                next: 'Next',
                go: 'Go'
            };
            //Execute when navigate to a page
            this.click = function (pageList, page) {
                var url = pageList.url.replace('{page}', page);
                if (pageList.ajax != null) {
                    $.ajax({
                        url: url,
                        async: true,
                        success: function (result, status) {
                            pageList.ajaxResult(pageList, result);
                        }
                    });
                }
                else {
                    location.href = url;
                }
            };

            var pageContent = null;
            var previousContent = null;
            var nextContent = null;
            var jumpContent = null;
            //Create page list elements.
            this.create = function () {
                var pageDivString = this.pageTemplate.replace('{content}', '<div id="pageContent"/>');
                pageDivString = pageDivString.replace('{previous}', '<div id="pagePrevious"/>');
                pageDivString = pageDivString.replace('{next}', '<div id="pageNext"/>');
                pageDivString = pageDivString.replace('{jump}', '<div id="pageJump"/>');
                var pageDiv = $(pageDivString);
                pageContent = pageDiv.find('#pageContent').parent();
                previousContent = pageDiv.find('#pagePrevious').parent();
                nextContent = pageDiv.find('#pageNext').parent();
                if (pageDiv.find('#pageJump').length != 0)
                    jumpContent = pageDiv.find('#pageJump').parent();
                rebuildPage(pageContent, previousContent, nextContent, jumpContent, this);
                this.element.append(pageDiv);
            }

            //Navigate function
            this.navigateTo = function (page) {
                if (page == '-1') {
                    if (this.current == 1) {
                        return false;
                    }
                    this.current--;
                }
                else if (page == '+1') {
                    if (this.current == this.total) {
                        return false;
                    }
                    this.current++;
                }
                else {
                    try
                    {
                        var val = Math.round(new Number(page));
                        if (val < 1 || val > this.total || isNaN(val))
                            return false;
                        this.current = val;
                    }
                    catch (err) {

                    }
                }
                if (this.ajax != null) {
                    rebuildPage(pageContent, previousContent, nextContent, jumpContent, this);
                }
                this.click(this, this.current);
                return true;
            }

            return this;
        }
    });

    function rebuildPage(pageContent, previousContent, nextContent, jumpContent, pagelist) {
        var previous = createPage('-1', pagelist.text.previous, pagelist.pageSideTemplate);
        previous.click(function () {
            var page = $(this).attr('data-page');
            pagelist.navigateTo(page);
        });
        var next = createPage('+1', pagelist.text.next, pagelist.pageSideTemplate);
        next.click(function () {
            var page = $(this).attr('data-page');
            pagelist.navigateTo(page);
        });
        pageContent.html('');
        previousContent.html('');
        nextContent.html('');
        if (jumpContent != null)
            jumpContent.html('');

        previousContent.append(previous);

        if (pagelist.current - pagelist.showcount > 1) {
            var first = createPage('1', '1', pagelist.pageItemTemplate);
            first.click(function () {
                var page = $(this).attr('data-page');
                pagelist.navigateTo(page);
            });
            pageContent.append(first);
            pageContent.append($(pagelist.pageMoreTemplate));
        }

        var start = pagelist.current - pagelist.showcount;
        var stop = pagelist.current + pagelist.showcount;
        if (start < 1) {
            stop += 1 - start;
            start = 1;
        }
        if (stop > pagelist.total) {
            start -= stop - pagelist.total;
            stop = pagelist.total;
        }
        for (var i = start; i <= stop; i++) {
            if (i < 1 || i > pagelist.total) {
                continue;
            }
            var page
            if (i == pagelist.current) {
                page = createPage(i, i, pagelist.pageCurrentTemplate);
            } else {
                page = createPage(i, i, pagelist.pageItemTemplate);
            }
            page.click(function () {
                var page = $(this).attr('data-page');
                pagelist.navigateTo(page);
            });
            pageContent.append(page);
        }

        if (pagelist.current + pagelist.showcount < pagelist.total) {
            var last = createPage(pagelist.total, pagelist.total, pagelist.pageItemTemplate);
            last.click(function () {
                var page = $(this).attr('data-page');
                pagelist.navigateTo(page);
            });
            pageContent.append($(pagelist.pageMoreTemplate));
            pageContent.append(last);
        }
        nextContent.append(next);
        if (jumpContent != null) {
            jumpContent.html(pagelist.pageJumpTemplate);
            var pageGoValue = jumpContent.find("#pageGoValue");
            var pageGo = jumpContent.find("#pageGo");
            pageGo.html(pagelist.text.go);
            pageGo.click(function () {
                var result = pagelist.navigateTo(pageGoValue.val());
                if (result == false) {
                    $.Dialog({
                        'title': 'Jump Page',
                        'content': 'Your input a invalid value.',
                        'draggable': true,
                        'overlay': true,
                        'closeButton': false,
                        'buttonsAlign': 'right',
                        'position': {
                            'zone': 'center'
                        },
                        'buttons': {
                            'OK': {
                                'action': function () {
                                    pageGoValue.val('');
                                }
                            }
                        }
                    });
                }
            });
        }
    }

    function createPage(page, name, template) {
        var content = template.replace('{page}', name);
        var a = $(content);
        a.attr('data-page', page);
        return a;
    }
}(jQuery));
