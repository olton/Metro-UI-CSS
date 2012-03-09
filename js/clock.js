/**
 * Created by JetBrains PhpStorm.
 * User: olton
 * Date: 06.03.12
 * Time: 13:07
 * To change this template use File | Settings | File Templates.
 */
function clock(target){
    var _target = $(target);
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (hours <= "9") hours = "0" + hours;
    if (minutes <= "9") minutes = "0" + minutes;
    _target.html(hours+":"+minutes);
    setTimeout("clock('"+target+"')", 1000);
}
