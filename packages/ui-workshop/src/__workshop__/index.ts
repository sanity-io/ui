import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'test',
  title: 'Test',
  stories: [
    {
      name: 'test',
      title: 'Test',
      component: lazy(() => import('./TestStory')),
    },
  ],
})
