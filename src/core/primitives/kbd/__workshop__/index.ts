import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/kbd',
  title: 'KBD',
  stories: [{name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))}],
}

export default scope
