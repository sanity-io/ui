import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'components/skeleton',
  title: 'Skeleton',
  stories: [
    {
      name: 'skeleton',
      title: 'Skeleton',
      component: withStudioTheme(lazy(() => import('./skeleton'))),
    },
    {
      name: 'skeleton-delay',
      title: 'Skeleton delay',
      component: withStudioTheme(lazy(() => import('./delay'))),
    },
  ],
})
