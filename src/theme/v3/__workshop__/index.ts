import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'v3',
  title: 'Theme v3',
  stories: [
    {
      name: 'vars',
      title: 'Vars',
      component: lazy(() => import('./vars')),
    },
  ],
})
