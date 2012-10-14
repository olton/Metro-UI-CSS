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
    <script src="js/google-code-prettify/prettify.js"></script>
    <script src="js/github.info.js"></script>

    <title>Modern UI CSS</title>
</head>
<body class="modern-ui" onload="prettyPrint()">
    <div class="page secondary">
        <? include("header.php")?>

        <div class="page-header">
            <div class="page-header-content">
                <h1>Tables<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="span10">
                <h2>Default table</h2>
<pre class="prettyprint linenums">
    &lt;table&gt;
        ...
    &lt;/table&gt;
</pre>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="right">Time CP</th>
                            <th class="right">Network</th>
                            <th class="right">Traffic</th>
                            <th class="right">Tiles update</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr><td>Bing</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Internet Explorer</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Chrome</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>News</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Weather</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Music</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                    </tbody>

                    <tfoot></tfoot>
                </table>

                <h2>striped table</h2>
<pre class="prettyprint linenums">
    &lt;table class="striped"&gt;
        ...
    &lt;/table&gt;
</pre>
                <table class="striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="right">Time CP</th>
                            <th class="right">Network</th>
                            <th class="right">Traffic</th>
                            <th class="right">Tiles update</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr><td>Bing</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Internet Explorer</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Chrome</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>News</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Weather</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Music</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                    </tbody>

                    <tfoot></tfoot>
                </table>

                <h2>Bordered table</h2>
<pre class="prettyprint linenums">
    &lt;table class="bordered"&gt;
        ...
    &lt;/table&gt;
</pre>
                <table class="bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="right">Time CP</th>
                            <th class="right">Network</th>
                            <th class="right">Traffic</th>
                            <th class="right">Tiles update</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr><td>Bing</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Internet Explorer</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Chrome</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>News</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Weather</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Music</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                    </tbody>

                    <tfoot></tfoot>
                </table>

                <h2>Hovered table</h2>
<pre class="prettyprint linenums">
    &lt;table class="hovered"&gt;
        ...
    &lt;/table&gt;
</pre>
                <table class="hovered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="right">Time CP</th>
                            <th class="right">Network</th>
                            <th class="right">Traffic</th>
                            <th class="right">Tiles update</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr><td>Bing</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Internet Explorer</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Chrome</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>News</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Weather</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Music</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                    </tbody>

                    <tfoot></tfoot>
                </table>

                <h2>Optional row classes</h2>
                <p>For displaying optional rows you must add one of next classes for <code>&lt;tr&gt;</code>:</p>
                <ul class="unstyled">
                    <li class="fg-color-red">error</li>
                    <li class="fg-color-green">success</li>
                    <li class="fg-color-orange">warning</li>
                    <li class="fg-color-blue">info</li>
                    <li>selected-row</li>
                </ul>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="right">Time CP</th>
                            <th class="right">Network</th>
                            <th class="right">Traffic</th>
                            <th class="right">Tiles update</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr class="selected-row"><td>Bing</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Internet Explorer</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr class="success"><td>Chrome</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr class="error"><td>News</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr class="warning"><td>Weather</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr class="info"><td>Music</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                    </tbody>

                    <tfoot></tfoot>
                </table>

                <div class="grid">
                    <div class="row">
                        <? include("adsense.php")?>
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