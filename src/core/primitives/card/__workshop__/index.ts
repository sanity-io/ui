import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/card',
  title: 'Card',
  stories: [
    {name: 'props', title: 'Props', component: lazy(() => import('./Props'))},
    {name: 'styled', title: 'Styled', component: lazy(() => import('./Styled'))},
    {name: 'interactive', title: 'Interactive', component: lazy(() => import('./Interactive'))},
    {name: 'tones', title: 'Tones', component: lazy(() => import('./Tones'))},
    {name: 'as-button', title: 'As button', component: lazy(() => import('./AsButton'))},
    {name: 'list-nav', title: 'List navigation', component: lazy(() => import('./ListNavigation'))},
    {name: 'checkered', title: 'Checkered', component: lazy(() => import('./Checkered'))},
    {name: 'as-component', title: 'As component', component: lazy(() => import('./AsComponent'))},
    {name: 'selected', title: 'Selected', component: lazy(() => import('./Selected'))},
  ],
}

export default scope
