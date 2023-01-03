import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope({
  stories: [
    {
      name: 'sanity-logo',
      title: 'SanityLogo',
      component: lazy(() => import('./SanityLogoStory')),
    },
    {
      name: 'sanity-monogram',
      title: 'SanityMonogram',
      component: lazy(() => import('./SanityMonogramStory')),
    },
    {
      name: 'groq-logo',
      title: 'GroqLogo',
      component: lazy(() => import('./GroqLogoStory')),
    },
    {
      name: 'groq-monogram',
      title: 'GroqMonogram',
      component: lazy(() => import('./GroqMonogramStory')),
    },
  ],
})
