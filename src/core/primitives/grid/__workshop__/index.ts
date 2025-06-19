import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/grid',
  title: 'Grid',
  stories: [
    {name: 'responsive', title: 'Responsive', component: lazy(() => import('./responsive'))},
  ],
}

export default scope
