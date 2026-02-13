import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'components/toast',
  title: 'Toast',
  stories: [
    {
      name: 'toast',
      title: 'Toast',
      component: lazy(() => import('./Toast')),
    },
    {
      name: 'hook',
      title: 'Hook',
      component: lazy(() => import('./Hook')),
    },
  ],
}

export default scope
