<? include("header.php")?>

    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Responsive<small>design</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <div class="grid">
                    <div class="row">
                        <div class="span10">
                            <h2>Enabling responsive features</h2>
                            <p>
                                Turn on responsive CSS in your project by including the proper meta tag and additional stylesheet within the <code>&lt;head&gt;</code> of your document.
                            </p>
<pre class="prettyprint linenums">
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;link href="modern-responsive.css" rel="stylesheet"&gt;
</pre>
                            <p class="tertiary-text">
                                <strong>* for <code>hdpi</code> devices you can be add param <code>target-densitydpi=device-dpi</code> to meta <code>viewport</code></strong>
                            </p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>About responsive Metro UI CSS</h2>
                            <p>
                                Media queries allow for custom CSS based on a number of conditions—ratios, widths, display type, etc—but usually focuses around <code>min-width</code> and <code>max-width</code>.
                            </p>
                            <ul>
                                <li>Modify the width of column in our grid</li>
                                <li>Stack elements instead of float wherever necessary</li>
                                <li>Resize headings and text to be more appropriate for devices</li>
                            </ul>
                        </div>
                    </div>

                    <div class="row">
                        <div class="span10">
                            <h2>Supported Devices</h2>
                            <p>
                                Metro UI CSS supports a handful of media queries in a single file to help make your projects more appropriate on different devices and screen resolutions. Here's what's included:
                            </p>
                            <table class="bordered striped">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Layout width</th>
                                        <th>Column width</th>
                                        <th>Gutter width</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Large display</td>
                                        <td>1200 px and up</td>
                                        <td>in progress...</td>
                                        <td>in progress...</td>
                                    </tr>
                                    <tr>
                                        <td>Default</td>
                                        <td>980px and up</td>
                                        <td>60px</td>
                                        <td>20px</td>
                                    </tr>
                                    <tr>
                                        <td>Portrait tablets</td>
                                        <td>768px and above</td>
                                        <td>42px</td>
                                        <td>20px</td>
                                    </tr>
                                    <tr>
                                        <td>Phone to tablets</td>
                                        <td>767px and below</td>
                                        <td colspan="2" class="center">Fluid columns, no fixed width</td>
                                    </tr>
                                    <tr>
                                        <td>Phones</td>
                                        <td>480px and below</td>
                                        <td colspan="2" class="center">Fluid columns, no fixed width</td>
                                    </tr>
                                </tbody>
                            </table>
<pre class="prettyprint linenums">
        /* Large desktop */
        @media (min-width: 1200px) { ... }

        /* Portrait tablet to landscape and desktop */
        @media (min-width: 768px) and (max-width: 979px) { ... }

        /* Landscape phone to portrait tablet */
        @media (max-width: 767px) { ... }

        /* Landscape phones and down */
        @media (max-width: 480px) { ... }
</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<? include("footer.php")?>