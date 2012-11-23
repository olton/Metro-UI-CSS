<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Slider<small class="fg-color-red">this component in develop</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span5" style="height: 200px;">
                            <h2>Horizontal Slider</h2>
                            <div class="slider"  data-param-init-value="0"></div>

                            <h4>init start value</h4>
                            <div class="slider"  data-param-init-value="35"></div>

                            <h4>discrete mode (accuracy = 20)</h4>
                            <div class="slider"  data-param-accuracy="20" data-param-init-value="0"></div>

                            <h4>Event handler</h4>

                            <div id="slider1" class="slider" data-param-init-value="0"></div>
                            <p class="tertiary-text">Move marker for see work handler.</p>
                            <div>
                                Current value: <span id="slider1_value">0</span>
                            </div>

                            <script type="text/javascript">
                                $(function(){
                                    $("#slider1").on("change", function(e, val){
                                        color = 'green';
                                        if (val > 30) {
                                            color = 'orange';
                                        }
                                        if (val > 70) {
                                            color = 'red';
                                        }
                                        $("#slider1_value").html(val);
                                        $(this).children(".complete").css("background-color",  color);
                                    })
                                })
                            </script>

                        </div>
                        <div class="span5">
                            <h2>Vertical Slider</h2>
                            <div class="slider vertical place-left" style="height: 200px;" data-param-accuracy="0" data-param-init-value="30"></div>
                            <div class="slider vertical place-left" style="height: 200px;" data-param-accuracy="10" data-param-init-value="70"></div>
                        </div>
                    </div>
                </div>

                <div class="span10">
                    <h3>Component structure</h3>
<pre class="prettyprint linenums">
    &lt;div class="slider" data-role="slider"&gt;
        &lt;div class="complete"&gt;&lt;/div&gt;
        &lt;div class="marker"&gt;&lt;/div&gt;
    &lt;/div&gt;
</pre>

                    <h3>Component definition</h3>
<pre class="prettyprint linenums">
    &lt;div class="slider" data-role="slider"&gt;&lt;/div&gt;

    &lt;div class="slider" data-role="slider" data-param-init-value="35"&gt;&lt;/div&gt;

    &lt;div class="slider" data-role="slider" data-param-accuracy="20"&gt;&lt;/div&gt;

    &lt;div class="slider vertical" data-role="slider"&gt;&lt;/div&gt;
</pre>
                    <p class="bg-color-red fg-color-white padding5">
                        For use vertical slider you must set height attribute manually.
                    </p>
                    <h3>Params</h3>
                    <p>
                        You can set params for slider: <code>data-param-init-value</code> (default: 0) and <code>data-param-accuracy</code> (default: 1). To set discrete mode of slider set accuracy parameter to value different from 1.
                    </p>
                    <h3>Events</h3>
                    <p>
                        Slider component is supported next events: <code>onchange</code>, <code>onchanged</code>. Event <code>onchange</code> fired while slider position changed. Event <code>onchanged</code> fired when marker stopped.
                    </p>
<pre class="prettyprint linenums">
    $(function(){
        $("#slider1").on("change", function(e, val){
            // e is event
            // val is current value
            ...
        })

        $("#slider1").on("changed", function(e, val){
            // e is event
            // val is current value
            ...
        })

        // for retrieve a current value you can call
        $("#slider1").data('value');
    })
</pre>
                    <h3>Javascript</h3>
                    <p>
                        To use slider component you must include <code>slider.js</code> in head of page.
                    </p>
                </div>
            </div>
        </div>
    </div>

<? include("footer.php")?>