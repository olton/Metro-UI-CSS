<script type="text/javascript">
    function getWindowsSize(){
        $("#sizeX").html('W: '+$(window).width());
        $("#sizeY").html('H: '+$(window).height());
    }
    $(function(){
        getWindowsSize();
        $(window).resize(function(){
            getWindowsSize()
        });
    })
</script>

<div style="position: fixed; height: 100px; width: 100px; padding: 10px; z-index: 10000;" class="bottom-right bg-color-darken fg-color-white">
    Screen size:
    <div id="sizeX">0</div>
    <div id="sizeY">0</div>
</div>

<div class="bg-color-red fg-color-white text-center">
    !!! Project is looking for a Sponsor !!!
</div>

<div class="navigation-bar">
    <div class="navigation-bar-inner">
        <span class="menu-pull"></span>

        <div class="brand">
            <a href="/"><span class="metro-ui-logo place-left"></span></a>
            <a href="/"><span class="name">Metro UI CSS <sup class="fg-color-yellow tertiary-info-secondary-text"> v 0.1.2</sup></span></a>
        </div>

        <ul>
            <li><a href="/">Home</a></li>

            <li data-role="dropdown">
                <a href="#">Scaffolding</a>
                <ul class="dropdown-menu">
                    <li><a href="global.php">Global styles</a></li>
                    <li><a href="layout.php">Layouts and templates</a></li>
                    <li><a href="grid.php">Grid system</a></li>
                    <li class="divider"></li>
                    <li><a href="responsive.php">Responsive design</a></li>
                </ul>
            </li>

            <li data-role="dropdown">
                <a href="#">Base CSS</a>
                <ul class="dropdown-menu">
                    <li><a href="typography.php">Typography</a></li>
                    <li><a href="tables.php">Tables</a></li>
                    <li><a href="forms.php">Forms</a></li>
                    <li><a href="buttons.php">Buttons</a></li>
                    <li><a href="images.php">Images</a></li>
                </ul>
            </li>

            <li data-role="dropdown">
                <a href="#">Components</a>
                <ul class="dropdown-menu">
                    <li><a href="tiles.php">Tiles</a></li>
                    <li><a href="menus.php">Menu and Navigation</a></li>
                    <li><a href="pagecontrol.php">Page control</a></li>
                    <li><a href="accordion.php">Accordion</a></li>
                    <li><a href="buttons-set.php">Buttons set</a></li>
                    <li class="divider"></li>
                    <li><a href="notices.php">Notices and Replies</a></li>
                    <li class="divider"></li>
                    <li><a href="cards.php">Bonus - Deck of Cards</a></li>
                </ul>
            </li>

            <!--<li><a href="javascript.php">Javascript</a></li>-->
            <li><a href="https://github.com/olton/Metro-UI-CSS">Get source</a></li>
        </ul>

    </div>
</div>

<script src="js/dropdown.js"></script>
