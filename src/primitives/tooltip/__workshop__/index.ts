import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/tooltip',
  title: 'Tooltip',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: withStudioTheme(lazy(() => import('./props'))),
    },
  ],
})
