<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Typography<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <h1>H1. Heading 1</h1>
                <h2>H2. Heading 2</h2>
                <h3>H3. Heading 3</h3>
                <h4>H4. Heading 4</h4>
                <h5>H5. Heading 5</h5>
                <h6>H6. Heading 6</h6>

                <p>All HTML headings, <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code> are available.</p>

                <a class="navigation-text" href="#">Navigation</a>
                <p class="tertiary-text">use navigation-text class for creating menu <code>&lt;a class="navigation-text" /&gt;</code></p>

                <a href="#">Link</a>

                <h2>body-text and default paragraph</h2>
<pre class="prettyprint linenums">
    &lt;p&gt;...&lt/p&gt;
    &lt;div class="body-text"&gt;...&lt;/div&gt;
</pre>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                    been the industry's standard dummy text ever since the 1500s, when an unknown printer took
                    a galley of type and scrambled it to make a type specimen book. It has survived not only
                    five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
                    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
                    PageMaker including versions of Lorem Ipsum.
                </p>

                <h2>body-secondary-text</h2>
<pre class="prettyprint linenums">
    &lt;p class="body-secondary-text"&gt;...&lt/p&gt;
</pre>
                <p class="body-secondary-text">
                    Pellentesque laoreet molestie lacus sit amet tempor. Quisque eget felis augue, non egestas
                    dui. Curabitur id nulla tortor, nec tincidunt libero. Donec placerat diam sed massa commodo
                    quis auctor mauris consectetur. In luctus pharetra rhoncus. Etiam tristique arcu eget neque
                    dignissim suscipit. In hac habitasse platea dictumst.
                </p>

                <h2>long-text</h2>
                <small>Use this class to display large amounts of text, such as the contents of books or magazines.</small>
<pre class="prettyprint linenums">
    &lt;p class="long-text"&gt;...&lt/p&gt;
</pre>
                <p class="long-text">
                    Regular  Pellentesque laoreet molestie lacus sit amet tempor. Quisque eget felis augue, non egestas
                    dui. Curabitur id nulla tortor, nec tincidunt libero. Donec placerat diam sed massa commodo
                    quis auctor mauris consectetur. In luctus pharetra rhoncus. Etiam tristique arcu eget neque
                    dignissim suscipit. In hac habitasse platea dictumst.
                </p>

                <h2>paragraph with .indent class</h2>
<pre class="prettyprint linenums">
    &lt;p class="indent"&gt;...&lt/p&gt;
</pre>
                <p class="indent">
                    Aenean porttitor, purus eget egestas
                    pellentesque, sapien mi feugiat massa, quis malesuada ante nisl ac orci. Curabitur at lacus
                    mauris. Sed tincidunt scelerisque tortor, id convallis enim auctor a. Mauris pharetra,
                    lectus nec rutrum venenatis, neque nunc elementum libero, at feugiat justo ipsum at orci.
                </p>

                <p class="indent">
                    Sed iaculis quam a nisl porttitor et cursus mauris porttitor. Vestibulum gravida posuere
                    lacus id tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                    posuere cubilia Curae; Vestibulum blandit, nibh ac molestie viverra, libero orci venenatis
                    felis, ornare facilisis magna leo at ligula.
                </p>

                <h2>tertiary-text</h2>
<pre class="prettyprint linenums">
    &lt;p class="tertiary-text"&gt;...&lt/p&gt;
</pre>
                <p class="tertiary-text">
                    Integer tempor molestie aliquet. Aliquam erat volutpat. Praesent in ultricies erat. Vivamus
                    dolor purus, posuere quis accumsan ac, hendrerit sit amet lorem. Phasellus non risus mi.
                    Integer libero metus, egestas ut tincidunt sit amet, auctor eget nisl. Sed tortor massa,
                    adipiscing sed aliquet tempor, cursus quis est. Proin id neque pharetra arcu consequat
                    laoreet. Nullam pretium faucibus congue. In erat mauris, viverra in tempus vestibulum,
                    dictum ac nibh. Integer ullamcorper velit vitae lacus semper ut mollis mauris tincidunt.
                    Phasellus malesuada urna et augue bibendum viverra. Curabitur dui nulla, luctus eu
                    vulputate eget, congue at metus.
                </p>

                <h2>tertiary-secondary-text</h2>
<pre class="prettyprint linenums">
    &lt;p class="tertiary-secondary-text"&gt;...&lt/p&gt;
</pre>
                <p class="tertiary-secondary-text">
                    Suspendisse eu magna tellus, sit amet facilisis tortor. Aliquam posuere placerat rhoncus.
                    Donec egestas lectus vitae mauris volutpat et imperdiet neque fringilla. Cras dictum dui
                    ac turpis vestibulum et posuere nibh ornare. Donec mattis odio quis mi dictum malesuada eu
                    a tellus. Praesent nisl magna, pellentesque ac pharetra vel, varius ac est. Pellentesque
                    habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla
                    facilisi. Praesent consequat sem commodo tortor facilisis quis consectetur urna varius.
                </p>

                <div class="grid">
                    <div class="row">
                        <div class="span3">
                            <h2>Small text</h2>
<pre class="prettyprint linenums">
    &lt;small&gt;...&lt/small&gt;
</pre>
                            <p>
                                <small>This is a small text</small>.
                            </p>
                        </div>
                        <div class="span4">
                            <h2>Bold text</h2>
<pre class="prettyprint linenums">
    &lt;strong&gt;...&lt/strong&gt;
</pre>
                            <p>
                                <strong>This is a strong text</strong>.
                            </p>
                        </div>
                        <div class="span3">
                            <h2>Italic text</h2>
<pre class="prettyprint linenums">
    &lt;em&gt;...&lt/em&gt;
</pre>
                            <p>
                                <em>This is a italicized text</em>.
                            </p>
                        </div>
                    </div>
                </div>

                <h2>Abbreviations</h2>
<pre class="prettyprint linenums">
    &lt;abbr title="Title of abbreviation"&gt;...&lt/abbr&gt;
</pre>
                <p>An abbreviation of the word attribute is <abbr title="attribute">attr</abbr></p>
                <p><abbr title="HyperText Markup Language" class="initialism">html</abbr> is the best thing since sliced bread.</p>

                <h2>Address</h2>
<pre class="prettyprint linenums">
    &lt;address&gt;
        ...
    &lt/address&gt;
</pre>
                <address>
                    <strong>Company, Inc.</strong><br>
                    795 Folsom Ave, Suite 600<br>
                    San Francisco, CA 94107<br>
                    <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>

                <address>
                    <strong>Full Name</strong><br>
                    <a href="mailto:#">first.last@gmail.com</a>
                </address>

                <h2>Blockquote</h2>
<pre class="prettyprint linenums">
    &lt;blockquote&gt;
        ...
    &lt/blockquote&gt;
</pre>
                <blockquote>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                </blockquote>

                <h2>Blockquote to left</h2>
<pre class="prettyprint linenums">
    &lt;blockquote&gt;
        ...
        &lt;small&gt;...&lt/small&gt;
    &lt/blockquote&gt;
</pre>
                <blockquote>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                    <small>Someone famous <cite title="Source Title">Source Title</cite></small>
                </blockquote>

                <h2>Blockquote to right</h2>
<pre class="prettyprint linenums">
    &lt;blockquote class="place-right"&gt;
        ...
        &lt;small&gt;...&lt/small&gt;
    &lt/blockquote&gt;
</pre>
                <blockquote class="place-right">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                    <small>Someone famous <cite title="Source Title">Source Title</cite></small>
                </blockquote>

                <h2>Lists</h2>
                <div class="grid">
                    <div class="row">
                        <div class="span3">
                            <h3>Unordered list</h3>
<pre class="prettyprint linenums">
    &lt;ul&gt;
        &lt;li&gt;...&lt/li&gt;
    &lt/ul&gt;
</pre>
                            <ul>
                                <li>Lorem ipsum dolor sit amet</li>
                                <li>Consectetur adipiscing elit</li>
                                <li>Integer molestie lorem at massa</li>
                                <li>Facilisis in pretium nisl aliquet</li>
                                <li>Nulla volutpat aliquam velit
                                    <ul>
                                        <li>Phasellus iaculis neque</li>
                                        <li>Purus sodales ultricies</li>
                                        <li>Vestibulum laoreet porttitor</li>
                                        <li>Ac tristique libero volutpat at</li>
                                    </ul>
                                </li>
                                <li>Faucibus porta lacus fringilla vel</li>
                                <li>Aenean sit amet erat nunc</li>
                                <li>Eget porttitor lorem</li>
                            </ul>
                        </div>

                        <div class="span3">
                            <h3>Ordered list</h3>
<pre class="prettyprint linenums">
    &lt;ol&gt;
        &lt;li&gt;...&lt/li&gt;
    &lt/ol&gt;
</pre>
                            <ol>
                                <li>Lorem ipsum dolor sit amet</li>
                                <li>Consectetur adipiscing elit</li>
                                <li>Integer molestie lorem at massa</li>
                                <li>Facilisis in pretium nisl aliquet</li>
                                <li>Nulla volutpat aliquam velit</li>
                                <li>Faucibus porta lacus fringilla vel</li>
                                <li>Aenean sit amet erat nunc</li>
                                <li>Eget porttitor lorem</li>
                            </ol>
                        </div>

                        <div class="span4">
                            <h3>Unstyled list</h3>
<pre class="prettyprint linenums">
    &lt;ul class="unstyled"&gt;
        &lt;li&gt;...&lt/li&gt;
    &lt/ul&gt;
</pre>
                            <ul class="unstyled">
                                <li>Lorem ipsum dolor sit amet</li>
                                <li>Consectetur adipiscing elit</li>
                                <li>Integer molestie lorem at massa</li>
                                <li>Facilisis in pretium nisl aliquet</li>
                                <li>Nulla volutpat aliquam velit
                                    <ul>
                                        <li>Phasellus iaculis neque</li>
                                        <li>Purus sodales ultricies</li>
                                        <li>Vestibulum laoreet porttitor</li>
                                        <li>Ac tristique libero volutpat at</li>
                                    </ul>
                                </li>
                                <li>Faucibus porta lacus fringilla vel</li>
                                <li>Aenean sit amet erat nunc</li>
                                <li>Eget porttitor lorem</li>
                            </ul>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                        </div>
                    </div>
                </div>

                <h2>Labels</h2>
                <table class="bordered striped">
                    <thead>
                    <tr>
                        <td>Label type</td>
                        <td>Label definition</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td width="120"><span class="label">Default</span></td>
                        <td><code>&lt;span class="label"&gt;Default&lt;/span&gt;</code></td>
                    </tr>
                    <tr>
                        <td><span class="label success">Success</span></td>
                        <td><code>&lt;span class="label success"&gt;Success&lt;/span&gt;</code></td>
                    </tr>
                    <tr>
                        <td><span class="label warning">Warning</span></td>
                        <td><code>&lt;span class="label warning"&gt;Warning&lt;/span&gt;</code></td>
                    </tr>
                    <tr>
                        <td><span class="label important">Important</span></td>
                        <td><code>&lt;span class="label important[error]"&gt;Important&lt;/span&gt;</code></td>
                    </tr>
                    <tr>
                        <td><span class="label info">Info</span></td>
                        <td><code>&lt;span class="label info"&gt;Info&lt;/span&gt;</code></td>
                    </tr>
                    <tr>
                        <td><span class="label inverse">Inverse</span></td>
                        <td><code>&lt;span class="label inverse"&gt;Inverse&lt;/span&gt;</code></td>
                    </tr>
                    </tbody>
                </table>
                <p>
                    <span class="label important">Lorem Ipsum</span> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                    been the industry's standard dummy text ever since the 1500s.
                </p>
            </div>
        </div>
    </div>

<? include("footer.php")?>