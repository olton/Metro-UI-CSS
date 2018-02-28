function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function insertBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.previousSibling);
}

var styles =  [
    "metro/css/metro-all.css",
    "highlight/styles/github.css",
    "docsearch/docsearch.min.css",
    "css/site.css"
];

var scripts = [
    "//cdn.jsdelivr.net/docsearch.js/2/docsearch.min.js",
    "js/jquery-3.3.1.min.js",
    "metro/js/metro.js",
    "js/pre-code.js",
    "highlight/highlight.pack.js",
    "js/clipboard.min.js",
    "js/site.js"
];

var src, script, style;

while (src = styles.shift()) {
    style = document.createElement('link');
    style.rel = "stylesheet";
    style.href = src;
    console.log(src);
    insertBefore(style, document.head.lastChild);
}

while (src = scripts.shift()) {
    script = document.createElement('script');
    script.async = false;
    script.src = src;
    console.log(src);
    insertAfter(script, document.body.lastChild);
}
