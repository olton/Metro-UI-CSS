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
 * Copyright 2012-2023 Serhii Pimenov
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
                terser({
                    keep_classnames: true,
                    keep_fnames: true,
                })
            ]
        }
    },
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
            dir: './build',
            banner,
        },
        onwarn: message => {
            if (/Generated an empty chunk/.test(message)) return
            console.log(message)
        }
    },
    {
        input: ['./source/default.js', './source/icons.js'],
        watch: {
            include: 'source/**',
            clearScreen: false
        },
        plugins: [
            progress({
                clearLine: true,
            }),
            multi(),
            replace({
                preventAssignment: true,
            }),
            postcss({
                extract: false,
                minimize: true,
                use: ['less'],
                sourceMap: false,
                plugins: [
                    autoprefixer(),
                ]
            }),
            nodeResolve({
                browser: true
            }),
            // commonjs(),
        ],
        output: {
            file: './build/metro.all.js',
            format: 'iife',
            sourcemap: sourcemap,
            banner,
            plugins: [
                terser({
                    keep_classnames: true,
                    keep_fnames: true,
                })
            ]
        }
    },
];