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

                            <p><small>You can also change the color of the button by <br />adding bg-color-* class, on example:</small></p>

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
                </div>
            </div>
        </div>
    </div>
    <?php include("counter.php");?>

</body>
</html>