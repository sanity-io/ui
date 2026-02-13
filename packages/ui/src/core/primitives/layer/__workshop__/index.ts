import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/layer',
  title: 'Layer',
  stories: [
    {
      name: 'nested',
      title: 'Nested',
      component: lazy(() => import('./Nested')),
    },
    {
      name: 'multiple-roots',
      title: 'Multiple roots',
      component: lazy(() => import('./MultipleRoots')),
    },
    {
      name: 'responsive-z-offset',
      title: 'Responsive z-offset',
      component: lazy(() => import('./ResponsiveZOffset')),
    },
  ],
}

export default scope
