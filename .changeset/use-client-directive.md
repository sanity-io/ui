---
'@sanity/ui': patch
---

Ship a `'use client'` directive on the `@sanity/ui` and `@sanity/ui/_visual-editing` entrypoints so React Compiler output loads correctly under Next.js App Router / RSC. `@sanity/ui/theme` is left unmarked — it remains a pure theme-token export safe for Server Components.
