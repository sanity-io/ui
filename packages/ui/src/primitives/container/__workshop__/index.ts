import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/container',
  title: 'Container',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./Example')),
    },
  ],
}

export default scope
