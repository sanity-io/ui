'use client'

// The `@sanity/ui/breadcrumbs` entry point. `Breadcrumbs` collapses into a
// `Popover` (which depends on `@floating-ui/react-dom` and `motion`), so it
// lives on its own subpath to keep those dependencies out of the root entry
// point.
export {Breadcrumbs, type BreadcrumbsProps} from '../core/components/breadcrumbs/breadcrumbs'
