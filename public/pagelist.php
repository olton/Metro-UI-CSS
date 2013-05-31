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
        				page.url = "pagelistResult.php?page={page}";
        				page.ajax = "#pageContent";
        				page.create();
					});
                </script>
            </div>
        </div>
    </div>
<?php include("footer.php")?>
