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
                <h1>List View<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="span10">
                    <h2>List View</h2>

                    <ul class="listview">
                        <li class="bg-color-pinkDark fg-color-white">
                            <div class="icon">
                                <img src="images/onenote2013icon.png" />
                            </div>

                            <div class="data">
                                <h4 class="fg-color-white">OneNote 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li>
                            <div class="icon">
                                <img src="images/excel2013icon.png" />
                            </div>

                            <div class="data">
                                <h4>Excel 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li class="selected">
                            <div class="icon">
                                <img src="images/word2013icon.png" />
                            </div>

                            <div class="data">
                                <h4>Word 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li>
                            <div class="icon">
                                <img src="images/firefox.png" />
                            </div>

                            <div class="data">
                                <h4>Firefox</h4>
                                <div class="progress-bar">
                                    <div class="bar" style="width: 75%"></div>
                                </div>
                                <p>Download...</p>
                            </div>
                        </li>
                    </ul>

<pre class="prettyprint linenums span10">
    &lt;ul class="listview"&gt;
        &lt;li&gt;
            &lt;div class="icon"&gt;
                &lt;img /&gt;
            &lt;/div&gt;
            &lt;div class="data"&gt;
                &lt;h4&gt;Title&lt;/h4&gt;
                ...
                &lt;p&gt;text&lt;/p&gt;
            &lt;/div&gt;
        &lt;/li&gt;
        ...
    &lt;/ul&gt;
</pre>

                    <h2>List View Fluid</h2>
                    <ul class="listview fluid">
                        <li>
                            <div class="icon">
                                <img src="images/onenote2013icon.png" />
                            </div>

                            <div class="data">
                                <h4>OneNote 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li>
                            <div class="icon">
                                <img src="images/firefox.png" />
                            </div>

                            <div class="data">
                                <h4>Firefox</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>Free</p>
                            </div>
                        </li>

                        <li class="bg-color-blueDark fg-color-white selected">
                            <div class="icon">
                                <img src="images/word2013icon.png" />
                            </div>

                            <div class="data">
                                <h4 class="fg-color-white">Word 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li class="selected">
                            <div class="icon">
                                <img src="images/excel2013icon.png" />
                            </div>

                            <div class="data">
                                <h4>Excel 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>
                    </ul>

<pre class="prettyprint linenums span10">
    &lt;ul class="listview fluid"&gt;
        ...
    &lt;/ul&gt;
</pre>

                </div>
            </div>
        </div>
        <? include("footer.php")?>

    </div>
    <?php include("counter.php");?>

</body>
</html>