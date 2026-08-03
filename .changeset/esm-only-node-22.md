---
"@sanity/ui": major
---

**ESM-only. Node.js 22.12+ required.**

What changes:

- The CommonJS build (`.cjs` / `.d.cts`) and the `require` export condition are removed — the package now ships ESM only.
- Node.js below 22.12 is no longer supported (`engines` is now `>=22.12`, matching `sanity`).

What to do: run Node.js 22.12 or later — that's it. Modern Node supports `require(esm)`, so `require('@sanity/ui')` keeps working; things only break if the Node.js version is too old.
