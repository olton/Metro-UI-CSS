<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Images<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">

                <h2>Image container</h2>
                <div class="clearfix">
                    <div class="image-container place-left">
                        <img src="images/1.jpg" />
                        <div class="overlay">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                    </div>
                    <div class="image-container light place-left">
                        <img src="images/2.jpg" />
                        <div class="overlay">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                    </div>
                    <div class="image-container bg-color-blue place-left">
                        <img src="images/4.jpg" />
                        <div class="overlay">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </div>
                    </div>
                </div>

<pre class="prettyprint linenums span9">
    &lt;div class="image-container"&gt;
        &lt;img /&gt;
        &lt;div class="overlay"&gt; overlay text &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class="image-container light"&gt;
        &lt;img /&gt;
        &lt;div class="overlay"&gt; overlay text &lt;/div&gt;
    &lt;/div&gt;

    &lt;div class="image-container bg-color-blue"&gt;
        &lt;img /&gt;
        &lt;div class="overlay"&gt; overlay text &lt;/div&gt;
    &lt;/div&gt;
</pre>

                <h2>Simple collection (16x9)</h2>
                <div class="image-collection">
                    <div class="selected"><img src="images/1.jpg" alt=""></div>
                    <div><span class="top-left tertiary-info-text">This image with overlay</span><img src="images/2.jpg" alt=""><div class="overlay">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div></div>
                    <div><img src="images/3.jpg" alt=""></div>
                    <div></div>
                </div>

<pre class="prettyprint linenums span9">
    &lt;div class="image-collection"&gt;
        &lt;div&gt;&lt;img /&gt;&lt;/div&gt;
        ...
        &lt;div&gt;&lt;img /&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>

                <h2>Simple collection (4x3)</h2>
                <div class="image-collection p4x3">
                    <div class="selected"><img src="images/1.jpg" alt=""></div>
                    <div><span class="top-left tertiary-info-text">This image with overlay</span><img src="images/2.jpg" alt=""><div class="overlay">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div></div>
                    <div><img src="images/3.jpg" alt=""></div>
                    <div></div>
                </div>

<pre class="prettyprint linenums span9">
    &lt;div class="image-collection p4x3"&gt;
        &lt;div&gt;&lt;img /&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>
                <h2>Selected image in collection</h2>
<pre class="prettyprint linenums span9">
    &lt;div class="image-collection"&gt;
        &lt;div class="selected"&gt;&lt;img /&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>
                <h2>Overlay for image in collection</h2>
<pre class="prettyprint linenums span9">
    &lt;div class="image-collection"&gt;
        &lt;div&gt;
            &lt;img /&gt;
            &lt;div class="overlay"&gt;Sample text&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                <h2>Empty image container</h2>
<pre class="prettyprint linenums span9">
    &lt;div class="image-collection"&gt;
        &lt;div&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>

                <div class="grid">
                    <div class="row">
                        <? include("adsense.php")?>
                    </div>
                </div>


            </div>
        </div>
    </div>

<? include("footer.php")?>