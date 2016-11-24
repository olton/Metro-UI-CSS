// var template =
//     'My skills:' +
//     '<%if(this.showSkills) {%>' +
//     '<%for(var index in this.skills) {%>' +
//     '<a href="#"><%this.skills[index]%></a>' +
//     '<%}%>' +
//     '<%} else {%>' +
//     '<p>none</p>' +
//     '<%}%>';
//     console.log(TemplateEngine(template, {
//     skills: ["js", "html", "css"],
//     showSkills: true
// }));

var TemplateEngine = function(html, options) {
    var re = /<%(.+?)%>/g,
        reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
        code = 'with(obj) { var r=[];\n',
        cursor = 0,
        result,
        match;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
    try { result = new Function('obj', code).apply(options, [options]); }
    catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
    return result;
};

window.metroTemplate = TemplateEngine;

$.Template = TemplateEngine;