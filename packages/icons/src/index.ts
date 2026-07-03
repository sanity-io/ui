// The root entry exposes only the dynamic pieces: the `<Icon>` component, the lazy `icons`
// map, and their types. Individual icons are not re-exported here – import them from their
// dedicated subpath instead, e.g. `import {RocketIcon} from '@sanity/icons/Rocket'` – so that
// importing the root entry never pulls icon code into the initial bundle.

export * from './icon'

export * from './types'

export {icons} from './icons'

export type {IconMap, IconSymbol} from './icons'
