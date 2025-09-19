import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'primitives/selectable',
  title: 'Selectable',
  stories: [
    {
      name: 'data-props',
      title: 'Data props',
      component: lazy(() => import('./DataProps')),
    },
  ],
})
