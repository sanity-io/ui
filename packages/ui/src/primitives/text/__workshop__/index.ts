import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/text',
  title: 'Text',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./Example')),
    },
    {
      name: 'optical-alignment',
      title: 'Optical alignment',
      component: lazy(() => import('./OpticalAlignment')),
    },
    {
      name: 'inline-code',
      title: 'Inline code',
      component: lazy(() => import('./inline-code')),
    },
  ],
}

export default scope
