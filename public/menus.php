<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, maximum-scale=1">
    <meta name="description" content="Modern UI CSS">
    <meta name="author" content="Sergey Pimenov">
    <meta name="keywords" content="windows 8, modern style, modern ui, style, modern, css, framework">

    <link href="css/modern.css" rel="stylesheet">
    <link href="css/modern-responsive.css" rel="stylesheet">
    <link href="css/site.css" rel="stylesheet" type="text/css">
    <link href="js/google-code-prettify/prettify.css" rel="stylesheet" type="text/css">

    <script src="js/jquery-1.8.2.min.js"></script>
    <script src="js/google-analytics.js"></script>
    <script src="js/github.info.js"></script>
    <script src="js/google-code-prettify/prettify.js"></script>

    <title>Modern UI CSS</title>
</head>
<body class="modern-ui" onload="prettyPrint()">
    <div class="page secondary">
        <? include("header.php")?>

        <div class="page-header">
            <div class="page-header-content">
                <h1>Menus<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="span10">
                    <h2>Dropdown Menu</h2>
                    <div class="clearfix">
                        <ul class="dropdown-menu open" style="display: block; position: static; margin-bottom: 15px; margin-left: 0;">
                            <li><a href="#">ItemName</a></li>
                            <li><a href="#">ItemName</a></li>
                            <li><a href="#">ItemName</a></li>
                            <li><a href="#">ItemName</a></li>
                            <li class="divider"></li>
                            <li><a href="#">ItemName</a></li>
                        </ul>
                    </div>
                    <p>
                        Toggleable, contextual menu for displaying lists of links. Made interactive with the <code>dropdown</code> javascript plugin.
                    </p>
                </div>

                <h2>Navigation Bar</h2>
                <div class="span10">
                    <div class="navigation-bar">
                        <div class="navigation-bar-inner">
                            <div class="brand"><a class="name" href="#">Product Name</a></div>

                            <ul class="place-right">
                                <li data-role="dropdown" class="sub-menu">
                                    <a>Right Menu</a>
                                    <ul class="dropdown-menu place-right">
                                        <li><a href="#">SubItem 1</a></li>
                                        <li><a href="#">SubItem 2</a></li>
                                        <li><a href="#">SubItem 3</a></li>
                                        <li><a href="#">SubItem 4</a></li>
                                        <li><a href="#">SubItem 5</a></li>
                                    </ul>
                                </li>
                            </ul>

                            <ul>
                                <li data-role="dropdown" class="sub-menu">
                                    <a>Item 1</a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">SubItem 1</a></li>
                                        <li><a href="#">SubItem 2</a></li>
                                        <li><a href="#">SubItem 3</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">SubItem 4</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Item 2</a></li>
                                <li><a href="#">Item 3</a></li>
                                <li><a href="#">Item 4</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
<pre class="prettyprint linenums span10">
    &lt;div class="navigation-bar"&gt;
        &lt;div class="navigation-bar-inner"&gt;
            &lt;div class="brand"&gt;
                &lt;span class="name"&gt;Project Name&lt;/span&gt;
            &lt;/div&gt;

            &lt;ul class="place-right"&gt;
                &lt;li data-role="dropdown" class="sub-menu"&gt;
                    &lt;a&gt;Right Menu&lt;/a&gt;
                    &lt;ul class="dropdown-menu place-right"&gt;
                        &lt;li&gt;&lt;a href="#"&gt;SubItem&lt;/a&gt;&lt;/li&gt;
                        ...
                        &lt;li&gt;&lt;a href="#"&gt;SubItem&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
            &lt;/ul&gt;

            &lt;ul&gt;
                &lt;li data-role="dropdown" class="sub-menu"&gt;
                    &lt;a href="#"&gt;Item 1&lt;/a&gt;
                    &lt;ul class="dropdown-menu"&gt;
                        &lt;li&gt;&lt;a href="#"&gt;SubItem&lt;/a&gt;&lt;/li&gt;
                        ...
                        &lt;li&gt;&lt;a href="#"&gt;SubItem&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;a /&gt;&lt;/li&gt;
                &lt;li class="divider"&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a /&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>

                <h2>Horizontal menu</h2>
                <div class="span10">
                    <div class="horizontal-menu">
                        <ul>
                            <li><a href="#">Item1</a></li>
                            <li><a href="#">Item2</a></li>
                            <li><a href="#">Item3</a></li>
                            <li><a href="#">Item4</a></li>
                            <li><a href="#">Item5</a></li>
                        </ul>
                    </div>
                    <br />
<pre class="prettyprint linenums">
    &lt;div class="horizontal-menu"&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;a href="#"&gt;ItemName&lt;/a&gt;&lt;/li&gt;
            ...
            &lt;li&gt;&lt;a href="#"&gt;ItemName&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
</pre>
                </div>

                <h2>Horizontal menu with submenu</h2>
                <div class="span10">
                    <div class="horizontal-menu">
                        <ul>
                            <li class="sub-menu"><a href="#">Item1</a>
                                <ul>
                                    <li class="sub-menu"><a href="#">SubItem1</a>
                                        <ul>
                                            <li><a href="#">SubItem1</a></li>
                                            <li><a href="#">SubItem2</a></li>
                                            <li><a href="#">SubItem3</a></li>
                                            <li class="sub-menu"><a href="#">SubItem4</a>
                                                <ul>
                                                    <li><a href="#">SubItem1</a>
                                                    </li>
                                                    <li><a href="#">SubItem2</a></li>
                                                    <li><a href="#">SubItem3</a></li>
                                                    <li class="sub-menu"><a href="#">SubItem4</a>
                                                        <ul>
                                                            <li><a href="#">SubItem1</a>
                                                            </li>
                                                            <li><a href="#">SubItem2</a></li>
                                                            <li><a href="#">SubItem3</a></li>
                                                            <li><a href="#">SubItem4</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="#">SubItem2</a></li>
                                    <li><a href="#">SubItem3</a></li>
                                    <li><a href="#">SubItem4</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <br />
<pre class="prettyprint linenums">
    &lt;div class="horizontal-menu"&gt;
        &lt;ul&gt;
            &lt;li class="sub-menu"&gt;&lt;a href="#"&gt;ItemName&lt;/a&gt;
                &lt;ul&gt;
                    &lt;li&gt;&lt;a href="#"&gt;ItemName&lt;/a&gt;&lt;/li&gt;
                    ...
                    &lt;li&gt;&lt;a href="#"&gt;ItemName&lt;/a&gt;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/li&gt;
            ...
            &lt;li&gt;&lt;a href="#"&gt;ItemName&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
</pre>
                    <!--
                    <h2>Ribbon menu</h2>
                    <div class="ribbon span10">
                        <ul>
                            <li><a data-frame="#frame1">File</a></li>
                            <li class="active"><a data-frame="#frame2">Home</a></li>
                            <li><a data-frame="#frame3">Insert</a></li>
                            <li><a data-frame="#frame4">Design</a></li>
                        </ul>

                        <div class="frames">
                            <div class="frame" id="frame1">
                                frame 1
                            </div>
                            <div class="frame active" id="frame2">
                                frame 2
                            </div>
                            <div class="frame" id="frame3">
                                frame 3
                            </div>
                            <div class="frame" id="frame4">
                                frame 4
                            </div>
                        </div>
                    </div>
                    -->
                </div>

                <div class="grid">
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