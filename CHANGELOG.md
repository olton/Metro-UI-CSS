### 4.4.3
#### M4Q
+ [x] Attributes: fixed method `attr` when user defining one argument
+ [x] Animation: added methods `stopAll()`, `pause(id)`, `pauseAll()`, `resume(id)`, `resumeAll()`

#### Metro 4
+ [x] Color selector: added new component
+ [x] Color picker: added new a component
+ [x] Marquee: added new component
+ [x] NavView: fixed `navview-pane` item `height` and hover state, issue #1661
+ [x] Metro: improved function `makePlugin(...)`, now you can use it for set of elements.
+ [x] Slider: fixed work vertical slider for touchable devices
+ [x] Colors: improve work with hsl, hsv
+ [x] Spinner: fixed input not a number value, value more or less than defined in options.
+ [x] Keypad: fixed internal value type mismatch.
+ [x] InfoBox: added attribute `data-overlay-click-close=true|false`, default `false`, issue #1668
+ [x] Table: added localization from i18n files, issue #1671
+ [x] Dropdown: fixed closing others when open current
+ [x] Timepicker: fixed error when `step` is not equals to `0`, issue #1676
+ [x] Select: fixed clear button icon position in `input-small` mode, issue #1675 
+ [x] Select: added attribute `data-cls-group-name` 
+ [x] Select: for option added attribute `data-display`, issue #1677 
+ [x] Input: added support for getting autocomplete list items with ajax, issue #1682
+ [x] Locales: added `Croatian` locale, thanks to [dugi007](https://github.com/dugi007)
+ [x] Calendar: added showing events count in days, issue #1621
+ [x] Tag Input: added autocomplete feature, issue #1500
+ [x] Table: added showing inspector button with attributes `data-show-inspector-button=true|false`, `data-inspector-button-icon`.
+ [x] Table: set default value for `data-cell-wrapper` to **true**
+ [x] Table: improve table styles for `table-contaner`
+ [x] Table: fixed working with attribute `data-horizontal-scroll-stop`
+ [x] Metro: added method `pluginExists(name)` to check if specified plugin registered in registry
+ [x] Colors: fixed primitives `RGBA`, `HSLA` to create with specified **alpha**
+ [x] Utils: added `lpad()`, `rpad()` functions
+ [x] Calendar: improve visibility, fixed for using `Utils.lpad()`
+ [x] Calendar picker: fixed for using `Utils.lpad()`
+ [x] Metro: added method `Component._fireEvents(...)`
+ [x] Security alert: fixed from issue #1687
+ [x] Date extension: fixed method `getWeek()`, used in calendar for showing week numbers.
+ [x] Tag input: added closing autocomplete list on user click outside.
+ [x] Window: fixed holds zIndex when draggable, issue #1689
+ [x] i18n: fixed a chinese locales name, issue #1691
+ [x] Countdown: changed prop name `data-animate-func` to `data-ease`
+ [x] Additional colors: for opacity added `op-*-hi`, `op-*-low` classes
+ [x] Additional colors: default opacity changed to `0.5`
+ [x] Keypad: added attributes `data-except-keys`, `data-key-separator`, `data-key-delimiter`, `data-trim-separator`.
+ [x] Table: fixed using attribute `data-sortable` for `th`.

### 4.4.2
#### Metro 4
+ [x] Button: fixed content position, issue #1648.
+ [x] Split-button: improved the layout, added subclass `no-gap` for `split-button`.
+ [x] Select: fixed minor bug for showing group name, when value sets with method `val(...)`, issue #1652
+ [x] GradientBox: refactoring.
+ [x] ImageBox: fixed work of attribute `data-repeat`.
+ [x] Window: improve work with window content, now no require `content` wrapping into the `block` when defining `content` property.
+ [x] ImagePlaceholder: new component to create image placeholders.
+ [x] Button: added a button with loading state.
+ [x] Color: improved method `parse()`.
+ [x] Validator: improved validating function `color`, now you can use any color string format: rgb, hex, ...
+ [x] Default icons: optimized styles. 
+ [x] Media players: optimized default icons. 
+ [x] Activity: added two new activity `bars`, `atom`.
+ [x] Tabs material: fixed tabs position.
+ [x] Utils: removed functions: `hex2rgba()`, `getTransformMatrix()`, `computedRgbToHex()`, `computedRgbToRgba()`, `computedRgbToArray()`, `hexColorToArray()`, `hexColorToRgbA()`
+ [x] i18n: added `tr-TR` turkish locale.
+ [x] Third party plugins: removed support for `select2`, `datatables`
+ [x] AppBar: added event `onBeforeMenuOpen`, `onBeforeMenuClose`, fixed firing events `onMenuOpen`, `onMenuClose`.
+ [x] Timepicker: added attributes `data-cls-button`, `data-cls-ok-button`, `data-cls-cancel-button` to modify picker buttons style, issue #1659. 
+ [x] Datepicker: added attributes `data-cls-button`, `data-cls-ok-button`, `data-cls-cancel-button` to modify picker buttons style, issue #1659. 
+ [x] TreeView: fixed `ul` default position to initial, issue #1660
+ [x] Dropdown: added classes `.drop-down-left`, `.drop-down-right`, `.drop-up-left`, `.drop-up-right`. 
+ [x] Position: split position into `position`, `position-ext`, `z-index`.
+ [x] Utilities: removed function `isColor(...)`, if need, use `Metro.colors.isColor()`.
+ [x] Utilities: removed function `embedObject(...)`, if need, use `$(...).wrap()`.
+ [x] Utilities: removed function `randomColor(...)`, if need, use `Metro.colors.random()`.
+ [x] Utilities: updated function `isVideoUrl(...)`, added `twitch`.

### 4.4.1
#### M4Q
+ [x] M4Q: updated to 1.0.9
+ [x] M4Q Core: added function `$.isLocalhost([hostname])`, **true** if host is localhost.
+ [x] M4Q Core: added property `$.localhost`, **true** if current location is localhost.
+ [x] M4Q Core: added property `$.touchable`, **true** if device detected as touchable.
+ [x] M4Q Manipulation: added methods `appendText(...any_text...)`, `prependText(...any_text...)`.

#### Metro 4
+ [x] Licensing: return MIT unified licensing model
+ [x] Tile: fixed double firing click event. Component internal event `onClick` renamed to `onTileClick` (attribute `data-on-click` => `data-on-tile-click`), issue #1636
+ [x] Export: added method `arrayToCSV(array, filename, options)`.  
+ [x] Utils: removed function `isLocalhost`, if you need, use `$.localhost` or `$.isLocalhost([host])`.
+ [x] Utils: removed function `isArray`.
+ [x] Utils: removed function `isTouchDevice`. if you need, use `$.touchable`.
+ [x] Tag input: improve method `val()`. Now you can use for new value(s) `array` or `simple value`.
+ [x] Tag input: added method `append(val)`. For append tag(s) to existing value.
+ [x] Select: fixed using attribute `data-cls-option-group`, issue #1640 
+ [x] Carousel: fixed usage attribute `data-width`, now this attribute applied to `max-width` css property, issue #1647 
+ [x] ImageBox: added new component for issue #1647 
+ [x] GradientBox: added new component for issue #1645 
+ [x] ViewportCheck: added new component for check if element in viewport 
+ [x] Shadows: added class `shadowed`, class defined in `shadow.less`, issue #1643 
+ [x] Select: added attributes `data-show-group-name="true|false"` (default - **false**), `data-short-tag="true|false"` (default - **true**), issue #1642 

### 4.4.0
#### M4Q
+ [x] M4Q: updated to 1.0.8 
+ [x] M4Q Constructor: added short-tag for selecting by `data-role` with `$('@rolename')` 
+ [x] M4Q Visibility: fixed method `hide` for detecting initial `display` value
+ [x] M4Q Init: improve init method
+ [x] M4Q: added property `$.device`, **true** for mobile a device.

#### Metro 4
+ [x] Components: switch to `Component._fireEvent(...)` method for firing component events `data-on-*` 
+ [x] Calendar: added firing event `onMonthChange` when user clicks on outside day, issue #1589
+ [x] Window: added API methods `pos(top, left)`, `top(v)`, `left(v)`, `width(v)`, `height(v)`, issue #1590
+ [x] Metro.window: added methods `pos(top, left)`, `top(v)`, `left(v)`, `width(v)`, `height(v)`
+ [x] Switch: added `data-on`, `data-off` attributes to show switch text state
+ [x] Checkbox: added API method `toggle(state)`. The `state` must be `-1` (indeterminate), `0` (unchecked), `1` (checked) or `undefined` (toggle between checked and unchecked), issue #1586 
+ [x] Switch: added API method `toggle(state)`. The `state` must be `0` (unchecked), `1` (checked) or `undefined` (toggle between checked and unchecked), issue #1586
+ [x] Double slider: fixed right-hand button moves when grabbing the left-hand hint, issue #1591
+ [x] Window: added property `attr` to custom button definition. This attribute must be a `object` with pairs `key: value` where `key` - attribute name, `value` - attribute value, issue #1592
+ [x] Input: added property `attr` to custom button definition
+ [x] Panel: added property `attr` to custom button definition
+ [x] Lightbox: new component to create a modal image gallery
+ [x] ImageGrid: new component to create a simple beautiful image grid
+ [x] Draggable: added attribute `data-boundary-restriction="true|false"`, issue #1595
+ [x] Tokenizer: new component to create tokenized text
+ [x] Carousel: fixed active slide `z-index`, issue #1605
+ [x] Dropdown: added attributes `data-drop-up=true|false` (default `false`), `data-check-drop-up=true|false` (default: `false`), issue #1604
+ [x] Select: added attributes `data-drop-up=true|false` (default `false`), `data-check-drop-up=true|false` (default: `true`), issue #1604
+ [x] Table: fixed using template, issue #1606
+ [x] Select: fixed clear button work, issue #1610
+ [x] Input: remove metro style from input without role `input`. To added metro style to input without role `input`, use class `metro-input`.
+ [x] Textarea: remove metro style from input without role `input`. To added metro style to input without role `input`, use class `metro-input`.
+ [x] Utils Css: remove classes `.neb`, `.neb2`, `.h-center`, `.v-center`
+ [x] Input: added event `onAutocompleteSelect`. You can define this event with an attribute `data-on-autocomplete-select`. The event receives a one argument - selected value. issue #1615.
+ [x] Validator: fixed validating radio buttons with a name as indexed array, issue #1620
+ [x] Textarea: added attribute `data-max-height=0..n`, now you can set max height for textarea component.
+ [x] Components: now, you can use components without common styles from `metro-common.css`, `metro-reset.css`, issue #1609
+ [x] Window: disable a window maximized/minimized action when attribute `data-btn-max=false` and user use double-click on then window caption, issue #1625
+ [x] Input: added style prop `min-width=0`, issue #1626
+ [x] Component: fixed method `_runtime()` for updating attribute `data-role`.
+ [x] Input: added attribute `data-label`. If this attribute defined, `label` element for input will be created automatically.
+ [x] Calendar picker: added attribute `data-label`. If this attribute defined, `label` element for input will be created automatically.
+ [x] Time picker: added attribute `data-label`. If this attribute defined, `label` element for input will be created automatically.
+ [x] Date picker: added attribute `data-label`. If this attribute defined, `label` element for input will be created automatically.
+ [x] Input mask: added new component. Currently, only for desktop browsers.
+ [x] Icons: new icons `external`, `new-tab`
+ [x] Countdown: fixed draw function, issue #1632
+ [x] Color: added `ColorPrimitive` with color primitive objects
+ [x] Color: fixed color type constructor for creating colors from string
+ [x] Color: added method `mix(...)`: `ColorType.mix(color)` and `Colors.mix(color1, color2)`. This method allows you to mix colors. 
+ [x] Color: added methods `channel(channelName, val)`, `channels(obj)`. This method change specified color channel. Color must be a required format.
+ [x] Date picker: added methods `enable()`, `disable())`, `toggleState()`, added observing for prop `disabled`, issue #1633
+ [x] Time picker: added methods `enable()`, `disable())`, `toggleState()`, added observing for prop `disabled`, issue #1633

### 4.3.10
+ [x] Input: added API method `setAutocompleteList(array|string)`, issue #1576
+ [x] Scrollbars: added styles with classes `.scrollbar-type-1`, `.scrollbar-type-2`, `.scrollbar-type-3`, `.scrollbar-type-4`
+ [x] NavView: fixed pane close on mobile devices when inputs, inside a pane, receive a focus, issue #1580
+ [x] NavView: added displaying caption for `navview-menu` for compacted mode on the left of icon when user hovering item
+ [x] Grid: fixed offset-*-0 are missing in the grid system, issue #1583
+ [x] Grid: added gaps with classes `gap-*`, where `*` is one of `0, 8, 16, 24, 32, 40` in pixels
+ [x] NavView: fixed scrolling menu in compact mode, issue #1579
+ [x] NavView: added API method `toggleMode()` to toggle between expanded and compacted modes, issue #1538
+ [x] Select: for API method `data(newOptions, selected, delimiter)` added second argument. Must be a `string` or `array`, if `selected` is a `string`, you can use `delimiter` argument to split string into array, issue #1497

### 4.3.9
+ [x] Component: `_fireEvent` push `__this` to arguments. `__this` contains HTMLElement
+ [x] Utils: fixed function `github()` for executing callback
+ [x] Counter: fixed for starting when page scrolls 
+ [x] Counter: added attributes `data-from`, `data-prefix`, `data-suffix`. Prefixed and suffixed must be a plain text.
+ [x] Observer: added firing event `attrchange` when component attribute was ben changed. `e.detail` contains an object `{attr, newValue, oldValue, __this}`.
+ [x] General: added firing event `hotkeybonded` when hotkey for component was ben bonded. `e.detail` contains an object `{__this, hotkey, fn}`.
+ [x] General: all components fired event `create` when init. The `e.detail` contains an object `{name, __this}`. 
+ [x] General: the document fired event `component-create` when a component was ben initialized. The `e.detail` contains an object `{element, name}`.
+ [x] Window: fixed `makeRuntime` calling, issue #1574 
+ [x] Window: fixed make window `resizable` 
+ [x] Typography: added `italic` and `underline` text classes, issue #1577

### 4.3.8
#### M4Q
+ [x] Animation: fixed using String.includes for IE11. Changed to `String.indexOf`
+ [x] Animation: added operator `/` to `_getRelativeValue()`
+ [x] Events: fixed `fire`. Now main is constructor `CustonEvent`, for old - `createEvent`
+ [x] Manipulation: added method `wrap`, `wrapAll`, `wrapInner`. The method puts elements inside the wrapper and return `wrapper(s)`
+ [x] Init: change `throw Error` to `console.warn` when selector is `#` or `.`
+ [x] setImmediate: added support for `process` and `web workers` 

#### Metro 4
+ [x] General: new module system. All components now defined as alone IIFE modules.
+ [x] Validator: fixed functions `compare`, `equals`, `notequals` to work not inside a form, issue #1542
+ [x] Rtl: remove `form-rtl`, `accordion-rtl` less files. RTL Styles moved to component style.
+ [x] Locales: added `pt-BR` Brazilian Portuguese language
+ [x] Toast: added method `Metro.createToast()`. This eq to `Metro.toast.create()`
+ [x] Components: event `on[Component]Create` now have context a `HTMLElement` and receive `$(HTMLElement)` as argument
+ [x] Keypad: fixed Keypad backspace button click behavior on `keypad`, created at `runtime`, issue #1547
+ [x] Utils: improve function `isType`
+ [x] Utils: remove functions `camelCase()`, `dashedName()`. Use `String.camelCase` or `$.camelCase()` and `String.dashedName())` or `$.dashedName()`.
+ [x] Clock: added events `onTick`, `onSecond`
+ [x] String: added extensions `includes()`, `camelCase()`, `dashedName()`, `shuffle()`
+ [x] Array: added extensions `includes()`
+ [x] ListView: fixed event `onNodeDblclick`, issue #1453
+ [x] Ribbon menu: fixed hovering when button disabled, issue #1551
+ [x] Components: new constructor function
+ [x] Colors: full refactoring, now its full equals to `ColorJS`
+ [x] ColorType: new custom type for `color` variable. Var can be defined as `var c = new Color(...)` or `var c = new Metro.Color(...)` 
+ [x] Material Tabs: update to work in all browsers 
+ [x] Animation: redesign module
+ [x] Animation: added effects `zoom`, `swirl`
+ [x] Tiles: remove prefixed `animate-*` for values for attribute `data-effect`   
+ [x] Core: removed meta attribute `metro4:init:mode`. Now Metro is **ALWAYS** initialized after the content has been loaded.
+ [x] IE: removed file `ie.less`. Styles moved to components styles.
+ [x] ListView: added method `selectByAttribute(attrName, attrValue, true|false)` for select/deselect items, issue #1554
+ [x] Template: new component. This component allows you to use javascript templates inside HTML elements.
+ [x] Table: fixed using wrapper for `skip`, issue #1557
+ [x] Calendar picker: fixed using attribute `clsPrepend`, issue #1558
+ [x] Toast: added new arguments format `Metro.createToast(message, options)`. Where `options` is a `plain object`.
+ [x] Draggable: added attribute `dragContext`, you can set it for access to any object with drag events, issue #1565
+ [x] Window: added second argument `context` for events `onDragStart`, `onDragStop`, `onDragMove`, issue #1565
+ [x] Calendar picker: fixed work in `dialog-mode`
+ [x] Tabs: fixed work attribute `clsTabsListItemActive`, issue #1568
+ [x] Locales: added danish locale `da-DK`, issue #1570


### 4.3.7
#### M4Q
+ [x] Animation: a new engine for animation. The `animate` function changed. Now function receives one argument. Also, you can use old syntax :)
+ [x] Init: fixed minor bug for creating elements in context
+ [x] Ajax: added parameter `contentType`. If this param has value `false`, `Content-type` can't be defined.
+ [x] Contains: added checks with `:visible` to method `is`. Example: `$(...).is(':visible')`
+ [x] Utils: added methods `$.random(array | a, b)`, `$.getUnit(a)`, `$.strip(where, what)`, `$.hasProp(obj, prop)`, `$.dashedName(val)` 
+ [x] Classes: added method `$(...).removeClassBy(mask)`

#### Metro 4
+ [x] Source: reposition source code
+ [x] Builder: new builder config, and new builder version `2020.1`. New version not compatibility with 4.3.6
+ [x] Input: fixed append size and padding, issue #1512
+ [x] Ripple: added ripple call for any element, issue #1515
+ [x] Splitter: added event `onResizeWindow`. Setup this event with prop `data-on-resize-window` or event `$(...).on('resizewindow', ...)`, issue #1516
+ [x] Table: added `skip to page` functionality, issue #1511
+ [x] Table: added attributes `data-show-skip`, `data-table-skip-title`, `data-skip-wrapper`, `data-cls-table-skip`, `data-cls-table-skip-input`, `data-cls-table-skip-button`
+ [x] Table: added event `data-on-skip`
+ [x] Common css: optimize `lists`, `reset`
+ [x] UtilsJS: improve `isFloat` function, issue #1518
+ [x] Icons: added `whatsapp` icon, issue #1510 
+ [x] AudioButton: added new component for the button with role `audio-button`
+ [x] Select: fixed `prepend`, `append` for `input-small`, `input-large`. With `multiple`, `append` and `prepend` will not displayed.
+ [x] Input: fixed `prepend`, `append` for `input-small`, `input-large`. Issue #1522
+ [x] Counter: fixed start if element already in viewport
+ [x] CSS: added `metro-reset.css`, `metro-common.css`, `metro-components.css` as standalone.
+ [x] Image magnifier: fixed glass image when user resize original image
+ [x] Notifies: minor improve notify create method 
+ [x] Donut: update for using new `animate` function to draw `stroke-dasharray`
+ [x] Counter: update for using new `animate` function to draw
+ [x] File: fixed clear when user fire `reset` on form in `drop` mode, issue #1524
+ [x] Adblock: a new component for hunting on the ads blockers 
+ [x] Core: refactoring for new component definition
+ [x] Audio: rename component to `audio-player`
+ [x] Video: rename component to `video-player`
+ [x] Calendar: minor updated for action buttons
+ [x] i18n: refactoring definition. Now each lang defined in own file
+ [x] Third party: third party components styles `select2`, `datatables` move to components and include to main
+ [x] Container: remove prop `display: block`
+ [x] Select: added using empty value for `option`, issue #1527
+ [x] Action button: fixed sub actions position 
+ [x] Additional colors: refactoring
+ [x] Utils: remove method `random`, to get random value from an array or two values, use `$.random(array | a, b)` from `m4q`
+ [x] Utils: remove method `uniqueID`, to get unique GUID, use `$.uniqueID(prefix)` from `m4q`
+ [x] Utils: remove method `formData`, to get form data as array, use `$.serializeToArray(form)` from `m4q` and `$.serialize(form)` to get stringify value with `&` divider
+ [x] Utils: remove method `strToArray`, to transform string to array, use String.prototype method `String.prototype.toArray(delimiter, type, format)`
+ [x] Utils: remove method `callback`, execute function or code, use method `Utils.exec(fn, args, context)`
+ [x] Sidebar: added attribute `data-menu-scrollbar="true|false"`. Attribute enable or disable scrollbar in the sidebar menu, issue #1528
+ [x] Tag: new component. Used in `tag-input`, `select`, can be used as standalone.
+ [x] Ribbon menu: fixed sizes and positions for `ribbon-icon-button`, `ribbon-tool-button` 
+ [x] Menus: removed `text-decoration` for anchors (`a`) inside any types of menus
+ [x] Cookie: new class for cookie manipulation `Metro.cookie`. Contains methods: `setCookie()`, `getCookie()`, `delCookie()` 
+ [x] Cookie disclaimer: new component for accept cookies for GDPR, and not only, issue #1530
+ [x] Metro icon font: added 65 new icons `cross-light`, `document-file-*` (64)
+ [x] Select: improved performance for creating options, issue #1534
+ [x] Select: remove dependency from `d-menu`
+ [x] Navview: added scrollable to `navview-menu` in `compacted` mode

### 4.3.6
##### M4Q
+ [x] M4Q: updated to `1.0.6`
+ [x] M4Q Init: fixed minor bug for creating elements in context
+ [x] M4Q Ajax: added parameter `contentType`. If this param has value `false`, `Content-type` can't be defined.

##### Metro 4
+ [x] ColorJS: fixed functions `RGB`, `RGBA`
+ [x] Select: added focus state, issue #1488
+ [x] Checkbox: added focus state
+ [x] Radio: added focus state
+ [x] Select: added attribute `data-cls-drop-container`
+ [x] Dropdown: added `important` to `.drop-left`, `.drop-right`, `.drop-up` classes
+ [x] Table: added support `formatMask` for fields defined in table head `thead`
+ [x] ResetCSS: remove duplicate declarations
+ [x] Toast: added global setup. Related to issue #1493
+ [x] Streamer: now you can set event time up to a minute
+ [x] Streamer: now you can use for event size `half` and `one-third` constants
+ [x] Streamer: added events `onDrawEvent`, `onDrawGlobalEvent`, `onDrawStream` 
+ [x] TreeView: fixed attribute `data-show-child-count`
+ [x] CalendarPicker: added attribute `data-value` to set init input value, issue #1506
+ [x] Streamer: `data-wheel` now true by default
+ [x] Streamer: added attribute `data-wheel-step` to define scroll step for horizontal scrolling with mouse
+ [x] Streamer: fixed horizontal scrolling with mouse. 

### 4.3.5
##### M4Q
+ [x] M4Q: updated to `1.0.5`
+ [x] M4Q Events: fixed firing events, Metro 4 issue #1476
+ [x] M4Q Events: optimize method `trigger`, now this is a synonym of `fire`

##### Metro 4
+ [x] Tag input: change `trigger` defining 
+ [x] Tag input: added `clear button` with attributes `clearButton`, `clsClearButton`, `clearButtonIcon`  
+ [x] Tag input: added attributes `clsComponent`, `clsInput`  
+ [x] Tag input: added event `onClear`  
+ [x] List: added attribute `data-sort-initial` to sorts on create component, issue #1475
+ [x] Tag input: added attribute `data-static` and static mode for `data-static='true'` or if present attribute `readonly`
+ [x] Tag input: added method `toggleStatic([true|false])`
+ [x] Select: fixed clearing `select-input`, issue #1477
+ [x] Calendar picker: fixed closing calendar when user click on overlay, issue #1478
+ [x] Select: fixed styles for `input-large`, `input-small` classes
+ [x] Tag input: change `keyup` to `keydown` for tag trigger event
+ [x] Tag input: added event `onTagTrigger`  
+ [x] Tag input: added removing last tag on current value is empty end user press `Backspace`, you can disable it with attribute `data-backspace='false'`
+ [x] Draggable: added attribute `data-timeout` for set timeout before creating component
+ [x] Components: creating components can be deferred with attribute `data-[componentName]-deferred=[ms]`. Example: `<div data-role='draggable' data-draggable-deferred='2000'>...</div>`
+ [x] Counter: added attribute `data-start-on-viewport`. If attribute value is `true`, counter started after element showed in viewport. You can combine this with `data-timeout`
+ [x] Select: fixed bug with `data-filter='false'` 
+ [x] File: fixed method `clear` for mode `dropzone`
+ [x] Select: added mode `button`

### 4.3.4
##### M4Q
+ [x] M4Q: updated to `1.0.4`
+ [x] M4Q Manipulation: optimise `append`, `prepend` to one definition for IE
+ [x] M4Q Script: added `$.script`, `$.fn.script` to execute scripts from element or create script object
+ [x] M4Q Manipulation: `$.fn.append`, `$.fn.prepend` now support script tag processing
+ [x] M4Q Clone: now support cloning `data` if second argument `withData`is `true` - `$(el).clone(true, true)`
+ [x] M4Q Events: now you can define event name with `hyphen` or in `camelCase` notation. Example: `mouse-down`, `accordionCreate`
+ [x] M4Q Ajax: fixed handler for sending data
+ [x] M4Q Ajax: fixed `$.json` if returned value can't be parsed
+ [x] M4Q Ajax: fixed `post` for `object`
+ [x] $: added $.serializeToArray(form), $serialize(form)
+ [x] M4Q Events: fixed `removeEventListener`

##### Metro 4
+ [x] Animations: put animations to separate less/css file `metro-animations`
+ [x] Object animations: added `.flip-card`
+ [x] Object animations: added `.post-card`
+ [x] Inputs: change placeholder `font-size` to `14px`, added `text-ellipsis`
+ [x] Utils CSS: added class `.stop-pointer`
+ [x] Role naming: you can now use a hyphen to separate words in verbose component names for the data-role attribute. Example: `data-role='button-group''` and `data-role='buttongroup''` are equivalent.
+ [x] Drag Items: added new component, issue #1336
+ [x] Table: fixed `viewPath` for getting `view` from server
+ [x] Table: fixed colspan for message `emptyTableTitle`
+ [x] Checkbox: added using attribute `readonly`
+ [x] Switch: added using attribute `readonly`
+ [x] Table: fixed `viewPath` for saving `view` on server
+ [x] Animation CSS: relocation
+ [x] AppBar: fixed `app-bar-menu` behavior when user resize a window
+ [x] Slider: fixed hint for IE11
+ [x] Window: fixed interop m4q and jquery for `Metro.window.create()`
+ [x] Splitter: fixed for IE11
+ [x] AppBar: added events `onMenuOpen`, `onMenuClose`, `onMenuExpand`, `onMenuCollapse`

### 4.3.3
+ [x] m4q: updated to 1.0.3
+ [x] Toast: fixed calculating toast position
+ [x] Progress: fixed global setup function name
+ [x] Progress: percent value. To show set attribute `data-show-value="true"`, `data-value-position="free|center"`
+ [x] Progress: added label. Use attributes `data-show-label="true|false"`, `data-label-position="before|after"`, `data-label-template="Value is %VAL%"`
+ [x] InfoBox: fixed interop with Metro 4 and jQuery
+ [x] Table: added method `clear()`, issue #1426 
+ [x] Table: fixed cell data wrapping with attribute `data-cell-wrapper="true"`
+ [x] File: fixed Input file inconsistent display when user cancel the choose dialog, issue #1443
+ [x] Slider: fixed using accuracy with  decimal value, issue #1447  
+ [x] Calendar Picker: added attribute `data-show-week-number`
+ [x] Gravatar: fixed global setup method name
+ [x] Activity: fixed method `open` for undefined options
+ [x] Activity: fixed interop with Metro 4 and jQuery
+ [x] Dialog: fixed interop with Metro 4 and jQuery for dialog create method
+ [x] AppBar: set `max-height` for `app-bar-menu` opened with `hamburger` to visible viewport
+ [x] Buttons: refactoring - split to separate components from one file
+ [x] Calendar Picker: fixed dialog mode, issue #1450
+ [x] Common CSS: added class `-disabled`
+ [x] General: Now `Metro4` init after content was loaded. If you need to switch to old init method, use `metro4:init:mode` with value `immediate`
+ [x] Double Slider: added new component, issue #1441  
+ [x] InfoButton: fixed position and `display` change from `inline-flex` to `inline-block`, issue #1451
+ [x] M4Q Events: improve method `on`
+ [x] Select: fixed for ie11, issue #1452
+ [x] ListView: added callback for `onNodeDblClick` event, issue #1453
+ [x] Table: added show activity when data loaded
+ [x] Table: you can set data with JS object and attribute `data-source`. Value for attribute must be a object name.

### 4.3.2
+ [x] Slider: fixed vertical slider marker position when slider is not visible, thx to [thinkcpu](https://github.com/thinkcpu), PR #1417
+ [x] Slider: improve events
+ [x] HotKey: extended anchor work with `data-hotkey` and attr `href`, issue #1420  
+ [x] M4Q Events:  fixed `function.name` property for IE11, issue #1425
+ [x] Table: added methods `addItem([...], redraw)`, `addItems([...], redraw)`, issue #1426
+ [x] Select: attribute `data-cls-drop-list` now override default class `d-menu` if defined
+ [x] Lists: if list has class attribute, it resets with `margin: 0; padding: 0; list-style: none inside;` 
+ [x] Select: if option not has value, used option text for value
+ [x] Table: added event `onDataSaveError`
+ [x] Table: fixed save view to server
+ [x] M4Q Ajax: fixed creating additional headers for request, issue #1427
+ [x] Init: added meta tag `metro4:init:mode`. The value must be `immediate` or `contentloaded`, default - `immediate`. If value is `contentloaded` and meta tag `metro4:init` not equal  `false`, Metro 4 will be initiate after the content was loaded.
+ [x] Table: now you can define `decimalSeparator` and `thousandSeparator` in table head and global
+ [x] Table: added attributes `data-head` (object name, define table header), `data-body` (object name, define table data)
+ [x] Table: added attribute `data-static`. If `true`, search, pagination, info, rows count will be disabled and will not showing.
+ [x] Splitter: added method `size(str)` for change panel sizes at runtime, added observing for attribute `data-split-sizes` for change panel sizes at runtime
+ [x] Carousel: improve slide switching 
+ [x] TreeView: added trigger `change` for checkboxes
+ [x] Common: fixed `h-auto-*`

### 4.3.1
+ [x] Interop: fixed interop with Metro4 and jQuery, issue #1408
+ [x] m4q: updated to 1.0.1
+ [x] m4q: fixed initialization when `metro4` added into `head`
+ [x] Init: fixed issue #1409
+ [x] Dropdown: fixed interop between Metro4 and jQuery, issue #1411
+ [x] Select: fixed interop between Metro4 and jQuery, issue #1412
+ [x] Panel: fixed interop between Metro4 and jQuery
+ [x] Windows: fixed interop between Metro4 and jQuery
+ [x] VideoPlayer: fixed interop between Metro4 and jQuery
+ [x] AudioPlayer: fixed interop between Metro4 and jQuery
+ [x] Hotkey: fixed interop between Metro4 and jQuery
+ [x] TimePicker: fixed interop between Metro4 and jQuery
+ [x] SideBar: fixed interop between Metro4 and jQuery
+ [x] Charms: fixed interop between Metro4 and jQuery
+ [x] Select: fixed close when user click document and jQuery used
+ [x] CalendarPicker: fixed interop between Metro4 and jQuery, fixed close when `next[Year, Month]` clicked
+ [x] Select: added works with disabled option. You can added attr `disabled` to option to create disabled option, issue #1413
+ [x] Window: fixed toggle draggable, resizeable
+ [x] Tile: fixed tile width in then `tiles-grid` when tile placed in specific column
+ [x] Metro: fixed observing attributes

### 4.3.0
+ [x] jQuery: Goodbye!!!
+ [x] M4Q: now built in for DOM manipulation and animation
+ [x] Keypad: rename property `data-length` to `data-key-length`
+ [x] Slider: fixed show/hide hint 
+ [x] Typo: fixed `margin-top` for lists inside a lists, ex: `ul > ul` 
+ [x] Animation: fixed `fadeIn`, `fadeOut`
+ [x] NavView: rename attribute `data-expanded` to `data-expand`
+ [x] Examples: updated `start screen`
+ [x] Calendar picker: fixed using locale for initial value, issue #1376
+ [x] Typo: set line-height for paragraph to 1.5
+ [x] Table: fire event onDataLoaded before table build
+ [x] Dialog: fixed hide method
+ [x] File: added method "clear"
+ [x] Source: structure refactoring
+ [x] Typography: added background to `remark` with `accent` color 
+ [x] Tests: begin tests with `cypress`
+ [x] Draggable: minor improve for `mouseMove` 
+ [x] Chat: added attribute `data-readonly` and method `toggleReadonly`
+ [x] Schemes: fixed colors for table `tfoot`
+ [x] Add `checkRuntime` to components
+ [x] Table: added attributes `data-empty-table-title`, `data-cls-empty-table-title` for issue #1403
+ [x] Table: fixed padding for sortable columns
+ [x] Add `destroy` method to components. This method remove all event handlers and return core element
+ [x] Select: added props `data-add-empty-value` (default: false), `data-empty-value` (default: empty string)
+ [x] Select: added prop `data-placeholder`
+ [x] Select: added prop `data-clear-button` (default: false)
+ [x] Grid: optimise styles
+ [x] Hint: fixed remove on leave element
+ [x] TreeView: added attribute `data-show-child-count`

### 4.2.49
+ [x] Select: extended to interop with role=dropdown
+ [x] Docs: updated docs for cards, added `icon-box`, `more-info-box`, `skill-box`, `social-box`
+ [x] Sidebar: fixed setup global function name
+ [x] Textarea: fixed issue #1400
+ [x] MaterialTabs: fixed issue #1402 
+ [x] MaterialTabs: added method `open(tab_num)` for issue #1399
+ [x] Select: fixed input autofocus when dropdown
+ [x] Textarea: fixed resize when component was created
+ [x] File: fixed firing `change` event on Safari

### 4.2.48
+ [x] Select: fixed error when using with pair to Select from Metro 4 for React
+ [x] Carousel: moved style props for slide background image from js to css
+ [x] Input: added attribute `data-exclaim` for defining exclamation symbol
+ [x] Input: fixed no display clear button when input is readOnly 
+ [x] Textarea: fixed no display clear button when input is readOnly 
 
### 4.2.47
+ [x] Input: fixed triggering `change` event, added trigger event `clear` when clear button is pressed
+ [x] Accordion: fixed glitch for frames who must be closed, but initiated as open 

### 4.2.46
+ [x] Table: fixed format value for sorting when value is empty, null or undefined
+ [x] Dropdown: fixed set open on init
+ [x] DatePicker: added observation for attribute `data-locale` 
+ [x] DatePicker: added observation for attribute `data-format`
+ [x] Utils: updated func `isLocalhost`
+ [x] Windows: fixed make runtime   
+ [x] Dialog: fixed make runtime   
+ [x] InfoBox: fixed make runtime
+ [x] Validator: fixed validating for `integer` and `float` rules, issue #1388 
+ [x] Builder: fixed builder `config`  
+ [x] Embed objects: set default width and height to `100%`

### 4.2.45
+ [x] Calendar picker: fixed initial value for i18n
+ [x] Typography: set `line-height: 1.5` for `p` 
+ [x] Examples: fixed desktop demo
+ [x] Examples: fixed start screen demo
+ [x] Notify system: fixed minor bug for creating notify after setup

### 4.2.44
+ [x] Calendar: fixed methods `setMaxDate`, `setMinDate`, issue #1374
+ [x] Datepicker: fixed offset for timezones, issue #1372
+ [x] Datepicker: fixed `val()` method 

### 4.2.43
+ [x] Inputs: added class `.input-small` for using with `input`, `select`, `spinner`, `tag-input`, `keypad`, `file` , issue #1245
+ [x] Events: updated docs for subscribing events with `$.on` and `addEventListener()`
+ [x] Panel: new method `customButtons()` for added custom buttons at runtime
+ [x] Table: added `margin-top: 1rem` for class `.table`
+ [x] Lists: added `margin-top: 1rem` for `ul`, `ol`, `dl`
+ [x] Hotkey: full refactoring
+ [x] Datepicker: added attribute `data-input-format`
+ [x] Datepicker: fixed hours timezone offset
+ [x] Datepicker: now you can use attribute `value` to setup component date
+ [x] Pickers: change default scroll speed factor to `4` 
+ [x] Window: fixed methods `setContent`, `setTitle`, `setIcon`, `changePlace`
+ [x] Utils: rename method `isJQueryObject` to `isJQuery`
+ [x] Utils: added methods `isM4Q`, `isQ`. Method `isQ` return one of `isJQuery` or `isM4Q`
+ [x] Streamer: fixed scrolling with `apple magic mouse` and `firefox`
+ [x] Streamer: fixed scroll position for `events-area` when source changed
+ [x] TreeView: fixed confused calls `expandNode` and `collapseNode` events
+ [x] Dialog: added attribute `data-actions` for predefined dialog
+ [x] DatePicker: fixed scroll event handler
+ [x] TimePicker: fixed scroll event handler
+ [x] Tabs material: added event `data-on-tabs-scroll`
+ [x] ScrollEvents: plugin for `scrollStart`, `scrollStop` events was removed
+ [x] Mousewheel: plugin was removed
 
### 4.2.42
+ [x] General: improved components initialization
+ [x] Hotkeys: now you can added or change `hotkey` at runtime
+ [x] Select: fixed cyclic error when `Uncaught ReferenceError: function is not defined` for `onchange` event
+ [x] Card: added class `flex-card` to create card in flex model
+ [x] ListView: fixed works methods with jQuery object and\or HTMLElement
+ [x] Streamer: added event `data-on-events-scroll` 
+ [x] Streamer: fixed method `source` 
+ [x] Streamer: rename method `data` to `dataSet` 
+ [x] TreeView: fixed methods for added nodes, issue #1150

### 4.2.41
+ [x] List: added event `data-on-data-load-error`
+ [x] List: added item template with property `template`
+ [x] Table: added item template with property `template` and value wrapper `this.cellValue`
+ [x] Pagination: added function `Metro.pagination`
+ [x] Templates: now you can change `begin` and `end` template symbols with third argument `{beginToken, endToken}`
+ [x] Html container: added attributes `data-method`, `data-request-data`
+ [x] Html container: change name of events to `data-on-html-load`, `data-on-html-load-fail`, `data-on-html-load-done`
+ [x] Typography: change `line-height` for `p`, `.text-leader`, `.text-leader2` to `1.2` 
+ [x] Charm: added event `data-on-toggle`.
+ [x] Chat: fixed error for time manipulation, issue #1355
+ [x] Master: added events `data-on-next-page`, `data-on-prev-page`
+ [x] Events extensions: Now you can subscribe to all table events with `$.on()` or `addEventListener()`
+ [x] Wizard: added events `data-on-next-page`, `data-on-prev-page`, `data-on-first-page`, `data-on-last-page`, `data-on-finish-page`
+ [x] Global setup: added using global object `metro{ComponentName}Setup` to set up all components on the page with own global options set.
+ [x] Resizable: fixed toggle `canResize` property   
+ [x] Calendar picker: fixed width for calendar wide
+ [x] Slider: change events to `startAll`, `moveAll`, `stopAll`
+ [x] Streamer: added events `data-on-data-load`, `data-on-data-loaded`, `data-on-data-load-error` 
+ [x] Streamer: fixed methods `changeSource`, `changeData`
+ [x] Streamer: added property `row` for event
+ [x] Streamer: added property `html` for event with custom html

### 4.2.40
+ [x] Chat: new component
+ [x] Boxes: added new boxes `skill-box`, `social-box`, `more-info-box`
+ [x] NavView: added behavior for show submenu on left from main menu for compacted mode
+ [x] Cards: added default background color `white`
+ [x] Cards: fixed flex model for image header
+ [x] Colors: change `op-*` alpha value from `0.7` to `0.1`
+ [x] Dropdown: if element has class `open`, it will be open after initialization
+ [x] Show metro4 about in console: added meta parameter `metro4:about`. Thanks to [Ken Kitay](https://github.com/kens-code)
+ [x] Metro4 Events: added constants `Metro.events.startAll`, `Metro.events.stopAll`, `Metro.events.moveAll`. Constants contains both mouse and touch.
+ [x] Clock: updated component, PR #1341, Thanks to [Ken Kitay](https://github.com/kens-code)
+ [x] Sidenav simple: optimize css
+ [x] Sidenav counter: optimize css
+ [x] File: call trigger `change` when user drop files into drop area
+ [x] Form: Add default styling for `input[type=submit]`, `input[type=reset]`, `input[type=button]`.   
+ [x] Rating: added half value for static with attribute `data-half="true"`
+ [x] Headlines: added `margin-top` to `display*`, `h1-h5` and `.h1-.h5`
+ [x] Panel: added `text-ellipsis` to `caption`
+ [x] Table: added methods: `updateItem(key, field, value)`, `getIndex()`, `rebuildIndex()`, `getItem(key)`
+ [x] Table: store item data in row. Now you can use `tr.data('original')` to get table row original data
+ [x] Table: store cell data in cell. Now you can use `td.data('original')` to get cell original data
+ [x] Table: fixed incorrect work service radio buttons
+ [x] Select: remove `margin-bottom`
+ [x] Blockquote: rename class `place-right` to `right-side` for right side quote
+ [x] Lists: fixed list style position for ordered list
+ [x] Dropdown: added service class `stay-open`. When an element has this class, an element can't be closed when the user clicks on the document.
+ [x] Collapse: change default animation duration to `100ms`
+ [x] Tiles: set cover default position to `center center`
+ [x] Tiles: added attribute for image slide `data-cover-position`
+ [x] Timepicker: set default value for `data-scroll-speed` to `1`
+ [x] Datepicker: set default value for `data-scroll-speed` to `1`
+ [x] Countdown: change behavior when browser tab lost focus or invisible
+ [x] Countdown: fixed zoom effect
+ [x] Countdown: fixed minor bug when first tick (not critical)
+ [x] Dialog: change padding for dialog title to `12px 24px`
+ [x] Dialog: added predefined accent classes `primary`, `alert`, `info`, `warning`, ...
+ [x] InfoBox: added predefined accent classes `primary`, `alert`, `info`, `warning`, ...
+ [x] Elements colors: optimize less for using `each` function
+ [x] Additional colors: optimize less for using `each` function
+ [x] Element: added class `.accent-block` for using with accent colors classes `primary`, `alert`, `info`, `warning`, ...
+ [x] Dialog: added close button to top left corner with attribute `data-close-button`
+ [x] Video: fixed show/hide controls when mouse enter leave
+ [x] Video: fixed show controls in full screen mode with attribute `data-full-screen-mode="desktop"`
+ [x] Draggable: fixed minor bug for draggable windows
+ [x] Sidenav M3: fixed item height with text overflow
+ [x] Sidenav M3: remove floating for `d-menu`
+ [x] Dropdown: added attribute `data-drop-filter`. Filtering elements on closing.
+ [x] Select: Opening a select now closes only other selects.
+ [x] Accordion: added drop marker. Marker can disabled with attribute `data-show-marker="false"`
+ [x] Accordion: fixed frames open on accordion init

### 4.2.39
+ [x] NavView: minor improve styling 
+ [x] NavView: added method `pullClick()` for emulate pull button click at runtime 
+ [x] NavView: added class `.focusableItems` to added focus state for items
+ [x] NavView: added attribute `data-active-state="true|false"` to added active state for menu items
+ [x] NavView: added `.badges` container for menu item for collect menu item badges
+ [x] NavView: added `.data-box` container for navigation view pane
+ [x] IconBox: new css component
+ [x] Panel: fixed draggable
+ [x] Panel: added custom buttons to panel title
+ [x] Table: fixed assign classes from attribute `data-cls-head-cell`
+ [x] Breadcrumbs: added `.breadcrumb-item` class
+ [x] Draggable: fixed recreate element content when drag started
+ [x] Table: fixed implements custom class to custom wrappers (search, pagination, ...), issue #1335
+ [x] Select: fixed error for validating required func for select with `multiple` option, issue #1338
+ [x] Select: for validating added functions `length`, `minlength`, `maxlength` for select with `multiple` option 

### 4.2.38
+ [x] ListView: added class `.vertical-layout` for `icons-*` view mode
+ [x] Windows: partial fixed behavior window when user click on min, max button in min, max state, issue #1331 
+ [x] TreeView: fixed wrong works node collapse, expand, issue #1332
+ [x] NavView: fixed calc main menu height 

### 4.2.37
+ [x] Input material: fixed error when creating element, issue #1318
+ [x] Calendar: fixed `justify-content` for `days-row`
+ [x] Table: fixed minor bug for sortable column click event
+ [x] Table: fixed minor bug when inspector dragged
+ [x] Window: fixed creating window with empty title
+ [x] Utils: fixed method `keyInObject`
+ [x] Utils: fixed constant for `keypress
+ [x] Table: fixed firing `onSearch` for clearing search field
+ [x] TreeView: fixed method `toggleNode`, pr #1326
+ [x] Step list: fixed index position when `index > 9`, issue #1328
+ [x] Lists: added `group-list horizontal`

### 4.2.36
+ [x] Window: fixed system button click behavior when draggable enabled
+ [x] Window: fixed creating `icon` and `title` if these not defined
+ [x] ListView: added trigger `change` when nodes selected/deselected, issue #1313
+ [x] Window: added custom buttons to caption

### 4.2.35
+ [x] Draggable: refactoring
+ [x] File: added label for counting selected files for dropdown area
+ [x] Storage: refactoring and fixed session storage
+ [x] Input material: set autocomplete off
+ [x] Tabs: fixed clear targets before recollect, issue #1303
+ [x] ListView: fixed attributes observing
+ [x] Notify: fixed using custom distance option
+ [x] Rating: minor improve code
+ [x] Ribbon menu: fixed button group width calc, issue #1296
+ [x] CSS: fixed `align-items` property for `selected` and `tag-input`, pull-request #1306, issue #1305
+ [x] Spinner: fixed twice click effect on Android devices, issue #1307
+ [x] Input: fixed triggering `change` for `autocomplete` feature, issue #1310
+ [x] CalendarPicker: fixed selection when using `val(...)`, issue #1308
+ [x] Popovers: fixed change value for attribute `data-popover-text`, issue #1309
+ [x] Charms: added charm `tiles` and `notifies` with classes `.charm-tile` and `.charm-notify`

### 4.2.34
+ [x] Sidebar: fixed error for shifting content issue #1294
+ [x] Checkbox: fixed create rule
+ [x] Radio: fixed create rule
+ [x] Switch: fixed create rule
+ [x] Select: fixed rotating drop down toggle 
+ [x] Tabs: fixed switching content, issue #1297 
+ [x] Input: fixed autocomplete list, issue #1298
+ [x] Metro: return to strict mode
+ [x] Toast: fixed creating error 
+ [x] Streamer: fixed select stream 

### 4.2.33
+ [x] Init: fixed initialization process for widgets, loaded over Ajax

### 4.2.32
+ [x] File: fixed event trigger `on-select` for FF when user drops files 
+ [x] File: fixed event trigger `on-select` for IE11 when user drops files
+ [x] Dialog: fixed `onChange` event
+ [x] Table: added event `data-on-data-load-error`

### 4.2.31
+ [x] Sidebar: added submenu support
+ [x] Sidebar: added any content support with li class `.content-container`
+ [x] Sidebar: added attribute `data-size` to set sidebar width
+ [x] Sidebar: added attribute `data-position` to set sidebar `right` or `left` (default)
+ [x] Array: added function (if not exists) `contains(val, idx)`
+ [x] String: added function `toArray(delim, type, format)` this function is equal to `Utils.strToArray`
+ [x] Calendar: added attribute `data-exclude-day`. Comma separated string with day number from 0 (Sunday) to 6 (Saturday) 
+ [x] Calendar: added attribute `data-show-week-number="true|false"` 
+ [x] Calendar: added attribute `data-week-number-click="true|false"` 
+ [x] Calendar: added event `data-on-week-number-click="..."` 
+ [x] Calendar: added event `data-on-day-draw="..."`
+ [x] Calendar: fixed day selection for disabled 
+ [x] Calendar: added class `day-border` and attribute `data-day-border="true|false"`
+ [x] Validator: fixed error if value is undefined  
+ [x] Validator: function `date` now support additional input attribute `data-value-format` for non ECMAScript dates
+ [x] Validator: function `date` now support additional input attribute `data-value-locale` for non ECMAScript dates
+ [x] Z-index: set equal z-index for `appbar`, `bottomnav`, `bottomsheet`, `tabsmaterial`
+ [x] Carousel: rename attribute `data-bullet-style` to `data-bullets-style`
+ [x] Carousel: added attribute `data-bullets-size` with values `default`, `mini`, `small`, `large`
+ [x] Carousel: added style `cycle`
+ [x] Popover: set default value for `data-popover-timeout` to `10`, issue #1277
+ [x] Storage: Objects `storage` and `session storage` combined into one object. Access to objects remained unchanged: `Metro.storage`, `Metro.session`
+ [x] String: `String.toDate` now support `locale` as second parameter: `"21 грудня 1972".toDate('%d %m %y', 'uk-UA')`
+ [x] Navview: updated docs and less
+ [x] Lists: updated `items-list`, `feed-list`, `group-list` to use with not a list element.
+ [x] Table: minor improve update
+ [x] Table: added attribute `data-horizontal-scroll-stop`. You can use this attribute to define media to stop scrolling.

### 4.2.30
+ [x] Toast: added function `init(options)`, now you can set toast `top` position and `distance`. See docs for details.
+ [x] t-menu: less code moved to separate file
+ [x] h-menu: less code moved to separate file
+ [x] drop-utils: now contains classes for drop-down: `dropdown-toggle`, `drop-up`, `drop-left`, `drop-right`
+ [x] sidenav-m3: fixed icon position for submenu, issue #1266
+ [x] Splitter: fixed gutter for nested splitters
+ [x] Splitter: fixed calc min size if value for attribute `data-min-sizes` comma separated value
+ [x] Docs: fixed mistake in docs for `sidenav-counter-expand-*`, issue #1269
+ [x] Docs: fixed mistake in docs for `spacing`
+ [x] Command button: set `font-weight` to override it when use in wordpress
+ [x] Command button: set `line-height` to override it when use in wordpress
+ [x] Inline-form: change behavior for `.form-group`
+ [x] Carousel: added events `onSlideShow(HTMLElement slide)`, `onSlideHide(HTMLElement slide)` 
+ [x] Examples: fixed `start-screen` for scroll on mobile devices 

### 4.2.29
+ [x] Validator: fixed for issue #1254
+ [x] Inputs: `required`, `invalid`, `valid` classes now works only for inputs.
+ [x] Validator: use attribute `data-use-required-class` to disable or enable class `required` for inputs with `data-validate=required`
+ [x] Popover: fixed firing event `onPopoverShow`, issue #1258
+ [x] Notify: fixed default options from new notify
+ [x] Inputs: fixed toggle attribute `disabled` for inputs with `role`
+ [x] Splitter: added service classes `.stop-select`, `.stop-pointer`
+ [x] Table: fixed issue #1262
+ [x] Table: optimize functions `deleteItem`, `deleteItemByName`
+ [x] List: optimize functions `deleteItem`
+ [x] Table: added attribute `data-horizontal-scroll` to enable horizontal scrolling for wide table 
+ [x] Table: added attribute `data-cls-table-container`
+ [x] Tabs: added attribute `data-tabs-type`. This attribute sets new tab types for expanded horizontal tabs. Values: `text`, `group`, `pills`  

### 4.2.28
+ [x] Sidebar: fixed z-index
+ [x] Docs: fixed mistakes in table options
+ [x] Utils css: fixed class `m4-cloak` 
+ [x] Validator: added argument `data` to events `data-on-validate-form`, `data-on-error-form`, `data-on-submit`. Data is a `object` and contains pairs: `input-name: input-value` for form elements.
+ [x] Popover: fixed close popover
+ [x] v-menu: fixed drop down for `v-menu` -> `v-menu` 
+ [x] Validator: fixed for issue #1254
+ [x] Utils: added functions `parseCard(val)`, `parsePhone(val)`. Functions remove all not numeric chars from value
+ [x] Table: added data formats `card`, `phone`
+ [x] List: added data formats `card`, `phone`
+ [x] Sorter: added data formats `card`, `phone`

### 4.2.27
+ [x] Input: remove -webkit-autofill background color
+ [x] App bar: fixed class `ml-auto`
+ [x] v-menu: added service class `for-dropdown`, added automatically, when added role `dropdown
+ [x] d-menu, v-menu: remove `min-width` for item 
+ [x] d-menu: fixed icon position in item
+ [x] Cloak: added class `.m4-cloak` for `body` to remove blinking initiated components
+ [x] Cloak: added meta tag `metro4:cloak` can receive values: `show`, `fade` (default)  
+ [x] Cloak: added meta tag `metro4:cloak_duration` can receive integer values, default `500`. Use for `fade`  
+ [x] Dialog: added element as context to events
+ [x] Popovers: fixed minor bugs, issue #1179, issue #1238
+ [x] Popovers: added attribute `data-close-button="true|false""`
+ [x] Popovers: now you can change popover content and position at runtime with attributes `data-popover-text`, `data-popover-position`
+ [x] Popovers: added attribute `data-cls-popover-content`
+ [x] Popovers: change context for events to `element` for which popover is created
+ [x] Colors: added branding color classes `bg-*` for facebook, twitter, github, gitlab, amazon, bootstrap
+ [x] Select: fixed add, remove `focused` class
+ [x] Select: added class `input-large`
+ [x] Spinner: added class `input-large`
+ [x] Tag input: added class `input-large`
+ [x] Tag input: added auto resize to input
+ [x] Table: added methods `deleteItem(field_index, val)`, `deleteItemByName(field_name, val)`. Function return list instance. `Val` can be function or primitive value. Method can not redraw list, to redraw call method `draw()`.
+ [x] Utils: added function `arrayDeleteByMultipleKeys(arr, /*array*/ indexes)`. Function return new Array.
+ [x] Toolbar: fixed for vertical layout
+ [x] Splitter: added attribute `data-save-state`, required element `ID`. If `true`, panes sizes stored into `Storage`
+ [x] Table: added method `setData(obj)` 
+ [x] Table: added method `setHeads(obj)`, `setHeadItem(obj)`  
+ [x] Table: added method `setItems(obj)` 
+ [x] List: added method `deleteItem(val)`. Function return list instance. `Val` can be function or primitive value. Method can not redraw list, to redraw call method `draw()`.

### 4.2.26
+ [x] Image compare: fixed for touch devices
+ [x] Image magnifier: fixed for touch devices
+ [x] Window: fixed _setPosition method
+ [x] Buttons: fixed size for dropdown-button, split-button and info-button
+ [x] Utils: added function `iframeBubbleMouseMove(iframe)`
+ [x] Input: added class `.input-large`
+ [x] Splitter: new component
+ [x] Popovers: fixed minor bugs (forum issue)

### 4.2.25
+ [x] Sidebar: remove scroll-y from sidebar, added scroll-y to sidebar-menu
+ [x] Countdown: refactoring structure, added animation effects: slide, fade, zoom
+ [x] Hero: minor updated styles for background image
+ [x] Html container: new component, include HTML snippets in HTML element
+ [x] Utils: added function `isLocalhost()`
+ [x] Docs: updated for using `htmlcontainer` component
+ [x] Window: fixed gradually disappear for children when window is hiding, issue #1222
+ [x] Utils: added methods `getCursorPosition(...)`, `getCursorPositionX(...)`, `getCursorPositionY(...)` 
+ [x] Image compare: new component
+ [x] Image magnifier: new component

### 4.2.24
+ [x] Time picker: fixed method `val` for issue #1221
+ [x] Calendar: fixed method `setToday` for issue #1215
+ [x] ListView: fixed method `_createNode` for `structure` option, issue #1220 
+ [x] ListView: fixed methods `insertBefore`, `insertAfter`
+ [x] Tabs: change `expand` behavior
+ [x] Tabs: fixed expand/collapse behavior
+ [x] Select: added attribute `data-cls-option-active`
+ [x] Countdown: fixed performance and minor bugs
+ [x] Countdown: fixed deferred start setup
+ [x] Countdown: added methods `resume()`, `reset()`
+ [x] Notify: fixed firing method `onClose`  
+ [x] Notify: added methods `onNotifyCreate`, `onAppend`
+ [x] Input: fixed custom search button click
+ [x] Calendar picker: added attribute `data-null-value`. If this attribute false and value empty, used current date
+ [x] Calendar picker: fixed for null value, issue #1217
+ [x] Accordion: added attribute `data-material='true'`
+ [x] Switch: added attribute `data-material='true'`
+ [x] Mif: added new icons 50+
+ [x] Bottom navigation: added new CSS component  
+ [x] Bottom sheet: added new component
+ [x] Items list: added new CSS component  
+ [x] Feed list: added new CSS component  
+ [x] Group list: added new CSS component  
+ [x] Head bar: added new CSS component  
+ [x] Material tabs: added new component
+ [x] Material input: added new component
+ [x] Chips: added new CSS component
+ [x] Swipe: added new JS component

### 4.2.23
+ [x] Select: fixed native `onchange` event triggering, issue #1198
+ [x] Calendar: added attributes `data-prev-month-icon`, `data-next-month-icon`, `data-prev-year-icon`, `data-next-year-icon`
+ [x] Calendar: fixed rendering for ie, issue #1202
+ [x] Calendar picker: added `data-prepend` attribute, issue #1201
+ [x] Calendar picker: fixed close when clicked dropdown button issue #1210
+ [x] Calendar picker: fixed disabled white text is unreadable, issue #1208
+ [x] Calendar picker: fixed init null value, issue #1206
+ [x] Resizeable: fixed resize, issue #1205
+ [x] Table: added attribute `data-filters-operator="and|or"`
+ [x] Table: fixed init filters, defined in attribute `data-filters`
+ [x] Table: rename `filterMinLength` to `searchMinLength`
+ [x] Table: rename `filterThreshold` to `searchThreshold`
+ [x] Table: added attribute `data-search-fields`, issue #1195
+ [x] Table: added attributes `data-cls-row`, `data-cls-even-row`, `data-cls-odd-row`
+ [x] Table component: full rewrite docs 

### 4.2.22
+ [x] Appbar: remove classes `app-bar-expanded-*` and added attributes `data-expand`, `data-exapnd-point`
+ [x] Table: fixed `hidden` class applying. issue #1194
+ [x] Table: added attribute `data-cls-cell-wrapper`
+ [x] Mif: set `line-height: 1` for `mif-*x` classes
+ [x] File: added mode `drop`
+ [x] Select: fixed for the `long` captions
+ [x] Select: added attribute `data-cls-select-input`
+ [x] Media players: set context for events to `HTML element`
+ [x] Builder: added [Metro 4 Builder](https://builder.metroui.org.ua)

### 4.2.21
+ [x] Docs: refactoring docs for form components
+ [x] Resizable: added attributes `data-min-width`, `data-max-width`, `data-min-height`, `data-max-height`, `data-can-resize`, issue #1100
+ [x] Input: added events `onClearClick`, `onRevealClick`
+ [x] Input: added methods `clear()`, `toDefault()` 
+ [x] Input: rename `data-cls-element` to `data-cls-component`
+ [x] Input: added attribute `data-cls-custom-button`
+ [x] Input: added attribute `data-history-divider` and methods `getHistory`, `setHistory`, `getHistoryIndex`, `setHistoryIndex`
+ [x] Input: added `search input` functionality
+ [x] Search: remove `search` plugin
+ [x] Tag input: added observing attribute `value`
+ [x] Tag input: fixed method `val()`
+ [x] Spinner: added events `onArrowUp`, `onArrowDown`, `onArrowClick`
+ [x] Spinner: added events `onPlusClick`, `onMinusClick`, `onButtonClick`
+ [x] Select: added event `onItemSelect`
+ [x] Select: added method `reset()`, `getSelected()`
+ [x] Select: fixed method `val(...)`
+ [x] Textarea: added methods `clear()`, `toDefault()`
+ [x] Textarea: fixed `data-append` attribute
+ [x] Calendar picker: fixed error when value attribute is empty, issue #1191
+ [x] Calendar picker: added attributes `data-dialog-mode`, `data-dialog-point`, `data-dialog-overlay`, `data-overlay-color`, `data-overlay-alpha`
+ [x] Calendar: added `compact` class
+ [x] Calendar: for wide mode now use attributes `data-wide` or `data-wide-point` 
+ [x] Extension: added method, if not exists, Array.from 

### 4.2.20
+ [x] Table: fixed default padding for `th` and `td`
+ [x] Select: fixed custom classes apply for selected options for select with `multiple` option, issue #1184
+ [x] Input: added `history` option, issue #1162
+ [x] Spinner: new component, issue #1180
+ [x] AppBar: fixed error creating `hamburger` when background-color is `rgba` or `transparent`, issue #1172
+ [x] Slider: added event `onChange`
+ [x] TreeView: change context for events
+ [x] Calendar: any input format with attribute `data-input-format`, issue #1186 
+ [x] Calendar picker: any input format with attribute `data-input-format`, issue #1186
+ [x] Date: added extension function `getWeek()` - return week number 

### 4.2.19
+ [x] Change contributing rules 
+ [x] Tabs: added method `open(tab_num | tab_el)`. Tab number counting from 1. Tab element - `li` HTML element or `$("li")` jquery wrapper
+ [x] Tabs: added methods `next()`, `prev()`
+ [x] Popover: added attribute `data-popover-timeout`. Timeout before popover show.
+ [x] Sidebar: added method `isOpen` to object `Metro.sidebar`
+ [x] Table: fixed method `loadData` for string value from server
+ [x] Table: fixed minor bugs
+ [x] Select: for multiple added attributes `data-cls-selected-item`, `data-cls-selected-item-remover`
+ [x] TagInput: added attribute `data-tag-trigger`. The attribute must contain integer values for `keyCode` for triggering tag creating event. Default: "13,188" - Enter and comma.
+ [x] ListView: fixed `checkbox` position for `selectable` mode
+ [x] ListView: added attribute `data-check-style`. Value must be `1` or `2`
+ [x] ListView: added methods `getSelected()`, `selectAll()` or `selectAll(false)` (for clear), `clearSelected()`
+ [x] Checkbox: added observing checkbox style attribute
+ [x] Radio: added observing checkbox style attribute
+ [x] Validator: added function `notequals`. Input value can't be equal to other input
+ [x] Validator: added function `equals`. Input value can be equal to other input. Different from `compare` - it use `trim()` for value
+ [x] Sizing: fixed width classes `w-` for all media breakpoints

### 4.2.18
+ [x] Table: fixed work attributes `showTableInfo`, `showPagination` when wrappers defined
+ [x] Table: fixed pagination behavior when no items for table
+ [x] Table: added observing attributes `data-check` and `data-rownnum`
+ [x] Tabs: fixed tab click behavior when `<a>` have a link in `href` attribute 
+ [x] Calendar: added method `clearSelected()`
+ [x] Calendar: added method `toDay()`
+ [x] Table: added exception when data for table is not a object
+ [x] Table: added class `fixed-layout`
+ [x] Table: added `data-filter-threshold` attribute, this is a timeout before searching start
+ [x] Select: added attribute `data-template` for `option`. You can use this attribute to define html wrapper for option text in format `...any...$1`. Where `$1` used for replace by option text.
+ [x] Select: added attribute `data-cls-drop-list` to added additional class to drop down list.   
+ [x] Select: added attribute `data-append` and minor css fixes
+ [x] Select: added multiple functionality
+ [x] Inputs: refactor inputs.less to specific files `select.less`, `input.less`, `textarea.less`, `input-file.less`
+ [x] Radio: added additional style for radio component. To use it, added attribute `data-style="2"` to your radio component.
+ [x] Checkbox: added additional style for checkbox component. To use it, added attribute `data-style="2"` to your checkbox component.
+ [x] Tag input: added new component

### 4.2.17
+ [x] Tabs: change behavior and attribute. For details, read the docs
+ [x] Table: added second parameter `review` to methods `reload` and `loadData`. If `true`, table view will be recreated from init values.
+ [x] Table: added head parameter `show`
+ [x] Input: added attribute `data-default-value="..."` for set default if val is empty and set to this when click clear button
+ [x] Table: added class `.subcompact` to pair to `.compact`
+ [x] Table: added attribute `data-cell-wrapper`. This class added wrapper to cell data with `no wrap` and `no overflow` props.
+ [x] Sidebar: added classes `.compact` and `.subcompact`

### 4.2.16
+ [x] Export: added object `Metro.export`. Now you can export any HTML `tables` to `CSV` with method `Metro.export.tableToCSV(table, filename)`
+ [x] Utils: added function `copy(el)` for copying element to clipboard
+ [x] Utils: added function `bool(val)`. This func return true if value one of: `true`, `'true'`, `1`, `'1'`, `'on'`, `'yes'`
+ [x] Table: fixed show cell if stored value `show` for view have string type `'true'` or `'false'` 
+ [x] Table: added second parameter `heads` for custom filter function
+ [x] Table: change padding and font-size for `compact` class
+ [x] Table: fixed post method for save table view. Inspector post `{id: table_id, view: table_view}` 
+ [x] Table: added method `export(to, mode, filename, export_options)`. Argument `to` currently must value `CSV`. Argument mode: `all`, `checked`, `view`, `all-filtered`
+ [x] Table: added method `resetView(save)` reset table view to default
+ [x] Table: added method `getView()` return current view object
+ [x] Table: added method `getHeads()` return table internal heads
+ [x] Table: added method `clearSelected(redraw)`. This method uncheck rows and redraw table if your need
+ [x] Dialog: added attributes `data-to-top='true|false'`, `data-to-bottom='true|false'` for sticky dialog to top or bottom side.
+ [x] List: fixed for issue ##1155 for IE11

### 4.2.15
+ [x] Switch: fixed works with collapse. issue #1148 
+ [x] Input, Select, Textarea, File: added `data-append` attribute 
+ [x] TreeView: fixed node toggle marker position
+ [x] TreeView: fixed checks nodes for tree options when inputs checked by default
+ [x] String: added extension `toDate(mask)`
+ [x] Media players: fixed info box position
+ [x] Utils: added function `nearest(val, prec, down)` for search for the nearest integer, a multiple of required
+ [x] Select: fixed trigger error for empty value. issue #1138 
+ [x] Time picker: added `steps` attributes `data-hours-step`, `data-minutes-step`, `data-seconds-step`. issue #1122  
+ [x] Time picker: fixed sliders position when picker placed top or bottom of parent
+ [x] Input file: fixed only shows the first file name for multiple option. issue #1140
+ [x] Calendar picker: added observing attributes `data-min-date`, `data-max-date`
+ [x] Input: remove webkit default clear button for `type=time`
+ [x] Table: fixed create internal heads when header defining in html and data loaded from json 
+ [x] Table: added attribute `data-filter-min-length` for number of symbols inputs and start searching
+ [x] Table: added column rownum. This column shows when attribute `data-rownum="true"`
+ [x] Table: added column row check. This column shows when attribute `data-check="true"`
+ [x] Table: added column row radio. This column shows when attribute `data-check-type="radio"`
+ [x] Table: added attribute `data-check-store-key="..."` used for store selected rows in the storage
+ [x] Table: added attribute `data-view-save-mode="client|server"` used for store table view
+ [x] Table: added attribute `data-view-save-path="storage_key|url"` used for store table view
+ [x] Table: added `data-locale` attribute
+ [x] Table: added table inspector to configure columns view
+ [x] Table: added methods `openInspector(true|false)`, `toggleInspector()` to show/hide table inspector
+ [x] Table: added methods `getFilteredItems()`, `getSelectedItems()`, `getStoredKeys()`
+ [x] Table: added events `onDrawCell`, `onAppendCell`, `onAppendRow`, `onViewSave`, `onViewGet`, `onCheckDraw`

### 4.2.14
+ [x] Table: fixed pagination calculator when rows count changed
+ [x] Table: pagination not displayed when rows count is `-1` (show all rows)
+ [x] Table: rename attribute `data-show-all-pages` to `data-pagination-short-mode`

### 4.2.13
+ [x] Windows: fixed execute method onCloseClick
+ [x] Table: added classes `compact-{media}` and `normal-{media}` where `{media}` is one of `sm`, `md`, `lg`, `xl`, `xxl`

### 4.2.12
+ [x] Sidebar: remove text decoration underline for menu item
+ [x] Sidebar: added menu item hover
+ [x] Tiles: fixed `col-*` and `row-*` classes for tiles grid issue #1133
+ [x] Table: added all rows behavior with `-1` value for `data-rows` and `data-rows-steps`
+ [x] Table: added `data-all-records-title` attribute
+ [x] Sidenav-m3: fixed icon position when dropdown issue #1134
+ [x] Table: fixed init sortable column
+ [x] Table: remove generating ghost `tr` 

### 4.2.11
+ [x] Table: added setup for the number formatting. Add attributes `data-thousand-separator`, `data-decimal-separator` issue #1129
+ [x] Sorter: added setup for the number formatting. Add attributes `data-thousand-separator`, `data-decimal-separator` issue #1129
+ [x] List: added setup for the number formatting. Add attributes `data-thousand-separator`, `data-decimal-separator` issue #1129
+ [x] Table: fixed for the `colspan` option issue #1129
+ [x] Table: fixed behavior of attribute `data-cls-column`
+ [x] Tabs: fixed error if tag `a` in tab have a `valid formed url` in href attribute

### 4.2.10
+ [x] Hint: fixed hiding slider hint with `data-hint-always=true` when showing others hits issue #1126
+ [x] Streamer: change streamer data with attribute `data-data`
+ [x] Date picker: fixed sliders position when picker placed top or bottom of parent issue #1107
+ [x] Floating action button: new component 
+ [x] Toast: added classes `.primary`, `.secondary`, `.success`, `.alert`, `.warning`, `.yellow`, `.info`, `.light` 

### 4.2.9
+ [x] Calendar: fixed day item height for issue #1112
+ [x] Select: fixed method `val` for issue #1116
+ [x] App bar: fixed drop down for issue #1114
+ [x] Slider: fixed marker position for non displayed slider fro issue #1119
+ [x] Time(date) picker: added classes `.for-top`, `.for-bottom`. Use with attribute `data-cls-picker`
+ [x] Time(date) picker: added action button border

### 4.2.8
+ [x] Sorter: new component
+ [x] Table: new component
+ [x] List: new component
+ [x] Utils: added new methods `isValue`, `isNegative`, `isPositive`, `isZero`, `func`, `between`, `parseMoney`
+ [x] Tiles: updated for issue #1109
+ [x] i18n: added it-IT locale by [milanteo](https://github.com/milanteo)

### 4.2.7
+ [x] Accordion: fixed events context to html element
+ [x] Date picker: fixed for negative time zone (issue #1084)
+ [x] Date picker: fixed events context to html element
+ [x] Extensions: added function `addHours`, `addDays`, `addMonths`, `addYears`  for date object
+ [x] Dialog: now shadow can be on/off with option `data-shadow="true"`
+ [x] Dialog: added `window.resize` controller
+ [x] Info box: added component information boxes width states `default`, `alert`, `warning`, `success` and `info`
+ [x] Sidebar: added component

### 4.2.6
+ [x] Validator: added func `reset` for reset fields state
+ [x] Validator: added func `reset_state` for reset field state
+ [x] Validator: added func `set_valid_state` for valid field state
+ [x] Validator: added func `set_invalid_state` for invalid field state
+ [x] Validator: added auto method `reset` for forms with role `validator`
+ [x] Validator: added option boolean `requiredMode` for form. If this option is `true`, all funcs works as `required`, else funcs works if field value is not empty.

### 4.2.5
+ [x] CSS Utilities: added `cursor` classes in format `.c-{cursor-name}`. Example: `.c-alias`
+ [x] Badge: added class `.badge` to display counting info or small label inside the element
+ [x] Docs: added doc file `badge.html` for `badge` component
+ [x] Docs: added doc file `cursors.html` for `cursors` classes

### 4.2.4
+ [x] Counter: added new component
+ [x] Docs: added docs for `counter` component

### 4.2.3
+ [x] Validator: added `custom` validation
+ [x] Navigation view: issue #1018 sets focus to the input field in suggest-box when user click on the helper
+ [x] Dialog: change `max-width` to `calc(100vw - 100px)` and `max-height` to `calc(100vh - 100px)`

### 4.2.2
+ [x] Window: fixed methods `show()`, `hide()` in `Metro.window`
+ [x] Window: added methods `min`, `max` to component and object

### 4.2.1
+ [x] Vertical menu: fixed issue #1089 - the sub-menu are out of the view
+ [x] Window: change logic of method `close`
+ [x] Window: added object `Metro.window` with a number of methods 

### 4.2.0
+ [x] Select: added filtering feature.
+ [x] Activity: fixed `z-index` for global activity with overlay
+ [x] Activity: added new option `text` for activity overlay
+ [x] Third party: added styles for `datatables` plugin
+ [x] Third party: added styles for `select2` plugin
+ [x] Demo: added demo page for `datatable` plugin 
+ [x] Demo: added demo page for `select2` plugin 

### 4.1.20
+ [x] Animation: added class `.transition`
+ [x] Neb: added type 2 with class `.neb2` and subclasses `.neb-n`, `.neb-s`, `.neb-w`, `.neb-e`
+ [x] Docs: improve docs pages
+ [x] Examples: improve github page example
+ [x] Examples: improve start screen example
+ [x] Activity: added object `Metro.activity` with two methods: `open({...})`, `close(activity)`

### 4.1.19
+ [x] Session storage: fixed 

### 4.1.18
+ [x] Wizard: fixed issue 1083
+ [x] Shadow utilities: added classes `.no-shadow`, `.no-shadow-text`
+ [x] Session storage: added it. Session storage work as `Metro.storage`
+ [x] Docs: fixed side navigation layout 

### 4.1.17
+ [x] Panel: added `.info-panel`
+ [x] Docs: redesign `index` and `sponsors` pages

### 4.1.16
+ [x] Calendar: added observation for `data-special` attribute
+ [x] Calendar picker: added observation for `data-special` attribute
+ [x] Calendar picker: added observation for `data-exclude` attribute
+ [x] Sizing: fixed utilities classes calculating `.w-@{s}-@{m}`

### 4.1.15
+ [x] Metro: corrected typos in method names `reinitPlugin` and `reiniPluginAll`
+ [x] Docs: corrected typos in example of `micro template` engine

### 4.1.14
+ [x] Issues: fixed #1072 
+ [x] Calendar picker: added events `onMonthChange`, `onYearChange`
+ [x] Calendar: added `special days`
+ [x] Calendar: added attributes `data-show-header`, `data-show-footer`
+ [x] Listview: fixed `table` view mode
+ [x] Utils: added method `mediaModes()` - return current medias
+ [x] Utils: added method `inMedia(media)` - return true if `media` is current mode. Ex: `Metro.utils.inMedia('md')`
+ [x] Checkbox: increase size and fixed element height to inputs 
+ [x] Radio: increase size and fixed element height to inputs 

### 4.1.13
+ [x] Textarea: fixed `line-height`

### 4.1.12
+ [x] i18n: added French `fr-FR` locale, thanks to [drill95](https://github.com/drill95)

### 4.1.11
+ [x] Switches: fixed shrink for `check` element for `checkbox`, `radio` and `switch`
+ [x] Metro icons font: added loading `ttf` and `svg` font types

### 4.1.10
+ [x] i18n: added `es-MX`, thanks to [rkgarcia](https://github.com/rkgarcia)
+ [x] Inputs: optimize css for `prepend` element
+ [x] Inputs: set height for `input`, `select`, `file` to `36px`
+ [x] App bar: change height to `52px`

### 4.1.9
+ [x] Typography: fixed media for `reduce-*`, `enlarge-*`, `text-align`, `vertical-align`
+ [x] Validator: change rule for `domain` function
+ [x] Validator: fixed returned value for `Metro.validator.validate()` 

### 4.1.8
+ [x] Master: set `overflow: visible` to element
+ [x] Select: added scroll to active option
+ [x] Scheme builder: added style for select active options
+ [x] Panel: fixed `icon` place and size
+ [x] Scheme builder: remove `background-color` and `color` from `.table`
+ [x] Buttons: change height to `36px`
+ [x] Master: fixed height of pages container when a window is resized
+ [x] Select: change padding and height for internal drop down list items
+ [x] Input file: fixed overflow for very long file name
+ [x] Checkbox: fixed `line-height` for long caption  
+ [x] Radio: fixed `line-height` for long caption
+ [x] Validator: added validation function  `domain`   

### 4.1.7
+ [x] Display: fixed order display classes `d-*` 

### 4.1.6
+ [x] Cube: fixed change rules at runtime
+ [x] Cube: added method `toRule(...)` 
+ [x] Lists: added `.custom-list-marker`
+ [x] Lists: return from v3 `.step-list`
+ [x] Typography: added class `.text-underline`
+ [x] Intro: fixed docs for meta tags
+ [x] Calendar: fixed actions buttons padding
+ [x] Button: change height to `32px`
+ [x] Scheme builder: added `.info-button`, `.image-button`
+ [x] Menu: fixed `.t-menu` horizontal dropped down size
+ [x] Color scheme `red-dark`: change secondary background color 

### 4.1.5
+ [x] Colors: added `.bd-transparent` class
+ [x] Buttons: added `.info-button` as Github split button
+ [x] Examples: updated github page for `.info-button`
+ [x] App bar: added class `.app-bar-input` for placing inputs
+ [x] Buttons: added class `.hovered` for default button
+ [x] Tabs: all tabs `anchors` now have flex box model 

### 4.1.4
+ [x] Metro icon fonts: update, 34 new icons

### 4.1.3
+ [x] Images: change `.img-container` display to `block`
+ [x] Streamer: increase sizes and offsets to 20 intervals
+ [x] App bar: flexible model
+ [x] App bar: fixed using `.v-menu` in `.app-bar-container`
+ [x] Examples: Github page 
+ [x] Typography: added class `.no-decor`
+ [x] Less: move default icons data-uri to `include/default-icons`

### 4.1.2
+ [x] Select: added method `val()`

### 4.1.1
+ [x] Utils: added method `inObject`
+ [x] Metro.initWidgets: change check rule for defined component
+ [x] Input file: added click on the all elements parts
+ [x] App bar: fixed `v-menu` usage
+ [x] Spacing: added `mx-*`, `px-*` classes 
+ [x] Examples: added examples presentation page
+ [x] Examples: added login form example `examples/forms/login.html`

### 4.1.0
+ [x] Side navigation: new component `sidemenu-simple`
+ [x] Button group: new behavior for `one` mode - all unchecked
+ [x] Select: added method `data()` for loading options at `runtime` 
+ [x] Scheme builder: new mixin
+ [x] Schemes: `darcula`, `red-alert`, `red-dark`, `sky-net`
+ [x] Schemes: added documentation.
+ [x] Color: move color classes `bg-*` and `fg-*` to `metro-color.css`
+ [x] Sizing: added classes `.h-vh-*`, `.w-vw-*` (5, 10, 25, 50, 75, 100)
+ [x] Pagination: move to `pagination.less`
+ [x] Breadcrumbs: move to `breadcrumbs.less`
+ [x] Wizard: fixed sections height for IE11 and Edge
+ [x] Wizard: added click on complete section to navigate to it
+ [x] Navview: fixed background-color for `.pull-down` and `.holder` for IE11 and Edge 
+ [x] All: fixed any minor bugs
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
+ [x] App bar: fixed `.app-bar-menu` dropped down for IE11 and Edge

### 4.0.9
+ [x] Checkbox: refactoring
+ [x] Radio: refactoring
+ [x] Input: fixed for IE11 and Edge
+ [x] Ribbon menu: fixed for IE11 and Edge
+ [x] ListView: fixed for IE11
+ [x] TreeView: fixed for IE11 Edge for checkboxes
+ [x] Subsystem: added method `Object.values` special for IE11

### 4.0.8
+ [x] Ribbon menu: fixed it for button group

### 4.0.7
+ [x] Button group: fixed it

### 4.0.6
+ [x] Dialog: fixed method `Metro.dialog.toggle()`
+ [x] Notify: increase `z-index` for default container
+ [x] Window: added observing `data-cls-window` attribute
+ [x] Window: fixed observing `data-cls-caption` and `data-cls-content` attribute
+ [x] Window: added method `show()` - this method added class `no-visible` to `window`
+ [x] Window: added method `hide()` - this method remove class `no-visible` from `window`
+ [x] Window: updated documentation

### 4.0.5
+ [x] Tiles: added `.tiles-group` class with sizes subclasses
+ [x] Metro: added methods `reinitPlugin`, `reinitPluginAll`

### 4.0.4
+ [x] Charms: remove `preventDefault` from click event
+ [x] Nuget: change target location for Metro 4
+ [x] Validator: added `radio` and `select` to validation
+ [x] Validator: added function `not`

### 4.0.3
+ [x] Validator: rename event `onValid` to `onValidate`
+ [x] Validator: added events `onErrorForm`, `onValidateForm`
+ [x] Validator: added `checkbox` validation (required function)

### 4.0.2
+ [x] Validator: change rules delimiter to `space` 

### 4.0.1
+ [x] Pickers: fixed buttons behavior

### 4.0.0
Release

