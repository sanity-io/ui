import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {Callout} from '@/components/page/article/content/Callout'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {NpmPackageBadge} from '@/components/page/article/content/NpmPackageBadge'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'Get started with Sanity UI | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Get started with Sanity UI',
    description: 'An ergonomic toolkit to design with code.',
    siteName: 'Sanity UI',
    images: ['/ui/images/social-docs.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sanity_io',
  },
}

export default function Page() {
  return (
    <Article
      title="Get started with Sanity UI"
      headings={[{level: 2, slug: 'basic-usage', text: 'Basic usage'}]}
    >
      <Paragraph>
        Sanity UI is a scalable and ergonomic React library for rapidly building efficient,
        accessible, and beautiful web apps:
      </Paragraph>

      <CodeBlock
        language="sh"
        code={`npm install @sanity/ui

# Install peer dependencies 
npm install react react-dom styled-components
`}
      />

      <NpmPackageBadge name="@sanity/ui" />

      <Heading2 id="basic-usage">Basic usage</Heading2>

      <Callout icon="bulb-outline" tone="primary">
        <PlainParagraph>
          <strong>Note</strong>
          {': '}
          <code>@sanity/ui</code>
          {' only comes with one theme right now – '}
          <code>studioTheme</code>
          {' – which is built for use in Sanity products.'}
        </PlainParagraph>
      </Callout>

      <CodeBlock
        language="tsx"
        code={`import {
  Card,
  Heading,
  ThemeProvider
} from '@sanity/ui'
import { buildTheme } from '@sanity/ui/theme'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

const theme = buildTheme()

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Card padding={4}>
        <Heading>Welcome to Sanity UI</Heading>
      </Card>
    </ThemeProvider>
  )
}
`}
      />

      <Paragraph>
        {'Try out the various components in '}
        <a href="https://www.sanity.io/ui/arcade" target="_blank" rel="noindex nofollow">
          the JSX playground
        </a>
        {' or '}
        <a
          href="https://www.sanity.io/guides/your-first-input-component-for-sanity-studio-v3"
          target="_blank"
          rel="noindex nofollow"
        >
          learn how to create an input component in Sanity Studio
        </a>
        .
      </Paragraph>
    </Article>
  )
}
