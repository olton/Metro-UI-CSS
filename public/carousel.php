<? include("header.php")?>
    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Carousel<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span5">
                            <div class="carousel span5" style="height: 300px;" data-role="carousel" data-param-effect="slide" data-param-direction="left" data-param-duration="2000" data-param-period="4000">
                                <div class="slides">
                                    <div class="slide image" id="slide1">
                                        <img src="images/1.jpg" />
                                    </div>
                                    <div class="slide image" id="slide2">
                                        <img src="images/2.jpg" />
                                    </div>
                                    <div class="slide image" id="slide3">
                                        <img src="images/3.jpg" />
                                    </div>
                                </div>


                                <span class="control left bg-color-blue">&#8249;</span>
                                <span class="control right bg-color-blue">&#8250;</span>

                            </div>
                        </div>

                        <div class="span5">
                            <div class="carousel span5" style="height: 300px;" data-role="carousel" data-param-effect="fade" data-param-direction="left" data-param-period="3000" data-param-markers="off">
                                <div class="slides">
                                    <div class="slide image" id="slide4">
                                        <img src="images/1.jpg" />
                                        <div class="description">
                                            Ut egestas tempor magna, sed rutrum felis fermentum quis. Aliquam congue ultricies elit, sit amet tempor tortor tempor nec.
                                        </div>
                                    </div>
                                    <div class="slide image" id="slide5">
                                        <img src="images/2.jpg" />
                                        <div class="description">
                                            Ut egestas tempor magna, sed rutrum felis fermentum quis. Aliquam congue ultricies elit, sit amet tempor tortor tempor nec.
                                        </div>
                                    </div>
                                    <div class="slide image" id="slide6">
                                        <img src="images/3.jpg" />
                                        <div class="description">
                                            This super beast eats fresh human flesh. She claws picking his nose, uttering at the same contented purring, and tooth picks out of leftover meat.
                                        </div>
                                    </div>
                                </div>


                                <span class="control left">&#8249;</span>
                                <span class="control right">&#8250;</span>

                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span5">
                            <div class="carousel span5" style="height: 300px;" data-role="carousel" data-param-effect="switch" data-param-direction="left" data-param-duration="300" data-param-period="4000" data-param-markers="off">
                                <div class="slides">
                                    <div class="slide image" id="slide7">
                                        <img src="images/1.jpg" />
                                    </div>
                                    <div class="slide image" id="slide8">
                                        <img src="images/2.jpg" />
                                    </div>
                                    <div class="slide image" id="slide9">
                                        <img src="images/3.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="span5">
                            <div class="carousel span5" style="height: 300px;" data-role="carousel" data-param-effect="slowdown" data-param-direction="left" data-param-period="3000" data-param-markers="off">
                                <div class="slides">
                                    <div class="slide image" id="slide10">
                                        <img src="images/1.jpg" />
                                    </div>
                                    <div class="slide image" id="slide11">
                                        <img src="images/2.jpg" />
                                    </div>
                                    <div class="slide image" id="slide12">
                                        <img src="images/3.jpg" />
                                    </div>
                                </div>

                                <span class="control left bg-color-darken">&#8249;</span>
                                <span class="control right bg-color-darken">&#8250;</span>

                            </div>
                        </div>
                    </div>
                </div>

                <h2>Component definition</h2>

<pre class="prettyprint linenums span10">
    &lt;div class="carousel" data-role="carousel"&gt;
        &lt;div class="slides"&gt;
            &lt;div class="slide image" id="slide1"&gt;
                &lt;img /&gt;
                &lt;div class="description"&gt;
                    Description text here...
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;div class="slide mixed" id="slide2"&gt;
                &lt;img /&gt;
                &lt;div class="description"&gt;
                    Description text here...
                &lt;/div&gt;
            &lt;/div&gt;
            ...
        &lt;/div&gt;

        &lt;span class="control left"&gt;&#8249;&lt;/span&gt;
        &lt;span class="control right"&gt;&#8250;&lt;/span&gt;

    &lt;/div&gt;
</pre>
                <p>You can manual set the <code>width</code> and <code>height</code> of Carousel.</p>

                <p>
                    For use carousel you mus include <code>carousel.js</code> in head of you page and add attribute <code>data-role="carousel"</code> to carousel object.
                    To set specific parameters such as direction, duration, period, etc. you must add param data-param-* to carousel object.
                </p>

                <h3>Params:</h3>
                <ul class="unstyled">
                    <li><strong>auto</strong> - auto start carousel sliding (default: true)</li>
                    <li><strong>period</strong> - slide change period (default: 6000)</li>
                    <li><strong>duration</strong> - effect duration period (default: 1000)</li>
                    <li><strong>effect</strong> - animation effect. available: <em>slide, fade, slowdown, switch</em> (default: slide)</li>
                    <li><strong>direction</strong> - animation direction. available: <em>left, right</em> (default: left)</li>
                    <li><strong>markers</strong> - on|off slide markers (default: on)</li>
                    <li><strong>arrows</strong> - on|off slide arrows (default: on)</li>
                    <li><strong>stop</strong> - on|off slide animation on mouse over (default: on)</li>
                </ul>

<pre class="prettyprint linenums span10">
    &lt;div class="carousel" data-role="carousel" data-param-auto="false" data-param-effect="fade"&gt;
        ...
    &lt;/div&gt;
</pre>

                <h2>Javascript</h2>
                <p>Include in head <code>carousel.js</code></p>

            </div>
        </div>
    </div>

<? include("footer.php")?>