import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {FigmaButton} from '@/components/page/article/content/FigmaButton'
import {FigmaEmbed} from '@/components/page/article/content/FigmaEmbed'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'Sanity UI Figma library | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Sanity UI Figma library',
    description: 'A robust design library based on\u2028 a modern React.js UI toolkit.',
    siteName: 'Sanity UI',
    images: ['/ui/images/social-docs.png'],
  },
  twitter: {
    card: 'summary',
    site: '@sanity_io',
  },
}

export default function Page() {
  return (
    <Article title="Sanity UI Figma library">
      <FigmaEmbed url="https://www.figma.com/file/5mhVqXlldJEEB2VWZeKQ4i" />

      <FigmaButton
        title="Show in Figma Community"
        url="https://www.figma.com/community/file/1317452372825980184"
      />

      <Paragraph>
        Sanity UI was created to make it possible to design with code, directly in the browser.
      </Paragraph>

      <Paragraph>
        The easiest way to experiment with the library is to use Arcade – an online sandbox where
        you mix and match all its components and see the output in real-time.
      </Paragraph>

      <Paragraph>
        {
          'If you would like to use design software to prototype your Sanity UI experiences we also have '
        }
        <a
          href="https://www.figma.com/community/file/946703925105795979"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          a fully-featured Figma library
        </a>
        {
          ' containing all the components, icons, typography styles and effects included in the project.'
        }
      </Paragraph>
    </Article>
  )
}
