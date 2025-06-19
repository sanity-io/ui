import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/layer',
  title: 'Layer',
  stories: [
    {
      name: 'nested',
      title: 'Nested',
      component: lazy(() => import('./nested')),
    },
    {
      name: 'multiple-roots',
      title: 'Multiple roots',
      component: lazy(() => import('./multipleRoots')),
    },
    {
      name: 'responsive-z-offset',
      title: 'Responsive z-offset',
      component: lazy(() => import('./responsiveZOffset')),
    },
  ],
}

export default scope
