import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('primitives/popover', 'Popover', [
  {
    name: 'test',
    title: 'Test',
    component: lazy(() => import('./TestStory')),
  },
  {
    name: 'plain',
    title: 'Plain',
    component: lazy(() => import('./PlainStory')),
  },
  {
    name: 'recursive',
    title: 'Recursive',
    component: lazy(() => import('./RecursiveStory')),
  },
  {
    name: 'match-ref-width',
    title: 'Match reference width',
    component: lazy(() => import('./MatchReferenceWidthStory')),
  },
  {
    name: 'margins',
    title: 'Margins',
    component: lazy(() => import('./MarginsStory')),
  },
  {
    name: 'right-aligned',
    title: 'Right-aligned',
    component: lazy(() => import('./RightAlignedStory')),
  },
])
