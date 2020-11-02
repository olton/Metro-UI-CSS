import '../../../build/js/metro';

describe("Test Metro 4 Color type", function(){
    var C = Metro.colors;

    it("isColor", () => {
        assert.equal(C.isColor("#fff"), true);
        assert.equal(C.isColor("#fffffff"), false);
        assert.equal(C.isColor("rgb(0,0,0)"), true);
        assert.equal(C.isColor("rgba(0,0,0,0)"), true);
    });

    it("toHEX", () => {
        assert.equal(C.toHEX("#fff"), "#ffffff");
        assert.equal(C.toHEX(C.toRGB("#fff")), "#ffffff");
    });

});