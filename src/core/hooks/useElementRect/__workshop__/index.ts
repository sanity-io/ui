import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'hooks/useElementRect',
  title: 'useElementRect',
  stories: [
    {
      name: 'example',
      title: 'Example',
      component: lazy(() => import('./example')),
    },
  ],
}

export default scope
