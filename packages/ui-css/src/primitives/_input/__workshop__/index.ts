import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/input',
  title: 'input',
  stories: [
    {
      name: 'all',
      title: 'All',
      component: lazy(() => import('./all')),
    },
  ],
})
