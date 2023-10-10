import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'
import withStudioTheme from '../../../helpers/withStudioTheme'

export default defineScope({
  name: 'primitives/text-input',
  title: 'TextInput',
  stories: [
    {
      name: 'plain',
      title: 'Plain',
      component: withStudioTheme(lazy(() => import('./plain'))),
    },
    {
      name: 'custom-validity',
      title: 'Custom validity',
      component: withStudioTheme(lazy(() => import('./customValidity'))),
    },
    {
      name: 'typed',
      title: 'Typed',
      component: withStudioTheme(lazy(() => import('./typed'))),
    },
    {
      name: 'tones',
      title: 'Tones',
      component: withStudioTheme(lazy(() => import('./tones'))),
    },
    {
      name: 'clear-button',
      title: 'Clear button',
      component: withStudioTheme(lazy(() => import('./clearButton'))),
    },
    {
      name: 'read-only',
      title: 'Read only',
      component: withStudioTheme(lazy(() => import('./readOnly'))),
    },
    {
      name: 'multiple-tones',
      title: 'Multiple tones',
      component: withStudioTheme(lazy(() => import('./multipleTones'))),
    },
    {
      name: 'states',
      title: 'States',
      component: withStudioTheme(lazy(() => import('./states'))),
    },
  ],
})
