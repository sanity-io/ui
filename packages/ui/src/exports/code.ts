'use client'

// The `@sanity/ui/code` entry point. `Code` syntax-highlights with
// `react-refractor` (loaded on demand via `React.lazy`), so it lives on its
// own subpath to keep that dependency out of the root entry point.
export {Code, type CodeOwnProps, type CodeProps} from '../core/primitives/code/code'
