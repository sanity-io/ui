import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/selectable',
  title: 'selectable',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./props')),
    },
  ],
})
