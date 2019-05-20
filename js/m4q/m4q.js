/*
 * m4q v1.0.0, (https://github.com/olton/m4q.git)
 * Copyright 2018 - 2019 by Sergey Pimenov
 * Helper for DOM manipulation
 * Licensed under MIT
 */

'use strict';

	function not(value){
	    return value === undefined || value === null;
	}
	
	function camelCase(string){
	    return string.replace( /-([a-z])/g, function(all, letter){
	        return letter.toUpperCase();
	    });
	}
	
	function isPlainObject( obj ) {
	    var proto;
	    if ( !obj || Object.prototype.toString.call( obj ) !== "[object Object]" ) {
	        return false;
	    }
	    proto = obj.prototype !== undefined;
	    if ( !proto ) {
	        return true;
	    }
	    return proto.constructor && typeof proto.constructor === "function";
	}
	
	function isEmptyObject( obj ) {
	    for (var name in obj ) {
	        if (obj.hasOwnProperty(name)) return false;
	    }
	    return true;
	}
	
	function isArrayLike (o){
	    return o instanceof Object && 'length' in o;
	}
	
	function str2arr (str, sep) {
	    sep = sep || " ";
	    return str.split(sep).map(function(el){
	        return  (""+el).trim();
	    }).filter(function(el){
	        return el !== "";
	    })
	}
	
	function parseUnit(str, out) {
	    if (!out) out = [ 0, '' ];
	    str = String(str);
	    out[0] = parseFloat(str);
	    out[1] = str.match(/[\d.\-+]*\s*(.*)/)[1] || '';
	    return out;
	}
	
(function (global, undefined) {
	
	    if (global.setImmediate) {
	        return;
	    }
	
	    var nextHandle = 1;
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;
	
	    function setImmediate(callback) {
	        if (typeof callback !== "function") {
	            callback = new Function("" + callback);
	        }
	        var args = new Array(arguments.length - 1);
	        for (var i = 0; i < args.length; i++) {
	            args[i] = arguments[i + 1];
	        }
	        tasksByHandle[nextHandle] = { callback: callback, args: args };
	        registerImmediate(nextHandle);
	        return nextHandle++;
	    }
	
	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }
	
	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	            case 0:
	                callback();
	                break;
	            case 1:
	                callback(args[0]);
	                break;
	            case 2:
	                callback(args[0], args[1]);
	                break;
	            case 3:
	                callback(args[0], args[1], args[2]);
	                break;
	            default:
	                callback.apply(undefined, args);
	                break;
	        }
	    }
	
	    function runIfPresent(handle) {
	        if (currentlyRunningATask) {
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }
	
	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }
	
	    function canUsePostMessage() {
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }
	
	    function installPostMessageImplementation() {
	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	
	        global.addEventListener("message", onGlobalMessage, false);
	
	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }
	
	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };
	
	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }
	
	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }
	
	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }
	
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;
	
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();
	
	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();
	
	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();
	
	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();
	
	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }
	
	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	
	}(window));
(function (global, undefined) {
	
	    if (global.Promise) {
	        return;
	    }
	
	    // console.log("Promise polyfill v1.2.0");
	
	    var PENDING = 'pending';
	    var SEALED = 'sealed';
	    var FULFILLED = 'fulfilled';
	    var REJECTED = 'rejected';
	    var NOOP = function(){};
	
	    function isArray(value) {
	        return Object.prototype.toString.call(value) === '[object Array]';
	    }
	
	    // async calls
	    var asyncSetTimer = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;
	    var asyncQueue = [];
	    var asyncTimer;
	
	    function asyncFlush(){
	        // run promise callbacks
	        for (var i = 0; i < asyncQueue.length; i++)
	            asyncQueue[i][0](asyncQueue[i][1]);
	
	        // reset async asyncQueue
	        asyncQueue = [];
	        asyncTimer = false;
	    }
	
	    function asyncCall(callback, arg){
	        asyncQueue.push([callback, arg]);
	
	        if (!asyncTimer)
	        {
	            asyncTimer = true;
	            asyncSetTimer(asyncFlush, 0);
	        }
	    }
	
	    function invokeResolver(resolver, promise) {
	        function resolvePromise(value) {
	            resolve(promise, value);
	        }
	
	        function rejectPromise(reason) {
	            reject(promise, reason);
	        }
	
	        try {
	            resolver(resolvePromise, rejectPromise);
	        } catch(e) {
	            rejectPromise(e);
	        }
	    }
	
	    function invokeCallback(subscriber){
	        var owner = subscriber.owner;
	        var settled = owner.state_;
	        var value = owner.data_;
	        var callback = subscriber[settled];
	        var promise = subscriber.then;
	
	        if (typeof callback === 'function')
	        {
	            settled = FULFILLED;
	            try {
	                value = callback(value);
	            } catch(e) {
	                reject(promise, e);
	            }
	        }
	
	        if (!handleThenable(promise, value))
	        {
	            if (settled === FULFILLED)
	                resolve(promise, value);
	
	            if (settled === REJECTED)
	                reject(promise, value);
	        }
	    }
	
	    function handleThenable(promise, value) {
	        var resolved;
	
	        try {
	            if (promise === value)
	                throw new TypeError('A promises callback cannot return that same promise.');
	
	            if (value && (typeof value === 'function' || typeof value === 'object'))
	            {
	                var then = value.then;  // then should be retrived only once
	
	                if (typeof then === 'function')
	                {
	                    then.call(value, function(val){
	                        if (!resolved)
	                        {
	                            resolved = true;
	
	                            if (value !== val)
	                                resolve(promise, val);
	                            else
	                                fulfill(promise, val);
	                        }
	                    }, function(reason){
	                        if (!resolved)
	                        {
	                            resolved = true;
	
	                            reject(promise, reason);
	                        }
	                    });
	
	                    return true;
	                }
	            }
	        } catch (e) {
	            if (!resolved)
	                reject(promise, e);
	
	            return true;
	        }
	
	        return false;
	    }
	
	    function resolve(promise, value){
	        if (promise === value || !handleThenable(promise, value))
	            fulfill(promise, value);
	    }
	
	    function fulfill(promise, value){
	        if (promise.state_ === PENDING)
	        {
	            promise.state_ = SEALED;
	            promise.data_ = value;
	
	            asyncCall(publishFulfillment, promise);
	        }
	    }
	
	    function reject(promise, reason){
	        if (promise.state_ === PENDING)
	        {
	            promise.state_ = SEALED;
	            promise.data_ = reason;
	
	            asyncCall(publishRejection, promise);
	        }
	    }
	
	    function publish(promise) {
	        var callbacks = promise.then_;
	        promise.then_ = undefined;
	
	        for (var i = 0; i < callbacks.length; i++) {
	            invokeCallback(callbacks[i]);
	        }
	    }
	
	    function publishFulfillment(promise){
	        promise.state_ = FULFILLED;
	        publish(promise);
	    }
	
	    function publishRejection(promise){
	        promise.state_ = REJECTED;
	        publish(promise);
	    }
	
	    /**
	     * @class
	     */
	    function Promise(resolver){
	        if (typeof resolver !== 'function')
	            throw new TypeError('Promise constructor takes a function argument');
	
	        if (this instanceof Promise === false)
	            throw new TypeError('Failed to construct \'Promise\': Please use the \'new\' operator, this object constructor cannot be called as a function.');
	
	        this.then_ = [];
	
	        invokeResolver(resolver, this);
	    }
	
	    Promise.prototype = {
	        constructor: Promise,
	
	        state_: PENDING,
	        then_: null,
	        data_: undefined,
	
	        then: function(onFulfillment, onRejection){
	            var subscriber = {
	                owner: this,
	                then: new this.constructor(NOOP),
	                fulfilled: onFulfillment,
	                rejected: onRejection
	            };
	
	            if (this.state_ === FULFILLED || this.state_ === REJECTED)
	            {
	                // already resolved, call callback async
	                asyncCall(invokeCallback, subscriber);
	            }
	            else
	            {
	                // subscribe
	                this.then_.push(subscriber);
	            }
	
	            return subscriber.then;
	        },
	
	        'catch': function(onRejection) {
	            return this.then(null, onRejection);
	        }
	    };
	
	    Promise.all = function(promises){
	        var Class = this;
	
	        if (!isArray(promises))
	            throw new TypeError('You must pass an array to Promise.all().');
	
	        return new Class(function(resolve, reject){
	            var results = [];
	            var remaining = 0;
	
	            function resolver(index){
	                remaining++;
	                return function(value){
	                    results[index] = value;
	                    if (!--remaining)
	                        resolve(results);
	                };
	            }
	
	            for (var i = 0, promise; i < promises.length; i++)
	            {
	                promise = promises[i];
	
	                if (promise && typeof promise.then === 'function')
	                    promise.then(resolver(i), reject);
	                else
	                    results[i] = promise;
	            }
	
	            if (!remaining)
	                resolve(results);
	        });
	    };
	
	    Promise.race = function(promises){
	        var Class = this;
	
	        if (!isArray(promises))
	            throw new TypeError('You must pass an array to Promise.race().');
	
	        return new Class(function(resolve, reject) {
	            for (var i = 0, promise; i < promises.length; i++)
	            {
	                promise = promises[i];
	
	                if (promise && typeof promise.then === 'function')
	                    promise.then(resolve, reject);
	                else
	                    resolve(promise);
	            }
	        });
	    };
	
	    Promise.resolve = function(value){
	        var Class = this;
	
	        if (value && typeof value === 'object' && value.constructor === Class)
	            return value;
	
	        return new Class(function(resolve){
	            resolve(value);
	        });
	    };
	
	    Promise.reject = function(reason){
	        var Class = this;
	
	        return new Class(function(resolve, reject){
	            reject(reason);
	        });
	    };
	
	    if (typeof  global['Promise'] === "undefined") {
	        global.Promise = Promise;
	    }
	}(window));

	var m4qVersion = "v1.0.0. Built at 20/05/2019 15:51:48";
	var regexpSingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
	
	var matches = Element.prototype.matches
	    || Element.prototype.matchesSelector
	    || Element.prototype.webkitMatchesSelector
	    || Element.prototype.mozMatchesSelector
	    || Element.prototype.msMatchesSelector
	    || Element.prototype.oMatchesSelector;
	
	var m4q = function(selector, context){
	    return new m4q.init(selector, context);
	};
	
	m4q.uniqueId = function () {
	    var d = new Date().getTime();
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r = (d + Math.random() * 16) % 16 | 0;
	        d = Math.floor(d / 16);
	        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	    });
	};
	
	m4q.toArray = function(n){
	    var i, out = [];
	
	    for (i = 0 ; i < n.length; i++ ) {
	        out.push(n[i]);
	    }
	
	    return out;
	};
	
	m4q.import = function(ctx){
	    var res = [], out = m4q();
	    this.each(ctx, function(){
	        res.push(this);
	    });
	    return this.merge(out, res);
	};
	
	m4q.version = m4qVersion;
	
	m4q.fn = m4q.prototype = {
	    version: m4qVersion,
	    constructor: m4q,
	    length: 0,
	    uid: "",
	
	    items: function(){
	        return m4q.toArray(this);
	    },
	
	    // TODO add element as argument
	    index: function(selector){
	        var res = [];
	
	        if (this.length === 0) {
	            return -1;
	        }
	
	        m4q.each(this[0].parentNode.children, function(){
	            var el = this;
	            if (selector) {
	                if (matches.call(el, selector)) res.push(el);
	            } else {
	                res.push(el);
	            }
	        });
	
	        return res.indexOf(this[0]);
	    },
	
	    get: function(index){
	        if (index === undefined) {
	            return this.items();
	        }
	        return index < 0 ? this[ index + this.length ] : this[ index ];
	    },
	
	    eq: function(index){
	        return m4q(this.get(index >= 0 ? index : this.length + index));
	    },
	
	    clone: function(){
	        var res = [], out = m4q();
	        this.each(function(){
	            res.push(this.cloneNode(true));
	        });
	        return m4q.merge(out, res);
	    },
	
	    origin: function(name, value, def){
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (not(name) && not(value)) {
	            return m4q.data(this[0]);
	        }
	
	        if (not(value)) {
	            var res = m4q.data(this[0], "origin-"+name);
	            return !not(res) ? res : def;
	        }
	
	        this.data("origin-"+name, value);
	
	        return this;
	    },
	
	    contains: function(s){
	        return this.find(s).length > 0;
	    },
	
	    is: function(s){
	        var result = false;
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (typeof  s === "string" && [':selected'].indexOf(s) === -1) {
	            this.each(function(){
	                if (matches.call(this, s)) {
	                    result = true;
	                }
	            });
	        } else
	
	        if (s === ":selected") {
	            return this[0].selected;
	        } else
	
	        if (isArrayLike(s)) {
	            this.each(function(){
	                var el = this;
	                m4q.each(s, function(){
	                    var sel = this;
	                    if (el === sel) {
	                        result = true;
	                    }
	                })
	            });
	        } else
	
	        if (typeof s === "object" && s.nodeType === 1) {
	            this.each(function(){
	                if  (this === s) {
	                    result = true;
	                }
	            })
	        }
	
	        return result;
	    },
	
	    last: function(){
	        return this.ind(this.length - 1);
	    },
	
	    first: function(){
	        return this.ind(0);
	    },
	
	    ind: function(i){
	        return this.length === 0 ? m4q() : m4q(this[i]);
	    },
	
	    odd: function(){
	        return m4q.merge(m4q(), this.filter(function(el, i){
	            return i % 2 === 0;
	        }));
	    },
	
	    even: function(){
	        return m4q.merge(m4q(), this.filter(function(el, i){
	            return i % 2 !== 0;
	        }));
	    },
	
	    _prop: function(prop, value){
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (arguments.length === 1) {
	            return this[0][prop];
	        }
	
	        if (not(value)) {
	            value = '';
	        }
	
	        this.each(function(){
	            var el = this;
	
	            el[prop] = value;
	
	            if (prop === "innerHTML") {
	                m4q.each(m4q(el).find("script"), function(){
	                    var script = this;
	                    var s = document.createElement('script');
	                    s.type = 'text/javascript';
	                    if (script.src) {
	                        s.src = script.src;
	                    } else {
	                        s.textContent = script.innerText;
	                    }
	                    document.body.appendChild(s);
	                    script.parentNode.removeChild(script);
	                });
	            }
	        });
	
	        return this;
	    },
	
	    val: function(value){
	        return arguments.length === 0 ? this._prop('value') : this._prop('value', typeof value === "undefined" ? "" : value);
	    },
	
	    prop: function(prop, value){
	        return arguments.length === 0 ? this._prop(prop) : this._prop(prop, typeof value === "undefined" ? "" : value);
	    },
	
	    id: function(){
	        if (this.length === 0) {
	            return ;
	        }
	        return this[0].getAttribute("id");
	    },
	
	    push: [].push,
	    sort: [].sort,
	    splice: [].splice,
	    indexOf: [].indexOf
	};
	
	m4q.extend = m4q.fn.extend = function(){
	    var options, name,
	        target = arguments[ 0 ] || {},
	        i = 1,
	        length = arguments.length;
	
	    if ( typeof target !== "object" && typeof target !== "function" ) {
	        target = {};
	    }
	
	    if ( i === length ) {
	        target = this;
	        i--;
	    }
	
	    for ( ; i < length; i++ ) {
	        if ( ( options = arguments[ i ] ) != null ) {
	            for ( name in options ) {
	                if (options.hasOwnProperty(name)) target[ name ] = options[ name ];
	            }
	        }
	    }
	
	    return target;
	};
	

	m4q.each = function(ctx, cb){
	    var index = 0;
	    if (isArrayLike(ctx)) {
	        [].forEach.call(ctx, function(val, key) {
	            cb.apply(val, [key, val]);
	        });
	    } else {
	        for(var key in ctx) {
	            if (ctx.hasOwnProperty(key))
	                cb.apply(ctx[key], [key, ctx[key],  index++]);
	        }
	    }
	
	    return ctx;
	};
	
	m4q.fn.extend({
	    each: function(cb){
	        return m4q.each(this, cb);
	    }
	});
	

	function acceptData(owner){
	    return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	}
	
	function getData(data){
	    if (data === "true") return true;
	    if (data === "false") return false;
	    if (data === "null") return null;
	    if (data === +data + "") return +data;
	    if (/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/.test(data)) return JSON.parse(data);
	    return data;
	}
	
	function dataAttr(elem, key, data){
	    var name;
	
	    if ( data === undefined && elem.nodeType === 1 ) {
	        name = "data-" + key.replace( /[A-Z]/g, "-$&" ).toLowerCase();
	        data = elem.getAttribute( name );
	
	        if ( typeof data === "string" ) {
	            try {
	                data = getData( data );
	            } catch ( e ) {}
	
	            dataSet.set( elem, key, data );
	        } else {
	            data = undefined;
	        }
	    }
	    return data;
	}
	
	var Data = function(ns){
	    this.expando = "DATASET:UID:" + ns.toUpperCase();
	    Data.uid++;
	};
	
	Data.uid = 1;
	
	Data.prototype = {
	    cache: function(owner){
	        var value = owner[this.expando];
	        if (!value) {
	            value = {};
	            if (acceptData(owner)) {
	                if (owner.nodeType) {
	                    owner[this.expando] = value;
	                } else {
	                    Object.defineProperty(owner, this.expando, {
	                        value: value,
	                        configurable: true
	                    });
	                }
	            }
	        }
	        return value;
	    },
	
	    set: function(owner, data, value){
	        var prop, cache = this.cache(owner);
	
	        if (typeof data === "string") {
	            cache[camelCase(data)] = value;
	        } else {
	            for (prop in data) {
	                if (data.hasOwnProperty(prop))
	                    cache[camelCase(prop)] = data[prop];
	            }
	        }
	        return cache;
	    },
	
	    get: function(owner, key){
	        return key === undefined ? this.cache(owner) : owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	    },
	
	    access: function(owner, key, value){
	        if (key === undefined || ((key && typeof key === "string") && value === undefined) ) {
	            return this.get(owner, key);
	        }
	        this.set(owner, key, value);
	        return value !== undefined ? value : key;
	    },
	
	    remove: function(owner, key){
	        var i, cache = owner[this.expando];
	        if (cache === undefined) {
	            return ;
	        }
	        if (key !== undefined) {
	            if ( Array.isArray( key ) ) {
	                key = key.map( camelCase );
	            } else {
	                key = camelCase( key );
	
	                key = key in cache ? [ key ] : ( key.match( /[^\x20\t\r\n\f]+/g ) || [] ); // ???
	            }
	
	            i = key.length;
	
	            while ( i-- ) {
	                delete cache[ key[ i ] ];
	            }
	        }
	        if ( key === undefined || isEmptyObject( cache ) ) {
	            if ( owner.nodeType ) {
	                owner[ this.expando ] = undefined;
	            } else {
	                delete owner[ this.expando ];
	            }
	        }
	        return true;
	    },
	
	    hasData: function(owner){
	        var cache = owner[ this.expando ];
	        return cache !== undefined && !isEmptyObject( cache );
	    }
	};
	
	var dataSet = new Data('Internal');
	
	m4q.extend({
	    Data: new Data('m4q'),
	
	    hasData: function(elem){
	        return dataSet.hasData(elem);
	    },
	
	    data: function(elem, name, data){
	        return dataSet.access(elem, name, data);
	    },
	
	    removeData: function(elem, name){
	        return dataSet.remove(elem, name);
	    }
	});
	
	m4q.fn.extend({
	    data: function(key, val){
	        var res, elem, data, attrs, name, i;
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        elem = this[0];
	
	        if ( key === undefined ) {
	            if ( this.length ) {
	                data = dataSet.get( elem );
	
	                if ( elem.nodeType === 1) {
	                    attrs = elem.attributes;
	                    i = attrs.length;
	                    while ( i-- ) {
	                        if ( attrs[ i ] ) {
	                            name = attrs[ i ].name;
	                            if ( name.indexOf( "data-" ) === 0 ) {
	                                name = camelCase( name.slice( 5 ) );
	                                dataAttr( elem, name, data[ name ] );
	                            }
	                        }
	                    }
	                }
	            }
	
	            return data;
	        }
	
	        if (val === undefined) {
	            res = dataSet.get(elem, key);
	            if (res === undefined) {
	                if ( elem.nodeType === 1) {
	                    if (elem.hasAttribute("data-"+key)) {
	                        res = elem.getAttribute("data-"+key);
	                    }
	                }
	            }
	            return res;
	        }
	
	        return this.each( function() {
	            dataSet.set( this, key, val );
	        } );
	    },
	
	    removeData: function( key ) {
	        return this.each( function() {
	            dataSet.remove( this, key );
	        } );
	    }
	});

	m4q.extend({
	    merge: function( first, second ) {
	        var len = +second.length,
	            j = 0,
	            i = first.length;
	
	        for ( ; j < len; j++ ) {
	            first[ i++ ] = second[ j ];
	        }
	
	        first.length = i;
	
	        return first;
	    },
	
	    type: function(obj){
	        return Object.prototype.toString.call(obj).replace(/^\[object (.+)]$/, '$1').toLowerCase();
	    },
	
	    camelCase: function(string){return camelCase(string);},
	    isPlainObject: function(obj){return isPlainObject(obj);},
	    isEmptyObject: function(obj){return isEmptyObject(obj);},
	    isArrayLike: function(obj){return isArrayLike(obj);},
	    acceptData: function(owner){return acceptData(owner);},
	    not: function(val){return not(val)},
	    parseUnit: function(str, out){return parseUnit(str, out)},
	
	    dataSet: function(ns){
	        if (['INTERNAL', 'M4Q'].indexOf(ns.toUpperCase()) > -1) {
	            throw Error("You can not use reserved name for your dataset");
	        }
	        return new Data(ns);
	    }
	});
	
	

	(function () {
	    if ( typeof window.CustomEvent === "function" ) return false;
	
	    function CustomEvent ( event, params ) {
	        params = params || { bubbles: false, cancelable: false, detail: null };
	        var evt = document.createEvent( 'CustomEvent' );
	        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
	        return evt;
	    }
	
	    CustomEvent.prototype = window.Event.prototype;
	
	    window.CustomEvent = CustomEvent;
	})();
	
	var overriddenStop =  Event.prototype.stopPropagation;
	var overriddenPrevent =  Event.prototype.preventDefault;
	
	Event.prototype.stopPropagation = function(){
	    this.isPropagationStopped = true;
	    overriddenStop.apply(this, arguments);
	};
	Event.prototype.preventDefault = function(){
	    this.isPreventedDefault = true;
	    overriddenPrevent.apply(this, arguments);
	};
	
	Event.prototype.stop = function(immediate){
	    return immediate ? this.stopImmediatePropagation() : this.stopPropagation();
	};
	
	m4q.extend({
	    events: [],
	    eventHook: {},
	
	    eventUID: 0,
	
	    setEventHandler: function(el, eventName, handler, selector, ns, id){
	        var i, freeIndex = -1, eventObj, resultIndex;
	        if (this.events.length > 0) {
	            for(i = 0; i < this.events.length; i++) {
	                if (this.events[i].handler === null) {
	                    freeIndex = i;
	                    break;
	                }
	            }
	        }
	
	        eventObj = {
	            element: el,
	            eventName: eventName,
	            handler: handler,
	            selector: selector,
	            ns: ns,
	            id: id
	        };
	
	        if (freeIndex === -1) {
	            this.events.push(eventObj);
	            resultIndex = this.events.length - 1;
	        } else {
	            this.events[freeIndex] = eventObj;
	            resultIndex = freeIndex;
	        }
	
	        return resultIndex;
	    },
	
	    getEventHandler: function(index){
	        if (this.events[index] !== undefined && this.events[index] !== null) {
	            this.events[index] = null;
	            return this.events[index].handler;
	        }
	        return undefined;
	    },
	
	    off: function(){
	        m4q.each(this.events, function(){
	            this.element.removeEventListener(this.eventName, this.handler);
	        });
	        this.events = [];
	        return this;
	    },
	
	    getEvents: function(){
	        return this.events;
	    },
	
	    addEventHook: function(event, handler){},
	    removeEventHook: function(event, index){},
	    removeEventHooks: function(event){},
	    clearEventHooks: function(){}
	});
	
	m4q.fn.extend({
	    on: function(eventsList, sel, handler, options){
	        var eventOptions;
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (typeof sel === "function") {
	            handler = sel;
	            options = handler;
	            sel = undefined;
	        }
	
	        options = isPlainObject(options) ? options : {};
	
	        eventOptions = {
	            once: options.once && options.once === true
	        };
	
	        return this.each(function(){
	            var el = this;
	            m4q.each(str2arr(eventsList), function(){
	                var h, ev = this,
	                    event = ev.split("."),
	                    name = event[0],
	                    ns = event[1],
	                    index, originEvent;
	
	                h = !sel ? handler : function(e){
	                    var target = e.target;
	
	                    while (target && target !== el) {
	                        if (matches.call(target, sel)) {
	                            handler.call(target, e);
	                            if (e.isPropagationStopped) {
	                                e.stop(true);
	                            }
	                        }
	                        target = target.parentNode;
	                    }
	                };
	
	                m4q.eventUID++;
	                originEvent = name+(sel ? ":"+sel:"")+(ns ? ":"+ns:"");
	                el.addEventListener(name, h, eventOptions);
	                index = m4q.setEventHandler(el, name, h, sel, ns, m4q.eventUID);
	                m4q(el).origin('event-'+originEvent, index);
	            });
	        });
	    },
	
	    one: function(events, sel, handler){
	        return this.on(events, sel, handler,{once: true})
	    },
	
	    off: function(eventsList, sel){
	        if (not(eventsList) || this.length === 0) {
	            return ;
	        }
	
	        if (eventsList.toLowerCase() === 'all') {
	            return this.each(function(){
	                var el = this;
	                m4q.each(m4q.events, function(){
	                    var e = this;
	                    if (e.element === el) {
	                        el.removeEventListener(e.eventName, e.handler);
	                        e.handler = null;
	                        m4q(el).origin("event-"+name+(e.selector ? ":"+e.selector:"")+(e.ns ? ":"+e.ns:""), null);
	                    }
	                })
	            });
	        }

	        return this.each(function(){
	            var el = this;
	            m4q.each(str2arr(eventsList), function(){
	                var evMap = this.split("."),
	                    name = evMap[0],
	                    ns = evMap[1],
	                    originEvent, index;
	
	                originEvent = "event-"+name+(sel ? ":"+sel:"")+(ns ? ":"+ns:"");
	                index = m4q(el).origin(originEvent);
	
	                if (index && m4q.events[index].handler) {
	                    el.removeEventListener(name, m4q.events[index].handler);
	                    m4q.events[index].handler = null;
	                }
	
	                m4q(el).origin(originEvent, null);
	            });
	        });
	    },
	
	    trigger: function(name, data){
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (['focus', 'blur'].indexOf(name) > -1) {
	            this[0][name]();
	            return this;
	        }
	
	        var e = new CustomEvent(name, data || {});
	
	        return this.each(function(){
	            this.dispatchEvent(e);
	        });
	    },
	
	    fire: function(name, data){
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (['focus', 'blur'].indexOf(name) > -1) {
	            this[0][name]();
	            return this;
	        }
	
	        var e = document.createEvent('Events');
	        e.detail = data;
	        e.initEvent(name, true, false);
	
	        return this.each(function(){
	            this.dispatchEvent(e);
	        });
	    }
	});
	
	( "blur focus resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu load touchstart touchend touchmove touchcancel" )
	    .split( " " )
	    .forEach(
	    function( name ) {
	        m4q.fn[ name ] = function( sel, fn, opt ) {
	            return arguments.length > 0 ?
	                this.on( name, sel, fn, opt ) :
	                this.trigger( name );
	        };
	});
	
	m4q.fn.extend( {
	    hover: function( fnOver, fnOut ) {
	        return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	    }
	});
	
	m4q.ready = function(fn){
	    document.addEventListener('DOMContentLoaded', fn);
	};
	

	m4q.fn.extend({
	    html: function(value){
	        return arguments.length === 0 ? this._prop('innerHTML') : this._prop('innerHTML', typeof value === "undefined" ? "" : value);
	    },
	
	    outerHTML: function(){
	        return this._prop('outerHTML');
	    },
	
	    text: function(value){
	        return arguments.length === 0 ? this._prop('textContent') : this._prop('textContent', typeof value === "undefined" ? "" : value);
	    },
	
	    innerText: function(value){
	        return arguments.length === 0 ? this._prop('innerText') : this._prop('innerText', typeof value === "undefined" ? "" : value);
	    },
	
	    empty: function(){
	        return this.each(function(){
	            this.innerHTML = "";
	        });
	    }
	});
	
	

	m4q.ajax = function(p){
	    return new Promise(function(resolve, reject){
	        var xhr = new XMLHttpRequest(), data;
	        var method = (p.method || 'GET').toUpperCase();
	        var headers = [];
	        var async = not(p.async) ? true : p.async;
	        var url = p.url;
	
	        var exec = function(fn, params){
	            if (typeof fn === "function") fn.apply(null, params);
	        };
	
	        if (p.data instanceof HTMLFormElement) {
	            var _action = p.data.getAttribute("action");
	            var _method = p.data.getAttribute("method");
	
	            if (not(url) && _action && _action.trim() !== "") url = _action;
	            if (_method && _method.trim() !== "") method = _method.toUpperCase();
	        }
	
	        xhr.open(method, url, async, p.user, p.password);
	
	        if (p.timeout) {
	            xhr.timeout = p.timeout;
	        }
	
	        if (p.withCredentials) {
	            xhr.withCredentials = p.withCredentials;
	        }
	
	        if (p.headers) {
	            m4q.each(function(k, v){
	                xhr.setRequestHeader(k, v);
	                headers.push(k);
	            });
	        }
	
	        if (p.data instanceof HTMLFormElement) {
	            data = new FormData(p.data);
	        } else if (p.data instanceof HTMLElement && p.data.getAttribute("type").toLowerCase() === "file") {
	            var _name = p.data.getAttribute("name");
	            data = new FormData();
	            for (var i = 0; i < p.data.files.length; i++) {
	                data.append(_name, p.data.files[i]);
	            }
	        } else if (isPlainObject(p.data)) {
	            var _data = [];
	            m4q.each(p.data, function(k, v){
	                _data.push(k+"="+v);
	            });
	            data = _data.join("&");
	            if (headers.indexOf("Content-type") === -1) {
	                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	            }
	        } else {
	            data = new FormData();
	            data.append("_data", JSON.stringify(p.data));
	        }
	
	        xhr.send(data);
	
	        xhr.addEventListener("load", function(e){
	            if (xhr.readyState === 4 && xhr.status < 300) {
	                var _return = p.returnValue && p.returnValue === 'xhr' ? xhr : p.parseJson ? JSON.parse(xhr.response) : xhr.response;
	                exec(resolve, [_return]);
	            } else {
	                exec(reject, [xhr]);
	            }
	            exec(p.onload, [e, xhr]);
	        });
	
	        xhr.addEventListener("readystatechange", function(e){
	            exec(p.onstate, [e, xhr]);
	        });
	
	        xhr.addEventListener("error", function(){
	            exec(reject, [xhr]);
	            exec(p.onerror, [e, xhr]);
	        });
	
	        xhr.addEventListener("timeout", function(e){
	            exec(reject, [xhr]);
	            exec(p.ontimeout, [e, xhr]);
	        });
	
	        xhr.addEventListener("progress", function(e){
	            exec(p.onprogress, [e, xhr]);
	        });
	
	        xhr.addEventListener("loadstart", function(e){
	            exec(p.onloadstart, [e, xhr]);
	        });
	
	        xhr.addEventListener("loadend", function(e){
	            exec(p.onloadend, [e, xhr]);
	        });
	
	        xhr.addEventListener("abort", function(e){
	            exec(p.onabort, [e, xhr]);
	        });
	    });
	};
	
	['get', 'post', 'put', 'patch', 'delete', 'json'].forEach(function(method){
	    m4q[method] = function(url, data, options){
	        var _method = method.toUpperCase();
	        var _options = {
	            method: _method === 'JSON' ? 'GET' : _method,
	            url: url,
	            data: data,
	            parseJson: _method === 'JSON'
	        };
	        return m4q.ajax(m4q.extend({}, _options, options));
	    }
	});
	

	
	//var nonDigit = /[^0-9.\-]/;
	var numProps = ['opacity'];
	
	m4q.fn.extend({
	    style: function(name){
	        if (this.length === 0) {
	            return this;
	        }
	        var el = this[0];
	        if (arguments.length === 0 || name === undefined) {
	            return el.style ? el.style : getComputedStyle(el, null);
	        } else {
	            return ["scrollLeft", "scrollTop"].indexOf(name) > -1 ? m4q(el)[name]() : el.style[name] ? el.style[name] : getComputedStyle(el, null)[name];
	        }
	    },
	
	    css: function(o, v){
	        if (this.length === 0) {
	            return this;
	        }
	
	        var el = this[0];
	
	        if (typeof o === "string" && v === undefined) {
	            return  el.style[o] ? el.style[o] : getComputedStyle(el, null)[o];
	        }
	
	        this.each(function(){
	            var el = this;
	            if (typeof o === "object") {
	                for (var key in o) {
	                    if (["scrollLeft", "scrollTop"].indexOf(key) > -1) {
	                        m4q(el)[name](parseInt(o[key]));
	                    } else {
	                        el.style[key] = o[key] === "" ? o[key] : isNaN(o[key]) || numProps.indexOf(key) > -1 ? o[key] : o[key] + 'px';
	                    }
	                }
	            } else if (typeof o === "string") {
	                if (["scrollLeft", "scrollTop"].indexOf(o) > -1) {
	                    m4q(el)[o](parseInt(v));
	                } else {
	                    el.style[o] = v === "" ? v : isNaN(v) || numProps.indexOf(o) > -1 ? v : v + 'px';
	                }
	            }
	        });
	
	        return this;
	    },
	
	    scrollTop: function(val){
	        if (not(val)) {
	            return this.length === 0 ? undefined : this[0] === window ? pageYOffset : this[0].scrollTop;
	        }
	        return this.each(function(){
	            this.scrollTop = val;
	        })
	    },
	
	    scrollLeft: function(val){
	        if (not(val)) {
	            return this.length === 0 ? undefined : this[0] === window ? pageXOffset : this[0].scrollLeft;
	        }
	        return this.each(function(){
	            this.scrollLeft = val;
	        })
	    }
	});
	
	

	m4q.fn.extend({
	    addClass: function(){},
	    removeClass: function(){},
	    toggleClass: function(){},
	
	    containsClass: function(cls){
	        return this.hasClass(cls);
	    },
	
	    hasClass: function(cls){
	        var result = false;
	
	        this.each(function(){
	            if (this.classList.contains(cls)) {
	                result = true;
	            }
	        });
	
	        return result;
	    },
	
	    clearClasses: function(){
	        return this.each(function(){
	            this.className = "";
	        });
	    }
	});
	
	['add', 'remove', 'toggle'].forEach(function (method) {
	    m4q.fn[method + "Class"] = function(cls){
	        if (!cls || (""+cls).trim() === "") return this;
	        return this.each(function(){
	            var el = this;
	            m4q.each(cls.split(" ").filter(function(v){
	                return (""+v).trim() !== "";
	            }), function(){
	                el.classList[method](this);
	            });
	        });
	    }
	});
	

	// TODO add scripts support
	m4q.parseHTML = function(data, context){
	    var base, singleTag, result = [], ctx, _context;
	
	    if (typeof data !== "string") {
	        return [];
	    }
	
	    data = data.trim();
	
	    ctx = document.implementation.createHTMLDocument("");
	    base = ctx.createElement( "base" );
	    base.href = document.location.href;
	    ctx.head.appendChild( base );
	    _context = ctx.body;
	
	    singleTag = regexpSingleTag.exec(data);
	
	    if (singleTag) {
	        result.push(document.createElement(singleTag[1]));
	    } else {
	        _context.innerHTML = data;
	        for(var i = 0; i < _context.childNodes.length; i++) {
	            result.push(_context.childNodes[i]);
	        }
	    }
	
	    if (context && !(context instanceof m4q) && isPlainObject(context)) {
	        m4q.each(result,function(){
	            var el = this;
	            for(var name in context) {
	                if (context.hasOwnProperty(name))
	                    el.setAttribute(name, context[name]);
	            }
	        });
	    }
	
	    return result;
	};
	

	m4q.fn.extend({
	    _size: function(prop, val){
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (val === undefined) {
	
	            var el = this[0];
	
	            if (prop === 'height') {
	                return el === window ? window.innerHeight : el === document ? el.body.clientHeight : el.clientHeight;
	            }
	            if (prop === 'width') {
	                return el === window ? window.innerWidth : el === document ? el.body.clientWidth : el.clientWidth;
	            }
	        }
	
	        return this.each(function(){
	            var el = this;
	            if (el === window || el === document) {return ;}
	            el.style[prop] = isNaN(val) ? val : val + 'px';
	        });
	    },
	
	    height: function(val){
	        return this._size.call(this, 'height', val);
	    },
	
	    width: function(val){
	        return this._size.call(this, 'width', val);
	    },
	
	    _sizeOut: function(prop, val){
	        var el, size, style, result;
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (val !== undefined && typeof val !== "boolean") {
	            return this.each(function(){
	                var el = this;
	                if (el === window || el === document) {return ;}
	                var style = getComputedStyle(el, null),
	                    bs = prop === 'width' ? parseInt(style['border-left-width']) + parseInt(style['border-right-width']) : parseInt(style['border-top-width']) + parseInt(style['border-bottom-width']),
	                    pa = prop === 'width' ? parseInt(style['padding-left']) + parseInt(style['padding-right']) : parseInt(style['padding-top']) + parseInt(style['padding-bottom']);
	
	                val = parseInt(val);
	                el.style[prop] = val + bs + pa + 'px';
	            });
	        }
	
	        el = this[0];
	        size = el[prop === 'width' ? 'offsetWidth' : 'offsetHeight'];
	        style = getComputedStyle(el);
	        result = size + parseInt(style[prop === 'width' ? 'margin-left' : 'margin-top']) + parseInt(style[prop === 'width' ? 'margin-right' : 'margin-bottom']);
	        return val === true ? result : size;
	    },
	
	    outerWidth: function(val){
	        return this._sizeOut.call(this, 'width', val);
	    },
	
	    outerHeight: function(val){
	        return this._sizeOut.call(this, 'height', val);
	    }
	});

	m4q.fn.extend({
	    offset: function(val){
	        var rect;
	        if (this.length === 0) {
	            return ;
	        }
	        if (not(val)) {
	            rect = this[0].getBoundingClientRect();
	            return {
	                top: rect.top + pageYOffset,
	                left: rect.left + pageXOffset
	            }
	        }
	        return this.each(function(){ //?
	            $(this).css({
	                top: val.top,
	                left: val.left
	            })
	        });
	    },
	
	    position: function(margin){
	        var ml = 0, mt = 0;
	
	        margin = !!margin;
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (margin) {
	            ml = parseInt(getComputedStyle(this[0], null)['margin-left']);
	            mt = parseInt(getComputedStyle(this[0], null)['margin-top']);
	        }
	
	        return {
	            left: this[0].offsetLeft - ml,
	            top: this[0].offsetTop - mt
	        }
	    }
	});

	m4q.fn.extend({
	    filter: function(fn){
	        return [].filter.call(this, fn);
	    },
	
	    find: function(s){
	        var res = [], out = m4q();
	
	        if (s instanceof m4q) return s;
	
	        if (this.length === 0) {
	            return this;
	        }
	
	        this.each(function () {
	            var el = this;
	            if (typeof el.querySelectorAll !== "undefined") res = [].slice.call(el.querySelectorAll(s));
	        });
	        return m4q.merge(out, res);
	    },
	
	    children: function(s){
	        var i, res = [], out = m4q();
	
	        if (s instanceof m4q) return s;
	
	        this.each(function(){
	            var el = this;
	            for(i = 0; i < el.children.length; i++) {
	                if (el.children[i].nodeType === 1)
	                    res.push(el.children[i]);
	            }
	        });
	        res = s ? res.filter(function(el){
	            return matches.call(el, s);
	        }) : res;
	        return m4q.merge(out, res);
	    },
	
	    parent: function(s){
	        var res = [], out = m4q();
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (s instanceof m4q) return s;
	
	        this.each(function(){
	            if (this.parentNode) {
	                res.push(this.parentNode);
	            }
	        });
	        res = s ? res.filter(function(el){
	            return matches.call(el, s);
	        }) : res;
	        return m4q.merge(out, res);
	    },
	
	    parents: function(s){
	        var res = [], out = m4q();
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (s instanceof m4q) return s;
	
	        this.each(function(){
	            var par = this.parentNode;
	            while (par) {
	                if (par.nodeType === 1) {
	
	                    if (!not(s)) {
	                        if (matches.call(par, s)) {
	                            res.push(par);
	                        }
	                    } else {
	                        res.push(par);
	                    }
	
	
	                }
	                par = par.parentNode;
	            }
	        });
	
	        return m4q.merge(out, res);
	    },
	
	    siblings: function(s){
	        var res = [], out = m4q();
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (s instanceof m4q) return s;
	
	        this.each(function(){
	            var el = this, elems = [].filter.call(el.parentNode.children, function(child){
	                return child !== el && (s ? matches.call(child, s) : true);
	            });
	
	            elems.forEach(function(el){
	                res.push(el);
	            })
	        });
	
	        return m4q.merge(out, res);
	    },
	
	    _siblingAll: function(dir, s){
	        var out = m4q();
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (s instanceof m4q) return s;
	
	        this.each(function(){
	            var el = this;
	            while (el) {
	                el = el[dir];
	                if (!el) break;
	                if (!s) {
	                    m4q.merge(out, m4q(el));
	                } else {
	                    if (matches.call(el, s)) {
	                        m4q.merge(out, m4q(el));
	                    }
	                }
	            }
	        });
	
	        return out;
	    },
	
	    _sibling: function(dir, s){
	        var out = m4q();
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (s instanceof m4q) return s;
	
	        out = m4q();
	
	        this.each(function(){
	            var sib = this[dir];
	            if (sib && sib.nodeType === 1) {
	                if (not(s)) {
	                    m4q.merge(out, m4q(sib));
	                } else {
	                    if (matches.call(sib, s)) {
	                        m4q.merge(out, m4q(sib));
	                    }
	                }
	            }
	        });
	
	        return out;
	    },
	
	    prev: function(s){
	        return this._sibling('previousElementSibling', s);
	    },
	
	    next: function(s){
	        return this._sibling('nextElementSibling', s);
	    },
	
	    prevAll: function(s){
	        return this._siblingAll('previousElementSibling', s);
	    },
	
	    nextAll: function(s){
	        return this._siblingAll('nextElementSibling', s);
	    },
	
	    closest: function(s){
	        var out = m4q();
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (s instanceof m4q) return s;
	
	        if (!s) {
	            return this.parent(s);
	        }
	
	        this.each(function(){
	            var el = this;
	            while (el) {
	                el = el.parentElement;
	                if (!el) break;
	                if (matches.call(el, s)) {
	                    m4q.merge(out, m4q(el));
	                    return ;
	                }
	            }
	        });
	
	        return out;
	    },
	
	    has: function(selector){
	        var out = m4q();
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        this.each(function(){
	            var el = m4q(this);
	            var child = el.children(selector);
	            if (child.length > 0) {
	                m4q.merge(out, el);
	            }
	        });
	
	        return out;
	    }
	});

	m4q.fn.extend({
	    attr: function(name, val){
	        var attributes = {};
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        if (arguments.length === 0) {
	            m4q.each(this[0].attributes, function(){
	                attributes[this.nodeName] = this.nodeValue;
	            });
	            return attributes;
	        }
	
	        if (not(name)) {
	            return name;
	        }
	
	        if (typeof name === 'string' && val === undefined) {
	            return this[0].nodeType === 1 && this[0].hasAttribute(name) ? this[0].getAttribute(name) : undefined;
	        }
	
	        if (isPlainObject(name)) {
	            this.each(function(){
	                for (var key in name) {
	                    if (name.hasOwnProperty(key))
	                        this.setAttribute(key, name[key]);
	                }
	            });
	        } else {
	            this.each(function(){
	                this.setAttribute(name, val);
	            });
	        }
	
	        return this;
	    },
	
	    removeAttr: function(name){
	        return this.each(function(){
	            if (this.hasAttribute(name)) this.removeAttribute(name);
	        });
	    },
	
	    toggleAttr: function(name, val){
	
	        if (not(name)) return ;
	
	        return this.each(function(){
	            var el = this;
	
	            if (not(val)) {
	                el.removeAttribute(name);
	            } else {
	                el.setAttribute(name, val);
	            }
	
	        });
	    }
	});
	
	m4q.extend({
	    meta: function(name){
	        return not(name) ? m4q("meta") : $("meta[name='$name']".replace("$name", name));
	    }
	});

	m4q.extend({
	    proxy: function(fn, context){
	        if (typeof fn !== "function") {
	            return ;
	        }
	        if (context === undefined || context === null) {
	            context = this;
	        }
	        return fn.bind(context);
	    }
	});
	

	// Polyfills for IE11
	(function (arr) {
	    arr.forEach(function (item) {
	        if (item.hasOwnProperty('append')) {
	            return;
	        }
	        Object.defineProperty(item, 'append', {
	            configurable: true,
	            enumerable: true,
	            writable: true,
	            value: function append() {
	                var argArr = Array.prototype.slice.call(arguments),
	                    docFrag = document.createDocumentFragment();
	
	                argArr.forEach(function (argItem) {
	                    var isNode = argItem instanceof Node;
	                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
	                });
	
	                this.appendChild(docFrag);
	            }
	        });
	    });
	})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
	
	(function (arr) {
	    arr.forEach(function (item) {
	        if (item.hasOwnProperty('prepend')) {
	            return;
	        }
	        Object.defineProperty(item, 'prepend', {
	            configurable: true,
	            enumerable: true,
	            writable: true,
	            value: function prepend() {
	                var argArr = Array.prototype.slice.call(arguments),
	                    docFrag = document.createDocumentFragment();
	
	                argArr.forEach(function (argItem) {
	                    var isNode = argItem instanceof Node;
	                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
	                });
	
	                this.insertBefore(docFrag, this.firstChild);
	            }
	        });
	    });
	})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
	
	m4q.fn.extend({
	    append: function(elements){
	        if (typeof elements === "string") {
	            elements = m4q.parseHTML(elements);
	        }
	        return this.each(function(elIndex, el){
	            m4q.each(elements, function(){
	                var child = this;
	                el.append(elIndex === 0 ? child : child.cloneNode(true));
	            });
	        })
	    },
	
	    appendTo: function(elements){
	        if (typeof elements === "string") {
	            elements = m4q.parseHTML(elements);
	        }
	        return this.each(function(){
	            var el = this;
	            m4q.each(elements, function(parIndex, parent){
	                parent.append(parIndex === 0 ? el : el.cloneNode(true));
	            });
	        })
	    },
	
	    prepend: function(elements){
	        if (typeof elements === "string") {
	            elements = m4q.parseHTML(elements);
	        }
	        return this.each(function (elIndex, el) {
	            m4q.each(elements, function(){
	                var child = this;
	                el.prepend(elIndex === 0 ? child : child.cloneNode(true))
	            });
	        })
	    },
	
	    prependTo: function(elements){
	        if (typeof elements === "string") {
	            elements = m4q.parseHTML(elements);
	        }
	        return this.each(function(){
	            var el = this;
	            m4q.each(elements, function(parIndex, parent){
	                $(parent).prepend(parIndex === 0 ? el : el.cloneNode(true));
	            })
	        })
	    },
	
	    insertBefore: function(elements){
	        if (typeof elements === "string") {
	            elements = m4q.parseHTML(elements);
	        }
	        return this.each(function(){
	            var el = this;
	            m4q.each(elements, function(elIndex, element){
	                element.parentNode.insertBefore(elIndex === 0 ? el : el.cloneNode(true), element);
	            });
	        })
	    },
	
	    insertAfter: function(elements){
	        if (typeof elements === "string") {
	            elements = m4q.parseHTML(elements);
	        }
	        return this.each(function(){
	            var el = this;
	            m4q.each(elements, function(elIndex, element){
	                element.parentNode.insertBefore(elIndex === 0 ? el : el.cloneNode(true), element.nextSibling);
	            });
	        });
	    },
	
	    after: function(html){
	        return this.each(function(){
	            var el = this;
	            if (typeof html === "string") {
	                el.insertAdjacentHTML('afterend', html);
	            } else {
	                m4q(html).insertAfter($(el));
	            }
	        })
	    },
	
	    before: function(html){
	        return this.each(function(){
	            var el = this;
	            if (typeof html === "string") {
	                el.insertAdjacentHTML('beforebegin', html);
	            } else {
	                m4q(html).insertBefore($(el));
	            }
	        });
	    },
	
	    clone: function(){
	        var res = [], out = m4q();
	        this.each(function(){
	            res.push(this.cloneNode(true));
	        });
	        return m4q.merge(out, res);
	    },
	
	    remove: function(selector){
	        var i = 0, node, out = [];
	
	        if (this.length === 0) {
	            return ;
	        }
	
	        for ( ; ( node = this[ i ] ) != null; i++ ) {
	            if (node.parentNode) {
	                out.push(node.parentNode.removeChild(node));
	            }
	        }
	
	        return selector ? out.filter(function(el){
	            return matches.call(el, selector);
	        }) : out;
	    }
	});

	var cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;
	
	m4q.extend({
	    easingDef: "linear",
	    easing: {
	        linear: function (t) { return t },
	        swing: function(t) { return 0.5 - Math.cos( t * Math.PI ) / 2; },
	
	        easeIn: function(t){return function(t){return Math.pow(t, 3)}},
	        easeOut: function(t){return function(t){return 1 - Math.abs(Math.pow(t-1, 3))}},
	        easeInOut: function(t){return function(t){return t<.5 ? this.easeIn(3)(t*2)/2 :this.easeOut(3)(t*2 - 1)/2+0.5}},
	
	        easeInQuad: function (t) { return t*t },
	        easeOutQuad: function (t) { return t*(2-t) },
	        easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
	
	        easeInCubic: function (t) { return t*t*t },
	        easeOutCubic: function (t) { return (--t)*t*t+1 },
	        easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
	
	        easeInQuart: function (t) { return t*t*t*t },
	        easeOutQuart: function (t) { return 1-(--t)*t*t*t },
	        easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
	
	        easeInQuint: function (t) { return t*t*t*t*t },
	        easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
	        easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },
	
	        easeInElastic: function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
	        easeOutElastic: function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
	        easeInOutElastic: function (t) { return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 },
	
	        easeInSin: function (t) {return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2);},
	        easeOutSin : function (t) {return Math.sin(Math.PI / 2 * t);},
	        easeInOutSin: function (t) {return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;}
	    },
	
	    animate: function(el, draw, dur, timing, cb){
	        var $el = m4q(el), start = performance.now();
	        var key, from, to, delta, unit, mapProps = {};
	
	        dur = dur || 300;
	        timing = timing || this.easingDef;
	
	        m4q(el).origin("animation-stop", 0);
	
	        if (isPlainObject(draw)) {
	            // TODO add prop value as array [from, to]
	            for (key in draw) {
	                if (draw.hasOwnProperty(key)) {
	                    if (!Array.isArray(draw[key])) {
	                        from = parseUnit($el.style(key));
	                        to = parseUnit(draw[key]);
	                    } else {
	                        from = parseUnit(draw[key][0]);
	                        to = parseUnit(draw[key][1]);
	                    }
	                    unit = to[1] === '' ? 'px' : to[1];
	                    delta = to[0] - from[0];
	                    mapProps[key] = [from[0], to[0], delta, unit];
	                }
	            }
	        }
	
	        $el.origin("animation", requestAnimationFrame(function animate(time) {
	            var p, t;
	            var stop = m4q(el).origin("animation-stop");
	
	            if ( stop > 0) {
	                if (stop === 2) m4q.proxy(draw, $el[0])(1);
	                cancelAnimationFrame(m4q(el).origin("animation"));
	                return;
	            }
	
	            t = (time - start) / dur;
	            if (t > 1) t = 1;
	
	            p = typeof timing === "string" ? m4q.easing[timing] ? m4q.easing[timing](t) : m4q.easing[m4q.easingDef](t) : timing(t);
	
	            if (typeof draw === "function") {
	
	                m4q.proxy(draw, $el[0])(p);
	
	            } else if (isPlainObject(draw)) {
	
	                (function(p){
	
	                    for (key in mapProps) {
	                        if (mapProps.hasOwnProperty(key))
	                            $el.css(key, mapProps[key][0] + (mapProps[key][2] * p) + mapProps[key][3]);
	                    }
	
	                })(p);
	
	            } else {
	                throw new Error("Unknown draw object. Must be a function or plain object");
	            }
	
	            if (p === 1 && typeof cb === "function") {
	                m4q.proxy(cb, el);
	                cb.call(el, arguments);
	            }
	            if (p < 1) {
	                $el.origin("animation", requestAnimationFrame(animate));
	            }
	        }));
	        return this;
	    },
	
	    stop: function(el, done){
	        m4q(el).origin("animation-stop", done === true ? 2 : 1);
	    }
	});
	
	m4q.fn.extend({
	    animate: function (draw, dur, timing, cb) {
	        return this.each(function(){
	            return m4q.animate(this, draw, dur, timing, cb);
	        })
	    },
	
	    stop: function(done){
	        return this.each(function(){
	            return m4q.stop(this, done);
	        })
	    }
	});
	
	

	m4q.extend({
	    hide: function(el, cb){
	        var $el = m4q(el);
	        if (!!el.style.display) {
	            $el.origin('display', (el.style.display ? el.style.display : getComputedStyle(el, null)['display']));
	        }
	        el.style.display = 'none';
	        if (typeof cb === "function") {
	            m4q.proxy(cb, el);
	            cb.call(el, arguments);
	        }
	        return this;
	    },
	
	    show: function(el, cb){
	        var display = m4q(el).origin('display', undefined, "block");
	        el.style.display = display ? display === 'none' ? 'block' : display : '';
	        if (parseInt(el.style.opacity) === 0) {
	            el.style.opacity = "1";
	        }
	        if (typeof cb === "function") {
	            m4q.proxy(cb, el);
	            cb.call(el, arguments);
	        }
	        return this;
	    },
	
	    visible: function(el, mode, cb){
	        if (mode === undefined) {
	            mode = true;
	        }
	        el.style.visibility = mode ? 'visible' : 'hidden';
	        if (typeof cb === "function") {
	            m4q.proxy(cb, el);
	            cb.call(el, arguments);
	        }
	        return this;
	    },
	
	    toggle: function(el, cb){
	        var func;
	        if ( getComputedStyle(el, null)['display'] !== 'none') {
	            func = 'hide';
	        } else {
	            func = 'show';
	        }
	        return m4q[func](el, cb);
	    },
	
	    fadeIn: function(el, dur, easing, cb){
	        if (not(dur) && not(easing) && not(cb)) {
	            cb = null;
	            dur = 1000;
	        } else
	
	        if (typeof dur === "function") {
	            cb = dur;
	            dur = 1000;
	        }
	
	        if (typeof easing === "function") {
	            cb = easing;
	            easing = "linear";
	        }
	
	        var originDisplay = m4q(el).origin("display", undefined, 'block');
	        var originOpacity = m4q(el).origin("opacity", undefined, 1);
	
	        el.style.opacity = 0;
	        el.style.display = originDisplay;
	
	        return this.animate(el, function(p){
	            el.style.opacity = originOpacity * p;
	            if (p === 1) {
	                el.style.display = originDisplay;
	            }
	        }, dur, easing, cb);
	    },
	
	    fadeOut: function(el, dur, easing, cb){
	        var $el = m4q(el), opacity;
	
	        if (not(dur) && not(easing) && not(cb)) {
	            cb = null;
	            dur = 1000;
	        } else
	        if (typeof dur === "function") {
	            cb = dur;
	            dur = 1000;
	        }
	        if (typeof easing === "function") {
	            cb = easing;
	            easing = "linear";
	        }
	
	        opacity = m4q(el).style('opacity');
	
	        $el.origin("display", m4q(el).style('display'));
	        $el.origin("opacity", opacity);
	
	        return this.animate(el, function(p){
	            el.style.opacity = (1 - p) * opacity;
	            if (p === 1) {
	                el.style.display = 'none';
	            }
	        }, dur, easing, cb);
	    },
	
	    slideDown: function(el, dur, easing, cb) {
	        var $el = m4q(el);
	        var targetHeight, originDisplay;
	
	        if (not(dur) && not(easing) && not(cb)) {
	            cb = null;
	            dur = 100;
	        } else
	        if (typeof dur === "function") {
	            cb = dur;
	            dur = 100;
	        }
	        if (typeof easing === "function") {
	            cb = easing;
	            easing = "linear";
	        }
	
	        $el.show().visible(false);
	        targetHeight = $el.origin("height", undefined, $el.height());
	        originDisplay = $el.origin("display", m4q(el).style('display'), "block");
	        $el.height(0).visible(true);
	
	        $el.css({
	            overflow: "hidden",
	            display: originDisplay === "none" ? "block" : originDisplay
	        });
	
	        return this.animate(el, function(p){
	            el.style.height = (targetHeight * p) + "px";
	            if (p === 1) {
	                $el.css({
	                    overflow: "",
	                    height: "",
	                    visibility: ""
	                })
	            }
	        }, dur, easing, cb);
	    },
	
	    slideUp: function(el, dur, easing, cb) {
	        var $el = m4q(el);
	        var currHeight;
	
	        if ($el.height() === 0) {
	            return ;
	        }
	
	        if (not(dur) && not(easing) && not(cb)) {
	            cb = null;
	            dur = 100;
	        } else
	        if (typeof dur === "function") {
	            cb = dur;
	            dur = 100;
	        }
	        if (typeof easing === "function") {
	            cb = easing;
	            easing = "linear";
	        }
	
	        currHeight = $el.height();
	        $el.origin("height", currHeight);
	        $el.origin("display", m4q(el).style('display'));
	
	        $el.css({
	            overflow: "hidden"
	        });
	
	        return this.animate(el, function(p){
	            el.style.height = (1 - p) * currHeight + 'px';
	            if (p === 1) {
	                $el.hide().css({
	                    overflow: "",
	                    height: ""
	                });
	            }
	        }, dur, easing, cb);
	    }
	});
	
	m4q.fn.extend({
	    hide: function(cb){
	        var callback = undefined;
	
	        m4q.each(arguments, function(){
	            if (typeof this === 'function') {
	                callback = this;
	            }
	        });
	
	        return this.each(function(){
	            m4q.hide(this, callback);
	        });
	    },
	
	    show: function(cb){
	        var callback = undefined;
	
	        m4q.each(arguments, function(){
	            if (typeof this === 'function') {
	                callback = this;
	            }
	        });
	
	        return this.each(function(){
	            m4q.show(this, callback);
	        });
	    },
	
	    visible: function(mode, cb){
	        return this.each(function(){
	            m4q.visible(this, mode, cb);
	        });
	    },
	
	    toggle: function(cb){
	        if (typeof cb !== 'function') {
	            cb = null;
	        }
	        return this.each(function(){
	            m4q.toggle(this, cb);
	        })
	    },
	
	    fadeIn: function(dur, easing, cb){
	        return this.each(function(){
	            m4q.fadeIn(this, dur, easing, cb);
	        })
	    },
	
	    fadeOut: function(dur, easing, cb){
	        return this.each(function(){
	            m4q.fadeOut(this, dur, easing, cb);
	        })
	    },
	
	    slideUp: function(dur, easing, cb){
	        return this.each(function(){
	            m4q.slideUp(this, dur, easing, cb);
	        })
	    },
	
	    slideDown: function(dur, easing, cb){
	        return this.each(function(){
	            m4q.slideDown(this, dur, easing, cb);
	        })
	    }
	});
	
	

	m4q.init = function(sel, ctx){
	    var parsed;
	
	    if (!sel) {
	        return this;
	    }
	
	    if (typeof sel === "function") {
	        return m4q.ready(sel);
	    }
	
	    if (typeof sel === "object" && typeof jQuery !== "undefined" && sel instanceof jQuery) {
	        return m4q.import(sel);
	    }
	
	    if (sel === "document") {
	        sel = document;
	    }
	
	    if (sel === "body") {
	        sel = document.body;
	    }
	
	    if (sel.nodeType || sel === window) {
	        this[0] = sel;
	        this.length = 1;
	        return this;
	    }
	
	    if (sel instanceof m4q) {
	        return sel;
	    }
	
	    if (typeof sel === "object") {
	        return sel;
	    }
	
	    if (typeof sel === "string") {
	
	        sel = sel.trim();
	
	        if (sel === "#" || sel === ".") {
	            throw new Error("sel can't be # or .") ;
	        }
	
	        parsed = m4q.parseHTML(sel, ctx);
	
	        if (parsed.length === 1 && parsed[0].nodeType === 3) { // Must be a text node -> css sel
	            [].push.apply(this, document.querySelectorAll(sel));
	        } else {
	            m4q.merge(this, parsed);
	        }
	    }
	
	    if (ctx !== undefined && (ctx instanceof m4q || ctx instanceof HTMLElement)) {
	        this.each(function(){
	            $(ctx).append($(this))
	        });
	    }
	
	    this.uid = m4q.uniqueId();
	
	    return this;
	};
	
	m4q.init.prototype = m4q.fn;
	
var _$ = window.$,
	    _m4q = window.m4q,
	    _$M = window.$M;
	
	m4q.Promise = Promise;
	
	window.m4q = m4q;
	
	if (typeof window.$ === "undefined") {
	    window.$ = m4q;
	}
	
	if (typeof window.$M === "undefined") {
	    window.$M = m4q;
	}
	
	m4q.global = function(){
	    window.$M = window.$ = m4q;
	};
	
	m4q.noConflict = function(deep) {
	    if ( window.$ === m4q ) {
	        window.$ = _$;
	    }
	    if ( window.$M === m4q ) {
	        window.$M = _$M;
	    }
	
	    if (deep && window.m4q === m4q) {
	        window.m4q = _m4q;
	    }
	
	    return m4q;
	};
	
