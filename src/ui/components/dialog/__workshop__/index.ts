import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  name: 'components/dialog',
  title: 'Dialog',
  stories: [
    {name: 'props', title: 'Props', component: lazy(() => import('./props'))},
    {name: 'nested', title: 'Nested', component: lazy(() => import('./nested'))},
    {name: 'on-scroll', title: 'On scroll', component: lazy(() => import('./onScroll'))},
    {name: 'layering', title: 'Layering', component: lazy(() => import('./layering'))},
    {name: 'position', title: 'Position', component: lazy(() => import('./position'))},
    {name: 'provider', title: 'Provider', component: lazy(() => import('./provider'))},
    {name: 'auto-focus', title: 'AutoFocus', component: lazy(() => import('./autoFocus'))},
    {name: 'panes', title: 'Panes', component: lazy(() => import('./panes'))},
    {name: 'activate', title: 'Activate', component: lazy(() => import('./activate'))},
    {name: 'wrapped', title: 'Wrapped', component: lazy(() => import('./wrapped'))},
  ],
})
