import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/box',
  title: 'Box',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: withStudioTheme(lazy(() => import('./props'))),
    },
    {
      name: 'responsive',
      title: 'Responsive',
      component: withStudioTheme(lazy(() => import('./responsive'))),
    },
  ],
})
