import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'components/autocomplete',
  title: 'Autocomplete',
  stories: [
    {
      name: 'example',
      title: 'Example',
      component: lazy(() => import('./Example')),
    },
    {
      name: 'custom',
      title: 'Custom',
      component: lazy(() => import('./Custom')),
    },
    {
      name: 'async',
      title: 'Async',
      component: lazy(() => import('./Async')),
    },
    {
      name: 'constrained-height',
      title: 'Constrained height',
      component: lazy(() => import('./ConstrainedHeight')),
    },
    {
      name: 'focus-and-blur',
      title: 'Focus and blur',
      component: lazy(() => import('./FocusAndBlur')),
    },
    {
      name: 'fullscreen',
      title: 'Fullscreen',
      component: lazy(() => import('./Fullscreen')),
    },
  ],
}

export default scope
