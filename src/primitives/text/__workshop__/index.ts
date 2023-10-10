import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/text',
  title: 'Text',
  stories: [
    {
      name: 'default',
      title: 'Text',
      component: withStudioTheme(lazy(() => import('./example'))),
    },
    {
      name: 'colored',
      title: 'Colored text',
      component: withStudioTheme(lazy(() => import('./colored'))),
    },
    {
      name: 'optical-alignment',
      title: 'Optical alignment',
      component: withStudioTheme(lazy(() => import('./opticalAlignment'))),
    },
  ],
})
