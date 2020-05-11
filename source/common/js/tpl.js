/* global Metro, Utils */

var TemplateEngine = function(html, options, conf) {
    var ReEx, re = '<%(.+?)%>',
        reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
        code = 'with(obj) { var r=[];\n',
        cursor = 0,
        result,
        match;
    var add = function(line, js) {
        /* jshint -W030 */
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };

    if (Utils.isValue(conf)) {
        if (($.hasProp(conf, 'beginToken'))) {
            re = re.replace('<%', conf.beginToken);
        }
        if (($.hasProp(conf,'endToken'))) {
            re = re.replace('%>', conf.endToken);
        }
    }

    ReEx = new RegExp(re, 'g');
    match = ReEx.exec(html);

    while(match) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
        match = ReEx.exec(html);
    }
    add(html.substr(cursor, html.length - cursor));
    code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
    /* jshint -W054 */
    try { result = new Function('obj', code).apply(options, [options]); }
    catch(err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
    return result;
};

Metro.template = TemplateEngine;
