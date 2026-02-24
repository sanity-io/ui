import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'props/element-tone',
  title: 'Element tone',
  stories: [
    {
      name: 'nested',
      title: 'Nested',
      component: lazy(() => import('./nested')),
    },
  ],
})
