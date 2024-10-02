import fs from "fs";
import {beforeAll, describe, it, expect} from "@olton/easytest";

beforeAll(() => {
    window.METRO_DISABLE_BANNER = true;
    window.METRO_DISABLE_LIB_INFO = true;
    document.body.innerHTML = `
    <div id="accordion">
        <div class="frame">
            <div class="heading">Heading</div>
            <div class="content">Content</div>
        </div>
    </div>
`

    window.eval(fs.readFileSync('./lib/metro.js', 'utf8'))
})

describe(`Accordion tests`, () => {
    it(`Create accordion`, async () => {
        const accordion = window.Metro.makePlugin("#accordion", 'accordion')[0]
        expect(accordion).hasClass('accordion')
    })
})