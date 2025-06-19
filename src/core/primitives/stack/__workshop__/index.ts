import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/stack',
  title: 'Stack',
  stories: [
    {
      name: 'plain',
      title: 'Plain',
      component: lazy(() => import('./plain')),
    },
  ],
}

export default scope
