import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'css/card',
  title: 'Card',
  stories: [
    {
      name: 'color',
      title: 'Color',
      component: lazy(() => import('./color')),
    },
  ],
}

export default scope
