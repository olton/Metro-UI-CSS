(() => {
  // source/icons.js
  function createLinkTag(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
  createLinkTag("icons.css");
})();
