---
"@sanity/icons": minor
---

Importing an icon from the root entry now resolves in the type system to a `@deprecated` `never`-typed tombstone instead of failing with a bare "has no exported member" error. Since v5 removed the per-icon barrel exports, `import {RocketIcon} from '@sanity/icons'` was indistinguishable from the icon having been deleted; the tombstone's deprecation message now points at the subpath the icon lives on, e.g. `import {RocketIcon} from '@sanity/icons/Rocket'`. The tombstones are declaration-only (`export declare const RocketIcon: never`), so nothing changes at runtime: the root entry still ships no icon code and bundlers/Node.js still reject root icon imports.
