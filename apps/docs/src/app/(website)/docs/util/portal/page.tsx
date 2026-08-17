import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'Portal | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Portal',
    description: 'An ergonomic toolkit to design with code.',
    siteName: 'Sanity UI',
  },
  twitter: {
    card: 'summary',
    site: '@sanity_io',
  },
}

export default function Page() {
  return (
    <Article title="Portal" isComponent>
      <Paragraph>
        {'The '}
        <code>Portal</code>
        {' component is a utility for rendering DOM nodes outside of the application root element.'}
      </Paragraph>

      <Paragraph>
        This is useful for rendering modals, dialogs, popovers, and other components that need to
        break out of the application – either visually or interactively.
      </Paragraph>
    </Article>
  )
}
