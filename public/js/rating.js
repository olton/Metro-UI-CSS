/**
 * jQuery plugin for rating component of MetroUiCss framework
 * use attribute data-role="rating" or class="rating" to initialize rating plugin for some element
 * or use $(ratingElement).rating({parameters})
 *
 * available parameters (attributes):
 * data-role-stars="integer" stars count for this rating element (default 5)
 * data-role-rating="integer" current average rating (default 0)
 * data-role-vote="string" ('on' or 'off') (default 'on')
 *
 * to control rating you can use:
 * $('ratingID').RatingValue(float)                 - set rating
 * $('ratingID').RatingValue()                      - return rating
 * $('ratingID').RatingPercents(0 < float < 100)    - set rating by percents
 * $('ratingID').RatingPercents()                   - return rating percents
 * $('ratingID').RatingVote(true or 'on')           - set vote=on rating mode
 * $('ratingID').RatingVote(false or 'off')         - set vote=off rating mode
 */
(function($) {

    $.Rating = function(element, options) {

        var defaults = {
            // stars count
            stars:      5,
            // init value
            rating:     0,
            // voting mode
            vote:       'on'

        };

        var plugin = this;

        plugin.settings = {};

        var $element = $(element),
            starElements = [],
            $starElements,
            $innerElement, // for vote=off mode
            currentRating;

        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);

            currentRating = plugin.settings.rating;

            if (plugin.settings.vote === 'on') {
                voteOnInit();
            } else {
                voteOffInit();
            }

        };

        /**
         * public methods to set and get rating (value, percent)
         * use it like this: $('#ratingElementID').data('Rating').setRating(4)
         */
        plugin.setRating = function (rating) {
            setRating(rating);
            return rating;
        };
        plugin.setRatingPercents = function (ratingPercents) {
            setRating((ratingPercents / 100) * plugin.settings.stars);
            return ratingPercents;
        };
        plugin.getRating = function () {
            return currentRating;
        };
        plugin.getRatingPercents = function () {
            return currentRating / plugin.settings.stars * 100;
        };
        /**
         * public method for change vote mode
         */
        plugin.voteOn = function () {
            plugin.settings.vote = 'on';
            voteOnInit();
        };
        plugin.voteOff = function () {
            plugin.settings.vote = 'off';
            voteOffInit();
        };


        /**
         * init vote=off mode rating
         */
        var voteOffInit = function () {

            var width,
                settings = plugin.settings;

            $element.empty();

            // special class for vote=off mode
            $element.addClass('static-rating');

            width = ($element.hasClass('small') ? '14' : '27') * settings.stars;
            $element.css('width', width);

            $innerElement = $('<div class="rating-value"></div>');
            $innerElement.appendTo($element);

            setRating(currentRating);

        };

        /**
         * init vote=on mode rating
         */
        var voteOnInit = function () {
            var settings = plugin.settings,
                a, i;

            $element.empty();
            $element.removeClass('static-rating');

            // create stars (count starts from 1)
            for (i = 1; i <= settings.stars; i++) {
                a = starElements[i] = $('<a href="javascript:void(0)"></a>');
                a.data('starIndex', i);
                a.appendTo($element);
            }

            // event handlers for voting
            $starElements = $element.find('a');

            $starElements.on('mouseenter', function () {
                var index = $(this).data('starIndex');
                lightStars(0, true);
                lightStars(index);
                $element.trigger('hovered', [index]);
            });
            $starElements.on('mouseleave', function () {
                lightStars(0);
                lightStars(currentRating, true);
            });
            $starElements.on('click', function(){
                var index = $(this).data('starIndex');
                currentRating = index;
                $element.trigger('rated', [index]);
            });

            setRating(currentRating);
        };

        /**
         * make stars fired (from first to (starIndex - 1))
         * or turn off stars if starIndex = 0
         * @param starIndex
         * @param rated if true - add 'rated' class, else 'hover'
         */
        var lightStars = function (starIndex, rated) {
            var class_ = rated ? 'rated' : 'hover';
            starIndex = Math.round(starIndex);
            $starElements.removeClass(class_);
            $starElements.filter(':lt(' + starIndex + ')').addClass(class_);
        };

        /**
         * light stars and store rating
         * @param rating
         */
        var setRating = function (rating) {
            var settings = plugin.settings,
                percents;
            currentRating = rating;
            if (settings.vote === 'on') {
                lightStars(rating, true);
            } else {
                percents = rating / settings.stars * 100;
                $innerElement.css('width', percents + '%');
            }

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

    /**
     * get or set rating value to/from first element in set
     */
    $.fn.RatingValue = function(value) {
        var ratingPlugin = $(this.get(0)).data('Rating');
        if (typeof ratingPlugin !== 'undefined') {
            if (typeof value !== 'undefined') {
                return ratingPlugin.setRating(value);
            } else {
                return ratingPlugin.getRating();
            }
        }
    };
    /**
     * get or set rating percents to/from first element in set
     */
    $.fn.RatingPercents = function(value) {
        var ratingPlugin = $(this.get(0)).data('Rating');
        if (typeof ratingPlugin !== 'undefined') {
            if (typeof value !== 'undefined') {
                return ratingPlugin.setRatingPercents(value);
            } else {
                return ratingPlugin.getRatingPercents();
            }
        }
    };

    /**
     * changes rating mode
     */
    $.fn.RatingVote = function(vote) {
        var ratingPlugin = $(this.get(0)).data('Rating');
        if (typeof ratingPlugin !== 'undefined') {
            if (vote === true || vote === 'on') {
                ratingPlugin.voteOn();
            } else if (vote === false || vote === 'off') {
                ratingPlugin.voteOff();
            }
        }
    };

})(jQuery);

$(function(){
    var allratings = $('[data-role=rating], .rating');
    allratings.each(function (index, rating) {
        var params = {};
        $rating = $(rating);
        params.stars        = $rating.data('paramStars');
        params.rating       = $rating.data('paramRating');
        params.vote         = $rating.data('paramVote');

        $rating.Rating(params);
    });
});