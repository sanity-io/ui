import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/button',
  title: 'Button',
  stories: [
    {
      name: 'props',
      title: 'Props',
      component: withStudioTheme(lazy(() => import('./props'))),
    },
    {
      name: 'styled-1',
      title: 'Styled #1',
      component: withStudioTheme(lazy(() => import('./styled1'))),
    },
    {
      name: 'styled-2',
      title: 'Styled #2',
      component: withStudioTheme(lazy(() => import('./styled2'))),
    },
    {
      name: 'stacked',
      title: 'Stacked',
      component: withStudioTheme(lazy(() => import('./stacked'))),
    },
    {
      name: 'custom',
      title: 'Custom',
      component: withStudioTheme(lazy(() => import('./custom'))),
    },
    {
      name: 'mixed-children',
      title: 'Mixed children',
      component: withStudioTheme(lazy(() => import('./mixedChildren'))),
    },
    {
      name: 'upload-button',
      title: 'Upload button',
      component: withStudioTheme(lazy(() => import('./uploadButton'))),
    },
    {
      name: 'sanity-upload-button-workaround',
      title: 'SanityUploadButtonWorkaroundStory',
      component: withStudioTheme(lazy(() => import('./sanityUploadButton'))),
    },
    {
      name: 'custom-icons',
      title: 'Custom icons',
      component: withStudioTheme(lazy(() => import('./customIcons'))),
    },
  ],
})
