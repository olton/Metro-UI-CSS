    <div class="page">
        <div class="nav-bar">
            <div class="nav-bar-inner padding10">
                <span class="element">
                    2012 - <?php echo date('Y');?>, Metro UI CSS &copy; by <a class="fg-color-white" href="mailto:sergey@pimenov.com.ua">Sergey Pimenov</a>
                </span>
            </div>
        </div>
    </div>

    <?php include('counter.php');?>

    <script src="js/assets/jquery-1.8.2.min.js"></script>
    <script src="js/assets/jquery.mousewheel.min.js"></script>

    <script src="js/modern/dropdown.js"></script>
    <script src="js/modern/accordion.js"></script>
    <script src="js/modern/buttonset.js"></script>
    <script src="js/modern/carousel.js"></script>
    <script src="js/modern/input-control.js"></script>
    <script src="js/modern/pagecontrol.js"></script>
    <script src="js/modern/rating.js"></script>
    <script src="js/modern/slider.js"></script>
    <script src="js/modern/tile-slider.js"></script>
    <script src="js/modern/tile-drag.js"></script>

    <script src="js/assets/github.info.js"></script>
    <script src="js/assets/google-analytics.js"></script>
    <script src="js/google-code-prettify/prettify.js"></script>
    <script src="js/sharrre/jquery.sharrre-1.3.4.min.js"></script>

    <script>
        $('#shareme').sharrre({
            share: {
                googlePlus: true
                ,facebook: true
                ,twitter: true
                ,delicious: true
            },
            urlCurl: "js/sharrre/sharrre.php",
            buttons: {
                googlePlus: {size: 'tall'},
                facebook: {layout: 'box_count'},
                twitter: {count: 'vertical'},
                delicious: {size: 'tall'}
            },
            hover: function(api, options){
                $(api.element).find('.buttons').show();
            }
        });
    </script>

    </body>
</html>
