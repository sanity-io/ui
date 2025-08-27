import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'components/virtual-list',
  title: 'VirtualList',
  stories: [
    {
      name: 'window-scroll',
      title: 'Window scroll',
      component: lazy(() => import('./WindowScrolll')),
    },
    {
      name: 'element-scroll',
      title: 'Element scroll',
      component: lazy(() => import('./ElementScroll')),
    },
    {
      name: 'infinite-list',
      title: 'Infinite list',
      component: lazy(() => import('./InfiniteList')),
    },
    {
      name: 'changing-props',
      title: 'Changing props',
      component: lazy(() => import('./ChangingProps')),
    },
  ],
}

export default scope
