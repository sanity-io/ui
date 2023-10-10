import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/popover',
  title: 'Popover',
  stories: [
    {
      name: 'test',
      title: 'Test',
      component: withStudioTheme(lazy(() => import('./TestStory'))),
    },
    {
      name: 'plain',
      title: 'Plain',
      component: withStudioTheme(lazy(() => import('./PlainStory'))),
    },
    {
      name: 'recursive',
      title: 'Recursive',
      component: withStudioTheme(lazy(() => import('./RecursiveStory'))),
    },
    {
      name: 'match-ref-width',
      title: 'Match reference width',
      component: withStudioTheme(lazy(() => import('./MatchReferenceWidthStory'))),
    },
    {
      name: 'margins',
      title: 'Margins',
      component: withStudioTheme(lazy(() => import('./MarginsStory'))),
    },
    {
      name: 'aligned',
      title: 'Aligned',
      component: withStudioTheme(lazy(() => import('./AlignedStory'))),
    },
    {
      name: 'openOnMountStory',
      title: 'Open on mount',
      component: withStudioTheme(lazy(() => import('./OpenOnMountStory'))),
    },
    {
      name: 'side-panel',
      title: 'Side panel',
      component: withStudioTheme(lazy(() => import('./SidePanelStory'))),
    },
  ],
})
