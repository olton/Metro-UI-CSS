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
    <script src="js/buttonset.js"></script>

    <title>Modern UI CSS</title>
</head>
<body class="modern-ui" onload="prettyPrint()">
    <div class="page secondary">
        <? include("header.php")?>

        <div class="page-header">
            <div class="page-header-content">
                <h1>Buttons<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span5">
                            <h2>Push Button</h2>

                            <button>Button</button>
                            <button class="default">Button</button>
                            <button disabled="">Button</button>

                            <p><small>You can also change the color of the button by <br />adding bg-color-* class. Example:</small></p>

                            <button class="bg-color-orange">Button</button>
                            <button class="bg-color-red">Button</button>
                            <button class="bg-color-green">Button</button>
                            <button class="bg-color-purple">Button</button>
                            <button class="bg-color-blue">Button</button>
                            <button class="bg-color-grayDark">Button</button>
                        </div>
                        <div class="span5">
                            <h2>Command Button</h2>
                            <button class="command-button">Yes, share and connect<small>Use this option for home or work</small></button>
                            <button class="command-button default">Yes, share and connect<small>Use this option for home or work</small></button>
                            <button class="command-button">Tertiary command, do not press :)</button>
                            <button class="command-button" disabled="">This is disabled command button</button>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">

<pre class="prettyprint linenums">
    &lt;button&gt;Button&lt;/button&gt;
    &lt;button class="default"&gt;Button&lt;/button&gt;
    &lt;button disabled&gt;Button&lt;/button&gt;
</pre>


<pre class="prettyprint linenums">
    &lt;button class="command-button"&gt;
        Yes, share and connect
        &lt;small&gt;Use this option for home or work&lt;/small&gt;
    &lt;/button&gt;

    &lt;button class="command-button default"&gt;...&lt;/button&gt;
    &lt;button class="command-button" disabled&gt;...&lt;/button&gt;
</pre>


                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Toolbar</h2>
                            <div class="toolbar">
                                <button>1</button>
                                <button>2</button>
                                <button>3</button>
                                <button>4</button>
                                <button>5</button>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="toolbar"&gt;
        &lt;button /&gt;
        ...
        &lt;button /&gt;
    &lt;/div&gt;
</pre>
                            <h2>Toolbar Vertical</h2>
                            <div class="clearfix">
                                <div class="toolbar-vertical">
                                    <button>1</button>
                                    <button>2</button>
                                    <button>3</button>
                                    <button>4</button>
                                    <button>5</button>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="toolbar-vertical"&gt;
        &lt;button /&gt;
        ...
        &lt;button /&gt;
    &lt;/div&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Image button</h2>
                            <button class="image-button bg-color-darken fg-color-white">Download source<img class="bg-color-green" src="images/download-32.png"/></button>
                            <button class="image-button bg-color-pink fg-color-white">Armor you computer<img class="bg-color-red" src="images/armor.png"/></button>
<pre class="prettyprint linenums">
    &lt;button class="image-button"&gt; Caption &lt;img/&gt; &lt;/button&gt;
    ===================
    &lt;button class="image-button bg-color-darken fg-color-white"&gt;Download&lt;img src="images/down.png"/&gt;&lt;/button&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Button set</h2>
                            <div class="button-set place-left" data-role="button-set">
                                <button class="active">button 1</button>
                                <button>button 2</button>
                                <button>button 3</button>
                            </div>
                            <div class="button-set" data-role="button-set">
                                <button class="tool-button active"><img src="images/bage-playing.png" /></button>
                                <button class="tool-button"><img src="images/bage-paused.png" /></button>
                                <button class="tool-button"><img src="images/bage-busy.png" /></button>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="button-set" data-role="button-set"&gt;
        &lt;button class="active"&gt; ... &lt;/button&gt;
        &lt;button&gt; ... &lt;/button&gt;
    &lt;/div&gt;
    ------------
    &lt;div class="button-set" data-role="button-set"&gt;
        &lt;button class="tool-button active"&gt; ... &lt;/button&gt;
        &lt;button class="tool-button"&gt; ... &lt;/button&gt;
    &lt;/div&gt;
</pre>
                            <h3>Javascript</h3>
                            <p>To activate button set include in head <code>buttonset.js</code></p>
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