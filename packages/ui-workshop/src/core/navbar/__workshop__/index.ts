import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('navbar', 'Navbar', [
  {
    name: 'zoom-menu',
    title: 'Zoom menu',
    component: lazy(() => import('./ZoomMenuStory')),
  },
  {
    name: 'viewport-menu',
    title: 'Viewport menu',
    component: lazy(() => import('./ViewportMenuStory')),
  },
])
