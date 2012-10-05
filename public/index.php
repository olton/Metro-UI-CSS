<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Metro UI CSS">
    <meta name="author" content="Sergey Pimenov">
    <meta name="keywords" content="windows 8, modern style, Metro UI, style, modern, css, framework">

    <link href="css/modern.css" rel="stylesheet">
    <link href="css/site.css" rel="stylesheet" type="text/css">

    <script src="js/jquery-1.8.2.min.js"></script>
    <script src="js/google-analytics.js"></script>
    <script src="js/github.info.js"></script>

    <title>Metro UI CSS</title>

</head>
<body class="modern-ui">
    <div class="page">
        <? include("header.php")?>

        <div class="page-region">
            <div class="page-region-content">
                <p class="place-right tertiary-info-secondary-text" style="margin-top: 10px;">Build in <a class="fg-color-blue" href="http://www.jetbrains.com/phpstorm/">JetBrains PhpStorm</a></p>
                <h2>Welcome to Metro UI CSS <sup class="fg-color-red"> v 0.1.1</sup></h2>

                <div class="horizontal-menu">
                    <ul>
                        <li><a href="/">About</a></li>
                        <li class="sub-menu">
                            <a href="#">Scaffolding</a>
                            <ul class="dropdown-menu">
                                <li><a href="global.php">Global styles</a></li>
                                <li><a href="layout.php">Layout and templates</a></li>
                                <li><a href="grid.php">Grid system</a></li>
                                <li class="divider"></li>
                                <li><a href="responsive.php">Responsive design</a></li>
                            </ul>
                        </li>
                        <li class="sub-menu">
                            <a href="#">Base CSS</a>
                            <ul class="dropdown-menu">
                                <li><a href="typography.php">Typography</a></li>
                                <li><a href="tables.php">Tables</a></li>
                                <li><a href="forms.php">Forms</a></li>
                                <li><a href="buttons.php">Buttons</a></li>
                                <li><a href="images.php">Images</a></li>
                            </ul>
                        </li>
                        <li class="sub-menu">
                            <a href="#">Components</a>
                            <ul class="dropdown-menu">
                                <li><a href="tiles.php">Tiles</a></li>
                                <li><a href="menus.php">Menus</a></li>
                                <li><a href="pagecontrol.php">Page control</a></li>
                                <li><a href="accordion.php">Accordion</a></li>
                                <li class="divider"></li>
                                <li><a href="notices.php">Notices</a></li>
                                <li class="divider"></li>
                                <li><a href="cards.php">Deck of Cards</a></li>
                                <!--
                                <li><a href="listview.php">List view</a></li>
                                <li><a href="pagecontrol.php">Page control</a></li>
                                <li><a href="tabcontrol.php">Tab control</a></li>
                                <li><a href="menus.php">Menus</a></li>
                                <li><a href="progress.php">Progress bars</a></li>
                                <li class="divider"></li>
                                <li><a href="messages.php">Messages</a></li>
                                <li class="divider"></li>
                                <li><a href="misc.php">Misc</a></li>
                                -->
                            </ul>
                        </li>
                        <li><a href="javascript.php">Javascript</a></li>
                    </ul>
                </div>

                <div class="hero-unit">
                    <img src="images/windows-8-metro.jpg" class="place-left" style="margin-right: 40px;"/>
                    <h1 class="fg-color-blueLight">Metro UI CSS</h1>

                    <br />
                    <h2>Create site in Windows 8 style now!</h2>

                    <br />
                    <p>Metro UI CSS allows to create a Web site in the style of
                        Windows 8 quickly and without distractions
                        on routine tasks.</p>
                    <h3>To start: include modern.css</h3>
                    <p class="tertiary-info-text">
                        &lt;link href="modern.css" rel="stylesheet"&gt;
                    </p>
                    <br />
                    <p class="tertiary-info-secondary-text">
                        * This site is made with Metro UI CSS.
                    </p>

                    <a href="http://bizspark.com/"><img src="images/1005-BizSpark-261x230.jpg" class="bottom-right" style="width: 150px; padding: 10px 0 0 10px; background: #fff;"/></a>
                </div>

                <div class="grid">
                    <div class="row">
                        <div class="span4 bg-color-blue">
                            <img src="images/simple.png" class="place-right" style="margin: 10px;"/>
                            <h2 class="fg-color-white">&nbsp;Simple</h2>
                        </div>

                        <div class="span4 bg-color-pink">
                            <img src="images/grid.png" class="place-right" style="margin: 10px;"/>
                            <h2 class="fg-color-white">&nbsp;Sufficient</h2>
                        </div>

                        <div class="span4 bg-color-yellow">
                            <img src="images/responsive.png" class="place-right" style="margin: 10px;"/>
                            <h2 class="fg-color-white">&nbsp;Responsive</h2>
                        </div>
                    </div>
                </div>

                <div class="grid">
                    <div class="row">
                        <div class="span4">
                            <img src="images/author.jpg"/>
                            <p class="tertiary-info-secondary-text bg-color-grayDark" style="padding: 10px; color: #fff;">Hi! My name is Sergey Pimenov and i'm author of Metro UI CSS from <abbr title="The capital of Ukraine">Kiev</abbr>, <abbr title="The center of Europe">Ukraine</abbr>.</p>
                        </div>
                        <div class="span4">
                            <p>
                                Metro UI CSS a set of styles to create a site with an interface similar to Windows 8 Metro UI. This set of styles was developed as a self-contained solution.
                            </p>
                            <br />
                            <p class="tertiary-info-text">
                                Metro UI CSS is made with LESS. <a href="http://lesscss.org">LESS</a> a dynamic stylesheet language created by one good man, <a href="http://cloudhead.io/">Alexis Sellier</a>. It makes developing systems-based CSS faster, easier, and more fun.
                            </p>
                            <h3>Supported browsers:</h3>
                            <div class="browsers-icons clearfix">
                                <img src="images/ie.png" title="Internet Explorer 9+"/>
                                <img src="images/chrome.png" title="Google Chrome"/>
                                <img src="images/firefox.png" title="Firefox"/>
                                <img src="images/opera.png" title="Opera"/>
                            </div>
                            <br />
                            <p class="tertiary-info-secondary-text">* Internet Explorer supported on 9+</p>
                        </div>
                        <div class="span4">
                            <h2 style="margin-top: 0;">Immediate objectives:</h2>
                            <ol>
                                <li>Responsive design</li>
                                <li>Tiles animation effects</li>
                                <li>Additional components</li>
                                <li>Integration in Visual Studio</li>
                                <li>Much, much more...</li>
                            </ol>
                            <h2 style="margin-top: 0;">Inspired Projects:</h2>
                            <ul>
                                <li><a href="https://github.com/sagarsane/abetterportfolio">Portfolio for Developers</a></li>
                                <li><a href="http://oazabir.github.com/Droptiles/">Droptiles</a></li>
                                <li><a href="http://aozora.github.com/bootmetro/">BootMetro</a></li>
                            </ul>
                            <br />
                            <br />
                            <div>
                                <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                                    <input type="hidden" name="cmd" value="_s-xclick">
                                    <input type="hidden" name="hosted_button_id" value="AVMB2NYSENK3A">
                                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                                </form>
                            </div>
                            <!--
                            <br />
                            <div class="">
                                <form style="display:inline" method=POST action="https://liqpay.com/?do=clickNbuy">
                                    <input type="hidden" name="preorder" value="c27a4aa9211f4e6735b739850e99d568422af6e7">
                                    <button type="submit" class="span3 command-button default">Donate 10 USD<small>for Metro UI CSS [LiqPay]</small></button>
                                </form>
                            </div>
                            -->
                        </div>
                    </div>
                    <div class="row">
                        <? include("adsense.php")?>
                    </div>
                </div>
            </div>
        </div>
        <? include("footer.php")?>
    </div>
    <?php include("counter.php");?>

</body>
</html>