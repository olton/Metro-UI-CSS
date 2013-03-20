<? include("header.php")?>

    <div class="page secondary">
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
                        <div class="span10">
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

                            <h2>Tile content</h2>
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
                                        <div class="badge">12</div>
                                        <img class="icon" src="images/Mail128.png"/>
                                    </div>
                                </div>
                                <div class="tile bg-color-red icon">
                                    <b class="check"></b>
                                    <div class="tile-content">
                                        <img src="images/Market128.png"/>
                                    </div>
                                    <div class="brand">
                                        <span class="name">Store</span>
                                        <span class="badge">6</span>
                                    </div>
                                </div>
                                <div class="tile double bg-color-blueDark">
                                    <div class="tile-content">
                                        <img src="images/michael.jpg" class="place-right"/>
                                        <h4 style="margin-bottom: 5px;">michael_angiulo</h4>
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
                            <p>Tiles content can be organized with built-in subclasses: <code>.icon</code>, <code>.image</code>, <code>.image-set</code>, <code>.image-slider</code>.</p>
                            <div class="grid">
                                <div class="row">
                                    <div class="span2">
                                        <h5>Subclass .icon</h5>
                                        <div class="tile icon">
                                            <div class="tile-content">
                                                <img src="images/armor.png" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="span4">
                                        <h5>Subclass .image</h5>
                                        <div class="tile double image">
                                            <div class="tile-content">
                                                <img src="images/5.jpg" alt="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="span4">
                                        <h5>Subclass .image-set</h5>
                                        <div class="tile double image-set">
                                            <div class="tile-content">
                                                <img src="images/1.jpg" alt="">
                                            </div>
                                            <div class="tile-content">
                                                <img src="images/2.jpg" alt="">
                                            </div>
                                            <div class="tile-content">
                                                <img src="images/3.jpg" alt="">
                                            </div>
                                            <div class="tile-content">
                                                <img src="images/4.jpg" alt="">
                                            </div>
                                            <div class="tile-content">
                                                <img src="images/5.jpg" alt="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="tile icon(image)"&gt;
        &lt;div class="tile-content"&gt;
            &lt;img /&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    ------------
    &lt;div class="tile image-set"&gt;
        &lt;div class="tile-content"&gt;
            &lt;img /&gt;
        &lt;/div&gt;
        &lt;div class="tile-content"&gt;
            &lt;img /&gt;
        &lt;/div&gt;
        &lt;div class="tile-content"&gt;
            &lt;img /&gt;
        &lt;/div&gt;
        &lt;div class="tile-content"&gt;
            &lt;img /&gt;
        &lt;/div&gt;
        &lt;div class="tile-content"&gt;
            &lt;img /&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    ------------
    &lt;div class="tile image-slider" data-role="image-slider"&gt;
        &lt;div class="tile-content"&gt;
            &lt;img /&gt;
        &lt;/div&gt;
        ...
        &lt;div class="tile-content"&gt;
            &lt;img /&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                                <h2 id="tile-slider-plugin">Tile Slider Plugin</h2>
                                <p>
                                    For use <code>tile-slider</code> you mus include <code>tile-slider.js</code> in head of you page and add attribute <code>data-role="tile-slider"</code> to tile object.
                                    To set specific parameters such as <code>direction</code>, <code>duration</code> and <code>period</code> you must add param <code>data-param-direction(duration, period)</code> to tile object.
                                </p>
                                <div class="tile double image-slider" data-role="tile-slider">
                                    <div class="tile-content">
                                        <img src="images/1.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/2.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/3.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/4.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/5.jpg" alt="">
                                    </div>
                                </div>

                                <div class="tile double image-slider" data-role="tile-slider" data-param-direction="left" data-param-period="3000">
                                    <div class="tile-content">
                                        <img src="images/1.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/2.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/3.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/4.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/5.jpg" alt="">
                                    </div>
                                </div>

                                <div class="tile double image-slider" data-role="tile-slider" data-param-direction="down" data-param-period="3000">
                                    <div class="tile-content">
                                        <img src="images/1.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/2.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/3.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/4.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/5.jpg" alt="">
                                    </div>
                                </div>

                                <div class="tile double image-slider" data-role="tile-slider" data-param-direction="right" data-param-period="3000" data-param-duration="3000">
                                    <div class="tile-content">
                                        <img src="images/1.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/2.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/3.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/4.jpg" alt="">
                                    </div>
                                    <div class="tile-content">
                                        <img src="images/5.jpg" alt="">
                                    </div>
                                </div>

                                <div class="tile double bg-color-green" data-role="tile-slider" data-param-period="3000">
                                    <div class="tile-content">
                                        <h2>mattberg@live.com</h2>
                                        <h5>Re: Wedding Annoucement!</h5>
                                        <p>
                                            Congratulations! I'm really excited to celebrate with you all. Thanks for...
                                        </p>
                                    </div>
                                    <div class="tile-content">
                                        <h2>tina@live.com</h2>
                                        <h5>Re: Wedding Annoucement!</h5>
                                        <p>
                                            Huh! Waw!!! I'm really excited to celebrate with you all. Thanks for...
                                        </p>
                                    </div>
                                    <div class="brand">
                                        <div class="badge">12</div>
                                        <img class="icon" src="images/Mail128.png"/>
                                    </div>
                                </div>

                            </div>
                            <p>
                                The default value of params:
                                <ul>
                                    <li>Duration - 1000ms </li>
                                    <li>Period - 2000ms</li>
                                    <li>Direction - "up"</li>
                                </ul>
                            </p>

                            <h3>Tile status</h3>
                            <p>Tile status (branding info) can be placed in sub container with class <code>.brand</code> or <code>.tile-status</code>. Tile status background color can be changed, example with built-in classes <code>.bg-color-* </code></p>
<pre class="prettyprint linenums">
    &lt;div class="tile"&gt;
        &lt;div class="brand"&gt;
            <small>...status content here...</small>
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                            <h3>Tile status &gt; badge</h3>
                            <p>
                                A badge can display either a number from 1-99 or a status glyph. badge is positioned in tile status container on the bottom right corner.
                                Metro UI CSS support main Windows 8 badges: <span class="fg-color-blue">activity, alert, available, away, busy, newMessage, paused, playing, unavailable, error and attention</span> as built-in. Default badge background color is blue but may be changed, example with built-in classes <code>.bg-color-*</code>.
                            </p>
<pre class="prettyprint linenums">
    &lt;div class="tile"&gt;
        &lt;div class="brand"&gt;
            &lt;div class="badge activity"&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                            <div class="clearfix">
                                <div class="tile">
                                    <div class="tile-status">
                                        <div class="badge bg-color-blue">99</div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="tile-status">
                                        <div class="badge activity"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="badge alert"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="badge available"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="badge away"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="badge busy"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="badge newMessage"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="badge paused"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="badge playing"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="badge unavailable"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="badge error"></div>
                                    </div>
                                </div>
                                <div class="tile">
                                    <div class="brand">
                                        <div class="badge attention"></div>
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
                                        <div class="badge">10</div>
                                        <div class="name">Mail</div>
                                    </div>
                                </div>
                                <div class="tile double bg-color-green">
                                    <div class="brand">
                                        <div class="badge">12</div>
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

                <div class="tiles clearfix">
                    <h3>Examples of tiles made with Metro UI CSS</h3>
                    <div class="tile image">
                        <div class="tile-content">
                            <img src="images/myface.jpg" alt="">
                        </div>
                    </div>

                    <div class="tile icon">
                        <div class="tile-content">
                            <img src="images/Mail128.png"/>
                        </div>
                        <div class="brand">
                            <div class="badge">10</div>
                            <div class="name">Mail</div>
                        </div>
                    </div>

                    <div class="tile bg-color-orangeDark icon selected">
                        <b class="check"></b>
                        <div class="tile-content">
                            <img src="images/Video128.png" alt="" />
                        </div>
                        <div class="brand">
                            <span class="name">Video</span>
                        </div>
                    </div>

                    <div class="tile double image">
                        <div class="tile-content">
                            <img src="images/5.jpg" alt="" />
                        </div>
                        <div class="brand">
                            <span class="name">Pictures</span>
                            <div class="badge bg-color-orange">5</div>
                        </div>
                    </div>

                    <div class="tile double-vertical bg-color-yellow icon">
                        <div class="tile-content">
                            <img src="images/Calendar128.png" />
                        </div>
                        <div class="brand">
                            <span class="name">Calendar</span>
                        </div>
                    </div>

                    <div class="tile bg-color-green icon selected">
                        <b class="check"></b>
                        <div class="tile-content">
                            <img src="images/Market128.png"/>
                        </div>
                        <div class="brand">
                            <span class="name">Store</span>
                            <span class="badge">6</span>
                        </div>
                    </div>

                    <div class="tile bg-color-red icon selected">
                        <div class="tile-content">
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

                    <div class="tile bg-color-darken icon">
                        <div class="tile-content">
                            <img src="images/YouTube128.png" alt="" />
                        </div>
                        <div class="brand">
                            <span class="name">YouTube</span>
                        </div>
                    </div>

                    <div class="tile icon">
                        <div class="tile-content">
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
                            <div class="badge">12</div>
                            <img class="icon" src="images/Mail128.png"/>
                        </div>
                    </div>

                    <div class="tile double image">
                        <div class="tile-content">
                            <img src="images/4.jpg" alt="" />
                        </div>
                        <div class="brand bg-color-orange">
                            <img class="icon" src="images/Rss128.png"/>
                            <p class="text">This is a desert eagle. He is very hungry and angry bird.</p>
                            <div class="badge">10</div>
                        </div>
                    </div>

                    <div class="tile double image-set">
                        <div class="tile-content">
                            <img src="images/1.jpg" alt="">
                        </div>
                        <div class="tile-content">
                            <img src="images/2.jpg" alt="">
                        </div>
                        <div class="tile-content">
                            <img src="images/3.jpg" alt="">
                        </div>
                        <div class="tile-content">
                            <img src="images/4.jpg" alt="">
                        </div>
                        <div class="tile-content">
                            <img src="images/5.jpg" alt="">
                        </div>
                        <div class="brand">
                            <span class="name">Photos</span>
                        </div>
                    </div>

                    <div class="tile bg-color-blue icon">
                        <div class="tile-content">
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
    </div>

<? include("footer.php")?>