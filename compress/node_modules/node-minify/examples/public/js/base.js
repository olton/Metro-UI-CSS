/*
	Lots of comments
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut lorem sem.
	Vestibulum vehicula dolor ac elit dictum convallis. Vivamus rhoncus, neque id euismod tempor, justo nulla pellentesque nibh,
	nec placerat mauris massa vel massa. Etiam cursus rutrum faucibus.
	Mauris sem turpis, lacinia eget faucibus vel, vulputate et ante.
 */

cb.tools = {};
cb.tools.substitute = function(str, arr){
	var i, pattern, re, n = arr.length;
	for (i = 0; i < n; i++) {
		pattern = "\\{" + i + "\\}";
		re = new RegExp(pattern, "g");
		str = str.replace(re, arr[i]);
	}
	return str;
};