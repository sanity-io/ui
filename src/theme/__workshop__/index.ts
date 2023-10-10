import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'theme',
  title: 'Theme',
  stories: [
    {
      name: 'nested-provider',
      title: 'Nested provider',
      component: lazy(() => import('./nestedProvider')),
    },
    {
      name: 'layer',
      title: 'Layer',
      component: lazy(() => import('./layer')),
    },
    {
      name: 'color',
      title: 'Color',
      component: lazy(() => import('./color')),
    },
  ],
})
