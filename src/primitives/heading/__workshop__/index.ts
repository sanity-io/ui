import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/heading',
  title: 'Heading',
  stories: [
    {
      name: 'plain',
      title: 'Plain',
      component: withStudioTheme(lazy(() => import('./plain'))),
    },
    {
      name: 'optical-alignment',
      title: 'Optical alignment',
      component: withStudioTheme(lazy(() => import('./opticalAlignment'))),
    },
  ],
})
