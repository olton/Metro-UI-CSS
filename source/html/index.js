/** @format */

import {
    htmljs,
    addStyle,
    addCssRule,
    cssLoader,
    jsLoader,
    viewLoader,
    clearViewStorageHolder,
    createStyleElement,
    createStyleSheet,
    render,
} from "@olton/html";

globalThis.htmljs = {
    addStyle,
    addCssRule,
    cssLoader,
    jsLoader,
    viewLoader,
    clearViewStorageHolder,
    createStyleElement,
    createStyleSheet,
    render,
    ...htmljs,
};
