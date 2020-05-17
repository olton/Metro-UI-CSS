### 4.3.7
#### M4Q
+ [x] Animation: a new engine for animation. The `animate` function changed. Now function receives one argument. Also, you can use old syntax :)
+ [x] Init: fix minor bug for creating elements in context
+ [x] Ajax: add parameter `contentType`. If this param has value `false`, `Content-type` can't be defined.
+ [x] Contains: add checks with `:visible` to method `is`. Example: `$(...).is(':visible')`
+ [x] Utils: add methods `$.random(array | a, b)`, `$.getUnit(a)`, `$.strip(where, what)`, `$.hasProp(obj, prop)`, `$.dashedName(val)` 
+ [x] Classes: add method `$(...).removeClassBy(mask)`

#### Metro 4
+ [x] Source: reposition source code
+ [x] Builder: new builder config, and new builder version `2020.1`. New version not compatibility with 4.3.6
+ [x] Input: fix append size and padding, issue #1512
+ [x] Ripple: added ripple call for any element, issue #1515
+ [x] Splitter: added event `onResizeWindow`. Setup this event with prop `data-on-resize-window` or event `$(...).on('resizewindow', ...)`, issue #1516
+ [x] Table: add `skip to page` functionality, issue #1511
+ [x] Table: add attributes `data-show-skip`, `data-table-skip-title`, `data-skip-wrapper`, `data-cls-table-skip`, `data-cls-table-skip-input`, `data-cls-table-skip-button`
+ [x] Table: add event `data-on-skip`
+ [x] Common css: optimize `lists`, `reset`
+ [x] UtilsJS: improve `isFloat` function, issue #1518
+ [x] Icons: add `whatsapp` icon, issue #1510 
+ [x] AudioButton: add new component for the button with role `audio-button`
+ [x] Select: fix `prepend`, `append` for `input-small`, `input-large`. With `multiple`, `append` and `prepend` will not displayed.
+ [x] Input: fix `prepend`, `append` for `input-small`, `input-large`. Issue #1522
+ [x] Counter: fix start if element already in viewport
+ [x] CSS: added `metro-reset.css`, `metro-common.css`, `metro-components.css` as standalone.
+ [x] Image magnifier: fix glass image when user resize original image
+ [x] Notifies: minor improve notify create method 
+ [x] Donut: update for using new `animate` function to draw `stroke-dasharray`
+ [x] Counter: update for using new `animate` function to draw
+ [x] File: fix clear when user fire `reset` on form in `drop` mode, issue #1524
+ [x] Adblock: a new component for hunting on the ads blockers 
+ [x] Core: refactoring for new component definition
+ [x] Audio: rename component to `audio-player`
+ [x] Video: rename component to `video-player`
+ [x] Calendar: minor upd for action buttons
+ [x] i18n: refactoring definition. Now each lang defined in own file
+ [x] Third party: third party components styles `select2`, `datatables` move to components and include to main
+ [x] Container: remove prop `display: block`
+ [x] Select: add using empty value for `option`, issue #1527
+ [x] Action button: fix sub actions position 
+ [x] Additional colors: refactoring
+ [x] Utils: remove method `random`, to get random value from an array or two values, use `$.random(array | a, b)` from `m4q`
+ [x] Utils: remove method `uniqueID`, to get unique GUID, use `$.uniqueID(prefix)` from `m4q`
+ [x] Utils: remove method `formData`, to get form data as array, use `$.serializeToArray(form)` from `m4q` and `$.serialize(form)` to get stringify value with `&` divider
+ [x] Utils: remove method `strToArray`, to transform string to array, use String.prototype method `String.prototype.toArray(delimiter, type, format)`
+ [x] Utils: remove method `callback`, execute function or code, use method `Utils.exec(fn, args, context)`
+ [x] Sidebar: add attribute `data-menu-scrollbar="true|false"`. Attribute enable or disable scrollbar in the sidebar menu, issue #1528
+ [x] Tag: new component. Used in `tag-input`, `select`, can be used as standalone.
+ [x] Ribbon menu: fix sizes and positions for `ribbon-icon-button`, `ribbon-tool-button` 
+ [x] Menus: removed `text-decoration` for anchors (`a`) inside any types of menus
+ [x] Cookie: new class for cookie manipulation `Metro.cookie`. Contains methods: `setCookie()`, `getCookie()`, `delCookie()` 
+ [x] Cookie disclaimer: new component for accept cookies for GDPR, and not only, issue #1530
+ [x] Metro icon font: add 65 new icons `cross-light`, `document-file-*` (64)
+ [x] Select: improved performance for creating options, issue #1534
+ [x] Select: remove dependency from `d-menu`
+ [x] Navview: add scrollable to `navview-menu` in `compacted` mode

### 4.3.6
##### M4Q
+ [x] M4Q: upd to `1.0.6`
+ [x] M4Q Init: fix minor bug for creating elements in context
+ [x] M4Q Ajax: add parameter `contentType`. If this param has value `false`, `Content-type` can't be defined.

##### Metro 4
+ [x] ColorJS: fix functions `RGB`, `RGBA`
+ [x] Select: add focus state, issue #1488
+ [x] Checkbox: add focus state
+ [x] Radio: add focus state
+ [x] Select: add attribute `data-cls-drop-container`
+ [x] Dropdown: add `important` to `.drop-left`, `.drop-right`, `.drop-up` classes
+ [x] Table: add support `formatMask` for fields defined in table head `thead`
+ [x] ResetCSS: remove duplicate declarations
+ [x] Toast: add global setup. Related to issue #1493
+ [x] Streamer: now you can set event time up to a minute
+ [x] Streamer: now you can use for event size `half` and `one-third` constants
+ [x] Streamer: add events `onDrawEvent`, `onDrawGlobalEvent`, `onDrawStream` 
+ [x] TreeView: fix attribute `data-show-child-count`
+ [x] CalendarPicker: add attribute `data-value` to set init input value, issue #1506
+ [x] Streamer: `data-wheel` now true by default
+ [x] Streamer: add attribute `data-wheel-step` to define scroll step for horizontal scrolling with mouse
+ [x] Streamer: fix horizontal scrolling with mouse. 

### 4.3.5
##### M4Q
+ [x] M4Q: upd to `1.0.5`
+ [x] M4Q Events: fix firing events, Metro 4 issue #1476
+ [x] M4Q Events: optimize method `trigger`, now this is a synonym of `fire`

##### Metro 4
+ [x] Tag input: change `trigger` defining 
+ [x] Tag input: add `clear button` with attributes `clearButton`, `clsClearButton`, `clearButtonIcon`  
+ [x] Tag input: add attributes `clsComponent`, `clsInput`  
+ [x] Tag input: add event `onClear`  
+ [x] List: add attribute `data-sort-initial` to sorts on create component, issue #1475
+ [x] Tag input: add attribute `data-static` and static mode for `data-static='true'` or if present attribute `readonly`
+ [x] Tag input: add method `toggleStatic([true|false])`
+ [x] Select: fix clearing `select-input`, issue #1477
+ [x] Calendar picker: fix closing calendar when user click on overlay, issue #1478
+ [x] Select: fix styles for `input-large`, `input-small` classes
+ [x] Tag input: change `keyup` to `keydown` for tag trigger event
+ [x] Tag input: add event `onTagTrigger`  
+ [x] Tag input: add removing last tag on current value is empty end user press `Backspace`, you can disable it with attribute `data-backspace='false'`
+ [x] Draggable: add attribute `data-timeout` for set timeout before creating component
+ [x] Components: creating components can be deferred with attribute `data-[componentName]-deferred=[ms]`. Example: `<div data-role='draggable' data-draggable-deferred='2000'>...</div>`
+ [x] Counter: add attribute `data-start-on-viewport`. If attribute value is `true`, counter started after element showed in viewport. You can combine this with `data-timeout`
+ [x] Select: fix bug with `data-filter='false'` 
+ [x] File: fix method `clear` for mode `dropzone`
+ [x] Select: add mode `button`

### 4.3.4
##### M4Q
+ [x] M4Q: upd to `1.0.4`
+ [x] M4Q Manipulation: optimise `append`, `prepend` to one definition for IE
+ [x] M4Q Script: add `$.script`, `$.fn.script` to execute scripts from element or create script object
+ [x] M4Q Manipulation: `$.fn.append`, `$.fn.prepend` now support script tag processing
+ [x] M4Q Clone: now support cloning `data` if second argument `withData`is `true` - `$(el).clone(true, true)`
+ [x] M4Q Events: now you can define event name with `hyphen` or in `camelCase` notation. Example: `mouse-down`, `accordionCreate`
+ [x] M4Q Ajax: fix handler for sending data
+ [x] M4Q Ajax: fix `$.json` if returned value can't be parsed
+ [x] M4Q Ajax: fix `post` for `object`
+ [x] $: add $.serializeToArray(form), $serialize(form)
+ [x] M4Q Events: fixed `removeEventListener`

##### Metro 4
+ [x] Animations: put animations to separate less/css file `metro-animations`
+ [x] Object animations: add `.flip-card`
+ [x] Object animations: add `.post-card`
+ [x] Inputs: change placeholder `font-size` to `14px`, add `text-ellipsis`
+ [x] Utils CSS: add class `.stop-pointer`
+ [x] Role naming: you can now use a hyphen to separate words in verbose component names for the data-role attribute. Example: `data-role='button-group''` and `data-role='buttongroup''` are equivalent.
+ [x] Drag Items: add new component, issue #1336
+ [x] Table: fix `viewPath` for getting `view` from server
+ [x] Table: fix colspan for message `emptyTableTitle`
+ [x] Checkbox: add using attribute `readonly`
+ [x] Switch: add using attribute `readonly`
+ [x] Table: fix `viewPath` for saving `view` on server
+ [x] Animation CSS: relocation
+ [x] AppBar: fix `app-bar-menu` behavior when user resize a window
+ [x] Slider: fix hint for IE11
+ [x] Window: fix interop m4q and jquery for `Metro.window.create()`
+ [x] Splitter: fix for IE11
+ [x] AppBar: add events `onMenuOpen`, `onMenuClose`, `onMenuExpand`, `onMenuCollapse`

### 4.3.3
+ [x] m4q: upd to 1.0.3
+ [x] Toast: fix calculating toast position
+ [x] Progress: fix global setup function name
+ [x] Progress: percent value. To show set attribute `data-show-value="true"`, `data-value-position="free|center"`
+ [x] Progress: add label. Use attributes `data-show-label="true|false"`, `data-label-position="before|after"`, `data-label-template="Value is %VAL%"`
+ [x] InfoBox: fix interop with Metro 4 and jQuery
+ [x] Table: add method `clear()`, issue #1426 
+ [x] Table: fix cell data wrapping with attribute `data-cell-wrapper="true"`
+ [x] File: fix Input file inconsistent display when user cancel the choose dialog, issue #1443
+ [x] Slider: fix using accuracy with  decimal value, issue #1447  
+ [x] Calendar Picker: add attribute `data-show-week-number`
+ [x] Gravatar: fix global setup method name
+ [x] Activity: fix method `open` for undefined options
+ [x] Activity: fix interop with Metro 4 and jQuery
+ [x] Dialog: fix interop with Metro 4 and jQuery for dialog create method
+ [x] AppBar: set `max-height` for `app-bar-menu` opened with `hamburger` to visible viewport
+ [x] Buttons: refactoring - split to separate components from one file
+ [x] Calendar Picker: fix dialog mode, issue #1450
+ [x] Common CSS: add class `-disabled`
+ [x] General: Now `Metro4` init after content was loaded. If you need to switch to old init method, use `metro4:init:mode` with value `immediate`
+ [x] Double Slider: add new component, issue #1441  
+ [x] InfoButton: fix position and `display` change from `inline-flex` to `inline-block`, issue #1451
+ [x] M4Q Events: improve method `on`
+ [x] Select: fix for ie11, issue #1452
+ [x] ListView: add callback for `onNodeDblClick` event, issue #1453
+ [x] Table: add show activity when data loaded
+ [x] Table: you can set data with JS object and attribute `data-source`. Value for attribute must be a object name.

### 4.3.2
+ [x] Slider: fix vertical slider marker position when slider is not visible, thx to [thinkcpu](https://github.com/thinkcpu), PR #1417
+ [x] Slider: improve events
+ [x] HotKey: extended anchor work with `data-hotkey` and attr `href`, issue #1420  
+ [x] M4Q Events:  fix `function.name` property for IE11, issue #1425
+ [x] Table: add methods `addItem([...], redraw)`, `addItems([...], redraw)`, issue #1426
+ [x] Select: attribute `data-cls-drop-list` now override default class `d-menu` if defined
+ [x] Lists: if list has class attribute, it resets with `margin: 0; padding: 0; list-style: none inside;` 
+ [x] Select: if option not has value, used option text for value
+ [x] Table: add event `onDataSaveError`
+ [x] Table: fix save view to server
+ [x] M4Q Ajax: fix creating additional headers for request, issue #1427
+ [x] Init: add meta tag `metro4:init:mode`. The value must be `immediate` or `contentloaded`, default - `immediate`. If value is `contentloaded` and meta tag `metro4:init` not equal  `false`, Metro 4 will be initiate after the content was loaded.
+ [x] Table: now you can define `decimalSeparator` and `thousandSeparator` in table head and global
+ [x] Table: add attributes `data-head` (object name, define table header), `data-body` (object name, define table data)
+ [x] Table: add attribute `data-static`. If `true`, search, pagination, info, rows count will be disabled and will not showing.
+ [x] Splitter: add method `size(str)` for change panel sizes at runtime, add observing for attribute `data-split-sizes` for change panel sizes at runtime
+ [x] Carousel: improve slide switching 
+ [x] TreeView: add trigger `change` for checkboxes
+ [x] Common: fix `h-auto-*`

### 4.3.1
+ [x] Interop: fix interop with Metro4 and jQuery, issue #1408
+ [x] m4q: upd to 1.0.1
+ [x] m4q: fix initialization when `metro4` added into `head`
+ [x] Init: fix issue #1409
+ [x] Dropdown: fix interop between Metro4 and jQuery, issue #1411
+ [x] Select: fix interop between Metro4 and jQuery, issue #1412
+ [x] Panel: fix interop between Metro4 and jQuery
+ [x] Windows: fix interop between Metro4 and jQuery
+ [x] VideoPlayer: fix interop between Metro4 and jQuery
+ [x] AudioPlayer: fix interop between Metro4 and jQuery
+ [x] Hotkey: fix interop between Metro4 and jQuery
+ [x] TimePicker: fix interop between Metro4 and jQuery
+ [x] SideBar: fix interop between Metro4 and jQuery
+ [x] Charms: fix interop between Metro4 and jQuery
+ [x] Select: fix close when user click document and jQuery used
+ [x] CalendarPicker: fix interop between Metro4 and jQuery, fix close when `next[Year, Month]` clicked
+ [x] Select: add works with disabled option. You can add attr `disabled` to option to create disabled option, issue #1413
+ [x] Window: fix toggle draggable, resizeable
+ [x] Tile: fix tile width in then `tiles-grid` when tile placed in specific column
+ [x] Metro: fix observing attributes

### 4.3.0
+ [x] jQuery: Goodbye!!!
+ [x] M4Q: now built in for DOM manipulation and animation
+ [x] Keypad: rename property `data-length` to `data-key-length`
+ [x] Slider: fix show/hide hint 
+ [x] Typo: fix `margin-top` for lists inside a lists, ex: `ul > ul` 
+ [x] Animation: fix `fadeIn`, `fadeOut`
+ [x] NavView: rename attribute `data-expanded` to `data-expand`
+ [x] Examples: upd `start screen`
+ [x] Calendar picker: fix using locale for initial value, issue #1376
+ [x] Typo: set line-height for paragraph to 1.5
+ [x] Table: fire event onDataLoaded before table build
+ [x] Dialog: fix hide method
+ [x] File: add method "clear"
+ [x] Source: structure refactoring
+ [x] Typography: add background to `remark` with `accent` color 
+ [x] Tests: begin tests with `cypress`
+ [x] Draggable: minor improve for `mouseMove` 
+ [x] Chat: add attribute `data-readonly` and method `toggleReadonly`
+ [x] Schemes: fix colors for table `tfoot`
+ [x] Add `checkRuntime` to components
+ [x] Table: add attributes `data-empty-table-title`, `data-cls-empty-table-title` for issue #1403
+ [x] Table: fix padding for sortable columns
+ [x] Add `destroy` method to components. This method remove all event handlers and return core element
+ [x] Select: add props `data-add-empty-value` (default: false), `data-empty-value` (default: empty string)
+ [x] Select: add prop `data-placeholder`
+ [x] Select: add prop `data-clear-button` (default: false)
+ [x] Grid: optimise styles
+ [x] Hint: fix remove on leave element
+ [x] TreeView: add attribute `data-show-child-count`

### 4.2.49
+ [x] Select: extended to interop with role=dropdown
+ [x] Docs: upd docs for cards, add `icon-box`, `more-info-box`, `skill-box`, `social-box`
+ [x] Sidebar: fix setup global function name
+ [x] Textarea: fix issue #1400
+ [x] MaterialTabs: fix issue #1402 
+ [x] MaterialTabs: add method `open(tab_num)` for issue #1399
+ [x] Select: fix input autofocus when dropdown
+ [x] Textarea: fix resize when component was created
+ [x] File: fix firing `change` event on Safari

### 4.2.48
+ [x] Select: fix error when using with pair to Select from Metro 4 for React
+ [x] Carousel: moved style props for slide background image from js to css
+ [x] Input: add attribute `data-exclaim` for defining exclamation symbol
+ [x] Input: fix no display clear button when input is readOnly 
+ [x] Textarea: fix no display clear button when input is readOnly 
 
### 4.2.47
+ [x] Input: fix triggering `change` event, add trigger event `clear` when clear button is pressed
+ [x] Accordion: fixed glitch for frames who must be closed, but initiated as open 

### 4.2.46
+ [x] Table: fixed format value for sorting when value is empty, null or undefined
+ [x] Dropdown: fix set open on init
+ [x] DatePicker: add observation for attribute `data-locale` 
+ [x] DatePicker: add observation for attribute `data-format`
+ [x] Utils: upd func `isLocalhost`
+ [x] Windows: fix make runtime   
+ [x] Dialog: fix make runtime   
+ [x] InfoBox: fix make runtime
+ [x] Validator: fix validating for `integer` and `float` rules, issue #1388 
+ [x] Builder: fix builder `config`  
+ [x] Embed objects: set default width and height to `100%`

### 4.2.45
+ [x] Calendar picker: fix initial value for i18n
+ [x] Typography: set `line-height: 1.5` for `p` 
+ [x] Examples: fix desktop demo
+ [x] Examples: fix start screen demo
+ [x] Notify system: fix minor bug for creating notify after setup

### 4.2.44
+ [x] Calendar: fix methods `setMaxDate`, `setMinDate`, issue #1374
+ [x] Datepicker: fix offset for timezones, issue #1372
+ [x] Datepicker: fix `val()` method 

### 4.2.43
+ [x] Inputs: add class `.input-small` for using with `input`, `select`, `spinner`, `tag-input`, `keypad`, `file` , issue #1245
+ [x] Events: upd docs for subscribing events with `$.on` and `addEventListener()`
+ [x] Panel: new method `customButtons()` for add custom buttons at runtime
+ [x] Table: add `margin-top: 1rem` for class `.table`
+ [x] Lists: add `margin-top: 1rem` for `ul`, `ol`, `dl`
+ [x] Hotkey: full refactoring
+ [x] Datepicker: add attribute `data-input-format`
+ [x] Datepicker: fix hours timezone offset
+ [x] Datepicker: now you can use attribute `value` to setup component date
+ [x] Pickers: change default scroll speed factor to `4` 
+ [x] Window: fix methods `setContent`, `setTitle`, `setIcon`, `changePlace`
+ [x] Utils: rename method `isJQueryObject` to `isJQuery`
+ [x] Utils: add methods `isM4Q`, `isQ`. Method `isQ` return one of `isJQuery` or `isM4Q`
+ [x] Streamer: fix scrolling with `apple magic mouse` and `firefox`
+ [x] Streamer: fix scroll position for `events-area` when source changed
+ [x] TreeView: fix confused calls `expandNode` and `collapseNode` events
+ [x] Dialog: add attribute `data-actions` for predefined dialog
+ [x] DatePicker: fix scroll event handler
+ [x] TimePicker: fix scroll event handler
+ [x] Tabs material: add event `data-on-tabs-scroll`
+ [x] ScrollEvents: plugin for `scrollStart`, `scrollStop` events was removed
+ [x] Mousewheel: plugin was removed
 
### 4.2.42
+ [x] General: improved components initialization
+ [x] Hotkeys: now you can add or change `hotkey` at runtime
+ [x] Select: fix cyclic error when `Uncaught ReferenceError: function is not defined` for `onchange` event
+ [x] Card: add class `flex-card` to create card in flex model
+ [x] ListView: fix works methods with jQuery object and\or HTMLElement
+ [x] Streamer: add event `data-on-events-scroll` 
+ [x] Streamer: fix method `source` 
+ [x] Streamer: rename method `data` to `dataSet` 
+ [x] TreeView: fix methods for add nodes, issue #1150

### 4.2.41
+ [x] List: add event `data-on-data-load-error`
+ [x] List: add item template with property `template`
+ [x] Table: add item template with property `template` and value wrapper `this.cellValue`
+ [x] Pagination: add function `Metro.pagination`
+ [x] Templates: now you can change `begin` and `end` template symbols with third argument `{beginToken, endToken}`
+ [x] Html container: add attributes `data-method`, `data-request-data`
+ [x] Html container: change name of events to `data-on-html-load`, `data-on-html-load-fail`, `data-on-html-load-done`
+ [x] Typography: change `line-height` for `p`, `.text-leader`, `.text-leader2` to `1.2` 
+ [x] Charm: add event `data-on-toggle`.
+ [x] Chat: fix error for time manipulation, issue #1355
+ [x] Master: add events `data-on-next-page`, `data-on-prev-page`
+ [x] Events extensions: Now you can subscribe to all table events with `$.on()` or `addEventListener()`
+ [x] Wizard: add events `data-on-next-page`, `data-on-prev-page`, `data-on-first-page`, `data-on-last-page`, `data-on-finish-page`
+ [x] Global setup: add using global object `metro{ComponentName}Setup` to set up all components on the page with own global options set.
+ [x] Resizable: fix toggle `canResize` property   
+ [x] Calendar picker: fix width for calendar wide
+ [x] Slider: change events to `startAll`, `moveAll`, `stopAll`
+ [x] Streamer: add events `data-on-data-load`, `data-on-data-loaded`, `data-on-data-load-error` 
+ [x] Streamer: fix methods `changeSource`, `changeData`
+ [x] Streamer: add property `row` for event
+ [x] Streamer: add property `html` for event with custom html

### 4.2.40
+ [x] Chat: new component
+ [x] Boxes: add new boxes `skill-box`, `social-box`, `more-info-box`
+ [x] NavView: add behavior for show submenu on left from main menu for compacted mode
+ [x] Cards: add default background color `white`
+ [x] Cards: fix flex model for image header
+ [x] Colors: change `op-*` alpha value from `0.7` to `0.1`
+ [x] Dropdown: if element has class `open`, it will be open after initialization
+ [x] Show metro4 about in console: added meta parameter `metro4:about`. Thanks to [Ken Kitay](https://github.com/kens-code)
+ [x] Metro4 Events: added constants `Metro.events.startAll`, `Metro.events.stopAll`, `Metro.events.moveAll`. Constants contains both mouse and touch.
+ [x] Clock: upd component, PR #1341, Thanks to [Ken Kitay](https://github.com/kens-code)
+ [x] Sidenav simple: optimize css
+ [x] Sidenav counter: optimize css
+ [x] File: call trigger `change` when user drop files into drop area
+ [x] Form: Add default styling for `input[type=submit]`, `input[type=reset]`, `input[type=button]`.   
+ [x] Rating: add half value for static with attribute `data-half="true"`
+ [x] Headlines: add `margin-top` to `display*`, `h1-h5` and `.h1-.h5`
+ [x] Panel: add `text-ellipsis` to `caption`
+ [x] Table: add methods: `updateItem(key, field, value)`, `getIndex()`, `rebuildIndex()`, `getItem(key)`
+ [x] Table: store item data in row. Now you can use `tr.data('original')` to get table row original data
+ [x] Table: store cell data in cell. Now you can use `td.data('original')` to get cell original data
+ [x] Table: fix incorrect work service radio buttons
+ [x] Select: remove `margin-bottom`
+ [x] Blockquote: rename class `place-right` to `right-side` for right side quote
+ [x] Lists: fix list style position for ordered list
+ [x] Dropdown: add service class `stay-open`. When an element has this class, an element can't be closed when the user clicks on the document.
+ [x] Collapse: change default animation duration to `100ms`
+ [x] Tiles: set cover default position to `center center`
+ [x] Tiles: add attribute for image slide `data-cover-position`
+ [x] Timepicker: set default value for `data-scroll-speed` to `1`
+ [x] Datepicker: set default value for `data-scroll-speed` to `1`
+ [x] Countdown: change behavior when browser tab lost focus or invisible
+ [x] Countdown: fix zoom effect
+ [x] Countdown: fix minor bug when first tick (not critical)
+ [x] Dialog: change padding for dialog title to `12px 24px`
+ [x] Dialog: add predefined accent classes `primary`, `alert`, `info`, `warning`, ...
+ [x] InfoBox: add predefined accent classes `primary`, `alert`, `info`, `warning`, ...
+ [x] Elements colors: optimize less for using `each` function
+ [x] Additional colors: optimize less for using `each` function
+ [x] Element: add class `.accent-block` for using with accent colors classes `primary`, `alert`, `info`, `warning`, ...
+ [x] Dialog: add close button to top left corner with attribute `data-close-button`
+ [x] Video: fix show/hide controls when mouse enter leave
+ [x] Video: fix show controls in full screen mode with attribute `data-full-screen-mode="desktop"`
+ [x] Draggable: fix minor bug for draggable windows
+ [x] Sidenav M3: fix item height with text overflow
+ [x] Sidenav M3: remove floating for `d-menu`
+ [x] Dropdown: add attribute `data-drop-filter`. Filtering elements on closing.
+ [x] Select: Opening a select now closes only other selects.
+ [x] Accordion: add drop marker. Marker can disabled with attribute `data-show-marker="false"`
+ [x] Accordion: fix frames open on accordion init

### 4.2.39
+ [x] NavView: minor improve styling 
+ [x] NavView: add method `pullClick()` for emulate pull button click at runtime 
+ [x] NavView: add class `.focusableItems` to add focus state for items
+ [x] NavView: add attribute `data-active-state="true|false"` to add active state for menu items
+ [x] NavView: add `.badges` container for menu item for collect menu item badges
+ [x] NavView: add `.data-box` container for navigation view pane
+ [x] IconBox: new css component
+ [x] Panel: fix draggable
+ [x] Panel: add custom buttons to panel title
+ [x] Table: fix assign classes from attribute `data-cls-head-cell`
+ [x] Breadcrumbs: add `.breadcrumb-item` class
+ [x] Draggable: fix recreate element content when drag started
+ [x] Table: fix implements custom class to custom wrappers (search, pagination, ...), issue #1335
+ [x] Select: fix error for validating required func for select with `multiple` option, issue #1338
+ [x] Select: for validating added functions `length`, `minlength`, `maxlength` for select with `multiple` option 

### 4.2.38
+ [x] ListView: add class `.vertical-layout` for `icons-*` view mode
+ [x] Windows: partial fixed behavior window when user click on min, max button in min, max state, issue #1331 
+ [x] TreeView: fix wrong works node collapse, expand, issue #1332
+ [x] NavView: fix calc main menu height 

### 4.2.37
+ [x] Input material: fix error when creating element, issue #1318
+ [x] Calendar: fix `justify-content` for `days-row`
+ [x] Table: fix minor bug for sortable column click event
+ [x] Table: fix minor bug when inspector dragged
+ [x] Window: fix creating window with empty title
+ [x] Utils: fix method `keyInObject`
+ [x] Utils: fix constant for `keypress
+ [x] Table: fix firing `onSearch` for clearing search field
+ [x] TreeView: fix method `toggleNode`, pr #1326
+ [x] Step list: fix index position when `index > 9`, issue #1328
+ [x] Lists: add `group-list horizontal`

### 4.2.36
+ [x] Window: fix system button click behavior when draggable enabled
+ [x] Window: fix creating `icon` and `title` if these not defined
+ [x] ListView: add trigger `change` when nodes selected/deselected, issue #1313
+ [x] Window: add custom buttons to caption

### 4.2.35
+ [x] Draggable: refactoring
+ [x] File: add label for counting selected files for dropdown area
+ [x] Storage: refactoring and fix session storage
+ [x] Input material: set autocomplete off
+ [x] Tabs: fix clear targets before recollect, issue #1303
+ [x] ListView: fix attributes observing
+ [x] Notify: fix using custom distance option
+ [x] Rating: minor improve code
+ [x] Ribbon menu: fix button group width calc, issue #1296
+ [x] CSS: fix `align-items` property for `selected` and `tag-input`, pull-request #1306, issue #1305
+ [x] Spinner: fix twice click effect on Android devices, issue #1307
+ [x] Input: fix triggering `change` for `autocomplete` feature, issue #1310
+ [x] CalendarPicker: fix selection when using `val(...)`, issue #1308
+ [x] Popovers: fix change value for attribute `data-popover-text`, issue #1309
+ [x] Charms: add charm `tiles` and `notifies` with classes `.charm-tile` and `.charm-notify`

### 4.2.34
+ [x] Sidebar: fix error for shifting content issue #1294
+ [x] Checkbox: fix create rule
+ [x] Radio: fix create rule
+ [x] Switch: fix create rule
+ [x] Select: fix rotating drop down toggle 
+ [x] Tabs: fix switching content, issue #1297 
+ [x] Input: fix autocomplete list, issue #1298
+ [x] Metro: return to strict mode
+ [x] Toast: fix creating error 
+ [x] Streamer: fix select stream 

### 4.2.33
+ [x] Init: fixed initialization process for widgets, loaded over Ajax

### 4.2.32
+ [x] File: fix event trigger `on-select` for FF when user drops files 
+ [x] File: fix event trigger `on-select` for IE11 when user drops files
+ [x] Dialog: fix `onChange` event
+ [x] Table: add event `data-on-data-load-error`

### 4.2.31
+ [x] Sidebar: add submenu support
+ [x] Sidebar: add any content support with li class `.content-container`
+ [x] Sidebar: add attribute `data-size` to set sidebar width
+ [x] Sidebar: add attribute `data-position` to set sidebar `right` or `left` (default)
+ [x] Array: add function (if not exists) `contains(val, idx)`
+ [x] String: add function `toArray(delim, type, format)` this function is equal to `Utils.strToArray`
+ [x] Calendar: add attribute `data-exclude-day`. Comma separated string with day number from 0 (Sunday) to 6 (Saturday) 
+ [x] Calendar: add attribute `data-show-week-number="true|false"` 
+ [x] Calendar: add attribute `data-week-number-click="true|false"` 
+ [x] Calendar: add event `data-on-week-number-click="..."` 
+ [x] Calendar: add event `data-on-day-draw="..."`
+ [x] Calendar: fix day selection for disabled 
+ [x] Calendar: add class `day-border` and attribute `data-day-border="true|false"`
+ [x] Validator: fix error if value is undefined  
+ [x] Validator: function `date` now support additional input attribute `data-value-format` for non ECMAScript dates
+ [x] Validator: function `date` now support additional input attribute `data-value-locale` for non ECMAScript dates
+ [x] Z-index: set equal z-index for `appbar`, `bottomnav`, `bottomsheet`, `tabsmaterial`
+ [x] Carousel: rename attribute `data-bullet-style` to `data-bullets-style`
+ [x] Carousel: add attribute `data-bullets-size` with values `default`, `mini`, `small`, `large`
+ [x] Carousel: add style `cycle`
+ [x] Popover: set default value for `data-popover-timeout` to `10`, issue #1277
+ [x] Storage: Objects `storage` and `session storage` combined into one object. Access to objects remained unchanged: `Metro.storage`, `Metro.session`
+ [x] String: `String.toDate` now support `locale` as second parameter: `"21 грудня 1972".toDate('%d %m %y', 'uk-UA')`
+ [x] Navview: upd docs and less
+ [x] Lists: upd `items-list`, `feed-list`, `group-list` to use with not a list element.
+ [x] Table: minor improve update
+ [x] Table: add attribute `data-horizontal-scroll-stop`. You can use this attribute to define media to stop scrolling.

### 4.2.30
+ [x] Toast: add function `init(options)`, now you can set toast `top` position and `distance`. See docs for details.
+ [x] t-menu: less code moved to separate file
+ [x] h-menu: less code moved to separate file
+ [x] drop-utils: now contains classes for drop-down: `dropdown-toggle`, `drop-up`, `drop-left`, `drop-right`
+ [x] sidenav-m3: fix icon position for submenu, issue #1266
+ [x] Splitter: fix gutter for nested splitters
+ [x] Splitter: fix calc min size if value for attribute `data-min-sizes` comma separated value
+ [x] Docs: fix mistake in docs for `sidenav-counter-expand-*`, issue #1269
+ [x] Docs: fix mistake in docs for `spacing`
+ [x] Command button: set `font-weight` to override it when use in wordpress
+ [x] Command button: set `line-height` to override it when use in wordpress
+ [x] Inline-form: change behavior for `.form-group`
+ [x] Carousel: add events `onSlideShow(HTMLElement slide)`, `onSlideHide(HTMLElement slide)` 
+ [x] Examples: fix `start-screen` for scroll on mobile devices 

### 4.2.29
+ [x] Validator: fix for issue #1254
+ [x] Inputs: `required`, `invalid`, `valid` classes now works only for inputs.
+ [x] Validator: use attribute `data-use-required-class` to disable or enable class `required` for inputs with `data-validate=required`
+ [x] Popover: fix firing event `onPopoverShow`, issue #1258
+ [x] Notify: fix default options from new notify
+ [x] Inputs: fix toggle attribute `disabled` for inputs with `role`
+ [x] Splitter: add service classes `.stop-select`, `.stop-pointer`
+ [x] Table: fix issue #1262
+ [x] Table: optimize functions `deleteItem`, `deleteItemByName`
+ [x] List: optimize functions `deleteItem`
+ [x] Table: add attribute `data-horizontal-scroll` to enable horizontal scrolling for wide table 
+ [x] Table: add attribute `data-cls-table-container`
+ [x] Tabs: add attribute `data-tabs-type`. This attribute sets new tab types for expanded horizontal tabs. Values: `text`, `group`, `pills`  

### 4.2.28
+ [x] Sidebar: fix z-index
+ [x] Docs: fix mistakes in table options
+ [x] Utils css: fix class `m4-cloak` 
+ [x] Validator: add argument `data` to events `data-on-validate-form`, `data-on-error-form`, `data-on-submit`. Data is a `object` and contains pairs: `input-name: input-value` for form elements.
+ [x] Popover: fix close popover
+ [x] v-menu: fix drop down for `v-menu` -> `v-menu` 
+ [x] Validator: fix for issue #1254
+ [x] Utils: add functions `parseCard(val)`, `parsePhone(val)`. Functions remove all not numeric chars from value
+ [x] Table: add data formats `card`, `phone`
+ [x] List: add data formats `card`, `phone`
+ [x] Sorter: add data formats `card`, `phone`

### 4.2.27
+ [x] Input: remove -webkit-autofill background color
+ [x] App bar: fixed class `ml-auto`
+ [x] v-menu: add service class `for-dropdown`, added automatically, when add role `dropdown
+ [x] d-menu, v-menu: remove `min-width` for item 
+ [x] d-menu: fix icon position in item
+ [x] Cloak: add class `.m4-cloak` for `body` to remove blinking initiated components
+ [x] Cloak: add meta tag `metro4:cloak` can receive values: `show`, `fade` (default)  
+ [x] Cloak: add meta tag `metro4:cloak_duration` can receive integer values, default `500`. Use for `fade`  
+ [x] Dialog: add element as context to events
+ [x] Popovers: fix minor bugs, issue #1179, issue #1238
+ [x] Popovers: add attribute `data-close-button="true|false""`
+ [x] Popovers: now you can change popover content and position at runtime with attributes `data-popover-text`, `data-popover-position`
+ [x] Popovers: add attribute `data-cls-popover-content`
+ [x] Popovers: change context for events to `element` for which popover is created
+ [x] Colors: add branding color classes `bg-*` for facebook, twitter, github, gitlab, amazon, bootstrap
+ [x] Select: fix add, remove `focused` class
+ [x] Select: add class `input-large`
+ [x] Spinner: add class `input-large`
+ [x] Tag input: add class `input-large`
+ [x] Tag input: add auto resize to input
+ [x] Table: add methods `deleteItem(field_index, val)`, `deleteItemByName(field_name, val)`. Function return list instance. `Val` can be function or primitive value. Method can not redraw list, to redraw call method `draw()`.
+ [x] Utils: add function `arrayDeleteByMultipleKeys(arr, /*array*/ indexes)`. Function return new Array.
+ [x] Toolbar: fix for vertical layout
+ [x] Splitter: add attribute `data-save-state`, required element `ID`. If `true`, panes sizes stored into `Storage`
+ [x] Table: add method `setData(obj)` 
+ [x] Table: add method `setHeads(obj)`, `setHeadItem(obj)`  
+ [x] Table: add method `setItems(obj)` 
+ [x] List: add method `deleteItem(val)`. Function return list instance. `Val` can be function or primitive value. Method can not redraw list, to redraw call method `draw()`.

### 4.2.26
+ [x] Image compare: fix for touch devices
+ [x] Image magnifier: fix for touch devices
+ [x] Window: fix _setPosition method
+ [x] Buttons: fix size for dropdown-button, split-button and info-button
+ [x] Utils: add function `iframeBubbleMouseMove(iframe)`
+ [x] Input: add class `.input-large`
+ [x] Splitter: new component
+ [x] Popovers: fix minor bugs (forum issue)

### 4.2.25
+ [x] Sidebar: remove scroll-y from sidebar, add scroll-y to sidebar-menu
+ [x] Countdown: refactoring structure, add animation effects: slide, fade, zoom
+ [x] Hero: minor upd styles for background image
+ [x] Html container: new component, include HTML snippets in HTML element
+ [x] Utils: add function `isLocalhost()`
+ [x] Docs: upd for using `htmlcontainer` component
+ [x] Window: fix gradually disappear for children when window is hiding, issue #1222
+ [x] Utils: add methods `getCursorPosition(...)`, `getCursorPositionX(...)`, `getCursorPositionY(...)` 
+ [x] Image compare: new component
+ [x] Image magnifier: new component

### 4.2.24
+ [x] Time picker: fix method `val` for issue #1221
+ [x] Calendar: fix method `setToday` for issue #1215
+ [x] ListView: fix method `_createNode` for `structure` option, issue #1220 
+ [x] ListView: fix methods `insertBefore`, `insertAfter`
+ [x] Tabs: change `expand` behavior
+ [x] Tabs: fix expand/collapse behavior
+ [x] Select: add attribute `data-cls-option-active`
+ [x] Countdown: fix performance and minor bugs
+ [x] Countdown: fix deferred start setup
+ [x] Countdown: add methods `resume()`, `reset()`
+ [x] Notify: fix firing method `onClose`  
+ [x] Notify: add methods `onNotifyCreate`, `onAppend`
+ [x] Input: fix custom search button click
+ [x] Calendar picker: add attribute `data-null-value`. If this attribute false and value empty, used current date
+ [x] Calendar picker: fix for null value, issue #1217
+ [x] Accordion: add attribute `data-material='true'`
+ [x] Switch: add attribute `data-material='true'`
+ [x] Mif: add new icons 50+
+ [x] Bottom navigation: add new CSS component  
+ [x] Bottom sheet: add new component
+ [x] Items list: add new CSS component  
+ [x] Feed list: add new CSS component  
+ [x] Group list: add new CSS component  
+ [x] Head bar: add new CSS component  
+ [x] Material tabs: add new component
+ [x] Material input: add new component
+ [x] Chips: add new CSS component
+ [x] Swipe: add new JS component

### 4.2.23
+ [x] Select: fix native `onchange` event triggering, issue #1198
+ [x] Calendar: add attributes `data-prev-month-icon`, `data-next-month-icon`, `data-prev-year-icon`, `data-next-year-icon`
+ [x] Calendar: fix rendering for ie, issue #1202
+ [x] Calendar picker: add `data-prepend` attribute, issue #1201
+ [x] Calendar picker: fix close when clicked dropdown button issue #1210
+ [x] Calendar picker: fix disabled white text is unreadable, issue #1208
+ [x] Calendar picker: fix init null value, issue #1206
+ [x] Resizeable: fix resize, issue #1205
+ [x] Table: add attribute `data-filters-operator="and|or"`
+ [x] Table: fix init filters, defined in attribute `data-filters`
+ [x] Table: rename `filterMinLength` to `searchMinLength`
+ [x] Table: rename `filterThreshold` to `searchThreshold`
+ [x] Table: add attribute `data-search-fields`, issue #1195
+ [x] Table: add attributes `data-cls-row`, `data-cls-even-row`, `data-cls-odd-row`
+ [x] Table component: full rewrite docs 

### 4.2.22
+ [x] Appbar: remove classes `app-bar-expanded-*` and add attributes `data-expand`, `data-exapnd-point`
+ [x] Table: fix `hidden` class applying. issue #1194
+ [x] Table: add attribute `data-cls-cell-wrapper`
+ [x] Mif: set `line-height: 1` for `mif-*x` classes
+ [x] File: add mode `drop`
+ [x] Select: fix for the `long` captions
+ [x] Select: add attribute `data-cls-select-input`
+ [x] Media players: set context for events to `HTML element`
+ [x] Builder: add [Metro 4 Builder](https://builder.metroui.org.ua)

### 4.2.21
+ [x] Docs: refactoring docs for form components
+ [x] Resizable: add attributes `data-min-width`, `data-max-width`, `data-min-height`, `data-max-height`, `data-can-resize`, issue #1100
+ [x] Input: add events `onClearClick`, `onRevealClick`
+ [x] Input: add methods `clear()`, `toDefault()` 
+ [x] Input: rename `data-cls-element` to `data-cls-component`
+ [x] Input: add attribute `data-cls-custom-button`
+ [x] Input: add attribute `data-history-divider` and methods `getHistory`, `setHistory`, `getHistoryIndex`, `setHistoryIndex`
+ [x] Input: add `search input` functionality
+ [x] Search: remove `search` plugin
+ [x] Tag input: add observing attribute `value`
+ [x] Tag input: fix method `val()`
+ [x] Spinner: add events `onArrowUp`, `onArrowDown`, `onArrowClick`
+ [x] Spinner: add events `onPlusClick`, `onMinusClick`, `onButtonClick`
+ [x] Select: add event `onItemSelect`
+ [x] Select: add method `reset()`, `getSelected()`
+ [x] Select: fix method `val(...)`
+ [x] Textarea: add methods `clear()`, `toDefault()`
+ [x] Textarea: fix `data-append` attribute
+ [x] Calendar picker: fix error when value attribute is empty, issue #1191
+ [x] Calendar picker: add attributes `data-dialog-mode`, `data-dialog-point`, `data-dialog-overlay`, `data-overlay-color`, `data-overlay-alpha`
+ [x] Calendar: add `compact` class
+ [x] Calendar: for wide mode now use attributes `data-wide` or `data-wide-point` 
+ [x] Extension: add method, if not exists, Array.from 

### 4.2.20
+ [x] Table: fix default padding for `th` and `td`
+ [x] Select: fix custom classes apply for selected options for select with `multiple` option, issue #1184
+ [x] Input: add `history` option, issue #1162
+ [x] Spinner: new component, issue #1180
+ [x] AppBar: fix error creating `hamburger` when background-color is `rgba` or `transparent`, issue #1172
+ [x] Slider: add event `onChange`
+ [x] TreeView: change context for events
+ [x] Calendar: any input format with attribute `data-input-format`, issue #1186 
+ [x] Calendar picker: any input format with attribute `data-input-format`, issue #1186
+ [x] Date: add extension function `getWeek()` - return week number 

### 4.2.19
+ [x] Change contributing rules 
+ [x] Tabs: add method `open(tab_num | tab_el)`. Tab number counting from 1. Tab element - `li` HTML element or `$("li")` jquery wrapper
+ [x] Tabs: add methods `next()`, `prev()`
+ [x] Popover: add attribute `data-popover-timeout`. Timeout before popover show.
+ [x] Sidebar: add method `isOpen` to object `Metro.sidebar`
+ [x] Table: fix method `loadData` for string value from server
+ [x] Table: fix minor bugs
+ [x] Select: for multiple add attributes `data-cls-selected-item`, `data-cls-selected-item-remover`
+ [x] TagInput: add attribute `data-tag-trigger`. The attribute must contain integer values for `keyCode` for triggering tag creating event. Default: "13,188" - Enter and comma.
+ [x] ListView: fix `checkbox` position for `selectable` mode
+ [x] ListView: add attribute `data-check-style`. Value must be `1` or `2`
+ [x] ListView: add methods `getSelected()`, `selectAll()` or `selectAll(false)` (for clear), `clearSelected()`
+ [x] Checkbox: add observing checkbox style attribute
+ [x] Radio: add observing checkbox style attribute
+ [x] Validator: add function `notequals`. Input value can't be equal to other input
+ [x] Validator: add function `equals`. Input value can be equal to other input. Different from `compare` - it use `trim()` for value
+ [x] Sizing: fix width classes `w-` for all media breakpoints

### 4.2.18
+ [x] Table: fix work attributes `showTableInfo`, `showPagination` when wrappers defined
+ [x] Table: fix pagination behavior when no items for table
+ [x] Table: add observing attributes `data-check` and `data-rownnum`
+ [x] Tabs: fix tab click behavior when `<a>` have a link in `href` attribute 
+ [x] Calendar: add method `clearSelected()`
+ [x] Calendar: add method `toDay()`
+ [x] Table: add exception when data for table is not a object
+ [x] Table: add class `fixed-layout`
+ [x] Table: add `data-filter-threshold` attribute, this is a timeout before searching start
+ [x] Select: add attribute `data-template` for `option`. You can use this attribute to define html wrapper for option text in format `...any...$1`. Where `$1` used for replace by option text.
+ [x] Select: add attribute `data-cls-drop-list` to add additional class to drop down list.   
+ [x] Select: add attribute `data-append` and minor css fixes
+ [x] Select: add multiple functionality
+ [x] Inputs: refactor inputs.less to specific files `select.less`, `input.less`, `textarea.less`, `input-file.less`
+ [x] Radio: add additional style for radio component. To use it, add attribute `data-style="2"` to your radio component.
+ [x] Checkbox: add additional style for checkbox component. To use it, add attribute `data-style="2"` to your checkbox component.
+ [x] Tag input: add new component

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

