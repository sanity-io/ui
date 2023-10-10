import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'hooks/use-media-index',
  title: 'useMediaIndex',
  stories: [
    {
      name: 'test',
      title: 'Test',
      component: withStudioTheme(lazy(() => import('./test'))),
    },
  ],
})
