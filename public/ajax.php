<?php include("header.php")?>

    <div class="page secondary">

        <div class="page-header">
            <div class="page-header-content">
                <h1>Ajax<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>

        <div class="page-region">
            <div class="page-region-content">
                <h2>Ajax manual reinit</h2>
                <p>To reinit controls loaded via ajax requestes, you should use it's init function.</p>
                <h2>Component definition</h2>
<pre class="prettyprint linenums span10">
    &lt;!-- Accordion --&gt;
    $()["Accordion"]({initAll: true});

    &lt;!-- Carousel --&gt;
    $()["Carousel"]({initAll: true});

    &lt;!-- Input controls --&gt;
    $()["Input"]({initAll: true});

    &lt;!-- Rating --&gt;
    $()["Rating"]({initAll: true});

    &lt;!-- Slider --&gt;
    $()["Slider"]({initAll: true});

    &lt;!-- Dropdown --&gt;
    $('.pull-menu, .menu-pull').each(function () {
        $(this).PullDown();
    });

    &lt;!-- Page control --&gt;
    $('[data-role="page-control"]').each(function () {
        $(this).PageControl();
    });
</pre>
            </div>
        </div>
    </div>

<?php include("footer.php")?>