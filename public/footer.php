    <div class="page">
        <div class="nav-bar">
            <div class="nav-bar-inner padding10">
                <span class="element">
                    2012-2013, Metro UI CSS &copy; by <a class="fg-color-white" href="mailto:sergey@pimenov.com.ua">Sergey Pimenov</a>
                </span>
            </div>
        </div>
    </div>

    <?php include("counter.php");?>

    <script type="text/javascript" src="js/assets/github.info.js"></script>
    <script type="text/javascript" src="js/assets/google-analytics.js"></script>
    <script type="text/javascript" src="js/google-code-prettify/prettify.js"></script>
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