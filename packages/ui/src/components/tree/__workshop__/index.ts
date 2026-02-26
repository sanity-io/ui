import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'components/tree',
  title: 'Tree',
  stories: [
    {
      name: 'basic',
      title: 'Basic',
      component: lazy(() => import('./Basic')),
      // options: {perfTests: () => import('./Basic.perf')},
    },
    {
      name: 'tab',
      title: 'Tab',
      component: lazy(() => import('./TabFromElement')),
      // options: {perfTests: () => import('./Basic.perf')},
    },
  ],
}

export default scope
