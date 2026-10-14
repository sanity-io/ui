---
'@sanity/ui': patch
---

Hash Panda-generated CSS variables in addition to class names (`hash: true`), so styles stay unique when more than one copy of UI is on the same page. Class names were already hashed in the previous release. Hand-written theme custom properties, such as `--arrow-size`, are unchanged. Generated style types now reject invalid CSS values.
