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
                <h1>Progress Bar<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span10">
                            <h2>Progress Bar</h2>
                            <div class="progress-bar">
                                <div class="bar" style="width: 75%;"></div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="progress-bar"&gt;
        &lt;div class="bar" style="width: 75%"&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>
                            <h2>Colored Progress Bar</h2>
                            <div class="progress-bar">
                                <div class="bar bg-color-pink" style="width: 75%;"></div>
                            </div>
                            <br />
                            <div class="progress-bar">
                                <div class="bar bg-color-blue" style="width: 35%;"></div>
                            </div>
                            <br />
                            <div class="progress-bar">
                                <div class="bar bg-color-green" style="width: 55%;"></div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="progress-bar"&gt;
        &lt;div class="bar bg-color-*" style="width: 75%"&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>

                            <h2>Progress Bar with colored parts</h2>
                            <div class="progress-bar" data-role="progress-bar">
                                <div class="bar bg-color-pink" data-bar="30" style="width: 30%;"></div>
                                <div class="bar bg-color-yellow" data-bar="30" style="width: 30%;"></div>
                                <div class="bar bg-color-green" data-bar="40" style="width: 40%;"></div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="progress-bar"&gt;
        &lt;div class="bar bg-color-pink" style="width: 30%"&gt;&lt;/div&gt;
        &lt;div class="bar bg-color-yellow" style="width: 30%"&gt;&lt;/div&gt;
        &lt;div class="bar bg-color-green" style="width: 40%"&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>
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