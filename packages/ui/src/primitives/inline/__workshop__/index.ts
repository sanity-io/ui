import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/inline',
  title: 'Inline',
  stories: [{name: 'plain', title: 'Plain', component: lazy(() => import('./Plain'))}],
}

export default scope
