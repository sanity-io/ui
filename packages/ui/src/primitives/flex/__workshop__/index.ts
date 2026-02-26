import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/flex',
  title: 'Flex',
  stories: [
    {name: 'plain', title: 'Plain', component: lazy(() => import('./Example'))},
    {name: 'gap', title: 'Gap', component: lazy(() => import('./Gap'))},
  ],
}

export default scope
