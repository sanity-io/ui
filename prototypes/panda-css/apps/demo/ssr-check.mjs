#!/usr/bin/env node
/**
 * SSR / RSC readiness: renders the published library with react-dom/server in
 * plain Node (no DOM, no browser), and checks the shipped JavaScript for
 * client-only React APIs. `css()`/`cva()` are pure string functions and the
 * components use no hooks or context, so they are usable from React Server
 * Components as well as from the client.
 */
import {readFileSync} from 'node:fs'
import {createRequire} from 'node:module'
import {renderToString} from 'react-dom/server'
import {createElement} from 'react'
import {Button, ThemeProvider, VERSION} from '@sanity-eval/panda-button-v1'

const html = renderToString(
  createElement(
    ThemeProvider,
    {scheme: 'dark', theme: {'tone.primary.bg': '#123456'}},
    createElement(Button, {tone: 'primary', mode: 'ghost', width: 200, radius: 'full'}, 'SSR'),
  ),
)

const require = createRequire(import.meta.url)
const distPath = require.resolve('@sanity-eval/panda-button-v1')
const dist = readFileSync(distPath, 'utf8')
const clientOnly = ['useState', 'useEffect', 'useLayoutEffect', 'useContext', 'createContext', 'useRef', 'useSyncExternalStore', 'use client']
const found = clientOnly.filter((api) => dist.includes(api))
const reactImports = [...dist.matchAll(/from\s+["'](react[^"']*)["']/g)].map((m) => m[1])

const checks = {
  [`renders to HTML in Node (version ${VERSION})`]: html.includes('<button'),
  'hashed atomic classes present in markup': /class="[^"]*sui-v4-[A-Za-z]+/.test(html),
  'dark scheme + theme override emitted as attributes / inline CSS variables': html.includes('data-sui-scheme="dark"') && html.includes('--sui-v4-colors-tone-primary-bg:#123456'),
  'dynamic styles emitted as inline CSS variables': html.includes('--sui-btn-width:200px') && html.includes('--sui-btn-radius:var(--sui-v4-radii-full)'),
  [`no client-only React APIs in the shipped JS (${found.length ? found.join(', ') : 'none found'})`]: found.length === 0,
  [`React imports limited to ${[...new Set(reactImports)].join(', ')}`]: reactImports.every((s) => s === 'react/jsx-runtime' || s === 'react'),
}
let ok = true
for (const [label, pass] of Object.entries(checks)) {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}`)
  if (!pass) ok = false
}
console.log('\nrendered HTML:\n' + html)
process.exit(ok ? 0 : 1)
