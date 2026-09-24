---
'@sanity/themer': patch
---

Deprecate `@sanity/themer/legacy`: the legacy generator moved to the new `@sanity/themer-legacy` package, and the subpath now re-exports it unchanged (same functions, same generated colors). Import from `@sanity/themer-legacy` instead — the subpath will be removed in `@sanity/themer@1.0`.
