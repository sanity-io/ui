---
"@sanity/ui": patch
---

The npm package no longer ships the `src` and `exports` folders — only `dist` (plus `package.json`, `README.md`, and `LICENSE`) is published. Nothing resolvable referenced those folders: the published `exports` map points exclusively at `dist`, and the JS sourcemaps embed `sourcesContent`. This cuts the unpacked package size roughly in half.
