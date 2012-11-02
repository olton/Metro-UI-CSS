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
                <h1>Carousel<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="carousel span10" style="height: 500px;">
                    <div class="slides">
                        <div class="slide image" id="slide1">
                            <img src="images/1.jpg" />
                            <div class="description">
                                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                            </div>
                        </div>
                        <div class="slide image" id="slide2">
                            <img src="images/2.jpg" />
                            <div class="description">
                                Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                            </div>
                        </div>
                        <div class="slide image" id="slide3">
                            <img src="images/3.jpg" />
                            <div class="description">
                                This super beast eats fresh human flesh. She claws picking his nose, uttering at the same contented purring, and tooth picks out of leftover meat.
                            </div>
                        </div>
                    </div>


                    <span class="control left">&#8249;</span>
                    <span class="control right">&#8250;</span>


                    <div class="markers">
                        <ul>
                            <li class="active"><a href="#slide1"></a></li>
                            <li><a href="#slide2"></a></li><li><a href="#slide3"></a></li>
                        </ul>
                    </div>
                </div>

                <br />
<pre class="prettyprint linenums span10">
    &lt;div class="carousel"&gt;
        &lt;div class="slides"&gt;
            &lt;div class="slide image" id="slide1"&gt;
                &lt;img /&gt;
                &lt;div class="description"&gt;
                    Description text here...
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;div class="slide mixed" id="slide1"&gt;
                &lt;img /&gt;
                &lt;div class="description"&gt;
                    Description text here...
                &lt;/div&gt;
            &lt;/div&gt;
            ...
        &lt;/div&gt;

        &lt;span class="control left"&gt;&#8249;&lt;/span&gt;
        &lt;span class="control right"&gt;&#8250;&lt;/span&gt;

        &lt;div class="markers"&gt;
            &lt;ul&gt;
                &lt;li class="active"&gt;&lt;a href="#slide1"&gt;&lt;/a&gt;
                &lt;li&gt;&lt;a href="#slide2"&gt;&lt;/a&gt;
                ...
                &lt;li&gt;&lt;a href="#slideN"&gt;&lt;/a&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>

            </div>
        </div>
        <? include("footer.php")?>

    </div>
    <?php include("counter.php");?>

</body>
</html>