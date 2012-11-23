<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Rating<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span10">
                            <h2>Big stars</h2>

                            <h3>Static</h3>
                            <div>
                                <div class="rating" data-role="rating" data-param-vote="off" data-param-rating="3.7" id="rating1">
                                </div>
                            </div>
<br />
<pre class="prettyprint linenums span10">
    &lt;div class="rating" data-role="rating" data-param-vote="off" data-param-rating="3.7"&gt;
    &lt;/div&gt;
</pre>

                            <h3>Static small</h3>
                            <div>
                                <div class="rating small" data-role="rating" data-param-vote="off" data-param-rating="3" data-param-stars="6" id="rating2">
                                </div>
                            </div>
<br />
<pre class="prettyprint linenums span10">
    &lt;div class="rating small" data-role="rating" data-param-vote="off" data-param-rating="3" data-param-stars="6"&gt;
    &lt;/div&gt;
</pre>
                            <h3>Rating</h3>
                            <div>
                                <div class="rating" data-role="rating" id="rating3"></div>
                            </div>
<br />
<pre class="prettyprint linenums span10">
    &lt;div class="rating" data-role="rating"&gt;
    &lt;/div&gt;
</pre>

                            <h3>Rating small</h3>
                            <div>
                                <div class="rating small" data-role="rating" data-param-rating="4" id="rating4">
                                </div>
                            </div>
<br />
<pre class="prettyprint linenums span10">
    &lt;div class="rating small" data-role="rating" data-param-rating="4"&gt;
    &lt;/div&gt;
</pre>

                            <p>
                                For use this rating you must include <code>rating.js</code> in <code>head</code> of you page
                            </p>

                            <h3>Methods</h3>
                            <ul class="unstyled">
                                <li>$('#rating1').RatingValue(val) //set rating value</li>
                                <li>$('#rating1').RatingValue() // get rating value</li>
                                <li>$('#rating1').RatingPercents(val) // set rating value in percents</li>
                                <li>$('#rating1').RatingPercents() // get rating value in precents</li>
                                <li>$('#rating3').RatingVote('on') // set rating mode VOTE</li>
                                <li>$('#rating3').RatingVote('off') // set rating mode READONLY</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<? include("footer.php")?>