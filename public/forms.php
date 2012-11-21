<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="target-densitydpi=device-dpi, width=device-width, initial-scale=1.0, maximum-scale=1">
    <meta name="description" content="Modern UI CSS">
    <meta name="author" content="Sergey Pimenov">
    <meta name="keywords" content="windows 8, modern style, modern ui, style, modern, css, framework">

    <link href="css/modern.css" rel="stylesheet">
    <link href="css/modern-responsive.css" rel="stylesheet">
    <link href="css/site.css" rel="stylesheet" type="text/css">
    <link href="js/google-code-prettify/prettify.css" rel="stylesheet" type="text/css">

    <script src="js/jquery-1.8.2.min.js"></script>
    <script src="js/google-analytics.js"></script>
    <script src="js/github.info.js"></script>
    <script src="js/google-code-prettify/prettify.js"></script>

    <script src="js/input-control.js"></script>

    <title>Modern UI CSS</title>
</head>
<body class="modern-ui" onload="prettyPrint()">
    <div class="page secondary">
        <? include("header.php")?>

        <div class="page-header">
            <div class="page-header-content">
                <h1>Forms<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span3">
                            <h2>Check box</h2>
                            <form>
                                <label class="checkbox as-block" onclick="">
                                    <input type="checkbox" checked="" value="1"/>
                                    <span>Checked</span>
                                </label>

                                <label class="checkbox as-block" onclick="">
                                    <input type="checkbox" />
                                    <span>Unchecked</span>
                                </label>

                                <label class="checkbox intermediate as-block" onclick="">
                                    <input type="checkbox"/>
                                    <span>Intermediate</span>
                                </label>

                                <label class="checkbox as-block">
                                    <input type="checkbox" disabled=""/>
                                    <span>Disabled Unchecked</span>
                                </label>

                                <label class="checkbox as-block">
                                    <input type="checkbox" disabled="" checked=""/>
                                    <span>Disabled Checked</span>
                                </label>
                            </form>
                        </div>

                        <div class="span3">
                            <h2>Radio box</h2>
                            <form>
                                <label class="radiobox as-block" onclick="">
                                    <input type="radio" name="r1"  checked=""/>
                                    <span>Checked</span>
                                </label>
                                <label class="radiobox as-block" onclick="">
                                    <input type="radio" name="r1" />
                                    <span>Unchecked</span>
                                </label>
                                <label class="radiobox as-block" onclick="">
                                    <input type="radio" name="r1" disabled=""/>
                                    <span>Disabled Unchecked</span>
                                </label>
                                <label class="radiobox as-block" onclick="">
                                    <input type="radio" name="r2" disabled="" checked=""/>
                                    <span>Disabled Checked</span>
                                </label>
                            </form>
                        </div>

                        <div class="span3">
                            <h2>Switch Control</h2>
                            <form>
                                <label class="switch as-block" onclick="">
                                    <input type="checkbox" checked=""/>
                                    <span>Switch is On</span>
                                </label>
                                <label class="switch as-block" onclick="">
                                    <input type="checkbox" />
                                    <span>Switch is Off</span>
                                </label>
                                <label class="switch as-block" onclick="">
                                    <input type="checkbox" disabled=""/>
                                    <span>Off and Disabled</span>
                                </label>
                                <label class="switch as-block" onclick="">
                                    <input type="checkbox" disabled="" checked=""/>
                                    <span>On and Disabled</span>
                                </label>
                            </form>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">

<pre class="prettyprint linenums">
    &lt;label class="checkbox"&gt;
        &lt;input type="checkbox"&gt;
        &lt;span&gt;CheckBox Caption&lt;/span&gt;
    &lt;/label&gt;

    &lt;label class="radiobox"&gt;
        &lt;input type="radio"&gt;
        &lt;span&gt;CheckBox Caption&lt;/span&gt;
    &lt;/label&gt;

    &lt;label class="switch"&gt;
        &lt;input type="checkbox"&gt;
        &lt;span&gt;CheckBox Caption&lt;/span&gt;
    &lt;/label&gt;
</pre>

                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Buttons</h2>
                            <form>
                                <input type="button" value="Button">
                                <input type="submit" value="Submit">
                                <input type="reset" value="Reset">
                                <input type="button" value="Button" disabled="">
                            </form>
<pre class="prettyprint linenums">
    &lt;input type="button" value="Button"/&gt;
    &lt;input type="submit" value="Submit"/&gt;
    &lt;input type="reset"  value="Reset"/&gt;
    &lt;input type="button" disabled value="Button"/&gt;
</pre>

                        </div>
                    </div>

                    <div class="row">
                        <div class="span5">
                            <h2>Text box</h2>
                            <form>
                                <div class="input-control text">
                                    <input type="text"  />
                                    <span class="helper"></span>
                                </div>
                                <div class="input-control text">
                                    <input type="text" placeholder="Enter sample text"/>
                                    <span class="helper"></span>
                                </div>
                                <div class="input-control text disabled">
                                    <input type="text" disabled="" value="disabled input"/>
                                    <span class="helper"></span>
                                </div>
                                <div class="input-control text disabled">
                                    <input type="text" value="this input without helper"/>
                                </div>
                            </form>
<pre class="prettyprint linenums">
    &lt;div class="input-control text"&gt;
        &lt;input type="text[email, phone, url]" /&gt;
        &lt;span class="helper"&gt;&lt;/span&gt;
    &lt;/div&gt;
</pre>
                        </div>

                        <div class="span5">
                            <h2>Password box</h2>
                            <form>
                                <div class="input-control password">
                                    <input type="password" autofocus/>
                                    <span class="helper"></span>
                                </div>
                                <div class="input-control password">
                                    <input type="password" placeholder="Enter password"/>
                                    <span class="helper"></span>
                                </div>
                                <div class="input-control password">
                                    <input type="password" disabled=""/>
                                    <span class="helper"></span>
                                </div>
                                <div class="input-control password">
                                    <input type="password" />
                                </div>
                            </form>
<pre class="prettyprint linenums">
    &lt;div class="input-control password"&gt;
        &lt;input type="password" /&gt;
        &lt;span class="helper"&gt;&lt;/span&gt;
    &lt;/div&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <div class="input-control text">
                                <input type="phone" placeholder="Enter phone" required="required"/>
                                <span class="helper"></span>
                            </div>
                            <div class="input-control text">
                                <input type="email" placeholder="Enter email" required="required" />
                                <span class="helper"></span>
                            </div>
                            <div class="input-control text">
                                <input type="url" placeholder="Enter url"  required="required"/>
                                <span class="helper"></span>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Select</h2>
                            <form>
                                <div class="input-control select">
                                    <select>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                        <option value="4">Option 4</option>
                                        <option value="5">Option 5</option>
                                    </select>
                                </div>
<pre class="prettyprint linenums">
    &lt;div class="input-control select"&gt;
        &lt;select&gt;
            &lt;option&gt;...&lt;/option&gt;
        &lt;/select&gt;
    &lt;/div&gt;
</pre>

                                <div class="input-control select">
                                    <select multiple="6">
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                        <option value="4">Option 4</option>
                                        <option value="5">Option 5</option>
                                    </select>
                                </div>
<pre class="prettyprint linenums">
    &lt;div class="input-control select"&gt;
        &lt;select multiple=""&gt;
            &lt;option&gt;...&lt;/option&gt;
        &lt;/select&gt;
    &lt;/div&gt;
</pre>

                                <h2>Textarea</h2>
                                <div class="input-control textarea">
                                    <textarea></textarea>
                                </div>
<pre class="prettyprint linenums">
    &lt;div class="input-control textarea"&gt;
        &lt;textarea&gt;
        &lt;/textarea&gt;
    &lt;/div&gt;
</pre>

                            </form>
                        </div>
                    </div>


                    <div class="row">
                        <div class="span10">
                            <h2>Fieldset</h2>
                            <form>
                                <fieldset>
                                    <legend>Legend</legend>

                                    <p class="tertiary-info-secondary-text">
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </p>

                                </fieldset>
                            </form>
                            <br />
<pre class="prettyprint linenums">
    &lt;fieldset&gt;
        &lt;legend&gt;...&lt;/legend&gt;
        ...
    &lt;/fieldset&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Input with spanN class</h2>
<pre class="prettyprint linenums">
    &lt;div class="input-control text spanN"&gt;
        &lt;input type="text" /&gt;
        &lt;span class="helper"&gt;&lt;/span&gt;
    &lt;/div&gt;
</pre>
                            <form>
                                <div class="input-control text span1 as-block">
                                    <input type="text" placeholder="s1"/>
                                    <span class="helper"></span>
                                </div>

                                <div class="input-control text span2 as-block">
                                    <input type="text" placeholder="span2"/>
                                    <span class="helper"></span>
                                </div>

                                <div class="input-control text span3 as-block">
                                    <input type="text" placeholder="span3"/>
                                    <span class="helper"></span>
                                </div>

                                <div class="input-control text span4 as-block">
                                    <input type="text" placeholder="span4"/>
                                    <span class="helper"></span>
                                </div>

                                <div class="input-control text span5 as-block">
                                    <input type="text" placeholder="span5"/>
                                    <span class="helper"></span>
                                </div>

                                <div class="input-control text span6 as-block">
                                    <input type="text" placeholder="span6"/>
                                    <span class="helper"></span>
                                </div>

                                <div class="input-control text span7 as-block">
                                    <input type="text" placeholder="span7"/>
                                    <span class="helper"></span>
                                </div>

                                <div class="input-control text span8 as-block">
                                    <input type="text" placeholder="span8"/>
                                    <span class="helper"></span>
                                </div>

                                <div class="input-control text span9 as-block">
                                    <input type="text" placeholder="span9"/>
                                    <span class="helper"></span>
                                </div>

                                <div class="input-control text span10 as-block">
                                    <input type="text" placeholder="span10"/>
                                    <span class="helper"></span>
                                </div>

                            </form>
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
        <? include("footer.php")?>

    </div>
    <?php include("counter.php");?>

</body>
</html>