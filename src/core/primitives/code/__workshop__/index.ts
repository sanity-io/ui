import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/code',
  title: 'Code',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./props')),
    },
    {
      name: 'optical-alignment',
      title: 'Optical alignment',
      component: lazy(() => import('./opticalAlignment')),
    },
  ],
}

export default scope
