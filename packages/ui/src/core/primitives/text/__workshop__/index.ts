import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/text',
  title: 'Text',
  stories: [
    {
      name: 'default',
      title: 'Text',
      component: lazy(() => import('./Example')),
    },
    {
      name: 'colored',
      title: 'Colored text',
      component: lazy(() => import('./Colored')),
    },
    {
      name: 'optical-alignment',
      title: 'Optical alignment',
      component: lazy(() => import('./OpticalAlignment')),
    },
  ],
}

export default scope
