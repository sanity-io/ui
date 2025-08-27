import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/text-input',
  title: 'TextInput',
  stories: [
    {
      name: 'plain',
      title: 'Plain',
      component: lazy(() => import('./Plain')),
    },
    {
      name: 'custom-validity',
      title: 'Custom validity',
      component: lazy(() => import('./CustomValidity')),
    },
    {
      name: 'typed',
      title: 'Typed',
      component: lazy(() => import('./Typed')),
    },
    {
      name: 'tones',
      title: 'Tones',
      component: lazy(() => import('./Tones')),
    },
    {
      name: 'clear-button',
      title: 'Clear button',
      component: lazy(() => import('./ClearButton')),
    },
    {
      name: 'read-only',
      title: 'Read only',
      component: lazy(() => import('./ReadOnly')),
    },
    {
      name: 'states',
      title: 'States',
      component: lazy(() => import('./States')),
    },
  ],
}

export default scope
