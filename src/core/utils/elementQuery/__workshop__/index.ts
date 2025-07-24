import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'utils/elementQuery',
  title: 'ElementQuery',
  stories: [
    {
      name: 'custom-media',
      title: 'Custom media',
      component: lazy(() => import('./customMedia')),
    },
  ],
}

export default scope
