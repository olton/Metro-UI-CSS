import {nodeResolve} from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from "autoprefixer"
import replace from '@rollup/plugin-replace'
import progress from 'rollup-plugin-progress';
import fs from "fs";
import pkg from "./package.json" assert {type: "json"}

const production = process.env.NODE_ENV === "production",
    sourcemap = !production, dev = !production

const banner = `
/*!
 * Metro UI v${pkg.version} - Web Components Library  (https://metroui.org.ua)
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
        input: './source/default.js',
        watch: {
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
                minimize: production && true,
                use: ['less'],
                sourceMap: sourcemap,
                plugins: [
                    autoprefixer(),
                ]
            }),
            nodeResolve({
                browser: true
            }),
        ],
        output: {
            file: './lib/metro.js',
            format: 'iife',
            sourcemap,
            banner,
            plugins: [
            ]
        }
    },
];