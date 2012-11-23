<? include("header.php")?>

    <div class="page secondary">
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
                            <p>To set background color use prefix <strong>bg</strong>, for set text color use prefix <strong>fg</strong></p>
<pre class="prettyprint linenums">
    &lt;div class="bg-color-red"&gt;...&lt;/div&gt;
    &lt;span class="fg-color-blue"&gt;...&lt;/span&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <p>To set border color use prefix <strong>border</strong></p>
                            <div class="clearfix">
                                <div class="span2 border-color-blue">
                                    &nbsp;
                                </div>
                                <div class="span2 border-color-green">
                                    &nbsp;
                                </div>
                                <div class="span2 border-color-red">
                                    &nbsp;
                                </div>
                                <div class="span2 border-color-orange">
                                    &nbsp;
                                </div>
                                <div class="span2 border-color-darken">
                                    &nbsp;
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="border-color-red"&gt;...&lt;/div&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <p>To set outline color for components (such as tile, listView item, etc.) use prefix <strong>outline</strong></p>
                            <div class="clearfix">
                                <div class="tile outline-color-blue">
                                    &nbsp;
                                </div>
                                <div class="tile outline-color-green">
                                    &nbsp;
                                </div>
                                <div class="tile outline-color-red">
                                    &nbsp;
                                </div>
                                <div class="tile outline-color-orange">
                                    &nbsp;
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="tile outline-color-red"&gt;...&lt;/div&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Fonts</h2>
                            <p class="span10">
                                In Metro UI CSS i use Segoe UI, <a href="http://www.google.com/webfonts#UsePlace:use/Collection:Open+Sans">Open Sans</a> fonts (depending on the availability in the system).
                            </p>
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
    </div>


<? include("footer.php")?>