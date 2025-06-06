import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'root',
  title: 'Root',
  stories: [
    {
      name: 'boundary',
      title: 'Boundary',
      component: lazy(() => import('./boundary')),
    },
  ],
})
