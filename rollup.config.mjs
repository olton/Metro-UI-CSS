import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import terser from '@rollup/plugin-terser'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from "autoprefixer"
import replace from '@rollup/plugin-replace'
import progress from 'rollup-plugin-progress';
import noEmit from 'rollup-plugin-no-emit'


const
    dev = (process.env.NODE_ENV !== 'production'),
    sourcemap = dev

const banner = `
/*!
 * Metro UI Components Library  (https://metroui.org.ua)
 * Copyright 2012-2023 Serhii Pimenov
 * Licensed under MIT
 !*/
`

export default [
    {
        input: './source/index.js',
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
            commonjs(),
        ],
        output: {
            file: './build/metro.js',
            format: 'iife',
            sourcemap,
            banner,
            plugins: [
                terser()
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
            commonjs(),
            noEmit({
                match(fileName, output) {
                    return 'icons.js' === fileName
                }
            }),
            copy({
                targets: [
                    {src: './icons/*', dest: './build'},
                ]
            }),
        ],
        output: {
            file: './build/icons.js',
            format: 'iife',
            sourcemap: false,
            banner,
        }
    },
];