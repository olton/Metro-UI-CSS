<?include("header.php")?>
    <div class="page secondary">
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
                                    <button class="big">
                                        <i class="icon-home"></i>
                                    </button>
                                    <button class="big"><i class="icon-home"></i></button>
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
                            <button class="image-button bg-color-blue fg-color-white">Alarm, alarm<i class="icon-alarm bg-color-red"></i></button>

<pre class="prettyprint linenums">
    &lt;button class="image-button"&gt; Caption &lt;img/&gt; &lt;/button&gt;
    ===================
    &lt;button class="image-button bg-color-darken fg-color-white"&gt;Download&lt;img src="images/down.png"/&gt;&lt;/button&gt;
    ===================
    &lt;button class="image-button bg-color-blue fg-color-white"&gt;
        Alarm, alarm
        &lt;i class="icon-alarm bg-color-red"&gt;&lt;/i&gt;
    &lt;/button&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Any size of button</h2>
                            <div>
                                <button class="mini"><i class="icon-home"></i>Mini</button>
                                <button class="mini">Mini<i class="icon-home right"></i></button>
                                <button class="mini">Mini</button>
                            </div>
                            <div>
                                <button><i class="icon-home"></i>Default</button>
                                <button>Default<i class="icon-home right"></i></button>
                                <button>Default</button>
                            </div>
                            <div>
                                <button class="big">Big button</button>
                                <button class="big"><i class="icon-arrow-left-3"></i>Big button</button>
                                <button class="big">Big button<i class="icon-arrow-right-3 right"></i></button>
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
                            <a class="button">Button <i class="icon-bookmark"></i></a>
<pre class="prettyprint linenums">
    &lt;button&gt;&lt;i class="icon-*"&gt;&lt;/i&gt;Caption&lt;/button&gt;
    &lt;button&gt;Caption&lt;i class="icon-*"&gt;&lt;/i&gt;&lt;/button&gt;
    &lt;button class="default"&gt;&lt;i class="icon-*"&gt;&lt;/i&gt;Caption&lt;/button&gt;
    &lt;a class="button"&gt;&lt;i class="icon-*"&gt;&lt;/i&gt;Caption&lt;/a&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Shortcuts with icon</h2>
                            <p>
                                You can use any tags to create shortcut button. This may be <code>a</code>, <code>button</code>, <code>span</code>, etc. To set background or foreground color shortcut or badge in shortcut, you can use color classes.
                            </p>


                            <button class="shortcut">
                                <span class="icon">
                                    <i class="icon-bookmark"></i>
                                </span>
                                <span class="label">
                                    Bookmark
                                </span>
                            </button>
                            <button class="shortcut">
                                <span class="icon">
                                    <i class="icon-user-3"></i>
                                </span>
                                <span class="label">
                                    Users
                                </span>

                                <span class="badge">100</span>
                            </button>

                            <a class="shortcut">
                                <span class="icon">
                                    <i class="icon-link"></i>
                                </span>
                                <span class="label">
                                    Links
                                </span>

                                <span class="badge bg-color-red">100</span>
                            </a>

<pre class="prettyprint linenums">
    &lt;button class="shortcut"&gt;
        &lt;span class="icon"&gt;
            &lt;i class="icon-*"&gt;&lt;/i&gt;
        &lt;/span&gt;
        &lt;span class="label"&gt;
            Caption
        &lt;/span&gt;
        &lt;span class="badge"&gt;100&lt;/span&gt;
    &lt;/button&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Pagination control</h2>

                            <div class="pagination">
                                <ul>
                                    <li class="first"><a></a></li>
                                    <li class="prev"><a></a></li>
                                    <li><a>1</a></li>
                                    <li><a>2</a></li>
                                    <li class="active"><a>3</a></li>
                                    <li class="spaces"><a>...</a></li>
                                    <li class="disabled"><a>4</a></li>
                                    <li><a>500</a></li>
                                    <li class="next"><a></a></li>
                                    <li class="last"><a></a></li>
                                </ul>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="pagination"&gt;
        &lt;ul&gt;
            &lt;li class="first"&gt;&lt;a&gt;&lt;/a&gt;&lt;/li&gt;
            &lt;li class="prev"&gt;&lt;a&gt;&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a&gt;1&lt;/a&gt;&lt;/li&gt;
            ...
            &lt;li class="active"&gt;&lt;a&gt;1&lt;/a&gt;&lt;/li&gt;
            &lt;li class="disabled"&gt;&lt;a&gt;1&lt;/a&gt;&lt;/li&gt;
            &lt;li class="spaces"&gt;&lt;a&gt;...&lt;/a&gt;&lt;/li&gt;
            ...
            &lt;li&gt;&lt;a&gt;N&lt;/a&gt;&lt;/li&gt;
            &lt;li class="next"&gt;&lt;a&gt;&lt;/a&gt;&lt;/li&gt;
            &lt;li class="last"&gt;&lt;a&gt;&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
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
    </div>

<? include("footer.php")?>