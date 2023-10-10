import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'components/autocomplete',
  title: 'Autocomplete',
  stories: [
    {
      name: 'example',
      title: 'Example',
      component: withStudioTheme(lazy(() => import('./example'))),
    },
    {
      name: 'custom',
      title: 'Custom',
      component: withStudioTheme(lazy(() => import('./custom'))),
    },
    {
      name: 'async',
      title: 'Async',
      component: withStudioTheme(lazy(() => import('./async'))),
    },
    {
      name: 'constrained-height',
      title: 'Constrained height',
      component: withStudioTheme(lazy(() => import('./constrainedHeight'))),
    },
    {
      name: 'focus-and-blur',
      title: 'Focus and blur',
      component: withStudioTheme(lazy(() => import('./focusAndBlur'))),
    },
    {
      name: 'fullscreen',
      title: 'Fullscreen',
      component: withStudioTheme(lazy(() => import('./fullscreen'))),
    },
  ],
})
