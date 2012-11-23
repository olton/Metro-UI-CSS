<? include("header.php")?>

    <div class="page secondary">

        <div class="page-header">
            <div class="page-header-content">
                <h1>Sets of Buttons<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span10">
                            <h2>Button set</h2>
                            <div class="button-set place-left" data-role="button-set">
                                <button class="active">button 1</button>
                                <button>button 2</button>
                                <button>button 3</button>
                            </div>
                            <div class="button-set" data-role="button-set">
                                <button class="tool-button active"><img src="images/bage-playing.png" /></button>
                                <button class="tool-button"><img src="images/bage-paused.png" /></button>
                                <button class="tool-button"><img src="images/bage-busy.png" /></button>
                            </div>
                            <h2>Component definition</h2>
<pre class="prettyprint linenums">
    &lt;div class="button-set" data-role="button-set"&gt;
        &lt;button class="active"&gt; ... &lt;/button&gt;
        &lt;button&gt; ... &lt;/button&gt;
    &lt;/div&gt;
    ------------
    &lt;div class="button-set" data-role="button-set"&gt;
        &lt;button class="tool-button active"&gt; ... &lt;/button&gt;
        &lt;button class="tool-button"&gt; ... &lt;/button&gt;
    &lt;/div&gt;
</pre>
                            <h3>Javascript</h3>
                            <p>To activate button set include in head <code>buttonset.js</code></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<? include("footer.php")?>