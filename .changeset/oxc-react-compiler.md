---
'@sanity/themer': patch
'@sanity/ui': patch
---

Build the published dist with the React Compiler running on `oxc-transform-react` (the native Rust port, via `@sanity/tsdown-config`'s new `reactCompiler.transform: 'oxc'`) instead of `babel-plugin-react-compiler`. The output is functionally equivalent — the Rust port tracks the latest React Compiler release, so memo-cache slot allocation differs slightly in places.
