import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/checkbox',
  title: 'Checkbox',
  stories: [
    {name: 'props', title: 'Props', component: lazy(() => import('./props'))},
    {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
    {name: 'read-only', title: 'Read-only', component: lazy(() => import('./readOnly'))},
    {name: 'multiple-tones', title: 'Multiple tones', component: lazy(() => import('./tones'))},
  ],
}

export default scope
