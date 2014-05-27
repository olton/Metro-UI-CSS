if (document.location.host.indexOf('.dev') > -1) {
    //console.log('local');
}  else {
    if (document.location.host.indexOf('metroui') > -1) {
        //document.write("<img src='http://c.hit.ua/hit?i=98055&g=0&x=2"+"&r="+encodeURI(document.referrer)+"&u="+encodeURI(window.location.href)+"' border='0' width='1' height='1'/>");
        document.write("<script src='http://c.hit.ua/hit?i=98055&g=0&x=3&r="+encodeURI(document.referrer)+"&u="+encodeURI(window.location.href)+"'></script>");
    } else {
        console.log('hitua.js is a counter for Metro UI CSS'+"\n"+'Do not include this counter in you project');
    }
}
