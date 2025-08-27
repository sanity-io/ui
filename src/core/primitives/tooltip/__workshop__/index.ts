import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/tooltip',
  title: 'Tooltip',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./Props')),
    },
    {
      name: 'resizableBoundary',
      title: 'Resizable Boundary',
      component: lazy(() => import('./ResizableBoundary')),
    },
    {
      name: 'overflowBoundary',
      title: 'Overflowing Boundary',
      component: lazy(() => import('./OverflowingBoundary')),
    },
    {
      name: 'customPortalStory',
      title: 'Custom Portal',
      component: lazy(() => import('./CustomPortal')),
    },
  ],
}

export default scope
