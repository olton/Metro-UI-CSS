<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modern UI CSS">
    <meta name="author" content="Sergey Pimenov">
    <meta name="keywords" content="windows 8, modern style, modern ui, style, modern, css, framework">

    <link href="css/modern.css" rel="stylesheet">
    <link href="css/theme-dark.css" rel="stylesheet">

    <script src="js/jquery-1.8.2.min.js"></script>
    <script src="js/google-analytics.js"></script>
    <script src="js/jquery.mousewheel.min.js"></script>

    <title>Modern UI CSS</title>

    <style>
        body {
            background: url(images/windows8_metro_green_1920_1080.jpg);
        }
    </style>

    <script>
        function Resize(){
            var tiles_area = 0;
            $(".tile-group").each(function(){
                tiles_area += $(this).outerWidth() + 80;

            });
            $(".tiles").css("width", 120 + tiles_area + 20);

            $(".page").css({
                height: $(document).height() - 20,
                width: $(document).width()
            });
        }

        function AddMouseWheel(){
            $("body").mousewheel(function(event, delta){
                var scroll_value = delta * 50;
                if (!jQuery.browser.chrome) {
                    document.documentElement.scrollLeft -= scroll_value;
                } else {
                    this.scrollLeft -= scroll_value;
                }
                return false;
            });
        }

        $(function(){

            Resize();
            AddMouseWheel();

        })


    </script>
</head>
<body class="modern-ui" onresize="Resize()">
<div class="page secondary fixed-header">
    <div class="page-header ">
        <div class="page-header-content">
            <div class="user-login">
                <a href="#">
                    <div class="name">
                        <span class="first-name">Sergey</span>
                        <span class="last-name">Pimenov</span>
                    </div>
                    <div class="avatar">
                        <img src="images/myface.jpg"/>
                    </div>
                </a>
            </div>

            <h1>Start</h1>
        </div>
    </div>

    <div class="page-region">
        <div class="page-region-content tiles">
            <div class="tile-group">
                <div class="tile">
                    <div class="tile-content image">
                        <img src="images/myface.jpg" alt="">
                    </div>
                </div>

                <div class="tile">
                    <div class="tile-content icon">
                        <img src="images/Mail128.png"/>
                    </div>
                    <div class="brand">
                        <div class="bage">10</div>
                        <div class="name">Mail</div>
                    </div>
                </div>

                <div class="tile bg-color-orangeDark">
                    <b class="check"></b>
                    <div class="tile-content icon">
                        <img src="images/Video128.png" alt="" />
                    </div>
                    <div class="brand">
                        <span class="name">Video</span>
                    </div>
                </div>

                <div class="tile double">
                    <div class="tile-content image">
                        <img src="images/5.jpg" alt="" />
                    </div>
                    <div class="brand">
                        <span class="name">Pictures</span>
                        <div class="bage bg-color-orange">5</div>
                    </div>
                </div>

                <div class="tile double-vertical bg-color-yellow">
                    <div class="tile-content icon">
                        <img src="images/Calendar128.png" />
                    </div>
                    <div class="brand">
                        <span class="name">Calendar</span>
                    </div>
                </div>

                <div class="tile bg-color-green">
                    <b class="check"></b>
                    <div class="tile-content icon">
                        <img src="images/Market128.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Store</span>
                        <span class="bage">6</span>
                    </div>
                </div>

                <div class="tile bg-color-red">
                    <div class="tile-content icon">
                        <img src="images/Music128.png" alt="" />
                    </div>
                    <div class="brand">
                        <span class="name">Music</span>
                    </div>
                </div>

                <div class="tile double bg-color-blueDark">
                    <div class="tile-content">
                        <img src="images/michael.jpg" class="place-left"/>
                        <h3 style="margin-bottom: 5px;">michael_angiulo</h3>
                        <p>
                            I just saw Thor last night. It was awesome! I think you'd love it.
                        </p>
                        <h5>RT @julie_green</h5>

                    </div>
                    <div class="brand">
                        <span class="name">Tweet@rama</span>
                    </div>
                </div>

                <div class="tile bg-color-darken">
                    <div class="tile-content icon">
                        <img src="images/YouTube128.png" alt="" />
                    </div>
                    <div class="brand">
                        <span class="name">YouTube</span>
                    </div>
                </div>

                <div class="tile double bg-color-green">
                    <div class="tile-content">
                        <h2>mattberg@live.com</h2>
                        <h5>Re: Wedding Annoucement!</h5>
                        <p>
                            Congratulations! I'm really excited to celebrate with you all. Thanks for...
                        </p>
                    </div>
                    <div class="brand">
                        <div class="bage">12</div>
                        <img class="icon" src="images/Mail128.png"/>
                    </div>
                </div>

            </div>

            <div class="tile-group" style="width: 322px;">
                <div class="tile bg-color-blue">
                    <div class="tile-content icon">
                        <img src="images/InternetExplorer128.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Internet Explorer</span>
                    </div>
                </div>

                <div class="tile">
                    <div class="tile-content icon">
                        <img src="images/excel2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Excel 2013</span>
                    </div>
                </div>

                <div class="tile">
                    <div class="tile-content icon">
                        <img src="images/word2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Word 2013</span>
                    </div>
                </div>

                <div class="tile">
                    <div class="tile-content icon">
                        <img src="images/onenote2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">OneNote 2013</span>
                    </div>
                </div>
                <div class="tile double">
                    <div class="tile-content images-set">
                        <img src="images/1.jpg" alt="">
                        <img src="images/2.jpg" alt="">
                        <img src="images/3.jpg" alt="">
                        <img src="images/4.jpg" alt="">
                        <img src="images/5.jpg" alt="">
                    </div>
                    <div class="brand">
                        <span class="name">Photos</span>
                    </div>
                </div>
            </div>

            <div class="tile-group" style="width: 322px;">
                <div class="tile double">
                    <div class="tile-content image">
                        <img src="images/4.jpg" alt="" />
                    </div>
                    <div class="brand bg-color-orange">
                        <img class="icon" src="images/Rss128.png"/>
                        <p class="text">This is a desert eagle. He is very hungry and angry bird.</p>
                        <div class="bage">10</div>
                    </div>
                </div>

                <div class="tile bg-color-blue">
                    <div class="tile-content icon">
                        <img src="images/InternetExplorer128.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Internet Explorer</span>
                    </div>
                </div>

                <div class="tile">
                    <div class="tile-content icon">
                        <img src="images/excel2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Excel 2013</span>
                    </div>
                </div>

                <div class="tile">
                    <div class="tile-content icon">
                        <img src="images/word2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Word 2013</span>
                    </div>
                </div>

                <div class="tile">
                    <div class="tile-content icon">
                        <img src="images/onenote2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">OneNote 2013</span>
                    </div>
                </div>
            </div>

            <div class="tile-group" style="width: 322px;">
                <div class="tile double">
                    <div class="tile-content image">
                        <img src="images/4.jpg" alt="" />
                    </div>
                    <div class="brand bg-color-orange">
                        <img class="icon" src="images/Rss128.png"/>
                        <p class="text">This is a desert eagle. He is very hungry and angry bird.</p>
                        <div class="bage">10</div>
                    </div>
                </div>

                <div class="tile bg-color-blue">
                    <div class="tile-content icon">
                        <img src="images/InternetExplorer128.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Internet Explorer</span>
                    </div>
                </div>

                <div class="tile">
                    <div class="tile-content icon">
                        <img src="images/excel2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Excel 2013</span>
                    </div>
                </div>

                <div class="tile">
                    <div class="tile-content icon">
                        <img src="images/word2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Word 2013</span>
                    </div>
                </div>

                <div class="tile">
                    <div class="tile-content icon">
                        <img src="images/onenote2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">OneNote 2013</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include("counter.php");?>

</body>
</html>