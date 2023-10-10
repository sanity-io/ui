import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'components/dialog',
  title: 'Dialog',
  stories: [
    {name: 'props', title: 'Props', component: withStudioTheme(lazy(() => import('./props')))},
    {name: 'nested', title: 'Nested', component: withStudioTheme(lazy(() => import('./nested')))},
    {
      name: 'on-scroll',
      title: 'On scroll',
      component: withStudioTheme(lazy(() => import('./onScroll'))),
    },
    {
      name: 'layering',
      title: 'Layering',
      component: withStudioTheme(lazy(() => import('./layering'))),
    },
    {
      name: 'position',
      title: 'Position',
      component: withStudioTheme(lazy(() => import('./position'))),
    },
    {
      name: 'provider',
      title: 'Provider',
      component: withStudioTheme(lazy(() => import('./provider'))),
    },
    {
      name: 'auto-focus',
      title: 'AutoFocus',
      component: withStudioTheme(lazy(() => import('./autoFocus'))),
    },
    {name: 'panes', title: 'Panes', component: withStudioTheme(lazy(() => import('./panes')))},
    {
      name: 'activate',
      title: 'Activate',
      component: withStudioTheme(lazy(() => import('./activate'))),
    },
    {
      name: 'wrapped',
      title: 'Wrapped',
      component: withStudioTheme(lazy(() => import('./wrapped'))),
    },
  ],
})
