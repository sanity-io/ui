import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/grid',
  title: 'Grid',
  stories: [
    {
      name: 'responsive',
      title: 'Responsive',
      component: withStudioTheme(lazy(() => import('./responsive'))),
    },
  ],
})
