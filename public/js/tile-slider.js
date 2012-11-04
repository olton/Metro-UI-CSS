$.easing.doubleSqrt = function(t, millisecondsSince, startValue, endValue, totalDuration) {
    var res = Math.sqrt(Math.sqrt(t));
    return res;
};

(function($) {

    $.tileBlockSlider = function(element, options) {

        // настройки по умолчанию
        var defaults = {
            // период смены картинок
            period: 2000,
            // продолжительность анимации
            duration: 1000,
            // направление анимации (up, down, left, right)
            direction: 'up'
        };
        // объект плагина
        var plugin = this;
        // настройки конкретного объекта
        plugin.settings = {};

        var $element = $(element), // reference to the jQuery version of DOM element
            element = element;    // reference to the actual DOM element

        var blocks, // все картинки
            currentBlockIndex, // индекс текущего блока
            slideInPosition, // стартовое положение блока перед началом появления
            slideOutPosition, // финальное положение блока при скрытии
            tileWidth, // размеры плитки
            tileHeight;

        // инициализируем
        plugin.init = function () {

            plugin.settings = $.extend({}, defaults, options);

            // все блоки
            blocks = $element.children(".tile-content");

            // если блок всего 1, то слайдинг не нужен
            if (blocks.length <= 1) {
                return;
            }

            // индекс активного в данный момент блока
            currentBlockIndex = 0;

            // размеры текущей плитки
            tileWidth = $element.innerWidth();
            tileHeight = $element.innerHeight();
            // положение блоков
            slideInPosition = getSlideInPosition();
            slideOutPosition = getSlideOutPosition();

            // подготавливаем блоки к анимации
            blocks.each(function (index, block) {
                block = $(block);
                // блоки должны быть position:absolute
                // возможно этот параметр задан через класс стилей
                // проверяем, и добавляем если это не так
                if (block.css('position') !== 'absolute') {
                    block.css('position', 'absolute');
                }
                // скрываем все блоки кроме первого
                if (index !== 0) {
                    block.css('left', tileWidth);
                }
            });

            // запускаем интервал для смены блоков
            setInterval(function () {
                slideBlock();
            }, plugin.settings.period);
        };

        // смена блоков
        var slideBlock = function() {

            var slideOutBlock, // блок который надо скрыть
                slideInBlock, // блок который надо показать
                mainPosition = {'left': 0, 'top': 0},
                options;

            slideOutBlock = $(blocks[currentBlockIndex]);

            currentBlockIndex++;
            if (currentBlockIndex >= blocks.length) {
                currentBlockIndex = 0;
            }
            slideInBlock = $(blocks[currentBlockIndex]);

            slideInBlock.css(slideInPosition);

            options = {
                duration: plugin.settings.duration,
                easing: 'doubleSqrt'
            };

            slideOutBlock.animate(slideOutPosition, options);
            slideInBlock.animate(mainPosition, options);
        };

        /**
         * возвращает стартовую позицию для блока который должен появиться {left: xxx, top: yyy}
         */
        var getSlideInPosition = function () {
            var pos;
            if (plugin.settings.direction === 'left') {
                pos = {
                    'left': tileWidth,
                    'top': 0
                }
            } else if (plugin.settings.direction === 'right') {
                pos = {
                    'left': -tileWidth,
                    'top': 0
                }
            } else if (plugin.settings.direction === 'up') {
                pos = {
                    'left': 0,
                    'top': tileHeight
                }
            } else if (plugin.settings.direction === 'down') {
                pos = {
                    'left': 0,
                    'top': -tileHeight
                }
            }
            return pos;
        };

        /**
         * возвращает финальную позицию для блока который должен скрыться {left: xxx, top: yyy}
         */
        var getSlideOutPosition = function () {
            var pos;
            if (plugin.settings.direction === 'left') {
                pos = {
                    'left': -tileWidth,
                    'top': 0
                }
            } else if (plugin.settings.direction === 'right') {
                pos = {
                    'left': tileWidth,
                    'top': 0
                }
            } else if (plugin.settings.direction === 'up') {
                pos = {
                    'left': 0,
                    'top': -tileHeight
                }
            } else if (plugin.settings.direction === 'down') {
                pos = {
                    'left': 0,
                    'top': tileHeight
                }
            }
            return pos;
        };

        plugin.getParams = function() {

            // code goes here

        }

        plugin.init();

    }

    $.fn.tileBlockSlider = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('tileBlockSlider')) {
                var plugin = new $.tileBlockSlider(this, options);
                $(this).data('tileBlockSlider', plugin);
            }
        });
    }

})(jQuery);


$(window).ready(function(){
    var slidedTiles = $('[data-role=tile-slider], .block-slider, .tile-slider');
    slidedTiles.each(function (index, tile) {
        var params = {};
        tile = $(tile);
        params.direction = tile.data('paramDirection');
        params.duration = tile.data('paramDuration');
        params.period = tile.data('paramPeriod');
        tile.tileBlockSlider(params);
    })

});