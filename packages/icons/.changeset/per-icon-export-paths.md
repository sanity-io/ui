---
"@sanity/icons": minor
---

Every icon is now available on its own export path, e.g. `import {RocketIcon} from '@sanity/icons/Rocket'`, letting userland opt in to smaller bundles and faster treeshaking. Each subpath exposes the icon both as a named export (identical to the barrel export) and as the default export, so `React.lazy(() => import('@sanity/icons/Rocket'))` works out of the box. Importing individual icons from the root barrel (`import {RocketIcon} from '@sanity/icons'`) still works but is now marked `@deprecated`, pointing to the per-icon subpath to avoid barrel file performance issues.
