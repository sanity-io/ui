import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/inline',
  title: 'Inline',
  stories: [{name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))}],
})
