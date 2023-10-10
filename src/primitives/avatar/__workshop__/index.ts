import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/avatar',
  title: 'Avatar',
  stories: [
    {
      name: 'as-button',
      title: 'As button',
      component: withStudioTheme(lazy(() => import('./asButton'))),
    },
    {
      name: 'avatar-stack',
      title: 'Avatar stack',
      component: withStudioTheme(lazy(() => import('./stack'))),
    },
  ],
})
