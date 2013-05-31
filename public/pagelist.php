<?php include("header.php")?>
    <div class="page secondary">
        <div class="page-header">
            <div class="page-header-content">
                <h1>Pagelist<small>demo</small></h1>
                <a href="/" class="back-button big page-back"></a>
            </div>
        </div>
        <div class="page-region">
            <div class="page-region-content">
                <div id="pageContent">This is the page of 1</div>
                <div id="pageDiv"></div>
                <script type="text/javascript" src="js/modern/pagelist.js"></script>
                <script type="text/javascript">
                    $(document).ready(function(){
                        var page = $("#pageDiv").pagelist();
                        page.total = 10;
                        page.current = 1;
                        page.url = "pagelistresult.php?page={page}";
                        page.ajax = "#pageContent";
                        page.create();
                    });
                </script>
                <h2>Component usage</h2>
                <pre class="prettyprint linenums span10">
                    var page = $("#page").pagelist();
                    page.total = 10;  //Total pages
                    page.current = 1;  //Current page
                    page.showcount = 2;  //Default is 2
                    page.url = "pagelistresult.php?page={page}";  //Jump url
                    page.ajax = "#contnet";  //if you want to use ajax, set value to target element, defaul is null
                    //If you want to use your own template
                    //page.pageTemplate = '...';
                    //page.pageSideTemplate = '...';
                    //page.pageItemTemplate = '...';
                    //page.pageCurrentTemplate = '...';
                    //page.pageMoreTemplate = '...';
                    //page.pageJumpTemplate = '...';
                    page.create(); //Create page list
                </pre>
            </div>
        </div>
    </div>
<?php include("footer.php")?>
