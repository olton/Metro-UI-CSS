import {html, Tag, TagEmpty, addStyle, addCssRule, cssLoader, jsLoader, Router, router, viewLoader, clearViewStorageHolder, createStyleElement, createStyleSheet, render, BaseElement} from "@olton/html"

globalThis.html = html

globalThis.html = {
    BaseElement,
    Tag,
    TagEmpty,
    addStyle,
    addCssRule,
    cssLoader,
    jsLoader,
    viewLoader,
    clearViewStorageHolder,
    createStyleElement,
    createStyleSheet,
    render
}

globalThis.Router = {
    create: router,
    Router
}