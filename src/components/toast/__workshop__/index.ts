import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'components/toast',
  title: 'Toast',
  stories: [
    {
      name: 'toast',
      title: 'Toast',
      component: withStudioTheme(lazy(() => import('./toast'))),
    },
    {
      name: 'hook',
      title: 'Hook',
      component: withStudioTheme(lazy(() => import('./hook'))),
    },
  ],
})
