import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'css/card',
  title: 'Card',
  stories: [
    {
      name: 'color',
      title: 'Color',
      component: lazy(() => import('./color')),
    },
  ],
})
