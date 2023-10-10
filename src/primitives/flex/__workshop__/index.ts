import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/flex',
  title: 'Flex',
  stories: [
    {name: 'plain', title: 'Plain', component: withStudioTheme(lazy(() => import('./example')))},
    {name: 'gap', title: 'Gap', component: withStudioTheme(lazy(() => import('./gap')))},
  ],
})
