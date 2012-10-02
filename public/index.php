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

    <title>Metro UI CSS</title>

</head>
<body class="modern-ui">
    <div class="page">
        <div class="header-bar">
            <div class="header-bar-inner">
                <p class="place-right tertiary-info-secondary-text fg-color-white" style="margin-top: 10px;">Build in <a class="fg-color-blue" href="http://www.jetbrains.com/phpstorm/">JetBrains PhpStorm</a></p>
                <a href="/"><span class="modern-ui-logo place-left"></span></a><h4 class="fg-color-white"> &nbsp;<a class="fg-color-white" href="/">Metro UI CSS</a> - Create site in Windows 8 style</h4>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <h6 class="place-right">this is a next revision of <a href="http://metroui.org.ua">Metro UI CSS</a></h6>
                <h2>Welcome to Metro UI CSS <sup class="fg-color-red">beta</sup></h2>

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
                        <li>
                            <a href="#">Javascript</a>
                            <ul>
                                <!--<li><a href="#">Touch Devices</a></li>-->
                            </ul>
                        </li>
                    </ul>
                </div>

                <div class="hero-unit">
                    <img src="images/windows-8-metro.jpg" class="place-left" style="margin-right: 40px;"/>
                    <h1 class="fg-color-blueLight">Metro UI CSS</h1>

                    <br />
                    <h2>Create site in Windows 8 style now!</h2>

                    <br />
                    <p>Metro UI CSS allows quickly, without distractions <br />on routine tasks, create a Web site in the style of <br />Windows 8.</p>
                    <h3>For use: include modern.css</h3>
                    <p class="tertiary-info-text">
                        &lt;link href="css/modern.css" rel="stylesheet"&gt;
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
                        <div class="span8">
                            <div class="grid">
                                <div class="row">
                                    <div class="span4">
                                        <p>
                                            Metro UI CSS a set of styles to create a site with an interface similar to Windows 8 Metro UI. The set of styles developed as a self-contained solution.
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
                                            <li><a href="http://aozora.github.com/metroui-web/">Metroui-Web</a></li>
                                        </ul>
                                        <br />
                                        <br />
                                        <div class="">
                                            <form style="display:inline" method=POST action="https://liqpay.com/?do=clickNbuy">
                                                <input type="hidden" name="preorder" value="c27a4aa9211f4e6735b739850e99d568422af6e7">
                                                <input type="submit" value="Donate 10 USD for Metro UI CSS">
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="header-bar">
            <div class="header-bar-inner" style="padding-top: 10px;">

                <p class="place-right tertiary-text fg-color-white">Windows 8 UI style Copyright by <a class="fg-color-blueLight" href="http://www.microsoft.com">Microsoft</a></p>
                <p class="place-left tertiary-text fg-color-white">2012, Metro UI CSS Copyright by <a class="fg-color-blueLight" href="mailto:sergey@pimenov.com.ua">Sergey Pimenov</a></p>
            </div>
        </div>

    </div>
    <?php include("counter.php");?>

</body>
</html>