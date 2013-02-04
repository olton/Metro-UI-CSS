<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Notices<small> demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <h2>Replies</h2>
                <div class="grid" style="margin-left: -25px">
                    <div class="row">
                        <div class="span5">
                            <ul class="replies">
                                <li class="bg-color-blue">
                                    <div class="avatar"><img src="images/myface.jpg" /></div>
                                    <div class="reply">
                                        <div class="date">01.01.2012</div>
                                        <div class="author">Olton</div>
                                        <div class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut nisi dolor, eget luctus lectus.</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="span5">
                            <ul class="replies">
                                <li class="bg-color-pink">
                                    <div class="avatar"><img src="images/myface.jpg" /></div>
                                    <div class="reply">
                                        <div class="date">01.01.2012</div>
                                        <div class="author">Olton</div>
                                        <div class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut nisi dolor, eget luctus lectus.</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
<pre class="prettyprint linenums">
    &lt;ul class="replies"&gt;
        &lt;li class="bg-color-*"&gt;
            &lt;div class="avatar"&gt;&lt;img/&gt;&lt;/div&gt;
            &lt;div class="reply"&gt;
                &lt;div class="date"&gt;...&lt;/div&gt;
                &lt;div class="author"&gt;...&lt;/div&gt;
                &lt;div class="text"&gt;...&lt;/div&gt;
            &lt;/div&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
    &lt;!-- ========================================================= --&gt;
    &lt;div class="replies"&gt;
        &lt;div class="bg-color-*"&gt;
            &lt;div class="avatar"&gt;&lt;img/&gt;&lt;/div&gt;
            &lt;div class="reply"&gt;
                &lt;div class="date"&gt;...&lt;/div&gt;
                &lt;div class="author"&gt;...&lt;/div&gt;
                &lt;div class="text"&gt;...&lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
</pre>
                <br />
                <h2>Replies with sticker</h2>

                <div class="grid">
                    <div class="row">
                        <div class="span5">
                            <ul class="replies">
                                <li class="bg-color-orange">
                                    <b class="sticker sticker-left sticker-color-orange"></b>
                                    <div class="avatar"><img src="images/myface.jpg" /></div>
                                    <div class="reply">
                                        <div class="date">01.01.2012</div>
                                        <div class="author">Olton</div>
                                        <div class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut nisi dolor, eget luctus lectus.</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="span5">
                            <ul class="replies">
                                <li class="bg-color-pink">
                                    <b class=" sticker sticker-right sticker-color-pink"></b>
                                    <div class="avatar"><img src="images/myface.jpg" /></div>
                                    <div class="reply">
                                        <div class="date">01.01.2012</div>
                                        <div class="author">Olton</div>
                                        <div class="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut nisi dolor, eget luctus lectus.</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

<pre class="prettyprint linenums">
    &lt;ul class="replies"&gt;
        &lt;li class="bg-color-*"&gt;
            &lt;b class="sticker sticker-left(right) sticker-color-*"&gt;&lt;/b&gt;
            &lt;div class="avatar"&gt;&lt;img/&gt;&lt;/div&gt;
            &lt;div class="reply"&gt;
                &lt;div class="date"&gt;...&lt;/div&gt;
                &lt;div class="author"&gt;...&lt;/div&gt;
                &lt;div class="text"&gt;...&lt;/div&gt;
            &lt;/div&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
</pre>
                <br />
                <h2>Notices</h2>
                <div class="grid">
                    <div class="row">
                        <div class="span5">
                            <div class="notices">
                                <div class="bg-color-green">
                                    <a href="#" class="close"></a>
                                    <div class="notice-icon"><img src="images/lock-open.png" /></div>
                                    <div class="notice-header fg-color-white">Access granted!</div>
                                    <div class="notice-text">Thank you. Now you can do what you want!</div>
                                </div>
                            </div>
                        </div>
                        <div class="span5">
                            <div class="notices">
                                <div class="bg-color-red">
                                    <a href="#" class="close"></a>
                                    <div class="notice-icon"><img src="images/shield-user.png" /></div>
                                    <div class="notice-image"><img src="images/armor.png" /></div>
                                    <div class="notice-header fg-color-yellow">Microsoft Security Essentials</div>
                                    <div class="notice-text">Your computer is hacked and is a part of a botnet!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<pre class="prettyprint linenums">
    &lt;div class="notices"&gt;
        &lt;div class="bg-color-*"&gt;
            &lt;a href="#" class="close"&gt;&lt;/a&gt;
            &lt;div class="notice-icon"&gt; &lt;img/&gt; &lt;/div&gt;
            &lt;div class="notice-image"&gt; &lt;img/&gt; &lt;/div&gt;
            &lt;div class="notice-header"&gt; ... &lt;/div&gt;
            &lt;div class="notice-text"&gt; ... &lt;/div&gt;
        &lt;/div&gt;
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