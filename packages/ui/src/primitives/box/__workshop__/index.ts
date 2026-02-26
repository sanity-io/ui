import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/box',
  title: 'Box',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./Props')),
    },
    {
      name: 'responsive',
      title: 'Responsive',
      component: lazy(() => import('./Responsive')),
    },
  ],
}

export default scope
