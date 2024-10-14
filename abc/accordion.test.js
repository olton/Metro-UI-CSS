import {beforeAll, beforeEach, describe, it, expect, delay, DOM} from "@olton/easytest";

beforeAll(async () => {
    DOM.flash()
    DOM.js.fromFile('./lib/metro.js')
})

beforeEach(async () => {
    DOM.html.fromString(`
        <div id="accordion">
            <div class="frame">
                <div class="heading">Heading 1</div>
                <div class="content">
                    Content 1
                </div>
            </div>
        </div>
    `)
})

describe(`Accordion tests`, () => {
    it(`Load metro`, async () => {
        const accordion = window.Metro.makePlugin("#accordion", 'accordion')[0]
        expect(accordion).hasClass('accordion')
    })
})
