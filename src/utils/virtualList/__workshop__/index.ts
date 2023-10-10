import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'utils/virtual-list',
  title: 'VirtualList',
  stories: [
    {
      name: 'window-scroll',
      title: 'Window scroll',
      component: withStudioTheme(lazy(() => import('./windowScrolll'))),
    },
    {
      name: 'element-scroll',
      title: 'Element scroll',
      component: withStudioTheme(lazy(() => import('./elementScroll'))),
    },
    {
      name: 'infinite-list',
      title: 'Infinite list',
      component: withStudioTheme(lazy(() => import('./infiniteList'))),
    },
    {
      name: 'changing-props',
      title: 'Changing props',
      component: withStudioTheme(lazy(() => import('./changingProps'))),
    },
  ],
})
