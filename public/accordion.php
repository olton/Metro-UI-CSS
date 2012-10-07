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
    <script src="js/accordion.js"></script>

    <title>Modern UI CSS</title>
</head>
<body class="modern-ui" onload="prettyPrint()">
    <div class="page secondary">
        <? include("header.php")?>

        <div class="page-header">
            <div class="page-header-content">
                <h1>Accordion<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <h2>Accordion</h2>
                <ul class="accordion span10" data-role="accordion">
                    <li>
                        <a href="#">frame 1</a>
                        <div>
                            <h3>frame 1</h3>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta condimentum sem sed commodo.
                        </div>
                    </li>
                    <li class="active">
                        <a href="#">frame 2</a>
                        <div>
                            <h3>frame 2</h3>
                            Curabitur porta condimentum sem sed commodo. Praesent vestibulum, libero eget lacinia pretium, metus augue dapibus odio, nec placerat mauris justo non ante.
                        </div>
                    </li>
                    <li>
                        <a href="#">frame 3</a>
                        <div>
                            <h3>frame 3</h3>
                            Maecenas adipiscing nulla sed sem molestie quis pulvinar lectus convallis. Nam tortor arcu, gravida nec tristique sit amet, pretium sagittis eros. Curabitur at nisi ut ligula ornare euismod.
                        </div>
                    </li>
                    <li>
                        <a href="#">frame 4</a>
                        <div>
                            <h3>frame 4</h3>
                            Ut vitae tortor eget elit dictum dictum. Ut porttitor, ante non blandit gravida, felis risus feugiat neque, eu tincidunt neque ante at urna. Maecenas nec felis nulla.
                        </div>
                    </li>
                </ul>
                <h2>Accordion Dark</h2>
                <ul class="accordion dark span10" data-role="accordion">
                    <li>
                        <a href="#">frame 1</a>
                        <div>
                            <h3>frame 1</h3>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta condimentum sem sed commodo.
                        </div>
                    </li>
                    <li class="active">
                        <a href="#">frame 2</a>
                        <div>
                            <h3>frame 2</h3>
                            Curabitur porta condimentum sem sed commodo. Praesent vestibulum, libero eget lacinia pretium, metus augue dapibus odio, nec placerat mauris justo non ante.
                        </div>
                    </li>
                    <li>
                        <a href="#">frame 3</a>
                        <div>
                            <h3>frame 3</h3>
                            Maecenas adipiscing nulla sed sem molestie quis pulvinar lectus convallis. Nam tortor arcu, gravida nec tristique sit amet, pretium sagittis eros. Curabitur at nisi ut ligula ornare euismod.
                        </div>
                    </li>
                    <li>
                        <a href="#">frame 4</a>
                        <div>
                            <h3>frame 4</h3>
                            Ut vitae tortor eget elit dictum dictum. Ut porttitor, ante non blandit gravida, felis risus feugiat neque, eu tincidunt neque ante at urna. Maecenas nec felis nulla.
                        </div>
                    </li>
                </ul>
                <h2>Component definition</h2>
<pre class="prettyprint linenums span10">
    &lt;ul class="accordion" data-role="accordion"&gt;
        &lt;li class="active"&gt;
            &lt;a href="#"&gt; Caption &lt;/a&gt;
            &lt;div&gt; ...content... &lt;/div&gt;
        &lt;/li&gt;
        ...
        &lt;li&gt;
            &lt;a href="#"&gt; Caption &lt;/a&gt;
            &lt;div&gt; ...content... &lt;/div&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
    ==== Dark ===
    &lt;ul class="accordion dark" data-role="accordion"&gt;
        ...
    &lt;/ul&gt;
</pre>
                <h2>Javascript</h2>
                <p>Include in head <code>accordion.js</code></p>
            </div>
        </div>
        <? include("footer.php")?>

    </div>
    <?php include("counter.php");?>

</body>
</html>