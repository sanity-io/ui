import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../helpers/withStudioTheme'

export default defineScope({
  name: 'theme',
  title: 'Theme',
  stories: [
    {
      name: 'nested-provider',
      title: 'Nested provider',
      component: withStudioTheme(lazy(() => import('./nestedProvider'))),
    },
    {
      name: 'layer',
      title: 'Layer',
      component: withStudioTheme(lazy(() => import('./layer'))),
    },
    {
      name: 'color',
      title: 'Color',
      component: withStudioTheme(lazy(() => import('./color'))),
    },
  ],
})
