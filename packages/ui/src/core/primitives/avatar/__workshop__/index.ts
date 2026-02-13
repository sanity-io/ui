import {type WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/avatar',
  title: 'Avatar',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./PropsStory')),
    },
    {
      name: 'as-button',
      title: 'As button',
      component: lazy(() => import('./AsButton')),
    },
    {
      name: 'avatar-stack',
      title: 'Avatar stack',
      component: lazy(() => import('./Stack')),
    },
    {
      name: 'within-button',
      title: 'Within button',
      component: lazy(() => import('./WithinButton')),
    },
    {
      name: 'within-menu-item',
      title: 'Within menu item',
      component: lazy(() => import('./WithinMenuItem')),
    },
  ],
}

export default scope
