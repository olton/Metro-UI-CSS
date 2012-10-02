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
    <script src="js/pagecontrol.js"></script>

    <script>
        $(function(){
            //$(".page-control").PageControl();
        })
    </script>

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
                <h1>PageControl<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">

                <div class="page-control span10" data-role="page-control">
                    <ul>
                        <li class="active"><a href="#home">Home</a></li>
                        <li><a href="#profile">Profile</a></li>
                        <li><a href="#messages">Messages</a></li>
                        <li><a href="#settings">Settings</a></li>
                    </ul>

                    <div class="frames">
                        <div class="frame active" id="home">
                            <div class="grid">
                                <div class="row">
                                    <div class="span2">
                                        <img src="images/author.jpg"/>
                                        <p class="tertiary-info-secondary-text bg-color-grayDark" style="padding: 10px; color: #fff;">Hi! My name is Sergey Pimenov and i'm author of Metro UI CSS from <abbr title="The capital of Ukraine">Kiev</abbr>, <abbr title="The center of Europe">Ukraine</abbr>.</p>
                                    </div>
                                    <div class="span7">
                                        <div class="grid">
                                            <div class="row">
                                                <div class="span4" style="padding: 10px;">
                                                    <h2 style="margin-top: 0;">About:</h2>
                                                    <p>
                                                        Metro UI CSS a set of styles to create a site with an interface similar to Windows 8 Metro UI. The set of styles developed as a self-contained solution.
                                                    </p>
                                                    <br />
                                                    <p class="tertiary-info-text">
                                                        Metro UI CSS is made with LESS. <a href="http://lesscss.org">LESS</a> a dynamic stylesheet language created by one good man, <a href="http://cloudhead.io/">Alexis Sellier</a>. It makes developing systems-based CSS faster, easier, and more fun.
                                                    </p>
                                                </div>
                                                <div class="span3" style="padding: 10px;">
                                                    <h2 style="margin-top: 0;">Objectives:</h2>
                                                    <ol>
                                                        <li>Responsive design</li>
                                                        <li>Tiles animation effects</li>
                                                        <li>Additional components</li>
                                                        <li>Visual Studio Plugin</li>
                                                        <li>...</li>
                                                    </ol>
                                                    <h3>Browsers:</h3>
                                                    <ul>
                                                        <li>Internet Explorer 9+</li>
                                                        <li>Firefox</li>
                                                        <li>Chrome</li>
                                                        <li>Opera</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="frame" id="profile">
                            <h3>Author Profile:</h3>
                            <fieldset>
                                <legend>General</legend>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td class="span2">Name</td>
                                            <td>Sergey Pimenov</td>
                                        </tr>
                                        <tr>
                                            <td class="span2">Age</td>
                                            <td>40</td>
                                        </tr>
                                        <tr>
                                            <td class="span2">Address</td>
                                            <td>Kiev, Ukraine</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                            <fieldset>
                                <legend>Contacts</legend>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td class="span2">Skype</td>
                                            <td>sergey.s.pimenov</td>
                                        </tr>
                                        <tr>
                                            <td class="span2">Email</td>
                                            <td>sergey@pimenov.com.ua</td>
                                        </tr>
                                        <tr>
                                            <td class="span2">Phone</td>
                                            <td>+380 93 959 0564</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                        <div class="frame" id="messages">
                            <h3>Frame 3</h3>
                            <p>
                                This is a page 3.
                            </p>
                        </div>
                        <div class="frame" id="settings">
                            <h3>Frame 4</h3>
                            <p>
                                This is a page 4.
                            </p>
                        </div>
                    </div>
                </div>

                <h2>Component definition</h2>
<pre class="prettyprint linenums span10">
    &lt;div class="page-control" data-role="page-control"&gt;
        === Tabs ===
        &lt;ul&gt;
            &lt;li class="active"&gt;&lt;a href="#frame1"&gt;Frame1&lt;/a&gt;&lt;/li&gt;
            ...
            &lt;li&gt;&lt;a href="#frameN"&gt;FrameN&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
        === Tabs content ===
        &lt;div class="frames"&gt;
            &lt;div class="frame active" id="frame1"&gt; ...frame content... &lt;/div&gt;
            ...
            &lt;div class="frame" id="frameN"&gt; ...frame content... &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                <h2>Javascript</h2>
                <p>Include in head <code>pagecontrol.js</code></p>
            </div>
        </div>
    </div>
    <?php include("counter.php");?>

</body>
</html>