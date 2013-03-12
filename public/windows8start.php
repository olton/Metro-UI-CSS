<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, maximum-scale=1">
    <meta name="description" content="Modern UI CSS">
    <meta name="author" content="Sergey Pimenov">
    <meta name="keywords" content="windows 8, modern style, modern ui, style, modern, css, framework">

    <link href="css/modern.css" rel="stylesheet">
    <link href="css/theme-dark.css" rel="stylesheet">
    <link href="css/modern-responsive.css" rel="stylesheet">

    <script src="js/assets/jquery-1.8.2.min.js"></script>
    <script src="js/assets/google-analytics.js"></script>
    <script src="js/assets/jquery.mousewheel.min.js"></script>
    <script src="js/assets/github.info.js"></script>
    <script src="js/modern/tile-slider.js"></script>
    <script src="js/modern/start-menu.js"></script>
    <script src="js/modern/tile-drag.js"></script>

    <title>Modern UI CSS</title>

    <style>
        body {
            background: #1d1d1d;
        }
    </style>
    
</head>
<body class="metrouicss">
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
                        <!--<img src="images/myface.jpg"/>-->
                        <i class="icon-user fg-color-white"></i>
                    </div>
                </a>
            </div>

            <h1 class="fg-color-white">Start</h1>
        </div>
    </div>

    <div class="page-region">
        <div class="page-region-content tiles">
            <div class="tile-group tile-drag">
                <div class="tile icon">
                    <div class="tile-content">
                        <i class="icon-calculate"></i>
                    </div>
                    <div class="brand">
                        <span class="name">Calculator</span>
                    </div>
                </div>



                <a target="_blank" id="qq" href="/" onclick="console.log('clicked')" class="tile image outline-color-green">
                    <div class="tile-content">
                        <img src="images/myface.jpg" alt="">
                    </div>
                </a>

                <div class="tile icon">
                    <div class="tile-content">
                        <img src="images/Mail128.png"/>
                    </div>
                    <div class="brand">
                        <div class="badge">10</div>
                        <div class="name">Mail</div>
                    </div>
                </div>

                <div class="tile bg-color-orangeDark icon">
                    <b class="check"></b>
                    <div class="tile-content">
                        <img src="images/Video128.png" alt="" />
                    </div>
                    <div class="brand">
                        <span class="name">Video</span>
                    </div>
                </div>

                <div class="tile double image">
                    <div class="tile-content">
                        <img src="images/5.jpg" alt="" />
                    </div>
                    <div class="brand">
                        <span class="name">Pictures</span>
                        <div class="badge bg-color-orange">5</div>
                    </div>
                </div>

                <div class="tile bg-color-green icon">
                    <div class="tile-content">
                        <img src="images/Market128.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Store</span>
                        <span class="badge">6</span>
                    </div>
                </div>

                <div class="tile bg-color-red icon">
                    <div class="tile-content">
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

                <div class="tile bg-color-darken icon">
                    <div class="tile-content">
                        <img src="images/YouTube128.png" alt="" />
                    </div>
                    <div class="brand">
                        <span class="name">YouTube</span>
                    </div>
                </div>

                <div class="tile double bg-color-green" data-role="tile-slider" data-param-period="3000">
                    <div class="tile-content">
                        <h2>mattberg@live.com</h2>
                        <h5>Re: Wedding Annoucement!</h5>
                        <p>
                            Congratulations! I'm really excited to celebrate with you all. Thanks for...
                        </p>
                    </div>
                    <div class="tile-content">
                        <h2>tina@live.com</h2>
                        <h5>Re: Wedding Annoucement!</h5>
                        <p>
                            Huh! Waw!!! I'm really excited to celebrate with you all. Thanks for...
                        </p>
                    </div>
                    <div class="brand">
                        <div class="badge">12</div>
                        <img class="icon" src="images/Mail128.png"/>
                    </div>
                </div>
                <div class="tile double image-slider" data-role="tile-slider" data-param-period="5000" data-param-direction="left">
                    <div class="tile-content">
                        <img src="images/1.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/2.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/3.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/4.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/5.jpg" alt="">
                    </div>
                </div>

            </div>

            <div class="tile-group tile-drag">
                <div class="tile image outline-color-green">
                    <div class="tile-content">
                        <img src="images/myface.jpg" alt="">
                    </div>
                </div>
            </div>

            <div class="tile-group tile-drag">
                <div class="tile bg-color-blue icon">
                    <div class="tile-content">
                        <img src="images/InternetExplorer128.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Internet Explorer</span>
                    </div>
                </div>

                <div class="tile icon">
                    <div class="tile-content">
                        <img src="images/excel2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Excel 2013</span>
                    </div>
                </div>

                <div class="tile icon">
                    <div class="tile-content">
                        <img src="images/word2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Word 2013</span>
                    </div>
                </div>

                <div class="tile icon">
                    <div class="tile-content">
                        <img src="images/onenote2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">OneNote 2013</span>
                    </div>
                </div>
                <div class="tile double image-set">
                    <div class="tile-content">
                        <img src="images/1.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/2.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/3.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/4.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/5.jpg" alt="">
                    </div>
                    <div class="brand">
                        <span class="name">Photos</span>
                    </div>
                </div>
            </div>

            <div class="tile-group">
                <div class="tile double image">
                    <div class="tile-content">
                        <img src="images/4.jpg" alt="" />
                    </div>
                    <div class="brand bg-color-orange">
                        <img class="icon" src="images/Rss128.png"/>
                        <p class="text">This is a desert eagle. He is very hungry and angry bird.</p>
                        <div class="badge">10</div>
                    </div>
                </div>

                <div class="tile bg-color-blue icon">
                    <div class="tile-content">
                        <img src="images/InternetExplorer128.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Internet Explorer</span>
                    </div>
                </div>

                <div class="tile icon">
                    <div class="tile-content">
                        <img src="images/excel2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Excel 2013</span>
                    </div>
                </div>

                <div class="tile icon">
                    <div class="tile-content">
                        <img src="images/word2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Word 2013</span>
                    </div>
                </div>

                <div class="tile icon">
                    <div class="tile-content">
                        <img src="images/onenote2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">OneNote 2013</span>
                    </div>
                </div>
            </div>

            <div class="tile-group tile-drag">
                <div class="tile double image">
                    <div class="tile-content">
                        <img src="images/4.jpg" alt="" />
                    </div>
                    <div class="brand bg-color-orange">
                        <img class="icon" src="images/Rss128.png"/>
                        <p class="text">This is a desert eagle. He is very hungry and angry bird.</p>
                        <div class="badge">10</div>
                    </div>
                </div>

                <div class="tile bg-color-blue icon">
                    <div class="tile-content">
                        <img src="images/InternetExplorer128.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Internet Explorer</span>
                    </div>
                </div>

                <div class="tile icon">
                    <div class="tile-content">
                        <img src="images/excel2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Excel 2013</span>
                    </div>
                </div>

                <div class="tile icon">
                    <div class="tile-content">
                        <img src="images/word2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">Word 2013</span>
                    </div>
                </div>

                <div class="tile icon">
                    <div class="tile-content">
                        <img src="images/onenote2013icon.png"/>
                    </div>
                    <div class="brand">
                        <span class="name">OneNote 2013</span>
                    </div>
                </div>
            </div>

            <div class="tile-group">
                <div class="tile quadro double-vertical image-set">
                    <div class="tile-content">
                        <img src="images/1.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/2.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/3.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/4.jpg" alt="">
                    </div>
                    <div class="tile-content">
                        <img src="images/5.jpg" alt="">
                    </div>
                    <div class="brand">
                        <span class="name">Photos</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include("counter.php");?>

</body>
</html>