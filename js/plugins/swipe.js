var SwipeConst = {
    LEFT : "left",
    RIGHT : "right",
    UP : "up",
    DOWN : "down",
    IN : "in",
    OUT : "out",
    NONE : "none",
    AUTO : "auto",
    SWIPE : "swipe",
    PINCH : "pinch",
    TAP : "tap",
    DOUBLE_TAP : "doubletap",
    LONG_TAP : "longtap",
    HOLD : "hold",
    HORIZONTAL : "horizontal",
    VERTICAL : "vertical",
    ALL_FINGERS : "all",
    DOUBLE_TAP_THRESHOLD : 10,
    PHASE_START : "start",
    PHASE_MOVE : "move",
    PHASE_END : "end",
    PHASE_CANCEL : "cancel",
    SUPPORTS_TOUCH : 'ontouchstart' in window,
    SUPPORTS_POINTER_IE10 : window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !('ontouchstart' in window),
    SUPPORTS_POINTER : (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !('ontouchstart' in window),
    IN_TOUCH: "intouch"
};

var Swipe = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this.useTouchEvents = (SwipeConst.SUPPORTS_TOUCH || SwipeConst.SUPPORTS_POINTER || !this.options.fallbackToMouseEvents);
        this.START_EV = this.useTouchEvents ? (SwipeConst.SUPPORTS_POINTER ? (SwipeConst.SUPPORTS_POINTER_IE10 ? 'MSPointerDown' : 'pointerdown') : 'touchstart') : 'mousedown';
        this.MOVE_EV = this.useTouchEvents ? (SwipeConst.SUPPORTS_POINTER ? (SwipeConst.SUPPORTS_POINTER_IE10 ? 'MSPointerMove' : 'pointermove') : 'touchmove') : 'mousemove';
        this.END_EV = this.useTouchEvents ? (SwipeConst.SUPPORTS_POINTER ? (SwipeConst.SUPPORTS_POINTER_IE10 ? 'MSPointerUp' : 'pointerup') : 'touchend') : 'mouseup';
        this.LEAVE_EV = this.useTouchEvents ? (SwipeConst.SUPPORTS_POINTER ? 'mouseleave' : null) : 'mouseleave'; //we manually detect leave on touch devices, so null event here
        this.CANCEL_EV = (SwipeConst.SUPPORTS_POINTER ? (SwipeConst.SUPPORTS_POINTER_IE10 ? 'MSPointerCancel' : 'pointercancel') : 'touchcancel');

        //touch properties
        this.distance = 0;
        this.direction = null;
        this.currentDirection = null;
        this.duration = 0;
        this.startTouchesDistance = 0;
        this.endTouchesDistance = 0;
        this.pinchZoom = 1;
        this.pinchDistance = 0;
        this.pinchDirection = 0;
        this.maximumsMap = null;

        //Current phase of th touch cycle
        this.phase = "start";

        // the current number of fingers being used.
        this.fingerCount = 0;

        //track mouse points / delta
        this.fingerData = {};

        //track times
        this.startTime = 0;
        this.endTime = 0;
        this.previousTouchEndTime = 0;
        this.fingerCountAtRelease = 0;
        this.doubleTapStartTime = 0;

        //Timeouts
        this.singleTapTimeout = null;
        this.holdTimeout = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: ".no-swipe",
        preventDefaultEvents: true,

        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null, // params: phase, direction, distance, duration, fingerCount, fingerData, currentDirection
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,

        onSwipeCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;

        if (o.allowPageScroll === undefined && (o.swipe !== undefined || o.swipeStatus !== undefined)) {
            o.allowPageScroll = SwipeConst.NONE;
        }

        try {
            element.bind(this.START_EV, $.proxy(this.touchStart, that));
            element.bind(this.CANCEL_EV, $.proxy(this.touchCancel, that));
        } catch (e) {
            $.error('Events not supported ' + this.START_EV + ',' + this.CANCEL_EV + ' on Swipe');
        }

        Utils.exec(o.onSwipeCreate, [element]);
    },

    touchStart: function(e) {
        var element = this.element, options = this.options;

        //If we already in a touch event (a finger already in use) then ignore subsequent ones..
        if (this.getTouchInProgress()) {
            return;
        }

        //Check if this element matches any in the excluded elements selectors,  or its parent is excluded, if so, DON'T swipe
        if ($(e.target).closest(options.excludedElements, element).length > 0) {
            return;
        }

        //As we use Jquery bind for events, we need to target the original event object
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = e.originalEvent ? e.originalEvent : e;

        var ret,
            touches = event.touches,
            evt = touches ? touches[0] : event;

        this.phase = SwipeConst.PHASE_START;

        //If we support touches, get the finger count
        if (touches) {
            // get the total number of fingers touching the screen
            this.fingerCount = touches.length;
        }
        //Else this is the desktop, so stop the browser from dragging content
        else if (options.preventDefaultEvents !== false) {
            e.preventDefault(); //call this on jq event so we are cross browser
        }

        //clear vars..
        this.distance = 0;
        this.direction = null;
        this.currentDirection=null;
        this.pinchDirection = null;
        this.duration = 0;
        this.startTouchesDistance = 0;
        this.endTouchesDistance = 0;
        this.pinchZoom = 1;
        this.pinchDistance = 0;
        this.maximumsMap = this.createMaximumsData();
        this.cancelMultiFingerRelease();

        //Create the default finger data
        this.createFingerData(0, evt);

        // check the number of fingers is what we are looking for, or we are capturing pinches
        if (!touches || (this.fingerCount === options.fingers || options.fingers === SwipeConst.ALL_FINGERS) || this.hasPinches()) {
            // get the coordinates of the touch
            this.startTime = this.getTimeStamp();

            if (this.fingerCount === 2) {
                //Keep track of the initial pinch distance, so we can calculate the diff later
                //Store second finger data as start
                this.createFingerData(1, touches[1]);
                this.startTouchesDistance = this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].start, this.fingerData[1].start);
            }

            if (options.swipeStatus || options.pinchStatus) {
                ret = this.triggerHandler(event, this.phase);
            }
        } else {
            //A touch with more or less than the fingers we are looking for, so cancel
            ret = false;
        }

        //If we have a return value from the users handler, then return and cancel
        if (ret === false) {
            this.phase = SwipeConst.PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
            return ret;
        } else {
            if (options.hold) {
                this.holdTimeout = setTimeout($.proxy(function() {
                    //Trigger the event
                    element.trigger('hold', [event.target]);
                    //Fire the callback
                    if (options.hold) {
                        ret = options.hold.call(element, event, event.target);
                    }
                }, this), options.longTapThreshold);
            }

            this.setTouchInProgress(true);
        }

        return null;
    },

    touchMove: function(e) {
        //As we use Jquery bind for events, we need to target the original event object
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = e.originalEvent ? e.originalEvent : e;

        //If we are ending, cancelling, or within the threshold of 2 fingers being released, don't track anything..
        if (this.phase === SwipeConst.PHASE_END || this.phase === SwipeConst.PHASE_CANCEL || this.inMultiFingerRelease())
            return;

        var ret,
            touches = event.touches,
            evt = touches ? touches[0] : event;

        //Update the  finger data
        var currentFinger = this.updateFingerData(evt);
        this.endTime = this.getTimeStamp();

        if (touches) {
            this.fingerCount = touches.length;
        }

        if (this.options.hold) {
            clearTimeout(this.holdTimeout);
        }

        this.phase = SwipeConst.PHASE_MOVE;

        //If we have 2 fingers get Touches distance as well
        if (this.fingerCount === 2) {

            //Keep track of the initial pinch distance, so we can calculate the diff later
            //We do this here as well as the start event, in case they start with 1 finger, and the press 2 fingers
            if (this.startTouchesDistance === 0) {
                //Create second finger if this is the first time...
                this.createFingerData(1, touches[1]);

                this.startTouchesDistance = this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].start, this.fingerData[1].start);
            } else {
                //Else just update the second finger
                this.updateFingerData(touches[1]);

                this.endTouchesDistance = this.calculateTouchesDistance(this.fingerData[0].end, this.fingerData[1].end);
                this.pinchDirection = this.calculatePinchDirection(this.fingerData[0].end, this.fingerData[1].end);
            }

            this.pinchZoom = this.calculatePinchZoom(this.startTouchesDistance, this.endTouchesDistance);
            this.pinchDistance = Math.abs(this.startTouchesDistance - this.endTouchesDistance);
        }

        if ((this.fingerCount === this.options.fingers || this.options.fingers === SwipeConst.ALL_FINGERS) || !touches || this.hasPinches()) {

            //The overall direction of the swipe. From start to now.
            this.direction = this.calculateDirection(currentFinger.start, currentFinger.end);

            //The immediate direction of the swipe, direction between the last movement and this one.
            this.currentDirection = this.calculateDirection(currentFinger.last, currentFinger.end);

            //Check if we need to prevent default event (page scroll / pinch zoom) or not
            this.validateDefaultEvent(e, this.currentDirection);

            //Distance and duration are all off the main finger
            this.distance = this.calculateDistance(currentFinger.start, currentFinger.end);
            this.duration = this.calculateDuration();

            //Cache the maximum distance we made in this direction
            this.setMaxDistance(this.direction, this.distance);

            //Trigger status handler
            ret = this.triggerHandler(event, this.phase);


            //If we trigger end events when threshold are met, or trigger events when touch leaves element
            if (!this.options.triggerOnTouchEnd || this.options.triggerOnTouchLeave) {

                var inBounds = true;

                //If checking if we leave the element, run the bounds check (we can use touchleave as its not supported on webkit)
                if (this.options.triggerOnTouchLeave) {
                    var bounds = this.getBounds(this);
                    inBounds = this.isInBounds(currentFinger.end, bounds);
                }

                //Trigger end handles as we swipe if thresholds met or if we have left the element if the user has asked to check these..
                if (!this.options.triggerOnTouchEnd && inBounds) {
                    this.phase = this.getNextPhase(SwipeConst.PHASE_MOVE);
                }
                //We end if out of bounds here, so set current phase to END, and check if its modified
                else if (this.options.triggerOnTouchLeave && !inBounds) {
                    this.phase = this.getNextPhase(SwipeConst.PHASE_END);
                }

                if (this.phase === SwipeConst.PHASE_CANCEL || this.phase === SwipeConst.PHASE_END) {
                    this.triggerHandler(event, this.phase);
                }
            }
        } else {
            this.phase = SwipeConst.PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        }

        if (ret === false) {
            this.phase = SwipeConst.PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        }
    },

    touchEnd: function(e) {
        //As we use Jquery bind for events, we need to target the original event object
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = e.originalEvent ? e.originalEvent : e,
            touches = event.touches;

        //If we are still in a touch with the device wait a fraction and see if the other finger comes up
        //if it does within the threshold, then we treat it as a multi release, not a single release and end the touch / swipe
        if (touches) {
            if (touches.length && !this.inMultiFingerRelease()) {
                this.startMultiFingerRelease(event);
                return true;
            } else if (touches.length && this.inMultiFingerRelease()) {
                return true;
            }
        }

        //If a previous finger has been released, check how long ago, if within the threshold, then assume it was a multifinger release.
        //This is used to allow 2 fingers to release fractionally after each other, whilst maintaining the event as containing 2 fingers, not 1
        if (this.inMultiFingerRelease()) {
            this.fingerCount = this.fingerCountAtRelease;
        }

        //Set end of swipe
        this.endTime = this.getTimeStamp();

        //Get duration incase move was never fired
        this.duration = this.calculateDuration();

        //If we trigger handlers at end of swipe OR, we trigger during, but they didnt trigger and we are still in the move phase
        if (this.didSwipeBackToCancel() || !this.validateSwipeDistance()) {
            this.phase = SwipeConst.PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        } else if (this.options.triggerOnTouchEnd || (this.options.triggerOnTouchEnd === false && this.phase === SwipeConst.PHASE_MOVE)) {
            //call this on jq event so we are cross browser
            if (this.options.preventDefaultEvents !== false) {
                e.preventDefault();
            }
            this.phase = SwipeConst.PHASE_END;
            this.triggerHandler(event, this.phase);
        }
        //Special cases - A tap should always fire on touch end regardless,
        //So here we manually trigger the tap end handler by itself
        //We dont run trigger handler as it will re-trigger events that may have fired already
        else if (!this.options.triggerOnTouchEnd && this.hasTap()) {
            //Trigger the pinch events...
            this.phase = SwipeConst.PHASE_END;
            this.triggerHandlerForGesture(event, this.phase, SwipeConst.TAP);
        } else if (this.phase === SwipeConst.PHASE_MOVE) {
            this.phase = SwipeConst.PHASE_CANCEL;
            this.triggerHandler(event, this.phase);
        }

        this.setTouchInProgress(false);

        return null;
    },

    touchCancel: function() {
        // reset the variables back to default values
        this.fingerCount = 0;
        this.endTime = 0;
        this.startTime = 0;
        this.startTouchesDistance = 0;
        this.endTouchesDistance = 0;
        this.pinchZoom = 1;

        //If we were in progress of tracking a possible multi touch end, then re set it.
        this.cancelMultiFingerRelease();

        this.setTouchInProgress(false);
    },

    touchLeave: function(e) {
        //If these events are being programmatically triggered, we don't have an original event object, so use the Jq one.
        var event = e.originalEvent ? e.originalEvent : e;

        //If we have the trigger on leave property set....
        if (this.options.triggerOnTouchLeave) {
            this.phase = this.getNextPhase(SwipeConst.PHASE_END);
            this.triggerHandler(event, this.phase);
        }
    },

    getNextPhase: function(currentPhase) {
        var options  = this.options;
        var nextPhase = currentPhase;

        // Ensure we have valid swipe (under time and over distance  and check if we are out of bound...)
        var validTime = this.validateSwipeTime();
        var validDistance = this.validateSwipeDistance();
        var didCancel = this.didSwipeBackToCancel();

        //If we have exceeded our time, then cancel
        if (!validTime || didCancel) {
            nextPhase = SwipeConst.PHASE_CANCEL;
        }
        //Else if we are moving, and have reached distance then end
        else if (validDistance && currentPhase === SwipeConst.PHASE_MOVE && (!options.triggerOnTouchEnd || options.triggerOnTouchLeave)) {
            nextPhase = SwipeConst.PHASE_END;
        }
        //Else if we have ended by leaving and didn't reach distance, then cancel
        else if (!validDistance && currentPhase === SwipeConst.PHASE_END && options.triggerOnTouchLeave) {
            nextPhase = SwipeConst.PHASE_CANCEL;
        }

        return nextPhase;
    },

    triggerHandler: function(event, phase) {
        var ret,
            touches = event.touches;

        // SWIPE GESTURES
        if (this.didSwipe() || this.hasSwipes()) {
            ret = this.triggerHandlerForGesture(event, phase, SwipeConst.SWIPE);
        }

        // PINCH GESTURES (if the above didn't cancel)
        if ((this.didPinch() || this.hasPinches()) && ret !== false) {
            ret = this.triggerHandlerForGesture(event, phase, SwipeConst.PINCH);
        }

        // CLICK / TAP (if the above didn't cancel)
        if (this.didDoubleTap() && ret !== false) {
            //Trigger the tap events...
            ret = this.triggerHandlerForGesture(event, phase, SwipeConst.DOUBLE_TAP);
        }

        // CLICK / TAP (if the above didn't cancel)
        else if (this.didLongTap() && ret !== false) {
            //Trigger the tap events...
            ret = this.triggerHandlerForGesture(event, phase, SwipeConst.LONG_TAP);
        }

        // CLICK / TAP (if the above didn't cancel)
        else if (this.didTap() && ret !== false) {
            //Trigger the tap event..
            ret = this.triggerHandlerForGesture(event, phase, SwipeConst.TAP);
        }

        // If we are cancelling the gesture, then manually trigger the reset handler
        if (phase === SwipeConst.PHASE_CANCEL) {
            this.touchCancel(event);
        }

        // If we are ending the gesture, then manually trigger the reset handler IF all fingers are off
        if (phase === SwipeConst.PHASE_END) {
            //If we support touch, then check that all fingers are off before we cancel
            if (touches) {
                if (!touches.length) {
                    this.touchCancel(event);
                }
            } else {
                this.touchCancel(event);
            }
        }

        return ret;
    },

    triggerHandlerForGesture: function(event, phase, gesture) {

        var ret, element = this.element, options = this.options;

        //SWIPES....
        if (gesture === SwipeConst.SWIPE) {
            //Trigger status every time..
            element.trigger('swipeStatus', [phase, this.direction || null, this.distance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.currentDirection]);

            if (options.swipeStatus) {
                ret = options.swipeStatus.call(element, event, phase, this.direction || null, this.distance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.currentDirection);
                //If the status cancels, then dont run the subsequent event handlers..
                if (ret === false) return false;
            }

            if (phase === SwipeConst.PHASE_END && this.validateSwipe()) {

                //Cancel any taps that were in progress...
                clearTimeout(this.singleTapTimeout);
                clearTimeout(this.holdTimeout);

                element.trigger('swipe', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                if (options.swipe) {
                    ret = options.swipe.call(element, event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection);
                    //If the status cancels, then dont run the subsequent event handlers..
                    if (ret === false) return false;
                }

                //trigger direction specific event handlers
                switch (this.direction) {
                    case SwipeConst.LEFT:
                        element.trigger('swipeLeft', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                        if (options.swipeLeft) {
                            ret = options.swipeLeft.call(element, event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection);
                        }
                        break;

                    case SwipeConst.RIGHT:
                        element.trigger('swipeRight', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                        if (options.swipeRight) {
                            ret = options.swipeRight.call(element, event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection);
                        }
                        break;

                    case SwipeConst.UP:
                        element.trigger('swipeUp', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                        if (options.swipeUp) {
                            ret = options.swipeUp.call(element, event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection);
                        }
                        break;

                    case SwipeConst.DOWN:
                        element.trigger('swipeDown', [this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection]);

                        if (options.swipeDown) {
                            ret = options.swipeDown.call(element, event, this.direction, this.distance, this.duration, this.fingerCount, this.fingerData, this.currentDirection);
                        }
                        break;
                }
            }
        }


        //PINCHES....
        if (gesture === SwipeConst.PINCH) {
            element.trigger('pinchStatus', [phase, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom]);

            if (options.pinchStatus) {
                ret = options.pinchStatus.call(element, event, phase, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom);
                //If the status cancels, then dont run the subsequent event handlers..
                if (ret === false) return false;
            }

            if (phase === SwipeConst.PHASE_END && this.validatePinch()) {

                switch (this.pinchDirection) {
                    case SwipeConst.IN:
                        element.trigger('pinchIn', [this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom]);

                        if (options.pinchIn) {
                            ret = options.pinchIn.call(element, event, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom);
                        }
                        break;

                    case SwipeConst.OUT:
                        element.trigger('pinchOut', [this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom]);

                        if (options.pinchOut) {
                            ret = options.pinchOut.call(element, event, this.pinchDirection || null, this.pinchDistance || 0, this.duration || 0, this.fingerCount, this.fingerData, this.pinchZoom);
                        }
                        break;
                }
            }
        }

        if (gesture === SwipeConst.TAP) {
            if (phase === SwipeConst.PHASE_CANCEL || phase === SwipeConst.PHASE_END) {

                clearTimeout(this.singleTapTimeout);
                clearTimeout(this.holdTimeout);

                //If we are also looking for doubelTaps, wait incase this is one...
                if (this.hasDoubleTap() && !this.inDoubleTap()) {
                    this.doubleTapStartTime = this.getTimeStamp();

                    //Now wait for the double tap timeout, and trigger this single tap
                    //if its not cancelled by a double tap
                    this.singleTapTimeout = setTimeout($.proxy(function() {
                        this.doubleTapStartTime = null;
                        element.trigger('tap', [event.target]);

                        if (options.tap) {
                            ret = options.tap.call(element, event, event.target);
                        }
                    }, this), options.doubleTapThreshold);

                } else {
                    this.doubleTapStartTime = null;
                    element.trigger('tap', [event.target]);
                    if (options.tap) {
                        ret = options.tap.call(element, event, event.target);
                    }
                }
            }
        } else if (gesture === SwipeConst.DOUBLE_TAP) {
            if (phase === SwipeConst.PHASE_CANCEL || phase === SwipeConst.PHASE_END) {
                clearTimeout(this.singleTapTimeout);
                clearTimeout(this.holdTimeout);
                this.doubleTapStartTime = null;
                element.trigger('doubletap', [event.target]);

                if (options.doubleTap) {
                    ret = options.doubleTap.call(element, event, event.target);
                }
            }
        } else if (gesture === SwipeConst.LONG_TAP) {
            if (phase === SwipeConst.PHASE_CANCEL || phase === SwipeConst.PHASE_END) {
                clearTimeout(this.singleTapTimeout);
                this.doubleTapStartTime = null;

                element.trigger('longtap', [event.target]);
                if (options.longTap) {
                    ret = options.longTap.call(element, event, event.target);
                }
            }
        }

        return ret;
    },

    validateSwipeDistance: function() {
        var valid = true;
        //If we made it past the min swipe distance..
        if (this.options.threshold !== null) {
            valid = this.distance >= this.options.threshold;
        }

        return valid;
    },

    didSwipeBackToCancel: function() {
        var options = this.options;
        var cancelled = false;
        if (options.cancelThreshold !== null && this.direction !== null) {
            cancelled = (this.getMaxDistance(this.direction) - this.distance) >= options.cancelThreshold;
        }

        return cancelled;
    },

    validatePinchDistance: function() {
        if (this.options.pinchThreshold !== null) {
            return this.pinchDistance >= this.options.pinchThreshold;
        }
        return true;
    },

    validateSwipeTime: function() {
        var result, options = this.options;

        if (options.maxTimeThreshold) {
            result = duration < options.maxTimeThreshold;
        } else {
            result = true;
        }

        return result;
    },

    validateDefaultEvent: function(e, direction) {
        var options = this.options;

        //If the option is set, allways allow the event to bubble up (let user handle weirdness)
        if (options.preventDefaultEvents === false) {
            return;
        }

        if (options.allowPageScroll === SwipeConst.NONE) {
            e.preventDefault();
        } else {
            var auto = options.allowPageScroll === SwipeConst.AUTO;

            switch (direction) {
                case SwipeConst.LEFT:
                    if ((options.swipeLeft && auto) || (!auto && options.allowPageScroll.toLowerCase() !== SwipeConst.HORIZONTAL)) {
                        e.preventDefault();
                    }
                    break;

                case SwipeConst.RIGHT:
                    if ((options.swipeRight && auto) || (!auto && options.allowPageScroll.toLowerCase() !== SwipeConst.HORIZONTAL)) {
                        e.preventDefault();
                    }
                    break;

                case SwipeConst.UP:
                    if ((options.swipeUp && auto) || (!auto && options.allowPageScroll.toLowerCase() !== SwipeConst.VERTICAL)) {
                        e.preventDefault();
                    }
                    break;

                case SwipeConst.DOWN:
                    if ((options.swipeDown && auto) || (!auto && options.allowPageScroll.toLowerCase() !== SwipeConst.VERTICAL)) {
                        e.preventDefault();
                    }
                    break;

                case SwipeConst.NONE:

                    break;
            }
        }
    },

    validatePinch: function() {
        var hasCorrectFingerCount = this.validateFingers();
        var hasEndPoint = this.validateEndPoint();
        var hasCorrectDistance = this.validatePinchDistance();
        return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;
    },

    hasPinches: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.pinchStatus || this.options.pinchIn || this.options.pinchOut);
    },

    didPinch: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validatePinch() && this.hasPinches());
    },

    validateSwipe: function() {
        //Check validity of swipe
        var hasValidTime = this.validateSwipeTime();
        var hasValidDistance = this.validateSwipeDistance();
        var hasCorrectFingerCount = this.validateFingers();
        var hasEndPoint = this.validateEndPoint();
        var didCancel = this.didSwipeBackToCancel();

        // if the user swiped more than the minimum length, perform the appropriate action
        // hasValidDistance is null when no distance is set
        return !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;
    },

    hasSwipes: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.swipe || this.options.swipeStatus || this.options.swipeLeft || this.options.swipeRight || this.options.swipeUp || this.options.swipeDown);
    },

    didSwipe: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateSwipe() && this.hasSwipes());
    },

    validateFingers: function() {
        //The number of fingers we want were matched, or on desktop we ignore
        return ((this.fingerCount === this.options.fingers || this.options.fingers === SwipeConst.ALL_FINGERS) || !SwipeConst.SUPPORTS_TOUCH);
    },

    validateEndPoint: function() {
        //We have an end value for the finger
        return this.fingerData[0].end.x !== 0;
    },

    hasTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.tap);
    },

    hasDoubleTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.doubleTap);
    },

    hasLongTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.options.longTap);
    },

    validateDoubleTap: function() {
        if (this.doubleTapStartTime == null) {
            return false;
        }
        var now = this.getTimeStamp();
        return (this.hasDoubleTap() && ((now - this.doubleTapStartTime) <= this.options.doubleTapThreshold));
    },

    inDoubleTap: function() {
        return this.validateDoubleTap();
    },

    validateTap: function() {
        return ((this.fingerCount === 1 || !SwipeConst.SUPPORTS_TOUCH) && (isNaN(this.distance) || this.distance < this.options.threshold));
    },

    validateLongTap: function() {
        var options = this.options;
        //slight threshold on moving finger
        return ((this.duration > options.longTapThreshold) && (this.distance < SwipeConst.DOUBLE_TAP_THRESHOLD)); // check double_tab_threshold where from
    },

    didTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateTap() && this.hasTap());
    },

    didDoubleTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateDoubleTap() && this.hasDoubleTap());
    },

    didLongTap: function() {
        //Enure we dont return 0 or null for false values
        return !!(this.validateLongTap() && this.hasLongTap());
    },

    startMultiFingerRelease: function(event) {
        this.previousTouchEndTime = this.getTimeStamp();
        this.fingerCountAtRelease = event.touches.length + 1;
    },

    cancelMultiFingerRelease: function() {
        this.previousTouchEndTime = 0;
        this.fingerCountAtRelease = 0;
    },

    inMultiFingerRelease: function() {
        var withinThreshold = false;

        if (this.previousTouchEndTime) {
            var diff = this.getTimeStamp() - this.previousTouchEndTime;
            if (diff <= this.options.fingerReleaseThreshold) {
                withinThreshold = true;
            }
        }

        return withinThreshold;
    },

    getTouchInProgress: function() {
        var element = this.element;
        //strict equality to ensure only true and false are returned
        return (element.data('intouch') === true);
    },

    setTouchInProgress: function(val) {
        var element = this.element;

        //If destroy is called in an event handler, we have no el, and we have already cleaned up, so return.
        if(!element) { return; }

        //Add or remove event listeners depending on touch status
        if (val === true) {
            element.bind(this.MOVE_EV, $.proxy(this.touchMove, this));
            element.bind(this.END_EV, $.proxy(this.touchEnd, this));

            //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
            if (this.LEAVE_EV) {
                element.bind(this.LEAVE_EV, $.proxy(this.touchLeave, this));
            }
        } else {

            element.unbind(this.MOVE_EV, this.touchMove, false);
            element.unbind(this.END_EV, this.touchEnd, false);

            //we only have leave events on desktop, we manually calcuate leave on touch as its not supported in webkit
            if (this.LEAVE_EV) {
                element.unbind(this.LEAVE_EV, this.touchLeave, false);
            }
        }

        //strict equality to ensure only true and false can update the value
        element.data('intouch', val === true);
    },

    createFingerData: function(id, evt) {
        var f = {
            start: {
                x: 0,
                y: 0
            },
            last: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            }
        };
        f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX;
        f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY;
        this.fingerData[id] = f;
        return f;
    },

    updateFingerData: function(evt) {
        var id = evt.identifier !== undefined ? evt.identifier : 0;
        var f = this.getFingerData(id);

        if (f === null) {
            f = this.createFingerData(id, evt);
        }

        f.last.x = f.end.x;
        f.last.y = f.end.y;

        f.end.x = evt.pageX || evt.clientX;
        f.end.y = evt.pageY || evt.clientY;

        return f;
    },

    getFingerData: function(id) {
        return this.fingerData[id] || null;
    },

    setMaxDistance: function(direction, distance) {
        if (direction === SwipeConst.NONE) return;
        distance = Math.max(distance, this.getMaxDistance(direction));
        this.maximumsMap[direction].distance = distance;
    },

    getMaxDistance: function(direction) {
        return (this.maximumsMap[direction]) ? this.maximumsMap[direction].distance : undefined;
    },

    createMaximumsData: function() {
        var maxData = {};
        maxData[SwipeConst.LEFT] = this.createMaximumVO(SwipeConst.LEFT);
        maxData[SwipeConst.RIGHT] = this.createMaximumVO(SwipeConst.RIGHT);
        maxData[SwipeConst.UP] = this.createMaximumVO(SwipeConst.UP);
        maxData[SwipeConst.DOWN] = this.createMaximumVO(SwipeConst.DOWN);

        return maxData;
    },

    createMaximumVO: function(dir) {
        return {
            direction: dir,
            distance: 0
        }
    },

    calculateDuration: function(){
        return this.endTime - this.startTime;
    },

    calculateTouchesDistance: function(startPoint, endPoint){
        var diffX = Math.abs(startPoint.x - endPoint.x);
        var diffY = Math.abs(startPoint.y - endPoint.y);

        return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
    },

    calculatePinchZoom: function(startDistance, endDistance){
        var percent = (endDistance / startDistance) * 100; // 1 ? 100
        return percent.toFixed(2);
    },

    calculatePinchDirection: function(){
        if (this.pinchZoom < 1) {
            return SwipeConst.OUT;
        } else {
            return SwipeConst.IN;
        }
    },

    calculateDistance: function(startPoint, endPoint){
        return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
    },

    calculateAngle: function(startPoint, endPoint){
        var x = startPoint.x - endPoint.x;
        var y = endPoint.y - startPoint.y;
        var r = Math.atan2(y, x); //radians
        var angle = Math.round(r * 180 / Math.PI); //degrees

        //ensure value is positive
        if (angle < 0) {
            angle = 360 - Math.abs(angle);
        }

        return angle;
    },

    calculateDirection: function(startPoint, endPoint){
        if( this.comparePoints(startPoint, endPoint) ) {
            return SwipeConst.NONE;
        }

        var angle = this.calculateAngle(startPoint, endPoint);

        if ((angle <= 45) && (angle >= 0)) {
            return SwipeConst.LEFT;
        } else if ((angle <= 360) && (angle >= 315)) {
            return SwipeConst.LEFT;
        } else if ((angle >= 135) && (angle <= 225)) {
            return SwipeConst.RIGHT;
        } else if ((angle > 45) && (angle < 135)) {
            return SwipeConst.DOWN;
        } else {
            return SwipeConst.UP;
        }
    },

    getTimeStamp: function(){
        return (new Date()).getTime();
    },

    getBounds: function (el) {
        el = $(el);
        var offset = el.offset();

        return {
            left: offset.left,
            right: offset.left + el.outerWidth(),
            top: offset.top,
            bottom: offset.top + el.outerHeight()
        };
    },

    isInBounds: function(point, bounds){
        return (point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom);
    },

    comparePoints: function(pointA, pointB) {
        return (pointA.x === pointB.x && pointA.y === pointB.y);
    },

    removeListeners: function() {
        var element = this.element;

        element.unbind(this.START_EV, this.touchStart, this);
        element.unbind(this.CANCEL_EV, this.touchCancel, this);
        element.unbind(this.MOVE_EV, this.touchMove, this);
        element.unbind(this.END_EV, this.touchEnd, this);

        //we only have leave events on desktop, we manually calculate leave on touch as its not supported in webkit
        if (this.LEAVE_EV) {
            element.unbind(this.LEAVE_EV, this.touchLeave, this);
        }

        this.setTouchInProgress(false);
    },

    enable: function(){
        this.disable();
        this.element.bind(this.START_EV, this.touchStart);
        this.element.bind(this.CANCEL_EV, this.touchCancel);
        return this.element;
    },

    disable: function(){
        this.removeListeners();
        return this.element;
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        this.removeListeners();
    }
};

Metro['swipe'] = SwipeConst;
Metro.plugin('swipe', Swipe);