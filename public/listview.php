<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>List view<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="span10">
                    <h2>List view</h2>

                    <ul class="listview">
                        <li class="bg-color-pinkDark fg-color-white">
                            <div class="icon">
                                <img src="images/onenote2013icon.png" />
                            </div>

                            <div class="data">
                                <h4 class="fg-color-white">OneNote 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li>
                            <div class="icon">
                                <img src="images/excel2013icon.png" />
                            </div>

                            <div class="data">
                                <h4>Excel 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li class="selected">
                            <div class="icon">
                                <img src="images/word2013icon.png" />
                            </div>

                            <div class="data">
                                <h4>Word 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li>
                            <div class="icon">
                                <img src="images/firefox.png" />
                            </div>

                            <div class="data">
                                <h4>Firefox</h4>
                                <div class="progress-bar">
                                    <div class="bar" style="width: 75%"></div>
                                </div>
                                <p>Download...</p>
                            </div>
                        </li>
                    </ul>

<pre class="prettyprint linenums span10">
    &lt;ul class="listview"&gt;
        &lt;li&gt;
            &lt;div class="icon"&gt;
                &lt;img /&gt;
            &lt;/div&gt;
            &lt;div class="data"&gt;
                &lt;h4&gt;Title&lt;/h4&gt;
                ...
                &lt;p&gt;text&lt;/p&gt;
            &lt;/div&gt;
        &lt;/li&gt;
        ...
    &lt;/ul&gt;
</pre>

                    <h2>List view Fluid</h2>
                    <ul class="listview fluid">
                        <li>
                            <div class="icon">
                                <img src="images/onenote2013icon.png" />
                            </div>

                            <div class="data">
                                <h4>OneNote 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li>
                            <div class="icon">
                                <img src="images/firefox.png" />
                            </div>

                            <div class="data">
                                <h4>Firefox</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>Free</p>
                            </div>
                        </li>

                        <li class="bg-color-blueDark fg-color-white">
                            <div class="icon">
                                <img src="images/word2013icon.png" />
                            </div>

                            <div class="data">
                                <h4 class="fg-color-white">Word 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li class="selected">
                            <div class="icon">
                                <img src="images/excel2013icon.png" />
                            </div>

                            <div class="data">
                                <h4>Excel 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>
                    </ul>

<pre class="prettyprint linenums span10">
    &lt;ul class="listview fluid"&gt;
        ...
    &lt;/ul&gt;
</pre>
                    <h2>ListView Image</h2>
                    <ul class="listview image">
                        <li>
                            <div class="icon">
                                <img src="images/myface.jpg" />
                            </div>
                            <div class="data">
                                <h4>This is a my face</h4>
                                <p>
                                    Hi! My name is Sergey Pimenov and i'm author of Metro UI CSS from Kiev, Ukraine.
                                </p>
                                <a href="mailto:sergey@pimenov.com.ua">sergey@pimenov.com.ua</a>


                            </div>
                        </li>
                        <li class="bg-color-red fg-color-white">
                            <div class="icon">
                                <img src="images/1.jpg" />
                            </div>
                            <div class="data">
                                <h4 class="fg-color-white">Bear</h4>
                                <p>
                                    Bears are mammals of the family Ursidae. Bears are classified as caniforms, or doglike carnivorans, with the pinnipeds being their closest living relatives.
                                </p>
                            </div>
                        </li>
                        <li class="selected">
                            <div class="icon">
                                <img src="images/myface.jpg" />
                            </div>
                            <div class="data">
                                <h4>This is a my face</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 100%"></div>
                                </div>
                                <p>
                                    Hi! My name is Sergey Pimenov and i'm author of Metro UI CSS from Kiev, Ukraine.
                                </p>
                                <a href="mailto:sergey@pimenov.com.ua">sergey@pimenov.com.ua</a>
                            </div>
                        </li>
                    </ul>

<pre class="prettyprint linenums span10">
    &lt;ul class="listview image"&gt;
        ...
    &lt;/ul&gt;
</pre>

                    <h2>ListView Image Fluid</h2>
                    <ul class="listview image fluid">
                        <li>
                            <div class="icon">
                                <img src="images/myface.jpg" />
                            </div>
                            <div class="data">
                                <h4>This is a my face</h4>
                                <p>
                                    Hi! My name is Sergey Pimenov and i'm author of Metro UI CSS from Kiev, Ukraine.
                                </p>
                                <a href="mailto:sergey@pimenov.com.ua">sergey@pimenov.com.ua</a>


                            </div>
                        </li>
                        <li class="bg-color-red fg-color-white">
                            <div class="icon">
                                <img src="images/myface.jpg" />
                            </div>
                            <div class="data">
                                <h4 class="fg-color-white">This is a my face</h4>
                                <p>
                                    Hi! My name is Sergey Pimenov and i'm author of Metro UI CSS from Kiev, Ukraine.
                                </p>

                                <a class="fg-color-yellow" href="mailto:sergey@pimenov.com.ua">sergey@pimenov.com.ua</a>

                            </div>
                        </li>
                        <li class="selected">
                            <div class="icon">
                                <img src="images/myface.jpg" />
                            </div>
                            <div class="data">
                                <h4>This is a my face</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 100%"></div>
                                </div>
                                <p>
                                    Hi! My name is Sergey Pimenov and i'm author of Metro UI CSS from Kiev, Ukraine.
                                </p>
                                <a href="mailto:sergey@pimenov.com.ua">sergey@pimenov.com.ua</a>
                            </div>
                        </li>
                    </ul>

<pre class="prettyprint linenums span10">
    &lt;ul class="listview image fluid"&gt;
        ...
    &lt;/ul&gt;
</pre>
                    <h2>ListView Iconic</h2>
                    <ul class="listview iconic">
                        <li>
                            <div class="icon">
                                <img src="images/excel2013icon.png" />
                            </div>
                            <div class="data">
                                <h4>Excel 2013</h4>
                            </div>
                        </li>
                        <li>
                            <div class="icon">
                                <img src="images/word2013icon.png" />
                            </div>
                            <div class="data">
                                <h4>Word 2013</h4>
                            </div>
                        </li>
                        <li>
                            <div class="icon">
                                <img src="images/onenote2013icon.png" />
                            </div>
                            <div class="data">
                                <h4>OneNote 2013</h4>
                            </div>
                        </li>
                    </ul>
<pre class="prettyprint linenums span10">
    &lt;ul class="listview iconic"&gt;
        ...
    &lt;/ul&gt;
</pre>

                    <h2>List view with badges</h2>
                    <p>
                        You can use badges with any listview type. To set background or foreground color of badge, you can use color classes.<br />
                        If you want to strech the badge, you need to add the class strech to the div badge.
                    </p>
                    <h3>Classes</h3>
                    <p>
                        <b>.strech</b> - Strech your badge dimension<br />
                        <b>.right</b> - Set your badge to right (default: left)<br />
                        <b>.bottom</b> - Set your badge to bottom (default: top)<br />
                    </p>
                    <br />

                    <ul class="listview">
                        <li>
                            <div class="badge">1 new</div>

                            <div class="icon">
                                <i class="icon-mail"></i>
                            </div>

                            <div class="data">
                                <h4>Mail from <a href="mailto:vabatta@gmail.com">vabatta@gmail.com</a></h4>
                                <p>
                                    Hey Sergey, your metro UI is awesome!<br />
                                    Keep up the hard work!
                                </p>
                            </div>
                        </li>

                        <li>
                            <div class="badge strech">6 new documents</div>

                            <div class="icon">
                                <img src="images/word2013icon.png" />
                            </div>

                            <div class="data">
                                <h4>Word 2013</h4>
                                <div class="static-rating small">
                                    <div class="rating-value" style="width: 75%"></div>
                                </div>
                                <p>1 RUB</p>
                            </div>
                        </li>

                        <li>
                            <div class="badge bg-color-red right bottom">75% done</div>

                            <div class="icon">
                                <img src="images/firefox.png" />
                            </div>

                            <div class="data">
                                <h4>Firefox</h4>
                                <div class="progress-bar">
                                    <div class="bar" style="width: 75%"></div>
                                </div>
                                <p>Download...</p>
                            </div>
                        </li>
                    </ul>

<pre class="prettyprint linenums span10">
    &lt;ul class="listview"&gt;
        &lt;li&gt;
            &lt;div class="badge"&gt;
                text
            &lt;/div&gt;
            ...
        &lt;/li&gt;
        ...
    &lt;/ul&gt;
    &lt;ul class="listview"&gt;
        &lt;li&gt;
            &lt;div class="badge strech"&gt;
                text
            &lt;/div&gt;
            ...
        &lt;/li&gt;
        ...
    &lt;/ul&gt;
</pre>

                </div>
            </div>
        </div>
    </div>

<? include("footer.php")?>