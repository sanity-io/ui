import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: '_internal/theme',
  title: 'Theming',
  stories: [
    {
      name: 'build',
      title: 'Build theme',
      component: lazy(() => import('./build/story')),
    },
  ],
})
