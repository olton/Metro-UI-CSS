function switchTheme(){
    $(".metro").toggleClass("metro-theme-light");
    if ($(".metro").hasClass("metro-theme-light")) {
        $('body').css("background", "#ffffff");
    } else {
        //$('body').css("background", "#0D232E");
        $('body').css("background", "#004050");
    }
}