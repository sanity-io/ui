import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/button',
  title: 'Button',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./props')),
    },
    {
      name: 'styled-1',
      title: 'Styled #1',
      component: lazy(() => import('./styled1')),
    },
    {
      name: 'styled-2',
      title: 'Styled #2',
      component: lazy(() => import('./styled2')),
    },
    {
      name: 'stacked',
      title: 'Stacked',
      component: lazy(() => import('./stacked')),
    },
    {
      name: 'custom',
      title: 'Custom',
      component: lazy(() => import('./custom')),
    },
    {
      name: 'mixed-children',
      title: 'Mixed children',
      component: lazy(() => import('./mixedChildren')),
    },
    {
      name: 'upload-button',
      title: 'Upload button',
      component: lazy(() => import('./uploadButton')),
    },
    {
      name: 'sanity-upload-button-workaround',
      title: 'SanityUploadButtonWorkaroundStory',
      component: lazy(() => import('./sanityUploadButton')),
    },
    {
      name: 'custom-icons',
      title: 'Custom icons',
      component: lazy(() => import('./customIcons')),
    },
    {
      name: 'disabled',
      title: 'Disabled',
      component: lazy(() => import('./disabled')),
    },
    {
      name: 'text-overflow',
      title: 'Text overflow',
      component: lazy(() => import('./textOverflow')),
    },
  ],
}

export default scope
