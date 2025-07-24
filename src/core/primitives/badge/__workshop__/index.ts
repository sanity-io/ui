import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/badge',
  title: 'Badge',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./props')),
    },
    {
      name: 'tones',
      title: 'Tones',
      component: lazy(() => import('./tones')),
    },
  ],
}

export default scope
