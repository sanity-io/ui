import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'components/dialog',
  title: 'Dialog',
  stories: [
    {name: 'props', title: 'Props', component: lazy(() => import('./Props'))},
    {name: 'nested', title: 'Nested', component: lazy(() => import('./Nested'))},
    {name: 'on-scroll', title: 'On scroll', component: lazy(() => import('./OnScroll'))},
    {name: 'layering', title: 'Layering', component: lazy(() => import('./Layering'))},
    {name: 'position', title: 'Position', component: lazy(() => import('./Position'))},
    {name: 'provider', title: 'Provider', component: lazy(() => import('./Provider'))},
    {name: 'auto-focus', title: 'AutoFocus', component: lazy(() => import('./AutoFocus'))},
    {name: 'panes', title: 'Panes', component: lazy(() => import('./Panes'))},
    {name: 'activate', title: 'Activate', component: lazy(() => import('./Activate'))},
    {name: 'wrapped', title: 'Wrapped', component: lazy(() => import('./Wrapped'))},
  ],
}

export default scope
