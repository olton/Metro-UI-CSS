import {nodeResolve} from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from "autoprefixer"
import replace from '@rollup/plugin-replace'
import progress from 'rollup-plugin-progress';
import noEmit from 'rollup-plugin-no-emit'
import multi from '@rollup/plugin-multi-entry'

const production = !(process.env.ROLLUP_WATCH),
    sourcemap = !production

const banner = `
/*!
 * Metro UI Components Library  (https://metroui.org.ua)
 * Copyright 2012-${new Date().getFullYear()} by Serhii Pimenov
 * Licensed under MIT
 !*/
`

export default [
    {
        input: './source/default.js',
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
        ],
        output: {
            file: './build/metro.js',
            format: 'iife',
            sourcemap,
            banner,
            plugins: [
            ]
        }
    },
];