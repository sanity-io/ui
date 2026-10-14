---
'@sanity/ui': patch
---

Hash Panda class names and CSS variables (`hash: true`) so styles stay unique when more than one copy of UI is on the same page. Hand-written theme custom properties, such as `--arrow-size`, are unchanged. Generated style types now reject invalid CSS values.
