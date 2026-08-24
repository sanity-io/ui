---
"@sanity/icons": patch
"@sanity/ui": patch
---

Emit `@sanity/icons` glyphs with `height="1em"` only (the `@sanity/logos` shell that already scales in Safari) and stop setting `font-size` on descendant SVGs in `@sanity/ui` `responsiveFont()` so Cmd+/- page zoom can scale them (WebKit 199236 / SAPP-933).
