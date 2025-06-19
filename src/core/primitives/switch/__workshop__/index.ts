import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/switch',
  title: 'Switch',
  stories: [
    {name: 'props', title: 'Props', component: lazy(() => import('./props'))},
    {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
  ],
}

export default scope
