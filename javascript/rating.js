/**
 * jQuery plugin for rating component of MetroUiCss framework
 * use attribute data-role="rating" or class="rating" to initialize rating plugin for some element
 * or use $(ratingElement).rating({parameters})
 *
 * available parameters (attributes):
 * data-role-stars="integer" stars count for this rating element (default 5)
 * data-role-rating="integer" current average rating (default 0)
 * data-role-read-only="string" ('on' or 'off') (default 'off')
 */
(function($) {

    $.Rating = function(element, options) {

        var defaults = {
            // stars count
            stars:      5,
            // init value
            rating:     0,
            // read only
            readOnly:   'off'

        };

        var plugin = this;

        plugin.settings = {};

        var $element = $(element),
            starElements = [],
            $starElements;

        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);

            if (plugin.settings.readOnly === 'on') {
                readOnlyInit();
            } else {
                clickableInit();
            }

        };

        /**
         * public methods to set and get rating (value, percent)
         * use it like this: $('#ratingElementID').data('Rating').setRating(4)
         */
        plugin.setRating = function (rating) {
            setRating(rating);
        };
        plugin.setRatingPercents = function (ratingPercents) {
            setRating((ratingPercents / 100) * plugin.settings.stars);
        };
        plugin.getRating = function () {
            return getRating();
        };
        plugin.getRatingPercents = function () {
            return getRating() / plugin.settings.stars * 100;
        };


        /**
         * init read-only rating
         */
        var readOnlyInit = function () {

            var inner, percents, width,
            settings = plugin.settings;

            $element.addClass('static-rating');

            width = ($element.hasClass('small') ? '14' : '27') * settings.stars;
            $element.css('width', width);

            inner = $('<div class="rating-value"></div>');

            percents = settings.rating / settings.stars * 100;
            inner.css('width', percents + '%');

            inner.appendTo($element);

        };

        /**
         * init not-read-only rating
         */
        var clickableInit = function () {
            var settings = plugin.settings,
                a, i;
            // create stars (count starts from 1)
            for (i = 1; i <= settings.stars; i++) {
                a = starElements[i] = $('<a href="javascript:void(0)"></a>');
                a.data('starIndex', i);
                a.appendTo($element);
            }

            // event handlers
            $starElements = $element.find('a');

            $starElements.on('mouseenter', function () {
                var index = $(this).data('starIndex');
                lightStars(0, true);
                lightStars(index);
                $element.trigger('hovered', [index]);
            });
            $starElements.on('mouseleave', function () {
                lightStars(0);
                lightStars(getRating(), true);
            });
            $starElements.on('click', function(){
                var index = $(this).data('starIndex');
                storeRating(index);
                $element.trigger('rated', [index]);
            });

            setRating(settings.rating);
        };

        /**
         * make stars fired (from first to (starIndex - 1))
         * or turn off stars if starIndex = 0
         * @param starIndex
         * @param rated if true - add 'rated' class, else 'hover'
         */
        var lightStars = function (starIndex, rated) {
            var class_ = rated ? 'rated' : 'hover';
            $starElements.removeClass(class_);
            $starElements.filter(':lt(' + starIndex + ')').addClass(class_);
        };

        /**
         * store rating to element.data
         * @param rating
         */
        var storeRating = function (rating) {
            $element.data('rating-val', rating);
        };

        /**
         * retrieve rating from element.data
         */
        var getRating = function () {
            return $element.data('rating-val');
        };

        /**
         * light stars and store rating
         * !!! used only if readOnly === 'off'
         * @param rating
         */
        var setRating = function (rating) {
            storeRating(rating);
            lightStars(rating, true);
        };

        plugin.init();

    };

    $.fn.Rating = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('Rating')) {
                var plugin = new $.Rating(this, options);
                $(this).data('Rating', plugin);
            }
        });

    };

})(jQuery);

$(function(){
    var allratings = $('[data-role=rating], .rating');
    allratings.each(function (index, rating) {
        var params = {};
        $rating = $(rating);
        params.stars        = $rating.data('paramStars');
        params.rating       = $rating.data('paramRating');
        params.readOnly     = $rating.data('paramReadOnly');

        $rating.Rating(params);
    });
});