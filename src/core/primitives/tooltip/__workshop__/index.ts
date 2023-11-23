import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/tooltip',
  title: 'Tooltip',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./props')),
    },
    {
      name: 'resizableBoundary',
      title: 'Resizable Boundary',
      component: lazy(() => import('./resizableBoundary')),
    },
    {
      name: 'overflowBoundary',
      title: 'Overflowing Boundary',
      component: lazy(() => import('./overflowingBoundary')),
    },
    {
      name: 'customPortalStory',
      title: 'Custom Portal',
      component: lazy(() => import('./customPortal')),
    },
  ],
})
