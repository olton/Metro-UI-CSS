<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Tables<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="span10">
                <h2>Default table</h2>
<pre class="prettyprint linenums">
    &lt;table&gt;
        ...
    &lt;/table&gt;
</pre>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="right">Time CP</th>
                            <th class="right">Network</th>
                            <th class="right">Traffic</th>
                            <th class="right">Tiles update</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr><td>Bing</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Internet Explorer</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Chrome</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>News</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Weather</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Music</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                    </tbody>

                    <tfoot></tfoot>
                </table>

                <h2>striped table</h2>
<pre class="prettyprint linenums">
    &lt;table class="striped"&gt;
        ...
    &lt;/table&gt;
</pre>
                <table class="striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="right">Time CP</th>
                            <th class="right">Network</th>
                            <th class="right">Traffic</th>
                            <th class="right">Tiles update</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr><td>Bing</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Internet Explorer</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Chrome</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>News</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Weather</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Music</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                    </tbody>

                    <tfoot></tfoot>
                </table>

                <h2>Bordered table</h2>
<pre class="prettyprint linenums">
    &lt;table class="bordered"&gt;
        ...
    &lt;/table&gt;
</pre>
                <table class="bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="right">Time CP</th>
                            <th class="right">Network</th>
                            <th class="right">Traffic</th>
                            <th class="right">Tiles update</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr><td>Bing</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Internet Explorer</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Chrome</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>News</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Weather</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Music</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                    </tbody>

                    <tfoot></tfoot>
                </table>

                <h2>Hovered table</h2>
<pre class="prettyprint linenums">
    &lt;table class="hovered"&gt;
        ...
    &lt;/table&gt;
</pre>
                <table class="hovered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="right">Time CP</th>
                            <th class="right">Network</th>
                            <th class="right">Traffic</th>
                            <th class="right">Tiles update</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr><td>Bing</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Internet Explorer</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Chrome</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>News</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Weather</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Music</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                    </tbody>

                    <tfoot></tfoot>
                </table>

                <h2>Optional row classes</h2>
                <p>For displaying optional rows you must add one of next classes for <code>&lt;tr&gt;</code>:</p>
                <ul class="unstyled">
                    <li class="fg-color-red">error</li>
                    <li class="fg-color-green">success</li>
                    <li class="fg-color-orange">warning</li>
                    <li class="fg-color-blue">info</li>
                    <li>selected-row</li>
                </ul>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th class="right">Time CP</th>
                            <th class="right">Network</th>
                            <th class="right">Traffic</th>
                            <th class="right">Tiles update</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr class="selected-row"><td>Bing</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr><td>Internet Explorer</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr class="success"><td>Chrome</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr class="error"><td>News</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr class="warning"><td>Weather</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                        <tr class="info"><td>Music</td><td class="right">0:00:01</td><td class="right">0,1 Mb</td><td class="right">0 Mb</td><td class="right">0,1 Mb</td></tr>
                    </tbody>

                    <tfoot></tfoot>
                </table>

                <div class="grid">
                    <div class="row">
                        <? include("adsense.php")?>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>

<? include("footer.php")?>
