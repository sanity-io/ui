---
"@sanity/ui": minor
---

The package now declares `"type": "module"`. It continues to ship both ESM (`import`) and CJS (`require`) builds with identical entry points and named exports — only the file extensions in `dist` changed: the ESM build is now `.js`/`.d.ts` (was `.mjs`/`.d.mts`) and the CJS build is now `.cjs`/`.d.cts` (was `.js`/`.d.ts`).
