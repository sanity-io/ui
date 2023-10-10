import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'utils/portal',
  title: 'Portal',
  stories: [
    {
      name: 'named',
      title: 'Named portals',
      component: withStudioTheme(lazy(() => import('./named'))),
    },
  ],
})
