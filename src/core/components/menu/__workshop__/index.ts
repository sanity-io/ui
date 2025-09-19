import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'components/menu',
  title: 'Menu',
  stories: [
    {
      name: 'menu-button',
      title: 'MenuButton',
      component: lazy(() => import('./MenuButton')),
    },
    {
      name: 'nested-menu-items',
      title: 'Nested MenuItems',
      component: lazy(() => import('./NestedMenu')),
    },
    {
      name: 'custom-menu-item',
      title: 'Custom MenuItem',
      component: lazy(() => import('./CustomMenuItem')),
    },
    {
      name: 'groups',
      title: 'Groups',
      component: lazy(() => import('./Groups')),
    },
    {
      name: 'menu-group-right',
      title: 'Menu group (right)',
      component: lazy(() => import('./MenuGroupRight')),
    },
    {
      name: 'tones',
      title: 'Tones',
      component: lazy(() => import('./Tones')),
    },
    {
      name: 'selected-item',
      title: 'Selected item',
      component: lazy(() => import('./SelectedItem')),
    },
    {
      name: 'closable',
      title: 'Closeable',
      component: lazy(() => import('./ClosableMenuButton')),
    },
    {
      name: 'without-arrow',
      title: 'Without arrow',
      component: lazy(() => import('./WithoutArrow')),
    },
    {
      name: 'constrained-in-boundary',
      title: 'Constrained in boundary',
      component: lazy(() => import('./ConstrainedInBoundary')),
    },
    {
      name: 'as-component',
      title: 'As component',
      component: lazy(() => import('./AsComponent')),
    },
    {
      name: 'disable-focus-on-close',
      title: 'Disable focus on close',
      component: lazy(() => import('./DisableFocusOnClose')),
    },
    {
      name: 'menu-button-with-on-close',
      title: 'MenuButton with on close',
      component: lazy(() => import('./OnCloseMenuButton')),
    },
    {
      name: 'should-focus',
      title: 'Menu with shouldFocus',
      component: lazy(() => import('./ShouldFocus')),
    },
    {
      name: 'avatar',
      title: 'Avatar menu',
      component: lazy(() => import('./AvatarMenu')),
    },
    {
      name: 'custom-selected-state',
      title: 'Custom selected state',
      component: lazy(() => import('./CustomSelectedState')),
    },
    {
      name: 'data-props',
      title: 'Data props',
      component: lazy(() => import('./DataProps')),
    },
  ],
}

export default scope
