# Changelog 

## 3.0.12
* add color schemes for calendar
* fix calendar min, max date
* init clock plugin
* fix bug in calendar after merge PR 785

## 3.0.11
* add keypad onChange event
* chg progressBar animation model
* fix box sizing for FF
* chg progressBar role to progress and progress method to set
* chg tabControl role to tabcontrol
* add option for auto open dialog
* fix important bug for multi role defining  
* add draggable plugin
* upd dialog for creating wizards in
* upd calendar with pull request [785](https://github.com/olton/Metro-UI-CSS/pull/785)

## 3.0.10
* fix modern input initialize with value
* remove alert for check select2 plugin exists
* add public methods slideTo, nextSlide, priorSlide for carousel
* fix carousel method slideToSlide if next index eq current 
* add rtl support for input controls
* add input range
* add new preloaders
* fix slider value method if target is defined

## 3.0.9
* add hotkeys binding
* fix fluent-menu initialize

## 3.0.8
* upd font declaration add sans-serif
* add responsive for sidebar
* add tile factor 1.25 for devices with width <= 800px
* add hint timeout
* add hint time delay
* add hotkeys plugin by [John Resig](https://github.com/jeresig)
* add noConflict support
* init RTL support (partial)
* move all media to standalone file metro-responsive
* add support for [RequireJS](http://forum.metroui.org.ua/viewtopic.php?pid=614#p614)
* add charm widget
* add fluent menu 
* add color schemes module metro-schemes
* add color schemes for app-bar
* add color schemes for v-menu
* add color schemes for d-menu
* add color schemes for t-menu
* add color schemes for sidebar
* fix min width for sidebar2 item
* add rotate dropdown-toggle marker
* add onclick event and touch for tile plugin
* upd touch support for slider
* upd event binding model for widgets [Event binding](http://metroui.org.ua/events.html)

## 3.0.7
* add padding for container on mobile devices
* add handler for fitImage for window resize
* remove important from app-bar
* add darcula scheme for app-bar
* add [Animations](http://metroui.org.ua/animations.html), thx to [Meneses Evandro](https://github.com/MenesesEvandro)
* add [Metro Icon Font Animations](http://metroui.org.ua/font.html), thx to [Meneses Evandro](https://github.com/MenesesEvandro)
* add colored bullets for lists
* add new color classes to set color for before and after
* add flex-grid
* add f-menu (flex)
* add full-size (100%) for odd last cells in grid 
* add template admin panel with sidebar
* add offset for cells for grid (default and condensed)

## 3.0.6
* add support user defined onsubmit for validator over data-on-submit attribute
* add light color for nav-button
* remove outline for nav-button
* fix square(round, cycle)-button sizes
* change calendar min-width to 220px or 13.75rem
* fix class collapsed for treeview leaf
* add states for select2
* upd Metro Icon Fonts (added new 33 icons)
* fix static rating
* remove min-width for input
* add states for table rows

## 3.0.5
* fix triggering for input when clear button clicked
* fix panel heading style bug
* New widget [Validator](http://metroui.org.ua/validator.html)
* fix dropdown.js pull-request 768
* fix full size for modern input
* carousel: Added duration based timeout to next/prev event 
* upd tabcontrol docs
* fix drop shadow for menu for ie9
* fix appbar dropdown toggle for ie
* upd treeview for value for check and radio
 
## 3.0.4
* New widget [Keypad](http://metroui.org.ua/keypad.html)
* fixed float for dataTables
* return from v2 breadcrumbs type
* add maxDate for calendar widget
* fixed set value method for rating
* upd demo for rating
* upd calendar, add pre-stored days
* upd datepicker for pre-stored days
* add flexible to appbar by [Daniel Milbrandt](http://xiphe.com)

## 3.0.3
* New widget [Presenter](http://metroui.org.ua/presenter.html)
* Datepicker - Triggered change event when date is changed. [#761](https://github.com/olton/Metro-UI-CSS/pull/761)
* upd demo for table
* upd demo for menus
* fix small bugs

## 3.0.2
* Optimize important use
* Alignment version for bower and nuget

## 3.0.1
* Create package for Nuget

## 3.0.0
* Stop version 2.x and Start Metro UI CSS v3
* Register package for Bower