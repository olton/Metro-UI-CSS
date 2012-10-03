<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modern UI CSS">
    <meta name="author" content="Sergey Pimenov">
    <meta name="keywords" content="windows 8, modern style, modern ui, style, modern, css, framework">

    <link href="css/modern.css" rel="stylesheet">
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
                <h1>Layout<small>templates</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span10">
                            <h2>Default page layout</h2>
<pre class="prettyprint linenums">
    &lt;div class="page"&gt;
        &lt;div class="page-header"&gt;
            &lt;div class="page-header-content"&gt;
            ...
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="page-region"&gt;
            &lt;div class="page-region-content"&gt;
                ...
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Fill View</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Snapped View</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Application Bar</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Sharms</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Flyouts</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Message Dialogs</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Notification Dialogs</h2>
                        </div>
                    </div>
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