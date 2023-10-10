import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'components/menu',
  title: 'Menu',
  stories: [
    {
      name: 'menu-button',
      title: 'MenuButton',
      component: withStudioTheme(lazy(() => import('./menuButton'))),
    },
    {
      name: 'nested-menu-items',
      title: 'Nested MenuItems',
      component: withStudioTheme(lazy(() => import('./nestedMenu'))),
    },
    {
      name: 'custom-menu-item',
      title: 'Custom MenuItem',
      component: withStudioTheme(lazy(() => import('./customMenuItem'))),
    },
    {
      name: 'groups',
      title: 'Groups',
      component: withStudioTheme(lazy(() => import('./groups'))),
    },
    {
      name: 'menu-group-right',
      title: 'Menu group (right)',
      component: withStudioTheme(lazy(() => import('./menuGroupRight'))),
    },
    {
      name: 'tones',
      title: 'Tones',
      component: withStudioTheme(lazy(() => import('./tones'))),
    },
    {
      name: 'selected-item',
      title: 'Selected item',
      component: withStudioTheme(lazy(() => import('./selectedItem'))),
    },
    {
      name: 'closable',
      title: 'Closeable',
      component: withStudioTheme(lazy(() => import('./closableMenuButton'))),
    },
    {
      name: 'without-arrow',
      title: 'Without arrow',
      component: withStudioTheme(lazy(() => import('./withoutArrow'))),
    },
    {
      name: 'constrained-in-boundary',
      title: 'Constrained in boundary',
      component: withStudioTheme(lazy(() => import('./constrainedInBoundary'))),
    },
    {
      name: 'as-component',
      title: 'As component',
      component: withStudioTheme(lazy(() => import('./asComponent'))),
    },
    {
      name: 'disable-focus-on-close',
      title: 'Disable focus on close',
      component: withStudioTheme(lazy(() => import('./disableFocusOnClose'))),
    },
    {
      name: 'menu-button-with-on-close',
      title: 'MenuButton with on close',
      component: withStudioTheme(lazy(() => import('./onCloseMenuButton'))),
    },
    {
      name: 'shouldFocus',
      title: 'Menu with shouldFocus',
      component: withStudioTheme(lazy(() => import('./shouldFocus'))),
    },
  ],
})
