import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/radio',
  title: 'Radio',
  stories: [
    {name: 'plain', title: 'Plain', component: withStudioTheme(lazy(() => import('./plain')))},
    {
      name: 'example',
      title: 'Example',
      component: withStudioTheme(lazy(() => import('./example'))),
    },
  ],
})
