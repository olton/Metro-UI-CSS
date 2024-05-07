(function(Metro, $) {
    'use strict';

    var PageControlDefaultConfig = {
        appendButton: true,
        tabsPosition: "left",
        customButtons: null,
        activateNewTab: true,
        defaultNewTabTitle: 'New File',
        defaultNewCanClose: true,
        defaultNewTabIcon: '',
        defaultNewTabImage: '',
        defaultNewTabPosition: 'before', // before, after
        appendActions: null,
        tabsActions: null,
        tabActions: null,
        refControl: false,
        onAppendButtonClick: Metro.noop,
        onTabCreate: Metro.noop_arg,
        onTabActivate: Metro.noop,
        onTabDeactivate: Metro.noop,
        onTabBeforeClose: Metro.noop_true,
        onTabClose: Metro.noop,
        onTabRename: Metro.noop,
        onTabPropChange: Metro.noop,
        onTabOrganized: Metro.noop,
    }

    Metro.pageControlSetup = function (options) {
        PageControlDefaultConfig = $.extend({}, PageControlDefaultConfig, options);
    };

    if (typeof window["metroPageControlSetup"] !== undefined) {
        Metro.pageControlSetup(window["metroPageControlSetup"]);
    }

    Metro.Component('page-control', {
        init: function( options, elem ) {
            this._super(elem, options, PageControlDefaultConfig, {
                // define instance vars here
                newFileIndex: 1,
                invisibleTabsHolderToggle: null,
                invisibleTabsHolder: null,
            });
            return this;
        },

        _create: function(){
            var that = this, element = this.element, o = this.options;

            this._createStructure();
            this._createEvents();

            this._fireEvent('page-control-create');
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;

            this.component = $("<div>").addClass("page-control").insertBefore(element)

            element.addClass("page-control__tabs").appendTo(this.component)
            element.addClass(`tabs-position-${o.tabsPosition}`)

            var items = element.children("li:not(.page-control__tab-custom)")

            var activeTabExists = false

            items.each(function(index, el){
                var $el = $(el), html = $el.html(), active = $el.hasClass("active")
                var tab = that.createTab({
                    caption: html,
                    icon: $el.attr("data-icon"),
                    image: $el.attr("data-image"),
                    canClose: $el.attr("data-close") !== "false",
                    data: $el.attr("data-data"),
                    ref: $el.attr("data-ref"),
                })
                if (active && !activeTabExists) {
                    activeTabExists = true
                    tab.addClass("active")
                    that._fireEvent('tab-activate', {tab: tab[0]})
                }
                element.append(tab)
                $el.remove()
            })

            if (!activeTabExists) {
                var tab = this.element.children(".page-control__tab").first()
                tab.addClass("active")
                this._fireEvent('tab-activate', {tab: tab[0]})
            }

            if (o.refControl) {
                this._updateRefs()
            }

            if (o.appendButton) {
                var appendButton = $("<li>").addClass("page-control__tab__append").html(`<span class="toggle">+</span>`)

                if (o.appendActions) {
                    var appendItems = Metro.utils.exec(o.appendActions, null, this)
                    if (!Array.isArray(appendItems)) {
                        throw "PageControl Error! Prop appendActions must be a function that returns an array."
                    }
                    var appendMenu = $("<ul data-role='dropdown' class='d-menu context'>")
                    appendItems.map( el => appendMenu.append( that._renderMenuItem(el) ) )
                    appendButton.append(appendMenu)
                }

                element.append( appendButton )
            }

            var services = $("<li>").addClass("page-control__tab__service").addClass("invisible-tabs").appendTo(element)
            services.append(
                $("<div>").addClass("page-control__service-button").html(`
                    <span class="toggle">↧</span>
                    <ul class="d-menu place-right context page-control__invisible_tabs_holder"></ul>
                `)
            )

            this.invisibleTabsHolderToggle = services.find(".page-control__tab__service.invisible-tabs > .page-control__service-button")
            this.invisibleTabsHolder = Metro.makePlugin(services.find(".page-control__invisible_tabs_holder"), "dropdown", {
                onClick: e => {
                    const parent = $(e.target.parentNode)
                    if (parent.hasClass("page-control__tab__closer")) {
                        this.closeButtonClick(e)
                    } else {
                        this.activateTab(parent[0])
                    }
                    e.preventDefault()
                    e.stopPropagation()
                }
            })
            this.invisibleTabsHolderToggle.hide()
            this.organizeTabs()

            var tabsServices = $("<li>").addClass("page-control__tab__service").addClass("tabs-menu").appendTo(element)
            tabsServices.append(
                $("<div>").addClass("page-control__service-button").html(`
                    <span class="toggle">︙</span>
                    <ul class="d-menu place-right context" data-role="dropdown"></ul>
                `)
            )
            if (!o.tabsActions) {
                tabsServices.hide()
            } else {
                var tabsMenu = tabsServices.find("ul")
                var tabsMenuItems = Metro.utils.exec(o.tabsActions, null, this)
                tabsMenuItems.map( el => tabsMenu.append( that._renderMenuItem(el) ) )
            }
        },

        _updateRefs: function(){
            var tabs = this.element.find(".page-control__tab")
            var activeTab = this.element.find(".page-control__tab.active")
            tabs.each( (_, el) => $($(el).data("ref")).hide())
            $(activeTab.data("ref")).show()
        },

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;

            element.on("click", ".page-control__tab__closer", this.closeButtonClick.bind(this))

            element.on("click", ".page-control__tab__menu > li > a", function(e){
                var action = $(this).attr("data-action")
                var menu = Metro.getPlugin($(this).closest("ul"), "dropdown")
                var tab = $(this).closest(".page-control__tab")[0]

                menu.close()

                switch (action) {
                    case 'close': {
                        that.closeTab(tab);
                        break;
                    }
                    case 'close-all': {
                        that.closeAll();
                        break;
                    }
                    case 'close-other': {
                        that.closeOtherTabs(tab);
                        break;
                    }
                    case 'close-inactive': {
                        that.closeInactiveTabs();
                        break;
                    }
                    case 'close-left': {
                        that.closeTabsOnTheLeft(tab);
                        break;
                    }
                    case 'close-right': {
                        that.closeTabsOnTheRight(tab);
                        break;
                    }
                    case 'rename': {
                        that.renameTab(tab);
                        break;
                    }
                }

                e.preventDefault()
                e.stopPropagation()
            })

            element.on("click", ".page-control__tab", function(e) {
                const tab = $(this)
                if (tab.hasClass("active")) {
                    return
                }
                that.activateTab(this)
            })

            element.on("click", ".page-control__tab__append > span", (e)=>{
                e.preventDefault()
                e.stopPropagation()

                const tab = that.createTab({
                    caption: `${o.defaultNewTabTitle} ${that.newFileIndex++}`,
                    canClose: o.defaultNewCanClose,
                    icon: o.defaultNewTabIcon,
                    image: o.defaultNewTabImage,
                    data: null,
                })

                that._fireEvent('tab-append', {tab})

                that.activateTab(tab)
                that.organizeTabs()

                that._fireEvent('append-button-click', {tab})
            })

            $(window).on("resize", (e)=>{
                this.organizeTabs()
            })
        },

        _renderMenuItem: function(el){
            var li = $("<li>")
            var an = $("<a>")

            if (el.icon || el.image) {
                an.append(
                    (el.icon ? $("<span class='icon'>").addClass(el.icon) : $("<img class='icon'>").attr("src", el.image).attr("alt", ""))
                )
            }

            if (el.title) {
                an.append( $("<span>").addClass("caption").text(el.title) )
            }

            an.data("data", el.data)
            if (el.onclick) an.on("click", e => el.onclick(e) )
            li.append(an)

            return li
        },

        createTab: function({caption, icon, image, canClose = true, hasMenu = true, data, ref}){
            var that = this, element = this.element, o = this.options;
            var tab = $("<li>").addClass("page-control__tab").appendTo(element);

            if (hasMenu) {
                tab.append(
                    $("<div>")
                        .addClass("page-control__tab__menu__holder")
                        .html(`
                        <span class="">︙</span>
                        <ul class="d-menu context page-control__tab__menu" data-role="dropdown">
                            <li><a data-action="rename">Rename Tab</a></li>
                            <li class="divider"></li>
                            <li><a data-action="close">Close</a></li>
                            <li><a data-action="close-other">Close Other Tabs</a></li>
                            <li><a data-action="close-left">Close Tabs Left</a></li>
                            <li><a data-action="close-right">Close Tabs Right</a></li>
                            <li><a data-action="close-all">Close All Tabs</a></li>
                            <li><a data-action="close-inactive">Close Inactive Tabs</a></li>
                        </ul>
                    `)
                )
                if (o.tabActions) {
                    var tabMenu = tab.find("ul")
                    var tabMenuItems = Metro.utils.exec(o.tabActions)
                    if (!Array.isArray(tabMenuItems)) {
                        throw "PageControl Error! Prop tabActions must be a function that returns an array."
                    }
                    tabMenu.append( $("<li class='divider'>") )
                    tabMenuItems.map( el => tabMenu.append( that._renderMenuItem(el) ) )
                }
            }

            if (icon || image) {
                tab.append(
                    $("<span>")
                        .addClass("page-control__tab__icon")
                        .html(icon ? `<span class="${icon}">` : `<img src="${image}" alt=""/>`)
                )
            }

            tab.append( $("<span>").addClass("page-control__tab__caption").html(caption) )

            if (canClose) {
                tab.append( $("<span>")
                    .addClass("page-control__tab__closer")
                    .html(`<span>✕</span>`) )
            }

            tab.data("data", data)
            tab.data("ref", ref)

            this._fireEvent('tab-create', {tab: tab[0]})

            element[(o.defaultNewTabPosition === 'before' ? 'prepend' : 'append')](tab)

            return tab[0]
        },

        closeButtonClick: function(e){
            var that = this, element = this.element, o = this.options

            var tab = $(e.target).closest(".page-control__tab")
            var parent = tab.closest("ul")

            if (!o.onTabBeforeClose(tab[0])) {
                return
            }

            that.closeTab(tab[0])

            if (parent.hasClass("page-control__invisible_tabs_holder") && parent.children(".page-control__tab").length === 0) {
                Metro.getPlugin(this.invisibleTabsHolder, "dropdown").close()
                this.invisibleTabsHolderToggle.hide()
            }

            e.preventDefault()
            e.stopPropagation()
        },

        closeTab: function(tab, reorg = true){
            var $tab = $(tab)
            if ($tab.hasClass("active")) {
                const prev = $tab.prev(".page-control__tab"), next = $tab.next(".page-control__tab")
                if (prev.length) {
                    this.activateTab(prev[0])
                } else if (next.length) {
                    this.activateTab(next[0])
                } else if ($tab.parent().hasClass("page-control__invisible_tabs_holder") && parent.children(".page-control__tab").length === 1) {
                    if (element.children(".page-control__tab").length) {
                        this.activateTab(element.children(".page-control__tab").last()[0])
                    }
                }
            }
            this._fireEvent('tab-close', {tab})
            if (this.options.refControl) {
                $($tab.data("ref")).remove()
            }
            $tab.remove()
            if (reorg) this.organizeTabs()
            return this
        },

        activateTab: function(tab){
            var element = this.element, o = this.options

            element.find(".page-control__tab").each((index, el)=>{
                var t = $(el)
                if (t.hasClass("active")) {
                    this._fireEvent('tab-deactivate', {tab: el})
                    t.removeClass("active")
                }
            })

            $(tab).addClass("active")

            if (o.refControl) {
                this._updateRefs()
            }

            this._fireEvent('tab-activate', {tab})

            if ($(tab).parent().hasClass("page-control__invisible_tabs_holder")) {
                element.prepend(tab)
                this.organizeTabs()
            }

            return this
        },

        organizeTabs: function(){
            var element = this.element
            var tabsWidth = this.elem.getBoundingClientRect().width
            var holder = this.invisibleTabsHolder
            var addTabButton = element.find(".page-control__tab__append")

            holder.children(".page-control__tab").each((index, el)=>{
                const tab = $(el)

                if (addTabButton.length) {
                    tab.insertBefore(addTabButton)
                } else {
                    tab.appendTo(element)
                }
            })

            element.children(".page-control__tab").each((index, el)=>{
                const tab = $(el)
                const tabRect = el.getBoundingClientRect()
                if (tabRect.left + tabRect.width + 50 > tabsWidth) {
                    tab.appendTo(holder)
                }
            })

            if (holder.children().length) {
                this.invisibleTabsHolderToggle.show(function(){
                    $(this).css({
                        display: "flex"
                    })
                })
            } else {
                this.invisibleTabsHolderToggle.hide()
            }

            this._fireEvent('tab-organized', null)
        },

        addTab: function({caption, icon, image, canClose = true, hasMenu = true, data, ref}, insert = "before"){
            var o = this.options

            var newTab = this.createTab({caption, icon, image, canClose, hasMenu, data, ref})

            if (o.activateNewTab) {
                this.activateTab(newTab)
            }

            this.element[(insert === "before" ? "prepend" : "append")](newTab)
            this.organizeTabs()
            return newTab
        },

        getActiveTab: function(){
            return this.component.find(".page-control__tab.active")[0]
        },

        getActiveTabIndex: function(){
            return this.component.find(".page-control__tab").index(".active", false)
        },

        getTabByIndex: function(index){
            return this.component.find(".page-control__tab").get(index)
        },

        getTabByTitle: function(caption){
            if (!caption) {
                return undefined
            }
            var tabs = this.component.find(".page-control__tab")
            for(var tab of tabs) {
                if ($(tab).find(".caption").text() === caption) {
                    return tab
                }
            }
            return undefined
        },

        closeAll: function(){
            this.component.find(".page-control__tab").each((index, tab) => {
                this.closeTab(tab, false)
            })
            this.organizeTabs()
            return this
        },

        closeInactiveTabs: function(){
            this.component.find(".page-control__tab").each((index, tab) => {
                if (!$(tab).hasClass("active")) this.closeTab(tab, false)
            })
            this.organizeTabs()
            return this
        },

        closeOtherTabs: function(tab){
            let _tab = typeof tab === "number" ? this.getTabByIndex(tab) : $(tab)
            this.component.find(".page-control__tab").each((index, tab) => {
                if (_tab[0] !== tab) this.closeTab(tab, false)
            })
            this.activateTab(tab)
            this.organizeTabs()
            return this
        },

        closeTabsOnTheLeft: function(tab){
            const tabs = this.component.find(".page-control__tab")
            const tabIndex = tabs.indexOf($(tab))
            this.component.find(".page-control__tab").each((index, _tab) => {
                if (index < tabIndex) this.closeTab(_tab, false)
            })
            this.organizeTabs()
            return this
        },

        closeTabsOnTheRight: function(tab){
            const tabs = this.component.find(".page-control__tab")
            const tabIndex = tabs.indexOf($(tab))
            this.component.find(".page-control__tab").each((index, _tab) => {
                if (index > tabIndex) this.closeTab(_tab, false)
            })
            this.organizeTabs()
            return this
        },

        setupTab: function(tab, prop, val){
            var $tab = $(tab)
            switch (prop) {
                case 'caption': {
                    $tab.find(".page-control__tab__caption").text(val);
                    break;
                }
                case 'icon': {
                    $tab.find(".page-control__tab__icon")[0].className = val;
                    break;
                }
                case 'image': {
                    $tab.find(".page-control__tab__image").attr("src", val);
                    break;
                }
                case 'data': {
                    $tab.data("data", val);
                    break;
                }
                case 'ref': {
                    $tab.data("ref", val);
                    break;
                }
            }
            this._fireEvent('tab-prop-change', {tab})
            this.organizeTabs()
        },

        renameTab: function(tab){
            var that = this, o = this.options
            var caption = $(tab).find('.page-control__tab__caption')
            Metro.dialog.create({
                title: `Rename Tab`,
                content: `
                    <form>
                        <input type="text" data-role="input" value="${caption.text()}">
                    </form>
                `,
                actions: [
                    {
                        caption: "Ok",
                        cls: "js-dialog-close info",
                        onclick: function(dlg){
                            that.setupTab(tab, "caption", dlg.find("input").val())
                        }
                    },
                    {
                        caption: "Cancel",
                        cls: "js-dialog-close"
                    }
                ]
            })
        },

        changeAttribute: function(attr, newValue){
        },

        destroy: function(){
            this.component.remove();
        }
    });
}(Metro, m4q));