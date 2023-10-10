import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
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
})
