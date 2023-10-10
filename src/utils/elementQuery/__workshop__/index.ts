import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'utils/elementQuery',
  title: 'ElementQuery',
  stories: [
    {
      name: 'custom-media',
      title: 'Custom media',
      component: withStudioTheme(lazy(() => import('./customMedia'))),
    },
  ],
})
