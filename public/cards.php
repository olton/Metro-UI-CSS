<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Cards<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <h3>Card definition:</h3>
<pre class="prettyprint linenums span10">
    &lt;div class="card value-class suit-class"&gt;
        &lt;div class="small-suit"&gt;&lt;/div&gt;
        &lt;div class="suit"&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>
                <h3>Set card value</h3>
                <p class="span10">
                    To set card value you can be use next subclasses: <code>.two</code>, <code>.three</code>, <code>.four</code>, <code>.five</code>, <code>.six</code>, <code>.seven</code>, <code>.eight</code>, <code>.nine</code>, <code>.ten</code>,
                    <code>.jack</code>, <code>.dame</code>, <code>.king</code>, <code>.ace</code>.
                </p>
                <h3>Set card suit</h3>
                <p class="span10">
                    To set card suit you can be use next subclasses: <code>.spades</code>, <code>.clubs</code>, <code>.diamonds</code>, <code>.hearts</code>.
                </p>
                <h3>Joker</h3>
<pre class="prettyprint linenums span10">
    &lt;div class="card joker"&gt;&lt;/div&gt;
</pre>
                <h3>Card back</h3>
<pre class="prettyprint linenums span10">
    &lt;div class="card back"&gt;&lt;/div&gt;
    &lt;div class="card back bg-color-*"&gt;&lt;/div&gt;
</pre>

                <div class="grid">
                    <div class="row">
                        <div class="span10">
                            <h2>Spades</h2>
                            <div class="card two spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card three spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card four spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card five spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card six spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card seven spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card eight spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card nine spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card ten spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card jack spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card dame spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card king spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card ace spades"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card joker"></div>
                            <div class="card back"></div>
                            <div class="card back bg-color-orange"></div>
                            <div class="card back bg-color-blue"></div>
                            <div class="card back bg-color-grayDark"></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Clubs</h2>
                            <div class="card two clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card three clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card four clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card five clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card six clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card seven clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card eight clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card nine clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card ten clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card jack clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card dame clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card king clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card ace clubs"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card joker"></div>
                            <div class="card back"></div>
                            <div class="card back bg-color-orange"></div>
                            <div class="card back bg-color-blue"></div>
                            <div class="card back bg-color-grayDark"></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Diamonds</h2>
                            <div class="card two diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card three diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card four diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card five diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card six diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card seven diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card eight diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card nine diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card ten diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card jack diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card dame diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card king diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card ace diamonds"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card joker"></div>
                            <div class="card back"></div>
                            <div class="card back bg-color-orange"></div>
                            <div class="card back bg-color-blue"></div>
                            <div class="card back bg-color-grayDark"></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Hearts</h2>
                            <div class="card two hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card three hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card four hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card five hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card six hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card seven hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card eight hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card nine hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card ten hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card jack hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card dame hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card king hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card ace hearts"><div class="small-suit"></div><div class="suit"></div></div>
                            <div class="card joker"></div>
                            <div class="card back"></div>
                            <div class="card back bg-color-orange"></div>
                            <div class="card back bg-color-blue"></div>
                            <div class="card back bg-color-grayDark"></div>
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