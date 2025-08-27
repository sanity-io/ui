import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'components/breadcrumbs',
  title: 'Breadcrumbs',
  stories: [
    {
      name: 'example',
      title: 'Example',
      component: lazy(() => import('./Example')),
    },
  ],
}

export default scope
