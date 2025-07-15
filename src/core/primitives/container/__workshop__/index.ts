import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/container',
  title: 'Container',
  stories: [{name: 'plain', title: 'Plain', component: lazy(() => import('./example'))}],
}

export default scope
