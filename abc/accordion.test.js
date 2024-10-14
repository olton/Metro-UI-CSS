import {beforeAll, beforeEach, describe, it, expect, delay, DOM} from "@olton/easytest";

beforeAll(async () => {
    DOM.flash()
    DOM.js.fromFile('./dist/metro.js')
})

beforeEach(async () => {
    DOM.html.fromString(`
        <div id="accordion"></div>
    `)
})

describe(`Accordion tests`, () => {
    it(`Create accordion`, async () => {
        const accordion = window.Metro.makePlugin("#accordion", 'accordion')[0]
        expect(accordion).hasClass('accordion')
    })
})
