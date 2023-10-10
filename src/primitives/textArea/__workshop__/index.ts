import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/text-area',
  title: 'TextArea',
  stories: [
    {
      name: 'plain',
      title: 'Plain',
      component: withStudioTheme(lazy(() => import('./plain'))),
    },
  ],
})
