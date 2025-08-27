import type {WorkshopScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

const scope: WorkshopScope = {
  name: 'primitives/button',
  title: 'Button',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: lazy(() => import('./Props')),
    },
    {
      name: 'styled-1',
      title: 'Styled #1',
      component: lazy(() => import('./Styled1')),
    },
    {
      name: 'styled-2',
      title: 'Styled #2',
      component: lazy(() => import('./Styled2')),
    },
    {
      name: 'stacked',
      title: 'Stacked',
      component: lazy(() => import('./Stacked')),
    },
    {
      name: 'custom',
      title: 'Custom',
      component: lazy(() => import('./Custom')),
    },
    {
      name: 'mixed-children',
      title: 'Mixed children',
      component: lazy(() => import('./MixedChildren')),
    },
    {
      name: 'upload-button',
      title: 'Upload button',
      component: lazy(() => import('./UploadButton')),
    },
    {
      name: 'sanity-upload-button-workaround',
      title: 'SanityUploadButtonWorkaroundStory',
      component: lazy(() => import('./SanityUploadButton')),
    },
    {
      name: 'custom-icons',
      title: 'Custom icons',
      component: lazy(() => import('./CustomIcons')),
    },
    {
      name: 'disabled',
      title: 'Disabled',
      component: lazy(() => import('./Disabled')),
    },
    {
      name: 'text-overflow',
      title: 'Text overflow',
      component: lazy(() => import('./TextOverflow')),
    },
  ],
}

export default scope
