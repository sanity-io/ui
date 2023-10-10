import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/badge',
  title: 'Badge',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: withStudioTheme(lazy(() => import('./props'))),
    },
    {
      name: 'tones',
      title: 'Tones',
      component: withStudioTheme(lazy(() => import('./tones'))),
    },
  ],
})
