<? include("header.php")?>

    <div class="page secondary">
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
                                <label class="input-control checkbox" onclick="">
                                    <input type="checkbox" checked value="1"/>
                                    <span class="helper">Checked box</span>
                                </label>

                                <label class="input-control checkbox" onclick="">
                                    <input type="checkbox" />
                                    <span class="helper">Unchecked</span>
                                </label>

                                <label class="input-control checkbox">
                                    <input type="checkbox" disabled=""/>
                                    <span class="helper">Disabled Unchecked</span>
                                </label>

                                <label class="input-control checkbox">
                                    <input type="checkbox" disabled="" checked=""/>
                                    <span class="helper">Disabled Checked</span>
                                </label>

                                <label class="input-control checkbox intermediate" onclick="">
                                    <input type="checkbox"/>
                                    <span class="helper">Intermediate</span>
                                </label>

                            </form>
                        </div>

                        <div class="span3">
                            <h2>Radio box</h2>
                            <form>
                                <label class="input-control radio" onclick="">
                                    <input type="radio" name="r1"  checked=""/>
                                    <span class="helper">Checked radio</span>
                                </label>

                                <label class="input-control radio" onclick="">
                                    <input type="radio" name="r1" />
                                    <span class="helper">Checked radio</span>
                                </label>

                                <label class="input-control radio" onclick="">
                                    <input type="radio" name="r1" disabled/>
                                    <span class="helper">Checked radio</span>
                                </label>

                                <label class="input-control radio" onclick="">
                                    <input type="radio" name="r2" disabled="" checked=""/>
                                    <span class="helper">Disabled Checked</span>
                                </label>
                            </form>
                        </div>

                        <div class="span3">
                            <h2>Switch Control</h2>
                            <form>
                                <label class="input-control switch" onclick="">
                                    <input type="checkbox" checked=""/>
                                    <span class="helper">Switch is On</span>
                                </label>
                                <label class="input-control switch" onclick="">
                                    <input type="checkbox" />
                                    <span class="helper">Switch is Off</span>
                                </label>
                                <label class="input-control switch" onclick="">
                                    <input type="checkbox" disabled=""/>
                                    <span class="helper">Off and Disabled</span>
                                </label>
                                <label class="input-control switch" onclick="">
                                    <input type="checkbox" disabled="" checked=""/>
                                    <span class="helper">On and Disabled</span>
                                </label>
                            </form>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">

<pre class="prettyprint linenums">
    &lt;label class="input-control checkbox"&gt;
        &lt;input type="checkbox"&gt;
        &lt;span class="helper"&gt;CheckBox Caption&lt;/span&gt;
    &lt;/label&gt;

    &lt;label class="input-control radio"&gt;
        &lt;input type="radio"&gt;
        &lt;span class="helper"&gt;CheckBox Caption&lt;/span&gt;
    &lt;/label&gt;

    &lt;label class="input-control switch"&gt;
        &lt;input type="checkbox"&gt;
        &lt;span class="helper"&gt;CheckBox Caption&lt;/span&gt;
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
                                    <input type="text" class="with-helper" />
                                    <button class="helper" onclick="return false"></button>
                                </div>
                                <div class="input-control text">
                                    <input type="text" class="with-helper" placeholder="Enter sample text"/>
                                    <button class="helper"></button>
                                </div>
                                <div class="input-control text disabled">
                                    <input type="text" class="with-helper" disabled="" value="disabled input"/>
                                    <button class="helper"></button>
                                </div>
                                <div class="input-control text disabled">
                                    <input type="text" value="this input without helper"/>
                                </div>
                            </form>
<pre class="prettyprint linenums">
    &lt;div class="input-control text"&gt;
        &lt;input type="text" class="with-helper" /&gt;
        &lt;button class="helper"&gt;&lt;/button&gt;
    &lt;/div&gt;
</pre>
                        </div>

                        <div class="span5">
                            <h2>Password box</h2>
                            <form>
                                <div class="input-control password">
                                    <input type="password" class="with-helper" />
                                    <button class="helper"></button>
                                </div>
                                <div class="input-control password">
                                    <input type="password" class="with-helper" placeholder="Enter password" />
                                    <button class="helper"></button>
                                </div>
                                <div class="input-control password">
                                    <input type="password" class="with-helper" disabled="" />
                                    <button class="helper"></button>
                                </div>
                                <div class="input-control password">
                                    <input type="password" />
                                </div>
                            </form>
<pre class="prettyprint linenums">
    &lt;div class="input-control password"&gt;
        &lt;input type="password" class="with-helper" /&gt;
        &lt;button class="helper"&gt;&lt;/button&gt;
    &lt;/div&gt;
</pre>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <form>
                            <div class="input-control text">
                                <input type="text" class="with-helper" placeholder="Enter search phrase..." />
                                <button class="btn-search"></button>
                            </div>
                            </form>
<pre class="prettyprint linenums">
    &lt;div class="input-control text"&gt;
        &lt;input type="text" class="with-helper" /&gt;
        &lt;button class="btn-search"&gt;&lt;/button&gt;
    &lt;/div&gt;
</pre>
                            <div class="input-control text">
                                <input type="phone" class="with-helper" placeholder="Enter phone" required="required"/>
                                <button class="helper"></button>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="input-control text"&gt;
        &lt;input type="phone" class="with-helper" /&gt;
        &lt;button class="helper"&gt;&lt;/button&gt;
    &lt;/div&gt;
</pre>
                            <div class="input-control text">
                                <input type="email" class="with-helper" placeholder="Enter email" required="required" />
                                <button class="helper"></button>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="input-control text"&gt;
        &lt;input type="email" class="with-helper" /&gt;
        &lt;button class="helper"&gt;&lt;/button&gt;
    &lt;/div&gt;
</pre>
                            <div class="input-control text">
                                <input type="url" class="with-helper" placeholder="Enter url"  required="required"/>
                                <button class="helper"></button>
                            </div>
<pre class="prettyprint linenums">
    &lt;div class="input-control text"&gt;
        &lt;input type="url" class="with-helper" /&gt;
        &lt;button class="helper"&gt;&lt;/button&gt;
    &lt;/div&gt;
</pre>
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
        &lt;input type="text" class="with-helper" /&gt;
        &lt;button class="helper"&gt;&lt;/button&gt;
    &lt;/div&gt;
</pre>
                            <form>
                                <div class="input-control text span1 as-block">
                                    <input type="text" class="with-helper" placeholder="s1"/>
                                    <button class="helper"></button>
                                </div>

                                <div class="input-control text span2 as-block">
                                    <input type="text" class="with-helper" placeholder="span2"/>
                                    <button class="helper"></button>
                                </div>

                                <div class="input-control text span3 as-block">
                                    <input type="text" class="with-helper" placeholder="span3"/>
                                    <button class="helper"></button>
                                </div>

                                <div class="input-control text span4 as-block">
                                    <input type="text" class="with-helper" placeholder="span4"/>
                                    <button class="helper"></button>
                                </div>

                                <div class="input-control text span5 as-block">
                                    <input type="text" class="with-helper" placeholder="span5"/>
                                    <button class="helper"></button>
                                </div>

                                <div class="input-control text span6 as-block">
                                    <input type="text" class="with-helper" placeholder="span6"/>
                                    <button class="helper"></button>
                                </div>

                                <div class="input-control text span7 as-block">
                                    <input type="text" class="with-helper" placeholder="span7"/>
                                    <button class="helper"></button>
                                </div>

                                <div class="input-control text span8 as-block">
                                    <input type="text" class="with-helper" placeholder="span8"/>
                                    <button class="helper"></button>
                                </div>

                                <div class="input-control text span9 as-block">
                                    <input type="text" class="with-helper" placeholder="span9"/>
                                    <button class="helper"></button>
                                </div>

                                <div class="input-control text span10 as-block">
                                    <input type="text" class="with-helper" placeholder="span10"/>
                                    <button class="helper"></button>
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
    </div>

<? include("footer.php")?>
