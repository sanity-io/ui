import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/code',
  title: 'Code',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: withStudioTheme(lazy(() => import('./props'))),
    },
    {
      name: 'optical-alignment',
      title: 'Optical alignment',
      component: withStudioTheme(lazy(() => import('./opticalAlignment'))),
    },
  ],
})
