import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'hooks/useElementRect',
  title: 'useElementRect',
  stories: [
    {
      name: 'example',
      title: 'Example',
      component: withStudioTheme(lazy(() => import('./example'))),
    },
  ],
})
