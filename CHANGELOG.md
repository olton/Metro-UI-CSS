### 4.2.17
+ [x] Tabs: change behavior and attribute. For details, read the docs
+ [x] Table: add second parameter `review` to methods `reload` and `loadData`. If `true`, table view will be recreated from init values.
+ [x] Table: add head parameter `show`
+ [x] Input: add attribute `data-default-value="..."` for set default if val is empty and set to this when click clear button
+ [x] Table: add class `.subcompact` to pair to `.compact`
+ [x] Table: add attribute `data-cell-wrapper`. This class add wrapper to cell data with `no wrap` and `no overflow` props.
+ [x] Sidebar: add classes `.compact` and `.subcompact`

### 4.2.16
+ [x] Export: add object `Metro.export`. Now you can export any HTML `tables` to `CSV` with method `Metro.export.tableToCSV(table, filename)`
+ [x] Utils: add function `copy(el)` for copying element to clipboard
+ [x] Utils: add function `bool(val)`. This func return true if value one of: `true`, `'true'`, `1`, `'1'`, `'on'`, `'yes'`
+ [x] Table: fix show cell if stored value `show` for view have string type `'true'` or `'false'` 
+ [x] Table: add second parameter `heads` for custom filter function
+ [x] Table: change padding and font-size for `compact` class
+ [x] Table: fix post method for save table view. Inspector post `{id: table_id, view: table_view}` 
+ [x] Table: add method `export(to, mode, filename, export_options)`. Argument `to` currently must value `CSV`. Argument mode: `all`, `checked`, `view`, `all-filtered`
+ [x] Table: add method `resetView(save)` reset table view to default
+ [x] Table: add method `getView()` return current view object
+ [x] Table: add method `getHeads()` return table internal heads
+ [x] Table: add method `clearSelected(redraw)`. This method uncheck rows and redraw table if your need
+ [x] Dialog: add attributes `data-to-top='true|false'`, `data-to-bottom='true|false'` for sticky dialog to top or bottom side.
+ [x] List: fix for issue ##1155 for IE11

### 4.2.15
+ [x] Switch: fix works with collapse. issue #1148 
+ [x] Input, Select, Textarea, File: add `data-append` attribute 
+ [x] TreeView: fix node toggle marker position
+ [x] TreeView: fix checks nodes for tree options when inputs checked by default
+ [x] String: add extension `toDate(mask)`
+ [x] Media players: fix info box position
+ [x] Utils: add function `nearest(val, prec, down)` for search for the nearest integer, a multiple of required
+ [x] Select: fix trigger error for empty value. issue #1138 
+ [x] Time picker: add `steps` attributes `data-hours-step`, `data-minutes-step`, `data-seconds-step`. issue #1122  
+ [x] Time picker: fix sliders position when picker placed top or bottom of parent
+ [x] Input file: fix only shows the first file name for multiple option. issue #1140
+ [x] Calendar picker: add observing attributes `data-min-date`, `data-max-date`
+ [x] Input: remove webkit default clear button for `type=time`
+ [x] Table: fix create internal heads when header defining in html and data loaded from json 
+ [x] Table: add attribute `data-filter-min-length` for number of symbols inputs and start searching
+ [x] Table: add column rownum. This column shows when attribute `data-rownum="true"`
+ [x] Table: add column row check. This column shows when attribute `data-check="true"`
+ [x] Table: add column row radio. This column shows when attribute `data-check-type="radio"`
+ [x] Table: add attribute `data-check-store-key="..."` used for store selected rows in the storage
+ [x] Table: add attribute `data-view-save-mode="client|server"` used for store table view
+ [x] Table: add attribute `data-view-save-path="storage_key|url"` used for store table view
+ [x] Table: add `data-locale` attribute
+ [x] Table: add table inspector to configure columns view
+ [x] Table: add methods `openInspector(true|false)`, `toggleInspector()` to show/hide table inspector
+ [x] Table: add methods `getFilteredItems()`, `getSelectedItems()`, `getStoredKeys()`
+ [x] Table: add events `onDrawCell`, `onAppendCell`, `onAppendRow`, `onViewSave`, `onViewGet`, `onCheckDraw`

### 4.2.14
+ [x] Table: fix pagination calculator when rows count changed
+ [x] Table: pagination not displayed when rows count is `-1` (show all rows)
+ [x] Table: rename attribute `data-show-all-pages` to `data-pagination-short-mode`

### 4.2.13
+ [x] Windows: fix execute method onCloseClick
+ [x] Table: add classes `compact-{media}` and `normal-{media}` where `{media}` is one of `sm`, `md`, `lg`, `xl`, `xxl`

### 4.2.12
+ [x] Sidebar: remove text decoration underline for menu item
+ [x] Sidebar: add menu item hover
+ [x] Tiles: fix `col-*` and `row-*` classes for tiles grid issue #1133
+ [x] Table: add all rows behavior with `-1` value for `data-rows` and `data-rows-steps`
+ [x] Table: add `data-all-records-title` attribute
+ [x] Sidenav-m3: fix icon position when dropdown issue #1134
+ [x] Table: fix init sortable column
+ [x] Table: remove generating ghost `tr` 

### 4.2.11
+ [x] Table: add setup for the number formatting. Add attributes `data-thousand-separator`, `data-decimal-separator` issue #1129
+ [x] Sorter: add setup for the number formatting. Add attributes `data-thousand-separator`, `data-decimal-separator` issue #1129
+ [x] List: add setup for the number formatting. Add attributes `data-thousand-separator`, `data-decimal-separator` issue #1129
+ [x] Table: fix for the `colspan` option issue #1129
+ [x] Table: fix behavior of attribute `data-cls-column`
+ [x] Tabs: fix error if tag `a` in tab have a `valid formed url` in href attribute

### 4.2.10
+ [x] Hint: fix hiding slider hint with `data-hint-always=true` when showing others hits issue #1126
+ [x] Streamer: change streamer data with attribute `data-data`
+ [x] Date picker: fix sliders position when picker placed top or bottom of parent issue #1107
+ [x] Floating action button: new component 
+ [x] Toast: add classes `.primary`, `.secondary`, `.success`, `.alert`, `.warning`, `.yellow`, `.info`, `.light` 

### 4.2.9
+ [x] Calendar: fix day item height for issue #1112
+ [x] Select: fix method `val` for issue #1116
+ [x] App bar: fix drop down for issue #1114
+ [x] Slider: fix marker position for non displayed slider fro issue #1119
+ [x] Time(date) picker: add classes `.for-top`, `.for-bottom`. Use with attribute `data-cls-picker`
+ [x] Time(date) picker: add action button border

### 4.2.8
+ [x] Sorter: new component
+ [x] Table: new component
+ [x] List: new component
+ [x] Utils: add new methods `isValue`, `isNegative`, `isPositive`, `isZero`, `func`, `between`, `parseMoney`
+ [x] Tiles: upd for issue #1109
+ [x] i18n: add it-IT locale by [milanteo](https://github.com/milanteo)

### 4.2.7
+ [x] Accordion: fix events context to html element
+ [x] Date picker: fix for negative time zone (issue #1084)
+ [x] Date picker: fix events context to html element
+ [x] Extensions: add function `addHours`, `addDays`, `addMonths`, `addYears`  for date object
+ [x] Dialog: now shadow can be on/off with option `data-shadow="true"`
+ [x] Dialog: add `window.resize` controller
+ [x] Info box: add component information boxes width states `default`, `alert`, `warning`, `success` and `info`
+ [x] Sidebar: add component

### 4.2.6
+ [x] Validator: add func `reset` for reset fields state
+ [x] Validator: add func `reset_state` for reset field state
+ [x] Validator: add func `set_valid_state` for valid field state
+ [x] Validator: add func `set_invalid_state` for invalid field state
+ [x] Validator: add auto method `reset` for forms with role `validator`
+ [x] Validator: add option boolean `requiredMode` for form. If this option is `true`, all funcs works as `required`, else funcs works if field value is not empty.

### 4.2.5
+ [x] CSS Utilities: add `cursor` classes in format `.c-{cursor-name}`. Example: `.c-alias`
+ [x] Badge: added class `.badge` to display counting info or small label inside the element
+ [x] Docs: add doc file `badge.html` for `badge` component
+ [x] Docs: add doc file `cursors.html` for `cursors` classes

### 4.2.4
+ [x] Counter: add new component
+ [x] Docs: add docs for `counter` component

### 4.2.3
+ [x] Validator: add `custom` validation
+ [x] Navigation view: issue #1018 sets focus to the input field in suggest-box when user click on the helper
+ [x] Dialog: change `max-width` to `calc(100vw - 100px)` and `max-height` to `calc(100vh - 100px)`

### 4.2.2
+ [x] Window: fix methods `show()`, `hide()` in `Metro.window`
+ [x] Window: add methods `min`, `max` to component and object

### 4.2.1
+ [x] Vertical menu: fix issue #1089 - the sub-menu are out of the view
+ [x] Window: change logic of method `close`
+ [x] Window: add object `Metro.window` with a number of methods 

### 4.2.0
+ [x] Select: add filtering feature.
+ [x] Activity: fix `z-index` for global activity with overlay
+ [x] Activity: add new option `text` for activity overlay
+ [x] Third party: add styles for `datatables` plugin
+ [x] Third party: add styles for `select2` plugin
+ [x] Demo: add demo page for `datatable` plugin 
+ [x] Demo: add demo page for `select2` plugin 

### 4.1.20
+ [x] Animation: add class `.transition`
+ [x] Neb: add type 2 with class `.neb2` and subclasses `.neb-n`, `.neb-s`, `.neb-w`, `.neb-e`
+ [x] Docs: improve docs pages
+ [x] Examples: improve github page example
+ [x] Examples: improve start screen example
+ [x] Activity: add object `Metro.activity` with two methods: `open({...})`, `close(activity)`

### 4.1.19
+ [x] Session storage: fix 

### 4.1.18
+ [x] Wizard: fix issue 1083
+ [x] Shadow utilities: add classes `.no-shadow`, `.no-shadow-text`
+ [x] Session storage: add it. Session storage work as `Metro.storage`
+ [x] Docs: fix side navigation layout 

### 4.1.17
+ [x] Panel: add `.info-panel`
+ [x] Docs: redesign `index` and `sponsors` pages

### 4.1.16
+ [x] Calendar: add observation for `data-special` attribute
+ [x] Calendar picker: add observation for `data-special` attribute
+ [x] Calendar picker: add observation for `data-exclude` attribute
+ [x] Sizing: fix utilities classes calculating `.w-@{s}-@{m}`

### 4.1.15
+ [x] Metro: corrected typos in method names `reinitPlugin` and `reiniPluginAll`
+ [x] Docs: corrected typos in example of `micro template` engine

### 4.1.14
+ [x] Issues: fix #1072 
+ [x] Calendar picker: add events `onMonthChange`, `onYearChange`
+ [x] Calendar: add `special days`
+ [x] Calendar: add attributes `data-show-header`, `data-show-footer`
+ [x] Listview: fix `table` view mode
+ [x] Utils: add method `mediaModes()` - return current medias
+ [x] Utils: add method `inMedia(media)` - return true if `media` is current mode. Ex: `Metro.utils.inMedia('md')`
+ [x] Checkbox: increase size and fix element height to inputs 
+ [x] Radio: increase size and fix element height to inputs 

### 4.1.13
+ [x] Textarea: fix `line-height`

### 4.1.12
+ [x] i18n: add French `fr-FR` locale, thanks to [drill95](https://github.com/drill95)

### 4.1.11
+ [x] Switches: fix shrink for `check` element for `checkbox`, `radio` and `switch`
+ [x] Metro icons font: add loading `ttf` and `svg` font types

### 4.1.10
+ [x] i18n: add `es-MX`, thanks to [rkgarcia](https://github.com/rkgarcia)
+ [x] Inputs: optimize css for `prepend` element
+ [x] Inputs: set height for `input`, `select`, `file` to `36px`
+ [x] App bar: change height to `52px`

### 4.1.9
+ [x] Typography: fix media for `reduce-*`, `enlarge-*`, `text-align`, `vertical-align`
+ [x] Validator: change rule for `domain` function
+ [x] Validator: fix returned value for `Metro.validator.validate()` 

### 4.1.8
+ [x] Master: set `overflow: visible` to element
+ [x] Select: add scroll to active option
+ [x] Scheme builder: add style for select active options
+ [x] Panel: fix `icon` place and size
+ [x] Scheme builder: remove `background-color` and `color` from `.table`
+ [x] Buttons: change height to `36px`
+ [x] Master: fix height of pages container when a window is resized
+ [x] Select: change padding and height for internal drop down list items
+ [x] Input file: fix overflow for very long file name
+ [x] Checkbox: fix `line-height` for long caption  
+ [x] Radio: fix `line-height` for long caption
+ [x] Validator: add validation function  `domain`   

### 4.1.7
+ [x] Display: fix order display classes `d-*` 

### 4.1.6
+ [x] Cube: fix change rules at runtime
+ [x] Cube: add method `toRule(...)` 
+ [x] Lists: add `.custom-list-marker`
+ [x] Lists: return from v3 `.step-list`
+ [x] Typography: add class `.text-underline`
+ [x] Intro: fix docs for meta tags
+ [x] Calendar: fix actions buttons padding
+ [x] Button: change height to `32px`
+ [x] Scheme builder: add `.info-button`, `.image-button`
+ [x] Menu: fix `.t-menu` horizontal dropped down size
+ [x] Color scheme `red-dark`: change secondary background color 

### 4.1.5
+ [x] Colors: add `.bd-transparent` class
+ [x] Buttons: add `.info-button` as Github split button
+ [x] Examples: upd github page for `.info-button`
+ [x] App bar: add class `.app-bar-input` for placing inputs
+ [x] Buttons: add class `.hovered` for default button
+ [x] Tabs: all tabs `anchors` now have flex box model 

### 4.1.4
+ [x] Metro icon fonts: update, 34 new icons

### 4.1.3
+ [x] Images: change `.img-container` display to `block`
+ [x] Streamer: increase sizes and offsets to 20 intervals
+ [x] App bar: flexible model
+ [x] App bar: fix using `.v-menu` in `.app-bar-container`
+ [x] Examples: Github page 
+ [x] Typography: add class `.no-decor`
+ [x] Less: move default icons data-uri to `include/default-icons`

### 4.1.2
+ [x] Select: add method `val()`

### 4.1.1
+ [x] Utils: add method `inObject`
+ [x] Metro.initWidgets: change check rule for defined component
+ [x] Input file: add click on the all elements parts
+ [x] App bar: fix `v-menu` usage
+ [x] Spacing: add `mx-*`, `px-*` classes 
+ [x] Examples: add examples presentation page
+ [x] Examples: add login form example `examples/forms/login.html`

### 4.1.0
+ [x] Side navigation: new component `sidemenu-simple`
+ [x] Button group: new behavior for `one` mode - all unchecked
+ [x] Select: add method `data()` for loading options at `runtime` 
+ [x] Scheme builder: new mixin
+ [x] Schemes: `darcula`, `red-alert`, `red-dark`, `sky-net`
+ [x] Schemes: add documentation.
+ [x] Color: move color classes `bg-*` and `fg-*` to `metro-color.css`
+ [x] Sizing: add classes `.h-vh-*`, `.w-vw-*` (5, 10, 25, 50, 75, 100)
+ [x] Pagination: move to `pagination.less`
+ [x] Breadcrumbs: move to `breadcrumbs.less`
+ [x] Wizard: fix sections height for IE11 and Edge
+ [x] Wizard: add click on complete section to navigate to it
+ [x] Navview: fixed background-color for `.pull-down` and `.holder` for IE11 and Edge 
+ [x] All: fix any minor bugs
+ [x] Examples: Select in runtime `examples/ajax/select.html`
+ [x] Examples: Color module 1 `examples/colors/color-schemes.html`
+ [x] Examples: Color module 2 `examples/colors/color-schemes-2.html`
+ [x] Examples: Color module 3 `examples/colors/color-schemes-3.html`
+ [x] Examples: Cube `examples/cube/cube.html`
+ [x] Examples: Cube custom function `examples/cube/cube-custom-func.html`
+ [x] Examples: Windows `examples/desktop/desktop.html`
+ [x] Examples: Dialogs `examples/dialogs/dialogs.html`
+ [x] Examples: Schemes `examples/schemes/schemes.html`
+ [x] Examples: Tiles `examples/tiles/start.html`

### 4.0.10
+ [x] App bar: fix `.app-bar-menu` dropped down for IE11 and Edge

### 4.0.9
+ [x] Checkbox: refactoring
+ [x] Radio: refactoring
+ [x] Input: fix for IE11 and Edge
+ [x] Ribbon menu: fix for IE11 and Edge
+ [x] ListView: fix for IE11
+ [x] TreeView: fix for IE11 Edge for checkboxes
+ [x] Subsystem: add method `Object.values` special for IE11

### 4.0.8
+ [x] Ribbon menu: fix it for button group

### 4.0.7
+ [x] Button group: fix it

### 4.0.6
+ [x] Dialog: fix method `Metro.dialog.toggle()`
+ [x] Notify: increase `z-index` for default container
+ [x] Window: add observing `data-cls-window` attribute
+ [x] Window: fix observing `data-cls-caption` and `data-cls-content` attribute
+ [x] Window: add method `show()` - this method add class `no-visible` to `window`
+ [x] Window: add method `hide()` - this method remove class `no-visible` from `window`
+ [x] Window: upd documentation

### 4.0.5
+ [x] Tiles: add `.tiles-group` class with sizes subclasses
+ [x] Metro: add methods `reinitPlugin`, `reinitPluginAll`

### 4.0.4
+ [x] Charms: remove `preventDefault` from click event
+ [x] Nuget: change target location for Metro 4
+ [x] Validator: add `radio` and `select` to validation
+ [x] Validator: add function `not`

### 4.0.3
+ [x] Validator: rename event `onValid` to `onValidate`
+ [x] Validator: add events `onErrorForm`, `onValidateForm`
+ [x] Validator: added `checkbox` validation (required function)

### 4.0.2
+ [x] Validator: change rules delimiter to `space` 

### 4.0.1
+ [x] Pickers: fix buttons behavior

### 4.0.0
Release

