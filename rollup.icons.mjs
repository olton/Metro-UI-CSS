import {nodeResolve} from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from "autoprefixer"
import replace from '@rollup/plugin-replace'
import progress from 'rollup-plugin-progress';
import noEmit from 'rollup-plugin-no-emit'
import pkg from './package.json' assert {type: "json"}
import fs from "fs";

const production = !(process.env.ROLLUP_WATCH),
    sourcemap = !production

const banner = `
/*!
 * Metro UI v${pkg.version} Components Library  (https://metroui.org.ua)
 * Copyright 2012-${new Date().getFullYear()} by Serhii Pimenov
 * Licensed under MIT
 !*/
`

let txt = fs.readFileSync(`source/core/metro.js`, 'utf8')
txt = txt.replace(/version: ".+"/g, `version: "${pkg.version}"`)
txt = txt.replace(/build_time: ".+"/g, `build_time: "${new Date().toLocaleString()}"`)
fs.writeFileSync(`source/core/metro.js`, txt, { encoding: 'utf8', flag: 'w+' })

export default [
    {
        input: './source/icons.js',
        watch: {
            include: 'source/**',
            clearScreen: false
        },
        plugins: [
            progress({
                clearLine: true,
            }),
            replace({
                preventAssignment: true,
            }),
            postcss({
                extract: true,
                minimize: true,
                use: ['less'],
                sourceMap: sourcemap,
                plugins: [
                    autoprefixer(),
                ]
            }),
            nodeResolve({
                browser: true
            }),
            // commonjs(),
            noEmit({
                match(fileName, output) {
                    return 'icons.js' === fileName
                }
            }),
        ],
        output: {
            dir: './lib',
            banner,
        },
        onwarn: message => {
            if (/Generated an empty chunk/.test(message)) return
            console.log(message)
        }
    },
];