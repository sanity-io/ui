import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/avatar',
  title: 'avatar',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./props')),
    },
  ],
})
