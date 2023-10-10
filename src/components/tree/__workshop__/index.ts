import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'components/tree',
  title: 'Tree',
  stories: [
    {
      name: 'basic',
      title: 'Basic',
      component: withStudioTheme(lazy(() => import('./basic'))),
      // options: {perfTests: () => import('./basic.perf')},
    },
    {
      name: 'tab',
      title: 'Tab',
      component: withStudioTheme(lazy(() => import('./tabFromElement'))),
      // options: {perfTests: () => import('./basic.perf')},
    },
  ],
})
