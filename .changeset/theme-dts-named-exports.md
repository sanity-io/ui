---
"@sanity/ui": patch
---

fix(build): restore named exports in `dist/theme.d.ts` so `import {buildTheme} from '@sanity/ui/theme'` type-checks again (TS2460). Shared chunks are now emitted to `dist/_chunks/` so they can no longer take an entry point's `.d.ts` filename.
