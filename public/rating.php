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

    <script src="js/rating.js"></script>

    <title>Modern UI CSS</title>
</head>
<body class="modern-ui" onload="prettyPrint()">
    <div class="page secondary">
        <? include("header.php")?>

        <div class="page-header">
            <div class="page-header-content">
                <h1>Rating<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span10">
                            <h2>Big stars</h2>

                            <h3>Static</h3>
                            <div>
                                <div class="static-rating">
                                    <div class="rating-value" style="width: 70%"></div>
                                </div>
                            </div>
<br />
<pre class="prettyprint linenums span10">
    &lt;div class="static-rating"&gt;
        &lt;div class="rating-value" style="width: 70%"&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>

                            <h3>Static small</h3>
                            <div>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 70%"></div>
                                </div>
                            </div>
<br />
<pre class="prettyprint linenums span10">
    &lt;div class="static-rating"&gt;
        &lt;div class="rating-value" style="width: 70%"&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>
                            <h3>Rating</h3>
                            <div>
                                <div class="rating" data-role="rating" data-rating="2">
                                    <a href="#"></a>
                                    <a href="#"></a>
                                    <a href="#"></a>
                                    <a href="#"></a>
                                    <a href="#"></a>
                                </div>
                            </div>
<br />
<pre class="prettyprint linenums span10">
    &lt;div class="rating" data-role="rating" data-rating="2"&gt;
        &lt;a href="#"&gt;&lt;/a&gt;
        &lt;a href="#"&gt;&lt;/a&gt;
        &lt;a href="#"&gt;&lt;/a&gt;
        &lt;a href="#"&gt;&lt;/a&gt;
        &lt;a href="#"&gt;&lt;/a&gt;
    &lt;/div&gt;
</pre>

                            <h3>Rating small</h3>
                            <div>
                                <div class="rating small" data-role="rating" data-rating="4">
                                    <a href="#"></a>
                                    <a href="#"></a>
                                    <a href="#"></a>
                                    <a href="#"></a>
                                    <a href="#"></a>
                                </div>
                            </div>
<br />
<pre class="prettyprint linenums span10">
    &lt;div class="rating small" data-role="rating" data-rating="4"&gt;
        &lt;a href="#"&gt;&lt;/a&gt;
        &lt;a href="#"&gt;&lt;/a&gt;
        &lt;a href="#"&gt;&lt;/a&gt;
        &lt;a href="#"&gt;&lt;/a&gt;
        &lt;a href="#"&gt;&lt;/a&gt;
    &lt;/div&gt;
</pre>

                            <p>
                                For use this rating you must include <code>rating.js</code> in <code>head</code> of you page
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <? include("footer.php")?>

    </div>
    <?php include("counter.php");?>

</body>
</html>