import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: './css/input',
  title: 'Input',
  stories: [
    {
      name: 'custom',
      title: 'Custom',
      component: lazy(() => import('./customInput')),
    },
  ],
})
