import {lazy} from 'react'

export const LazyTooltip = lazy(() =>
  import('@sanity/ui/primitives/tooltip').then((module) => ({default: module.Tooltip})),
)
