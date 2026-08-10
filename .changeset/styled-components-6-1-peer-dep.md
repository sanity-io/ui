---
"@sanity/ui": minor
---

Require `styled-components` 6.1 or later. The peer dependency is now `^6.1` instead of `^5.2 || ^6`. v4.0.0 already required v6 — it imports the named `styled` export and v6-only types such as `ExecutionContext`, neither of which exist in v5 — but the peer range still allowed `^5.2` and the 4.0.0 release notes forgot to mention the dropped v5 support. The new range also excludes 6.0.x, which ships the Babel macro (and with it the entire `@babel/*` toolchain) as runtime dependencies until 6.1.0 removed it, and whose last release, 6.0.9, was published without its type declarations. See the [migration guide](https://github.com/sanity-io/ui/blob/main/MIGRATION.md#1-upgrade-the-runtime).
