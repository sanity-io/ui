import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/button',
  title: 'button',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./props')),
    },
  ],
})
