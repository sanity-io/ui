import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/heading',
  title: 'Heading',
  stories: [
    {
      name: 'plain',
      title: 'Plain',
      component: lazy(() => import('./plain')),
    },
    {
      name: 'optical-alignment',
      title: 'Optical alignment',
      component: lazy(() => import('./opticalAlignment')),
    },
  ],
}

export default scope
