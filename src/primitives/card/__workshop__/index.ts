import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/card',
  title: 'Card',
  stories: [
    {name: 'props', title: 'Props', component: withStudioTheme(lazy(() => import('./props')))},
    {name: 'styled', title: 'Styled', component: withStudioTheme(lazy(() => import('./styled')))},
    {
      name: 'interactive',
      title: 'Interactive',
      component: withStudioTheme(lazy(() => import('./interactive'))),
    },
    {name: 'tones', title: 'Tones', component: withStudioTheme(lazy(() => import('./allTones')))},
    {
      name: 'as-button',
      title: 'As button',
      component: withStudioTheme(lazy(() => import('./asButton'))),
    },
    {
      name: 'list-nav',
      title: 'List navigation',
      component: withStudioTheme(lazy(() => import('./listNavigation'))),
    },
    {
      name: 'checkered',
      title: 'Checkered',
      component: withStudioTheme(lazy(() => import('./checkered'))),
    },
    {
      name: 'as-component',
      title: 'As component',
      component: withStudioTheme(lazy(() => import('./asComponent'))),
    },
    {
      name: 'selected',
      title: 'Selected',
      component: withStudioTheme(lazy(() => import('./selected'))),
    },
  ],
})
