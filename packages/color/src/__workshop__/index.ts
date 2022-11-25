import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  stories: [
    {
      name: 'overview',
      title: 'Overview',
      component: lazy(() => import('./overview')),
    },
    {
      name: 'tool',
      title: 'Tool',
      component: lazy(() => import('./tool')),
    },
  ],
})
