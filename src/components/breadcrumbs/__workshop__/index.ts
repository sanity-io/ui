import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'components/breadcrumbs',
  title: 'Breadcrumbs',
  stories: [
    {
      name: 'example',
      title: 'Example',
      component: withStudioTheme(lazy(() => import('./example'))),
    },
  ],
})
