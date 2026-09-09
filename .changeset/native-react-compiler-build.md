---
'@sanity/ui': patch
---

build with the native Rust React Compiler (`oxc-transform-react`) instead of `babel-plugin-react-compiler`

The package is now built by `@sanity/pkg-utils` 13, which runs the React Compiler through Oxc's Rust port. Components and hooks are memoized exactly as before, the `"use client"` directive still leads every entry, and the public exports are unchanged. `dist/index.js` shrinks by about 6%, and the lazy syntax-highlighter chunk moves from `dist/_chunks-es/` to a content-hashed file next to the entries.
