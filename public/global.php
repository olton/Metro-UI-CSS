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
    <link href="js/google-code-prettify/prettify.css" rel="stylesheet">

    <script src="js/jquery-1.8.2.min.js"></script>
    <script src="js/google-code-prettify/prettify.js"></script>

    <title>Modern UI CSS</title>

</head>
<body class="modern-ui" onload="prettyPrint()">
    <div class="page secondary">
        <div class="header-bar">
            <div class="header-bar-inner">
                <a href="/"><span class="modern-ui-logo place-left"></span></a><h4 class="fg-color-white"> &nbsp;<a class="fg-color-white" href="/">Metro UI CSS</a> - Framework for build sites in Windows 8 style</h4>
            </div>
        </div>

        <div class="page-header">
            <div class="page-header-content">
                <h1>Global<small>styles</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span10">
                            <h2>Requires HTML5 doctype</h2>
                            <p>Metro UI CSS makes use of certain HTML elements and CSS properties that require the use of the HTML5 doctype. Include it at the beginning of all your projects.</p>

<pre class="prettyprint linenums">
    &lt;!DOCTYPE html&gt;
    &lt;html lang="en"&gt;
      ...
    &lt;/html&gt;
</pre>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Reset Styles</h2>
                            <p>
                               In Metro UI CSS used <a href="http://github.com/necolas/normalize.css">normalize.css</a> by <a href="http://nicolasgallagher.com/">Nicolas Gallaher</a>
                            </p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span3">
                            <h2>Colors</h2>
                            <ul class="unstyled">
                                <li style="height: 40px;"><span class="square bg-color-green"></span>*-color-green</li>
                                <li style="height: 40px;"><span class="square bg-color-greenDark"></span>*-color-greenDark</li>
                                <li style="height: 40px;"><span class="square bg-color-greenLight"></span>*-color-greenLight</li>
                                <li style="height: 40px;"><span class="square bg-color-pink"></span>*-color-pink</li>
                                <li style="height: 40px;"><span class="square bg-color-pinkDark"></span>*-color-pinkDark</li>
                            </ul>
                        </div>
                        <div class="span3">
                            <h2>&nbsp;</h2>
                            <ul class="unstyled">
                                <li style="height: 40px;"><span class="square bg-color-yellow"></span>*-color-yellow</li>
                                <li style="height: 40px;"><span class="square bg-color-darken"></span>*-color-darken</li>
                                <li style="height: 40px;"><span class="square bg-color-purple"></span>*-color-purple</li>
                                <li style="height: 40px;"><span class="square bg-color-blue"></span>*-color-blue</li>
                                <li style="height: 40px;"><span class="square bg-color-blueDark"></span>*-color-blueDark</li>
                            </ul>
                        </div>
                        <div class="span3">
                            <h2>&nbsp;</h2>
                            <ul class="unstyled">
                                <li style="height: 40px;"><span class="square bg-color-blueLight"></span>*-color-blueLight</li>
                                <li style="height: 40px;"><span class="square bg-color-orange"></span>*-color-orange</li>
                                <li style="height: 40px;"><span class="square bg-color-orangeDark"></span>*-color-orangeDark</li>
                                <li style="height: 40px;"><span class="square bg-color-red"></span>*-color-red</li>
                                <li style="height: 40px;"><span class="square bg-color-white"></span>*-color-white</li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <p>For set background color use prefix <strong>bg</strong>, for set text color use prefix <strong>fg</strong></p>
<pre class="prettyprint linenums">
    &lt;div class="bg-color-red"&gt;...&lt;/div&gt;
    &lt;span class="fg-color-blue"&gt;...&lt;/span&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Fonts</h2>
                            <p class="span10">
                                In Metro UI CSS i'm use <a href="http://www.google.com/webfonts#UsePlace:use/Collection:Open+Sans">Open Sans</a> font for UI and for text use Lucida Grande, Verdana or Arial (depending on the availability of the system).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?php include("counter.php");?>

</body>
</html>