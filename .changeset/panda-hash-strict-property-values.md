---
'@sanity/ui': patch
---

Hash Panda-generated CSS variables (`hash: true`) for consistency with the class-name hashing that shipped in the previous release. This config defines no Panda tokens today, so the emitted stylesheet is unchanged, and hand-written theme custom properties such as `--arrow-size` keep their names. Generated style types now reject invalid CSS values.
