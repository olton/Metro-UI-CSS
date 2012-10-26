(function($) {

    $.tileImageSlider = function(element, options) {

        // настройки по умолчанию
        var defaults = {
            // период смены картинок
            period: 2000,
            // продолжительность анимации
            duration: 1000,
            // направление анимации (up, down, left, right)
            direction: 'left'

        }
        // объект плагина
        var plugin = this;
        // настройки конкретного объекта
        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
             element = element;    // reference to the actual DOM element
             
        
        var images, // все картинки
            imagesWidth = [],
            imagesHeight = [],
            imagesLeft = [], // куда сдвигать по горизонтали
            imagesTop = [], // куда сдвигать по вертикали
            currentImageIndex; // индекс текущей картинки

        // инициализируем
        plugin.init = function() {
            
            var tileWidth,
                tileHeight;
            
            plugin.settings = $.extend({}, defaults, options);
            
            // все картинки
            images = $element.children(".tile-content").children('img');
            currentImageIndex = images.length - 1;
            // дублируем верхнюю картинку в самый низ, для непрерывности слайдинга
            $(images[currentImageIndex]).clone().appendTo($element.children(".tile-content"));
            
            // добавляем необходимые стили картинкам, но лучше добавить готовым стилем
            images.css({
                'position': 'absolute'
            });
            
            // размеры текущей плитки
            tileWidth = $element.innerWidth();
            tileHeight = $element.innerHeight();
            
            // сразу определяем все необходимые параметры изображений и сохраняем в соответствующие массивы
            images.each(function(index, image){
                
                var $image = $(image);
				
                imagesWidth[index] = $image.width();
                imagesHeight[index] = $image.height();

                if (plugin.settings.direction === 'left') {
                    imagesLeft[index] = - imagesWidth[index];
                } else if (plugin.settings.direction === 'right') {
                    imagesLeft[index] = tileWidth;
                } else {
                    imagesLeft[index] = 0;
                }

                if (plugin.settings.direction === 'up') {
                    imagesTop[index] = - imagesHeight[index];
                } else if (plugin.settings.direction === 'down') {
                    imagesTop[index] = tileHeight;
                } else {
                    imagesTop[index] = 0;
                }
            });

            
            
            // запускаем интервал для смены картинок
            setInterval(function(){
                slideImage();
            }, plugin.settings.period);
        }

        // сдвигаем текущую картинку
        var slideImage = function() {

            var imageToSlide, // картинка которую надо сдвинуть
                cssDestination;
                
            cssDestination = {
                'top': imagesTop[currentImageIndex],
                'left': imagesLeft[currentImageIndex]
            };
                
            imageToSlide = $(images[currentImageIndex]);
            imageToSlide.animate(cssDestination, plugin.settings.duration, function(){
                if (currentImageIndex === images.length - 1) {
                    resetImages();
                }
            });
            
            // индексы меняются в обратном порядке, так как последняя (в коде) картинка находится сверху
            currentImageIndex--;
            if (currentImageIndex < 0) {
                currentImageIndex = images.length - 1;
            }
        }
        
        // возвращаем все картинки на место
        var resetImages = function () {
            images.each(function(index, image){
                $(image).css({
                    'left': 0,
                    'top': 0
                })
            })
        }
        
        
        plugin.init();

    }

    $.fn.tileImageSlider = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('tileImageSlider')) {
                var plugin = new $.tileImageSlider(this, options);
                $(this).data('tileImageSlider', plugin);
            }
        });
    }

})(jQuery);

$(window).load(function(){
    $('[data-role=image-slider], .image-slider').tileImageSlider();
})