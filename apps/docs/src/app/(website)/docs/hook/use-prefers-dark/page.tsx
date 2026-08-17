import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'usePrefersDark | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'usePrefersDark',
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
    <Article
      title="usePrefersDark"
      isHook
      headings={[{level: 2, slug: 'signature', text: 'Signature'}]}
    >
      <Paragraph>
        {'Subscribes to '}
        <code>@media (prefers-color-scheme: dark)</code>
        {' to find out if the device is in dark mode or not at any given time.'}
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {
  Card,
  studioTheme,
  ThemeProvider,
  usePrefersDark
} from '@sanity/ui'
import React from 'react'

function App () {
  // This value will change when the system switches
  // between dark and light scheme.
  const prefersDark = usePrefersDark()
  
  // The theme system supports either "dark" or "light"
  const scheme = prefersDark ? 'dark' : 'light'

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      <Card>...</Card>
    </ThemeProvider>
  )
}`}
      />

      <Heading2 id="signature">Signature</Heading2>

      <CodeBlock language="tsx" code={`(getServerSnapshot = () => false) => boolean`} />
    </Article>
  )
}
