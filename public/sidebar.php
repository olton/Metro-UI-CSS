<? include("header.php")?>

    <div class="page secondary with-sidebar">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Sidebar<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-sidebar">
            <ul>
                <li>
                    <a>Projects</a>
                    <ul class="sub-menu">
                        <li><a href="">Currently</a></li>
                        <li><a href="">Closed</a></li>
                    </ul>
                </li>
                <li>
                    <a>Notes</a>
                    <ul class="sub-menu">
                        <li><a href="">Important</a></li>
                        <li><a href="">Today</a></li>
                        <li><a href="">Weekly</a></li>
                        <li><a href="">Monthly</a></li>
                    </ul>
                </li>

                <li class="sticker sticker-color-orange"><a href="#"><i class="icon-cart"></i> Shopping</a></li>
                <li class="sticker sticker-color-orangeDark"><a href="#"><i class="icon-clipboard"></i> Recipes</a></li>
                <li class="sticker sticker-color-green"><a href="#"><i class="icon-history"></i> Hobbies</a></li>
                <li class="sticker sticker-color-pink dropdown active" data-role="dropdown">
                    <a><i class="icon-list"></i> To Do</a>
                    <ul class="sub-menu light sidebar-dropdown-menu open">
                        <li><a href="">Today</a></li>
                        <li><a href="">To Do List</a></li>
                        <li><a href="">To Do after work</a></li>
                        <li><a href="">Movies to watch</a></li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="span9">
                    <h2>Before</h2>
                    <p>
                        You must create page layout for using <code>sidebar</code>
                    </p>
<pre class="prettyprint linenums">
    &lt;div class="page [secondary] with-sidebar"&gt;
        &lt;div class="page-header" /&gt;

        &lt;div class="page-sidebar" /&gt;

        &lt;div class="page-region" /&gt;
    &lt;/div&gt;
</pre>
                    <h2>Sidebar</h2>
                    <p>
                        For define sidebar you must use <code>&lt;ul /&gt;</code>
                    </p>
<pre class="prettyprint linenums">
    &lt;div class="page-sidebar"&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;a&gt;Item&lt;/a&gt;&lt;/li&gt;
            ...
            &lt;li&gt;&lt;a&gt;Item&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/div&gt;
</pre>
                    <h2>Icons</h2>
                    <p>
                        You can use <code>icon-*</code> class to add icon on the menu item
                    </p>
<pre class="prettyprint linenums">
    &lt;div class="page-sidebar"&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;a&gt;&lt;i class="icon-cube"&gt;&lt;/i&gt;Item&lt;/a&gt;&lt;/li&gt;
            ...
        &lt;/ul&gt;
    &lt;/div&gt;
</pre>
                    <h2>Colored stickers</h2>
                    <p>
                        You can create colored stickers for sidebar menu items. To create sticker, add class <code>sticker</code> for menu item.
                    </p>
<pre class="prettyprint linenums">
    &lt;div class="page-sidebar"&gt;
        &lt;ul&gt;
            &lt;li class="sticker"&gt;&lt;a&gt;Item&lt;/a&gt;&lt;/li&gt;
            ...
        &lt;/ul&gt;
    &lt;/div&gt;
</pre>
                    <p>
                    To color sticker you can use colors classes with prefix <code>sticker-</code>. For Example: <code>sticker-color-blue</code>
                    </p>
<pre class="prettyprint linenums">
    &lt;div class="page-sidebar"&gt;
        &lt;ul&gt;
            &lt;li class="sticker sticker-color-blue"&gt;&lt;a&gt;Item&lt;/a&gt;&lt;/li&gt;
            ...
        &lt;/ul&gt;
    &lt;/div&gt;
</pre>
                    <h2>Second level menu</h2>
                    <p>
                        You can create the second level menu in sidebar.
                    </p>
<pre class="prettyprint linenums">
    &lt;div class="page-sidebar"&gt;
        &lt;ul&gt;
            &lt;li&gt;
                &lt;a&gt;Item&lt;/a&gt;
                &lt;ul class="sub-menu"&gt;
                ...
                &lt;/ul&gt;
            &lt;/li&gt;
            ...
        &lt;/ul&gt;
    &lt;/div&gt;
</pre>
                    <h2>Second level Dropdown menu</h2>
                    <p>
                        Also you can create second level <strong>dropdown</strong> menu.
                    </p>
<pre class="prettyprint linenums">
    &lt;div class="page-sidebar"&gt;
        &lt;ul&gt;
            &lt;li data-role="dropdown"&gt;
                &lt;a&gt;Item&lt;/a&gt;
                &lt;ul class="sub-menu sidebar-dropdown-menu"&gt;
                ...
                &lt;/ul&gt;
            &lt;/li&gt;
            ...
        &lt;/ul&gt;
    &lt;/div&gt;
</pre>
                    <p>
                        To use dropdown menu you must add <code>dropdown.js</code> in head of you page.
                    </p>

                    <h2>Lighting second level menu</h2>
                    <p>
                        You can lighting second level menu with subclass <code>light</code>.
                    </p>
<pre class="prettyprint linenums">
    &lt;div class="page-sidebar"&gt;
        &lt;ul&gt;
            &lt;li&gt;
                &lt;a&gt;Item&lt;/a&gt;
                &lt;ul class="sub-menu light"&gt;
                ...
                &lt;/ul&gt;
            &lt;/li&gt;
            ...
        &lt;/ul&gt;
    &lt;/div&gt;
</pre>

                </div>
            </div>
        </div>
    </div>

<? include("footer.php")?>