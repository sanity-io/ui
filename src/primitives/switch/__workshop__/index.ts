import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/switch',
  title: 'Switch',
  stories: [
    {name: 'props', title: 'Props', component: withStudioTheme(lazy(() => import('./props')))},
    {
      name: 'example',
      title: 'Example',
      component: withStudioTheme(lazy(() => import('./example'))),
    },
  ],
})
