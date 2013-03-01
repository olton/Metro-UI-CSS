<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Menus<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="span10">
                    <h2>Dropdown Menu</h2>
                    <div class="clearfix">
                        <ul class="dropdown-menu open" style="display: block; position: static; margin-bottom: 15px; margin-left: 0;">
                            <li><a href="#">ItemName</a></li>
                            <li><a href="#">ItemName</a></li>
                            <li><a href="#">ItemName</a></li>
                            <li><a href="#">ItemName</a></li>
                            <li class="divider"></li>
                            <li><a href="#">ItemName</a></li>
                        </ul>
                    </div>
                    <p>
                        Toggleable, contextual menu for displaying lists of links. Made interactive with the <code>dropdown</code> javascript plugin.
                    </p>
                </div>

                <h2>Navigation Bar</h2>
                <div class="span10">
                    <div class="nav-bar">
                        <div class="nav-bar-inner">
                            <a href="#"><span class="element brand">Product Name</span></a>
                            <span class="divider"></span>

                            <ul class="menu">
                                <li data-role="dropdown">
                                    <a>Item 1</a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">SubItem 1</a></li>
                                        <li><a href="#">SubItem 2</a></li>
                                        <li><a href="#">SubItem 3</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">SubItem 4</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Item 2</a></li>
                                <li><a href="#">Item 3</a></li>
                                <li><a href="#">Item 4</a></li>
                            </ul>
                        </div>
                    </div>

                    <br />
                    <p>You can change color of the navigation bar. To set predefined color for navigation bar you can use bg-color-* classes.</p>
                    <br />
                    <br />
                    <br />

                    <code>
                        &lt;div class="nav-bar bg-color-darken"&gt;...&lt;/div&gt;
                    </code>
                    <div class="nav-bar bg-color-darken">
                        <div class="nav-bar-inner">
                            <a href="#"><span class="element brand">Product Name</span></a>
                            <span class="divider"></span>

                            <ul class="menu">
                                <li data-role="dropdown">
                                    <a>Item 1</a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">SubItem 1</a></li>
                                        <li><a href="#">SubItem 2</a></li>
                                        <li><a href="#">SubItem 3</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">SubItem 4</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Item 2</a></li>
                                <li><a href="#">Item 3</a></li>
                                <li><a href="#">Item 4</a></li>
                            </ul>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <br />
                    <code>
                        &lt;div class="nav-bar bg-color-green"&gt;...&lt;/div&gt;
                    </code>
                    <div class="nav-bar bg-color-green">
                        <div class="nav-bar-inner">
                            <a href="#"><span class="element brand">Product Name</span></a>
                            <span class="divider"></span>

                            <ul class="menu">
                                <li data-role="dropdown">
                                    <a>Item 1</a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">SubItem 1</a></li>
                                        <li><a href="#">SubItem 2</a></li>
                                        <li><a href="#">SubItem 3</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">SubItem 4</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Item 2</a></li>
                                <li><a href="#">Item 3</a></li>
                                <li><a href="#">Item 4</a></li>
                            </ul>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <br />
                    <code>
                        &lt;div class="nav-bar bg-color-pink"&gt;...&lt;/div&gt;
                    </code>
                    <div class="nav-bar bg-color-pink">
                        <div class="nav-bar-inner">
                            <a href="#"><span class="element brand">Product Name</span></a>
                            <span class="divider"></span>

                            <ul class="menu">
                                <li data-role="dropdown">
                                    <a>Item 1</a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">SubItem 1</a></li>
                                        <li><a href="#">SubItem 2</a></li>
                                        <li><a href="#">SubItem 3</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#">SubItem 4</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Item 2</a></li>
                                <li><a href="#">Item 3</a></li>
                                <li><a href="#">Item 4</a></li>
                            </ul>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <br />
                    <p>
                        For additional colors see <a href="global.php">this page</a>.
                    </p>

                    <h2>Component definition</h2>
<pre class="prettyprint linenums">
    &lt;div class="nav-bar"&gt;
        &lt;div class="nav-bar-inner"&gt;

            &lt;span class="element"&gt;Product Name&lt;/span&gt;

            &lt;span class="divider"&gt;&lt;/span&gt;

            &lt;ul class="menu"&gt;
                &lt;li data-role="dropdown"&gt;
                    &lt;a href="#"&gt;Item 1&lt;/a&gt;
                    &lt;ul class="dropdown-menu"&gt;
                        &lt;li&gt;&lt;a href="#"&gt;SubItem&lt;/a&gt;&lt;/li&gt;
                        ...
                        &lt;li&gt;&lt;a href="#"&gt;SubItem&lt;/a&gt;&lt;/li&gt;
                    &lt;/ul&gt;
                &lt;/li&gt;
                &lt;li&gt;&lt;a /&gt;&lt;/li&gt;
                &lt;li class="divider"&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a /&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>

                    <p>
                        For dropdown you must include in head <code>dropdown.js</code>
                    </p>
                </div>
            </div>
        </div>
    </div>

<? include("footer.php")?>