import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'utils/layer',
  title: 'Layer',
  stories: [
    {
      name: 'nested',
      title: 'Nested',
      component: withStudioTheme(lazy(() => import('./nested'))),
    },
    {
      name: 'multiple-roots',
      title: 'Multiple roots',
      component: withStudioTheme(lazy(() => import('./multipleRoots'))),
    },
    {
      name: 'responsive-z-offset',
      title: 'Responsive z-offset',
      component: withStudioTheme(lazy(() => import('./responsiveZOffset'))),
    },
  ],
})
