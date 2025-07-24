import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'components/tree',
  title: 'Tree',
  stories: [
    {
      name: 'basic',
      title: 'Basic',
      component: lazy(() => import('./basic')),
      // options: {perfTests: () => import('./basic.perf')},
    },
    {
      name: 'tab',
      title: 'Tab',
      component: lazy(() => import('./tabFromElement')),
      // options: {perfTests: () => import('./basic.perf')},
    },
  ],
}

export default scope
