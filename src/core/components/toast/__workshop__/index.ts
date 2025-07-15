import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'components/toast',
  title: 'Toast',
  stories: [
    {
      name: 'toast',
      title: 'Toast',
      component: lazy(() => import('./toast')),
    },
    {
      name: 'hook',
      title: 'Hook',
      component: lazy(() => import('./hook')),
    },
  ],
}

export default scope
