// The root entry exposes only the dynamic pieces: the `<Icon>` component, the lazy `icons`
// map, and their types. Individual icons are not re-exported here – import them from their
// dedicated subpath instead, e.g. `import {RocketIcon} from '@sanity/icons/Rocket'` – so that
// importing the root entry never pulls icon code into the initial bundle.
//
// The `./deprecations` re-export is type-only in practice: it holds a generated `@deprecated`
// `never`-typed tombstone per icon (declaration-only, nothing at runtime), so that
// `import {RocketIcon} from '@sanity/icons'` explains where the icon lives now instead of
// failing with a bare "has no exported member" error, as if the icon had been deleted.

export * from './deprecations'

export * from './icon'

export * from './types'

export {icons} from './icons'

export type {IconMap, IconSymbol} from './icons'
