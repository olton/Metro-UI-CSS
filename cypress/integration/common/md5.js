import '../../../build/js/metro';

describe("Test Metro 4 MD5 function", function(){

    it("md5", () => {
        assert.equal(Metro.md5('https://metroui.org.ua'), "2cb36ef69b2ecdb4013aea88f55e1cbf");
    });

});