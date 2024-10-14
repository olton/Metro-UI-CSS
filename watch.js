import {context} from 'esbuild'
import progress from "@olton/esbuild-plugin-progress";
import {lessLoader} from "esbuild-plugin-less";
import {replace} from "esbuild-plugin-replace";

const production = process.env.MODE === "production"

let ctx = await context({
    entryPoints: ['./source/default.js'],
    outfile: './lib/metro.js',
    bundle: true,
    minify: production,
    sourcemap: false,
    plugins: [
        progress({
            text: 'Building Metro UI...',
            succeedText: 'Metro UI built successfully in %s ms! Watching for changes...'
        }),
        lessLoader(),
        replace({
            '__BUILD_TIME__': new Date().toLocaleString()
        })
    ],
})

await ctx.watch()