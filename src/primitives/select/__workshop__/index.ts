import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/select',
  title: 'Select',
  stories: [
    {name: 'plain', title: 'Plain', component: withStudioTheme(lazy(() => import('./plain')))},
    {
      name: 'read-only',
      title: 'Read-only',
      component: withStudioTheme(lazy(() => import('./readOnly'))),
    },
  ],
})
