import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'props',
  title: 'Props',
  stories: [
    {
      name: 'test',
      title: 'Test',
      component: lazy(() => import('./TestStory')),
    },
  ],
})
