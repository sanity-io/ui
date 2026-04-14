---
'@sanity/ui-workshop': major
'@sanity/ui-tokens': major
'@sanity/ui-css': major
'@sanity/ui': major
---

Refactor UI architecture with new design tokens and CSS packages.

This release splits core styling concerns out of `@sanity/ui`:

- introduce `@sanity/ui-tokens` for design tokens
- introduce `@sanity/ui-css` for runtime styles
- update `@sanity/ui` to consume and re-export from these packages
- include various improvements and internal cleanup

⚠️ This is a breaking change and currently released under beta.
