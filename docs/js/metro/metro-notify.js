(function($) {
	var _notify_container = false;
	var _notifies = [];
	
	var Notify = {
		
		_container: null,
		_notify: null,
		_timer: null,
		options: {
			icon: '', // to be implemented
			caption: '',
			content: '',
			shadow: true,
			width: 'auto',
			height: 'auto',
			style: false, // {background: '', color: ''}
			position: 'right', //right, left
			timeout: 3000
		},
		
		init: function(options) {
			this.options = $.extend({}, this.options, options);
			this._build();
			return this;
		},
		
		_build: function() {
			this._container = _notify_container || $("<div/>").addClass("metro notify-container").appendTo('body');
			_notify_container = this._container;
			var o = this.options;
			
			if (o.content == '' || o.content == undefined) return false;
			
			this._notify = $("<div/>").addClass("notify");
			
			if (o.shadow) this._notify.addClass("shadow");
       		if (o.style && o.style.background != undefined) this._notify.css("background-color", o.style.background);
        	if (o.style && o.style.color != undefined) this._notify.css("color", o.style.color);
			
			// add title
   	    	if (o.caption != '' && o.caption != undefined) {
   	    	    $("<div/>").addClass("caption").html(o.caption).appendTo(this._notify);
   	    	}
   	    	// add content
   	    	if (o.content != '' && o.content != undefined) {
   	    	    $("<div/>").addClass("content").html(o.content).appendTo(this._notify);
   	    	}
			
			if (o.width != 'auto') this._notify.css('min-width', o.width);
	        if (o.height != 'auto') this._notify.css('min-height', o.height);
			
			this._notify.hide().appendTo(this._container).fadeIn('slow');
        	_notifies.push(this._notify);
			
			this.close(o.timeout);
			
		},
		
		close: function(timeout) {
			this.clear();
			if(timeout == parseInt(timeout)) {
				var self = this
				this._timer = setTimeout(function() {
					self._timer = null;
					self._hide();
				}, timeout);
				return this;
			} else if(timeout == undefined) {
				return this._hide();
			}
			return this;
		},
		
		clear: function() {
			if(this._timer != null) {
				clearTimeout(this._timer);
				this._timer = null;
				return this;
			} else {
				return false;
			}
		},
		
		_hide: function() {
			this.clear();
		
			if(this._notify != undefined) {
        	   	this._notify.hide('slow', function() {
					$(this).remove();
					_notifies.splice(_notifies.indexOf(this._notify), 1);
				});
				return this;
			} else {
				return false;
			}
		},
		
		closeAll: function() {
			_notifies.forEach(function(notEntry) {
				notEntry.hide('slow', function() {
					notEntry.remove();
					_notifies.splice(_notifies.indexOf(notEntry), 1);
				});
			});
			return this;
		}
	};
	
	$.Notify = function(options) {
		return Object.create(Notify).init(options);
	}
	$.Notify.show = function(message, title) {
		return $.Notify({
       	    content: message,
       	    caption: title
       	});
    };
	
})(jQuery);
