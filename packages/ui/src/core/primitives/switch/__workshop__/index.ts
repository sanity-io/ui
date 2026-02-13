import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/switch',
  title: 'Switch',
  stories: [
    {name: 'props', title: 'Props', component: lazy(() => import('./Props'))},
    {name: 'example', title: 'Example', component: lazy(() => import('./Example'))},
  ],
}

export default scope
