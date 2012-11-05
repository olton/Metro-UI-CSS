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

                            <button class="standart">Button</button>
                            <button class="standart default">Button</button>
                            <button class="standart" disabled="">Button</button>

                            <p><small>You can also change the color of the button by <br />adding bg-color-* class. Example:</small></p>

                            <button class="bg-color-orange">Button</button>
                            <button class="bg-color-red">Button</button>
                            <button class="bg-color-green">Button</button>
                            <button class="bg-color-purple">Button</button>
                            <button class="bg-color-blue">Button</button>
                            <button class="bg-color-grayDark">Button</button>

                            <p>
                                <small>You can use tag <code>&lt;a&gt;</code> for creating button with class <code>.button</code></small>
                            </p>

                            <a class="button">Button</a>
                            <a class="button default">Button</a>
                            <a class="button disabled">Button</a>
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
    &lt;a class="button"&gt;Button&lt;/a&gt;
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
                                <button><i class="icon-home"></i></button>
                                <button><i class="icon-bookmark"></i></button>
                                <button><i class="icon-phone"></i></button>
                                <button><i class="icon-compass"></i></button>
                                <button><i class="icon-mail"></i></button>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="toolbar"&gt;
        &lt;button /&gt;
        ...
        &lt;button /&gt;
    &lt;/div&gt;
</pre>
                            <h2>Toolbar buttons group</h2>
                            <div class="toolbar">
                                <div class="toolbar-group">
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </div>
                                <div class="toolbar-group">
                                    <button></button>
                                    <button></button>
                                    <button></button>
                                </div>
                                <div class="toolbar-group">
                                    <button class="big"></button>
                                    <button class="big"></button>
                                    <button class="big"></button>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="toolbar"&gt;
        &lt;div class="toolbar-group"&gt;
            &lt;button /&gt;
            ...
            &lt;button /&gt;
        &lt;/div&gt;
        ...
        &lt;div class="toolbar-group"&gt;
            &lt;button /&gt;
            ...
            &lt;button /&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>

                            <h2>Toolbar Vertical</h2>
                            <div class="clearfix">
                                <div class="toolbar-vertical">
                                    <button>1</button>
                                    <button>2</button>
                                    <button>3</button>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="toolbar-vertical"&gt;
        &lt;button /&gt;
        ...
        &lt;button /&gt;
    &lt;/div&gt;
</pre>
                            <h2>Toolbar Vertical with groups</h2>
                            <div class="clearfix">
                                <div class="toolbar-vertical">
                                    <div class="toolbar-group">
                                        <button>1</button>
                                        <button>2</button>
                                        <button>3</button>
                                    </div>
                                    <div class="toolbar-group">
                                        <button>1</button>
                                        <button>2</button>
                                        <button>3</button>
                                    </div>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="toolbar-vertical"&gt;
        &lt;div class="toolbar-group"&gt;
            &lt;button /&gt;
            ...
            &lt;button /&gt;
        &lt;/div&gt;
        ...
        &lt;div class="toolbar-group"&gt;
            &lt;button /&gt;
            ...
            &lt;button /&gt;
        &lt;/div&gt;
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
                            <h2>Any size of button</h2>
                            <div>
                                <button class="mini"><i class="icon-home"></i> Mini</button>
                                <button class="mini">Mini <i class="icon-home"></i></button>
                                <button class="mini">Mini</button>
                            </div>
                            <div>
                                <button><i class="icon-home"></i> Default</button>
                                <button>Default <i class="icon-home"></i></button>
                                <button>Default</button>
                            </div>
                            <div>
                                <button class="big">Big button</button>
                                <button class="big"><i class="icon-mail"></i> Big button</button>
                                <button class="big">Big button <i class="icon-mail"></i></button>
                            </div>
<pre class="prettyprint linenums">
    &lt;button class="mini"&gt; Caption &lt;/button&gt;
    &lt;button&gt; Caption &lt;/button&gt;
    &lt;button class="big"&gt; Caption &lt;/button&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Button with icon</h2>
                            <button><i class="icon-bookmark"></i> Button</button>
                            <button>Button <i class="icon-bookmark"></i></button>
                            <button class="default">Button <i class="icon-bookmark"></i></button>
<pre class="prettyprint linenums">
    &lt;button&gt;&lt;i class="icon-*"&gt;&lt;/i&gt;Caption&lt;/button&gt;
    &lt;button&gt;Caption&lt;i class="icon-*"&gt;&lt;/i&gt;&lt;/button&gt;
    &lt;button class="default"&gt;&lt;i class="icon-*"&gt;&lt;/i&gt;Caption&lt;/button&gt;
</pre>
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