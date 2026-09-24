---
'@sanity/themer-legacy': minor
---

Introduce `@sanity/themer-legacy`, the hosted Themer service (themer.sanity.build) as an npm package. It is the legacy generator that used to ship as `@sanity/themer/legacy`, moved into its own package with the same API: `buildThemeFromUrl` replaces a `https://themer.sanity.build/api/hues` URL import in one line, and `createTheme`, `parseHuesFromUrl`, `hues`, `theme` and `presets` generate the exact same colors the service served. The package pins a published `@sanity/ui` v4 range, so the generated themes stay byte-identical to the hosted ones regardless of the `@sanity/ui` version the Studio ships with.
