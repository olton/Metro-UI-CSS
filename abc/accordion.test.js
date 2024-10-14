import {beforeAll, beforeEach, describe, it, expect, delay, DOM, builder} from "@olton/easytest";
import { lessLoader} from "esbuild-plugin-less";

beforeAll(async () => {
    await builder({
        entryPoints: ['./source/index.js'],
        outfile: './dist/metro.js',
        bundle: true,
        plugins: [lessLoader()]
    })
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
