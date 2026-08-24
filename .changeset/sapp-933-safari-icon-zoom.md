---
"@sanity/ui": patch
---

Stop setting `font-size` on descendant icons so Safari page zoom can scale them (WebKit 199236 / SAPP-933). Theme `iconSize` is applied as rem `width`/`height` only while the SVG still has the default `1em` presentation attributes, so consumer `width`/`height` props and `@sanity/logos` height-only shells keep working.
