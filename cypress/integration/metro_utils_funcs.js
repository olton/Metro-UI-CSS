import metro4 from '../../build/js/metro';
const Utils = Metro.utils;

describe("Test Metro 4 Utils functions", function(){

    describe("Utils.isUrl", () => {
        it("isUrl must return true for https://metroui.org.ua", () => {
            assert.equal(Utils.isUrl('https://metroui.org.ua'), true);
        });
        it("isUrl must return true for http://metroui.org.ua", () => {
            assert.equal(Utils.isUrl('http://metroui.org.ua'), true);
        });
        it("isUrl must return true for ftp://metroui.org.ua", () => {
            assert.equal(Utils.isUrl('ftp://metroui.org.ua'), true);
        });
        it("isUrl must return true for https://metroui", () => {
            assert.equal(Utils.isUrl('https://metroui'), true);
        });
        it("isUrl must return false for metroui.org.ua", () => {
            assert.equal(Utils.isUrl('metroui.org.ua'), false);
        });
        it("isUrl must return false for metroui.ua", () => {
            assert.equal(Utils.isUrl('metroui.ua'), false);
        });
        it("isUrl must return false for metroui", () => {
            assert.equal(Utils.isUrl('metroui'), false);
        })
    });

    describe("Utils.isTag", () => {
        it("isTag must return true for <div>", () => {
            assert.equal(Utils.isTag("<div>"), true);
        });
        it("isTag must return true for <div/>", () => {
            assert.equal(Utils.isTag("<div/>"), true);
        });
        it("isTag must return true for <div></div>", () => {
            assert.equal(Utils.isTag("<div></div>"), true);
        });
        it("isTag must return true for <div><p></p></div>", () => {
            assert.equal(Utils.isTag("<div><p></p></div>"), true);
        });
        it("isTag must return false for div", () => {
            assert.equal(Utils.isTag("div"), false);
        });
        it("isTag must return false for <div", () => {
            assert.equal(Utils.isTag("<div"), false);
        });
        it("isTag must return false for div>", () => {
            assert.equal(Utils.isTag("div>"), false);
        });
        it("isTag must return false for div<p>", () => {
            assert.equal(Utils.isTag("div<p>"), false);
        });
    });

    describe("Utils.isColor", ()=>{

        it("isColor must return true for #ffffff", ()=>{
            assert.equal(Utils.isColor("#ffffff"), true);
        });
        it("isColor must return true for #000000", ()=>{
            assert.equal(Utils.isColor("#000000"), true);
        });
        it("isColor must return true for #fff", ()=>{
            assert.equal(Utils.isColor("#fff"), true);
        });
        it("isColor must return true for #000", ()=>{
            assert.equal(Utils.isColor("#000"), true);
        });
        it("isColor must return false for #f", ()=>{
            assert.equal(Utils.isColor("#f"), false);
        });
        it("isColor must return false for #ffff", ()=>{
            assert.equal(Utils.isColor("#ffff"), false);
        });
        it("isColor must return false for #fffffff", ()=>{
            assert.equal(Utils.isColor("#fffffff"), false);
        });
        it("isColor must return false for ffffff", ()=>{
            assert.equal(Utils.isColor("ffffff"), false);
        });
        it("isColor must return false for #kkk", ()=>{
            assert.equal(Utils.isColor("#kkk"), false);
        });

    });

});