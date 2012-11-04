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
                <h1>Slider<small class="fg-color-red">this component in develop</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span5" style="height: 200px;">
                            <h2>Horizontal Slider</h2>
                            <div class="slider" style="margin-top: 100px">
                                <div class="complete" style="width: 45%"></div>
                                <div class="marker" style="left: 45%"></div>
                            </div>
                        </div>
                        <div class="span5">
                            <h2>Vertical Slider</h2>
                            <div class="slider vertical" style="margin-left: 50%; height: 200px;">
                                <div class="complete" style="height: 45%"></div>
                                <div class="marker" style="top: 55%"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="span10">

                    <h3>Component definition</h3>
<pre class="prettyprint linenums">
    &lt;div class="slider" data-role="slider"&gt;
        &lt;div class="complete" style="width: 45%"&gt;
        &lt;div class="marker" style="left: 45%"&gt;
    &lt;/div&gt;

    &lt;div class="slider vertical" data-role="slider"&gt;
        &lt;div class="complete" style="height: 45%"&gt;
        &lt;div class="marker" style="top: 55%"&gt;
    &lt;/div&gt;
</pre>
                    <h3>Javascript</h3>
                    <p>
                        To use slider component you must include <code>slider.js</code> in head of page.
                    </p>
                </div>
            </div>
        </div>
        <? include("footer.php")?>

    </div>
    <?php include("counter.php");?>

</body>
</html>