import {resolve} from "path"
import { build } from "esbuild"
import {beforeAll, beforeEach, describe, it, expect, delay, DOM} from "@olton/easytest";
// import "../lib/metro.js"

let lib

describe(`Accordion tests`, () => {
    beforeAll(async () => {
        const files = [
            "./source/runtime.js",
            "./source/components/accordion/accordion.js",
        ]
        await build({
            entryPoints: files,
            bundle: true,
            minify: false,
            sourcemap: 'inline',
            platform: 'node',
            outdir: '.easytest/',
            metafile: true,
        })
        await import('.easytest/runtime.js')
        await import('.easytest/components/accordion/accordion.js')
    })
    beforeEach(async () => {
        DOM.html`
        <div id="accordion" class="super-accordion">
            <div class="frame">
                <div class="heading">Heading 1</div>
                <div class="content">
                    Content 1
                </div>
            </div>
        </div>
    `
    })

    it(`Create accordion with makePlugin`, async () => {
        const accordion = window.Metro.makePlugin("#accordion", 'accordion')[0]
        expect(accordion).hasClass('accordion')
    })
})
