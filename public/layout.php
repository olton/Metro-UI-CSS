<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Layout<small>templates</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span10">
                            <h2>Default page layout</h2>
                            <div class="span10" style="background-color: #ccc; height: 300px;">
                                <div class="page bg-color-blue" style="width: 100%;">
                                    <div class="page-header" style="border-bottom: 1px #fff dotted;">
                                        <div class="page-header-content">
                                            <h1 style="left: 20px; border-left: 1px #fff dotted;">Header</h1>
                                        </div>
                                    </div>

                                    <div class="page-region">
                                        <div class="page-region-content" style="padding-left: 20px;">
                                            <div style="border-left: 1px #fff dotted; height: 180px;">
                                                Content
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


<pre class="prettyprint linenums">
    &lt;div class="page"&gt;
        &lt;div class="page-header"&gt;
            &lt;div class="page-header-content"&gt;
            ...
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="page-region"&gt;
            &lt;div class="page-region-content"&gt;
                ...
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Secondary page layout</h2>
                            <div class="span10" style="background-color: #ccc; height: 300px;">
                                <div class="page bg-color-blue" style="width: 100%;">
                                    <div class="page-header" style="border-bottom: 1px #fff dotted;">
                                        <div class="page-header-content">
                                            <h1 style="border-left: 1px #fff dotted;">Header</h1>
                                        </div>
                                    </div>

                                    <div class="page-region">
                                        <div class="page-region-content">
                                            <div style="border-left: 1px #fff dotted; height: 180px;">
                                                Content
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


<pre class="prettyprint linenums">
    &lt;div class="page secondary"&gt;
        &lt;div class="page-header"&gt;
            &lt;div class="page-header-content"&gt;
            ...
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="page-region"&gt;
            &lt;div class="page-region-content"&gt;
                ...
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Fill View</h2>
                            <div class="span10" style="background-color: #ccc; height: 300px;">
                                <div class="page fill bg-color-blue">
                                    <p style="padding: 20px;">Page Content</p>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="page fill"&gt;
        ...
    &lt;/div&gt;
</pre>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Snapped View</h2>
                            <div class="span10" style="background-color: #ccc; height: 300px;">
                                <div class="page snapped bg-color-blue">
                                    <p style="padding: 20px;">Page Content</p>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="page snapped"&gt;
        ...
    &lt;/div&gt;
</pre>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Fill & Snapped View</h2>
                            <div class="span10" style="background-color: #ccc; height: 300px;">
                                <div class="page snapped bg-color-blue">
                                    <p style="padding: 20px;">Page Content for snapped view page</p>
                                </div>
                                <div class="page fill bg-color-orange">
                                    <p style="padding: 20px;">Page Content for fill view page</p>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="page snapped"&gt;
        ...
    &lt;/div&gt;
    &lt;div class="page fill"&gt;
        ...
    &lt;/div&gt;
</pre>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Application Bar</h2>
                            <div class="span10" style="background-color: #ccc; height: 300px; position: relative;">
                                <div class="app-bar fg-color-white">
                                    <p style="padding: 20px;">Content for app bar</p>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="app-bar"&gt;
        ...
    &lt;/div&gt;
</pre>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Sharms</h2>
                            <div class="span10" style="background-color: #ccc; height: 300px; position: relative;">
                                <div class="charms bg-color-blue fg-color-white">
                                    <p style="padding: 20px;">Content for charms</p>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="charms"&gt;
        ...
    &lt;/div&gt;
</pre>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Flyouts</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Message Dialogs</h2>
                            <div class="span10" style="background-color: #ccc; height: 300px; position: relative;">
                                <div class="message-dialog bg-color-green fg-color-white">
                                    <p>Content for message dialog</p>
                                    <button class="place-right">Click me</button>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="message-dialog"&gt;
        ...
    &lt;/div&gt;
</pre>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span10">
                            <h2>Notification Dialogs</h2>
                            <div class="span10" style="background-color: #ccc; height: 300px; position: relative;">
                                <div class="error-bar fg-color-white">
                                    <p>Content for message dialog</p>
                                    <button class="place-right">Click me</button>
                                </div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="error(info, warning)-bar"&gt;
        ...
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
