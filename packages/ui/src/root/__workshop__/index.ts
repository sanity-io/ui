import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'root',
  title: 'Root',
  stories: [
    {
      name: 'boundary',
      title: 'Boundary',
      component: lazy(() => import('./Boundary')),
    },
    {
      name: 'primitives',
      title: 'Primitives',
      component: lazy(() => import('./primitives')),
    },
    {
      name: 'tone-inheritance',
      title: 'Tone inheritance',
      component: lazy(() => import('./tone-inheritance')),
    },
  ],
})
