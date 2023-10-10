import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/checkbox',
  title: 'Checkbox',
  stories: [
    {name: 'props', title: 'Props', component: withStudioTheme(lazy(() => import('./props')))},
    {
      name: 'example',
      title: 'Example',
      component: withStudioTheme(lazy(() => import('./example'))),
    },
    {
      name: 'read-only',
      title: 'Read-only',
      component: withStudioTheme(lazy(() => import('./readOnly'))),
    },
    {
      name: 'multiple-tones',
      title: 'Multiple tones',
      component: withStudioTheme(lazy(() => import('./tones'))),
    },
  ],
})
