import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/spinner',
  title: 'Spinner',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./Props')),
    },
  ],
}

export default scope
