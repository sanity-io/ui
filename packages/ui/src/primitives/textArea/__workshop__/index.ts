import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/text-area',
  title: 'TextArea',
  stories: [
    {
      name: 'plain',
      title: 'Plain',
      component: lazy(() => import('./Plain')),
    },
  ],
}

export default scope
