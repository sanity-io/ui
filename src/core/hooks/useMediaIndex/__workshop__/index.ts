import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'hooks/use-media-index',
  title: 'useMediaIndex',
  stories: [
    {
      name: 'test',
      title: 'Test',
      component: lazy(() => import('./test')),
    },
  ],
}

export default scope
