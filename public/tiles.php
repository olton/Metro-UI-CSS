<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
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
                <h1>Tiles<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div style="width: 800px">
                            <h2>Windows 8 Start Page Demo</h2>
                            <p>
                                <a href="windows8start.php">Demo page</a>
                            </p>

                            <h2>General info</h2>
                            <p>
                                Tiles are the representation of your app or sub module. The content shown on your tile can, and ideally should, change regularly, especially if your tile can communicate new, real-time information to your user. Tiles can show a combination of text and images, and a badge to show status.
                                Tile is a block object and can be placed in any container.
                            </p>

                            <p>The default tile size is 150x150 pixels. Tile size may be increased with add the next subclasses for tile object: <code>.double(-vertical)</code>, <code>.triple(-vertical)</code>, <code>.quadro(-vertical)</code>.</p>

                            <p>For tile may be set status "selected". You also may be change background color for tile with classes <code>.bg-color-*</code></p>

                            <h3>Tile definition:</h3>

<pre class="prettyprint linenums">
    &lt;div class="tile"&gt;&lt;/div&gt;
    &lt;div class="tile double"&gt;&lt;/div&gt;
    &lt;div class="tile selected"&gt;&lt;/div&gt;
    &lt;div class="tile bg-color-orange"&gt;&lt;/div&gt;
</pre>
                            <div class="clearfix">
                                <div class="tile"></div>
                                <div class="tile double"></div>
                                <div class="tile selected"></div>
                                <div class="tile bg-color-orange"></div>
                            </div>

                            <h3>Tile content</h3>
                            <p>Tile content can be placed in sub container with class <code>.tile-content</code>. Class .tile-content has padding 10px from top, bottom and 15px from left, right.</p>
<pre class="prettyprint linenums">
    &lt;div class="tile"&gt;
        &lt;div class="tile-content"&gt;
            <small>...content here...</small>
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                            <div class="clearfix">
                                <div class="tile double bg-color-green">
                                    <div class="tile-content">
                                        <h2>mattberg@live.com</h2>
                                        <h5>Re: Wedding Annoucement!</h5>
                                        <p>
                                            Congratulations! I'm really excited to celebrate with you all. Thanks for...
                                        </p>
                                    </div>
                                    <div class="brand">
                                        <div class="bage">12</div>
                                        <img class="icon" src="images/Mail128.png"/>
                                    </div>
                                </div>
                                <div class="tile bg-color-red">
                                    <b class="check"></b>
                                    <div class="tile-content icon">
                                        <img src="images/Market128.png"/>
                                    </div>
                                    <div class="brand">
                                        <span class="name">Store</span>
                                        <span class="bage">6</span>
                                    </div>
                                </div>
                                <div class="tile double bg-color-blueDark">
                                    <div class="tile-content">
                                        <img src="images/michael.jpg" class="place-right"/>
                                        <h3 style="margin-bottom: 5px;">michael_angiulo</h3>
                                        <p>
                                            I just saw Thor last night. It was awesome! I think you'd love it.
                                        <h5>RT @julie_green</h5>
                                        </p>
                                    </div>
                                    <div class="brand">
                                        <span class="name">Tweet@rama</span>
                                    </div>
                                </div>
                            </div>

                            <h3>Tiles content built-in subclasses</h3>
                            <p>Tiles content can be organized with built-in subclasses: <code>.icon</code>, <code>.image</code>, <code>.image-set</code>.</p>
                            <div class="grid">
                                <div class="row">
                                    <div class="span2">
                                        <h5>Subclass .icon</h5>
                                        <div class="tile">
                                            <div class="tile-content icon">
                                                <img src="images/armor.png" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <h5>Subclass .image</h5>
                                        <div class="tile double">
                                            <div class="tile-content image">
                                                <img src="images/5.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <h5>Subclass .image-set</h5>
                                        <div class="tile double">
                                            <div class="tile-content images-set">
                                                <img src="images/1.jpg" alt="">
                                                <img src="images/2.jpg" alt="">
                                                <img src="images/3.jpg" alt="">
                                                <img src="images/4.jpg" alt="">
                                                <img src="images/5.jpg" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
<pre class="prettyprint linenums">
    &lt;div class="tile"&gt;
        &lt;div class="tile-content icon(image)"&gt;
            &lt;img /&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="tile"&gt;
        &lt;div class="tile-content image-set"&gt;
            &lt;img /&gt;
            &lt;img /&gt;
          &lt;img /&gt;
          &lt;img /&gt;
          &lt;img /&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>

                            </div>

                            <h3>Tile status</h3>
                            <p>Tile status (branding info) can be placed in sub container with class <code>.brand</code> or <code>.tile-status</code>. Tile status background color can be changed, example with built-in classes <code>.bg-color-* </code></p>
<pre class="prettyprint linenums">
    &lt;div class="tile"&gt;
        &lt;div class="brand"&gt;
            <small>...status content here...</small>
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                            <h3>Tile status &gt; Bage</h3>
                            <p>
                                A badge can display either a number from 1-99 or a status glyph. Bage is positioned in tile status container on the bottom right corner.
                                Metro UI CSS support main Windows 8 bages: <span class="fg-color-blue">activity, alert, available, away, busy, newMessage, paused, playing, unavailable, error and attention</span> as built-in. Default bage background color is blue but may be changed, example with built-in classes <code>.bg-color-*</code>.
                            </p>
<pre class="prettyprint linenums">
    &lt;div class="tile"&gt;
        &lt;div class="brand"&gt;
            &lt;div class="bage activity"&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                            <div class="clearfix">
                                <div class="tile">
                                    <div class="tile-status">
                                        <div class="bage bg-color-blue">99</div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="tile-status">
                                        <div class="bage activity"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage alert"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage available"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage away"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage busy"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage newMessage"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage paused"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage playing"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage unavailable"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage error"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage attention"></div>
                                    </div>
                                </div>
                            </div>

                            <h3>Tile status &gt; Branding info</h3>
                            <p>
                                A branding info can display brand name or a brand glyph. Branding info  is positioned in tile status container on the bottom left corner.
                            </p>
<pre class="prettyprint linenums">
    &lt;div class="tile"&gt;
        &lt;div class="brand"&gt;
            &lt;div class="name"&gt;Name&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class="tile"&gt;
        &lt;div class="brand"&gt;
            &lt;div class="icon"&gt; &lt;img /&gt; &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                            <div class="clearfix">
                                <div class="tile">
                                    <div class="brand">
                                        <div class="bage">10</div>
                                        <div class="name">Mail</div>
                                    </div>
                                </div>
                                <div class="tile double bg-color-green">
                                    <div class="brand">
                                        <div class="bage">12</div>
                                        <img class="icon" src="images/Mail128.png"/>
                                    </div>
                                </div>
                                <div class="tile double bg-color-pink">
                                    <div class="brand">
                                        <div class="name">Photos</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tiles clearfix">
                    <h3>Examples of tiles made with Metro UI CSS</h3>
                    <div class="tile">
                        <div class="tile-content image">
                            <img src="images/myface.jpg" alt="">
                        </div>
                    </div>

                    <div class="tile">
                        <div class="tile-content icon">
                            <img src="images/Mail128.png"/>
                        </div>
                        <div class="brand">
                            <div class="bage">10</div>
                            <div class="name">Mail</div>
                        </div>
                    </div>

                    <div class="tile bg-color-orangeDark selected">
                        <b class="check"></b>
                        <div class="tile-content icon">
                            <img src="images/Video128.png" alt="" />
                        </div>
                        <div class="brand">
                            <span class="name">Video</span>
                        </div>
                    </div>

                    <div class="tile double">
                        <div class="tile-content image">
                            <img src="images/5.jpg" alt="" />
                        </div>
                        <div class="brand">
                            <span class="name">Pictures</span>
                            <div class="bage bg-color-orange">5</div>
                        </div>
                    </div>

                    <div class="tile double-vertical bg-color-yellow">
                        <div class="tile-content icon">
                            <img src="images/Calendar128.png" />
                        </div>
                        <div class="brand">
                            <span class="name">Calendar</span>
                        </div>
                    </div>

                    <div class="tile bg-color-green selected">
                        <b class="check"></b>
                        <div class="tile-content icon">
                            <img src="images/Market128.png"/>
                        </div>
                        <div class="brand">
                            <span class="name">Store</span>
                            <span class="bage">6</span>
                        </div>
                    </div>

                    <div class="tile bg-color-red selected">
                        <div class="tile-content icon">
                            <img src="images/Music128.png" alt="" />
                        </div>
                        <div class="brand">
                            <span class="name">Music</span>
                        </div>
                    </div>

                    <div class="tile double bg-color-blueDark">
                        <div class="tile-content">
                            <img src="images/michael.jpg" class="place-left"/>
                            <h3 style="margin-bottom: 5px;">michael_angiulo</h3>
                            <p>
                                I just saw Thor last night. It was awesome! I think you'd love it.
                                <h5>RT @julie_green</h5>
                            </p>
                        </div>
                        <div class="brand">
                            <span class="name">Tweet@rama</span>
                        </div>
                    </div>

                    <div class="tile bg-color-darken">
                        <div class="tile-content icon">
                            <img src="images/YouTube128.png" alt="" />
                        </div>
                        <div class="brand">
                            <span class="name">YouTube</span>
                        </div>
                    </div>

                    <div class="tile">
                        <div class="tile-content icon">
                            <img src="images/excel2013icon.png"/>
                        </div>
                        <div class="brand">
                            <span class="name">Excel 2013</span>
                        </div>
                    </div>

                    <div class="tile double bg-color-green">
                        <div class="tile-content">
                            <h2>mattberg@live.com</h2>
                            <h5>Re: Wedding Annoucement!</h5>
                            <p>
                                Congratulations! I'm really excited to celebrate with you all. Thanks for...
                            </p>
                        </div>
                        <div class="brand">
                            <div class="bage">12</div>
                            <img class="icon" src="images/Mail128.png"/>
                        </div>
                    </div>

                    <div class="tile double">
                        <div class="tile-content image">
                            <img src="images/4.jpg" alt="" />
                        </div>
                        <div class="brand bg-color-orange">
                            <img class="icon" src="images/Rss128.png"/>
                            <p class="text">This is a desert eagle. He is very hungry and angry bird.</p>
                            <div class="bage">10</div>
                        </div>
                    </div>

                    <div class="tile double">
                        <div class="tile-content images-set">
                            <img src="images/1.jpg" alt="">
                            <img src="images/2.jpg" alt="">
                            <img src="images/3.jpg" alt="">
                            <img src="images/4.jpg" alt="">
                            <img src="images/5.jpg" alt="">
                        </div>
                        <div class="brand">
                            <span class="name">Photos</span>
                        </div>
                    </div>

                    <div class="tile bg-color-blue">
                        <div class="tile-content icon">
                            <img src="images/InternetExplorer128.png"/>
                        </div>
                        <div class="brand">
                            <span class="name">Internet Explorer</span>
                        </div>
                    </div>
                </div>

                <br />
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