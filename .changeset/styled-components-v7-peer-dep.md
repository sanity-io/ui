---
"@sanity/ui": minor
---

Add experimental support for styled-components v7. The peer dependency range is now `^6.1 || ^7.0.0-0` (the prerelease-tolerant form is required while v7 is published as `7.0.0-prerelease-*` on the `test` npm dist-tag — a plain `^7` would not match, and the range stays bounded below v8). Style functions that returned plain arrays now tag their rules through the styled-components `css` helper: v7's new in-house compiler no longer flattens plain arrays returned from function interpolations (a component whose style function returned one rendered without any styles), while v6 emits byte-identical CSS for both forms. The internal-but-exported `_responsive` helper still returns a spreadable rule array; only the element shapes differ per major (v6 pre-serializes them to strings, v7 keeps the CSS objects). Note that styled-components v7 itself requires React 19; React 18 consumers should stay on styled-components v6, which remains fully supported.
