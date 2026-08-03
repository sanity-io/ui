---
"@sanity/ui": major
"@sanity/themer": minor
---

**ESM-only. Node.js 22.12+ required.**

What breaks:

- `require('@sanity/ui')` no longer works — the CommonJS build (`.cjs` / `.d.cts`) and the `require` export condition are removed.
- Node.js below 22.12 is no longer supported (`engines` is now `>=22.12`, matching `sanity`).

What to do:

- Consume the package with ESM `import`.
- Run Node.js 22.12 or later.

`@sanity/themer` was already ESM-only — it only picks up the new Node.js range.
