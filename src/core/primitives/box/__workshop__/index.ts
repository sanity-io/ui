import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/box',
  title: 'Box',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./props')),
    },
    {
      name: 'responsive',
      title: 'Responsive',
      component: lazy(() => import('./responsive')),
    },
  ],
}

export default scope
