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

