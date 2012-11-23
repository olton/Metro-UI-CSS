<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Progress Bar<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span10">
                            <h2>Progress Bar</h2>
                            <div class="progress-bar">
                                <div class="bar" style="width: 75%;"></div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="progress-bar"&gt;
        &lt;div class="bar" style="width: 75%"&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>
                            <h2>Colored Progress Bar</h2>
                            <div class="progress-bar">
                                <div class="bar bg-color-pink" style="width: 75%;"></div>
                            </div>
                            <br />
                            <div class="progress-bar">
                                <div class="bar bg-color-blue" style="width: 35%;"></div>
                            </div>
                            <br />
                            <div class="progress-bar">
                                <div class="bar bg-color-green" style="width: 55%;"></div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="progress-bar"&gt;
        &lt;div class="bar bg-color-*" style="width: 75%"&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>

                            <h2>Progress Bar with colored parts</h2>
                            <div class="progress-bar" data-role="progress-bar">
                                <div class="bar bg-color-pink" data-bar="30" style="width: 30%;"></div>
                                <div class="bar bg-color-yellow" data-bar="30" style="width: 30%;"></div>
                                <div class="bar bg-color-green" data-bar="40" style="width: 40%;"></div>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="progress-bar"&gt;
        &lt;div class="bar bg-color-pink" style="width: 30%"&gt;&lt;/div&gt;
        &lt;div class="bar bg-color-yellow" style="width: 30%"&gt;&lt;/div&gt;
        &lt;div class="bar bg-color-green" style="width: 40%"&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<? include("footer.php")?>