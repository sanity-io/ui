import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'utils/portal',
  title: 'Portal',
  stories: [
    {
      name: 'named',
      title: 'Named portals',
      component: lazy(() => import('./Named')),
    },
  ],
}

export default scope
