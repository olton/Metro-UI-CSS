/**
 * TileSlider- jQuery plugin for MetroUiCss framework
 */

$.easing.doubleSqrt = function(t, millisecondsSince, startValue, endValue,
		totalDuration) {
	var res = Math.sqrt(Math.sqrt(t));
	return res;
};

(function($) {
	var pluginName = 'TileSlider', initAllSelector = '[data-role=tile-slider], .block-slider, .tile-slider', paramKeys = [
			'Period', 'Duration', 'Direction' ];

	$[pluginName] = function(element, options) {

		if (!element) {
			return $()[pluginName]({
				initAll : true
			});
		}

		// default settings
		// TODO: expose defaults with a $.fn[pluginName].defaults ={} block;
		var defaults = {
			// the period for changing images
			period : 2000,
			// animation length
			duration : 1000,
			// direction of animation (up, down, left, right)
			direction : 'up'
		};
		// object plugin
		var plugin = this;
		// plugin settings
		plugin.settings = {};

		var $element = $(element); // reference to the jQuery version of DOM element

		var blocks, //
		currentBlockIndex, // the index of the current block
		slideInPosition, // the start location of the block before the advent 
		slideOutPosition, // the final location of the block when you hide 
		tileWidth, // tile dimensions 
		tileHeight;

		// initialize
		plugin.init = function() {

			plugin.settings = $.extend({}, defaults, options);

			// all blocks
			blocks = $element.children(".tile-content");

			// Do nothing if only single content block
			if (blocks.length <= 1) {
				return;
			}

			// the index of the currently active block
			currentBlockIndex = 0;

			// current tile dimensions
			tileWidth = $element.innerWidth();
			tileHeight = $element.innerHeight();
			// block position
			slideInPosition = getSlideInPosition();
			slideOutPosition = getSlideOutPosition();

			// prepare the block animation

			blocks.each(function(index, block) {
				block = $(block);
				// blocks should be position:absolute
				// may be specified through style class
				// check and add if it is not
				if (block.css('position') !== 'absolute') {
					block.css('position', 'absolute');
				}
				// hide all blocks except the first
				// TODO: add random start option
				if (index !== 0) {
					block.css('left', tileWidth);
				}
			});

			// Use setInterval to do the period run
			// TODO: preserve return value of setInterval to handle a clean stop.
			setInterval(function() {
				slideBlock();
			}, plugin.settings.period);
		};

		// changing blocks
		var slideBlock = function() {

			var slideOutBlock, // the block that you want to hide
			slideInBlock, // block to show
			mainPosition = {
				'left' : 0,
				'top' : 0
			}, options;

			slideOutBlock = $(blocks[currentBlockIndex]);

			currentBlockIndex++;
			if (currentBlockIndex >= blocks.length) {
				currentBlockIndex = 0;
			}
			slideInBlock = $(blocks[currentBlockIndex]);

			slideInBlock.css(slideInPosition);

			options = {
				duration : plugin.settings.duration,
				easing : 'doubleSqrt'
			};

			slideOutBlock.animate(slideOutPosition, options);
			slideInBlock.animate(mainPosition, options);
		};

		// TODO: Consider refactoring the two functions below into one, given that the return values of
		// each are simply the negative of the twin (given that -0=0)
		// would seem an opportunity to shrink code size - consider good function name and usage to not
		// diminish the self-documentation value of the two functions.

		/**
		 * 
		 * Returns the starting position for the block that you want to appear {left: xxx, top: yyy}
		 */
		var getSlideInPosition = function() {
			var pos;
			if (plugin.settings.direction === 'left') {
				pos = {
					'left' : tileWidth,
					'top' : 0
				}
			} else if (plugin.settings.direction === 'right') {
				pos = {
					'left' : -tileWidth,
					'top' : 0
				}
			} else if (plugin.settings.direction === 'up') {
				pos = {
					'left' : 0,
					'top' : tileHeight
				}
			} else if (plugin.settings.direction === 'down') {
				pos = {
					'left' : 0,
					'top' : -tileHeight
				}
			}
			return pos;
		};

		/**
		 * 
		 * Returns the final position for the block to escape {left: xxx, top: yyy}
		 */
		var getSlideOutPosition = function() {
			var pos;
			if (plugin.settings.direction === 'left') {
				pos = {
					'left' : -tileWidth,
					'top' : 0
				}
			} else if (plugin.settings.direction === 'right') {
				pos = {
					'left' : tileWidth,
					'top' : 0
				}
			} else if (plugin.settings.direction === 'up') {
				pos = {
					'left' : 0,
					'top' : -tileHeight
				}
			} else if (plugin.settings.direction === 'down') {
				pos = {
					'left' : 0,
					'top' : tileHeight
				}
			}
			return pos;
		};

		plugin.getParams = function() {

			// code goes here

		};

		plugin.init();

	};

	$.fn[pluginName] = function(options) {
		var elements = options && options.initAll ? $(initAllSelector) : this;
		return elements.each(function() {
			var that = $(this), params = {}, plugin;
			if (undefined == that.data(pluginName)) {
				$.each(paramKeys, function(index, key) {
					// TODO: Look into IE10 issue
					// added try/catch block as I was seeing "no such method .toLowerCase()" errors in IE10,
					// although not in Chrome/Win (27.0.1453.94) Safari/Win (5.1.7) or Firefox/Win (21.0)
					// interestingly, catching and ignoring the exeception has tiles in IE10 behave correctly, but
					// throwing an "alert" into the catch will result in the tiles not having specified settings
					// applied - only the defaults.
					try {
						params[key[0].toLowerCase() + key.slice(1)] = that
								.data('param' + key);
					} catch (e) {

					}
				});
				plugin = new $[pluginName](this, params);
				that.data(pluginName, plugin);
			}
		});
	};

	// autoinit
	$(function() {
		$()[pluginName]({
			initAll : true
		});
	});

})(jQuery);
