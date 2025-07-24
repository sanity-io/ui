import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/skeleton',
  title: 'Skeleton',
  stories: [
    {name: 'skeleton', title: 'Skeleton', component: lazy(() => import('./skeleton'))},
    {name: 'skeleton-delay', title: 'Skeleton delay', component: lazy(() => import('./delay'))},
  ],
}

export default scope
