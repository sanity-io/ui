import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'useGlobalKeyDown | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'useGlobalKeyDown',
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
    <Article title="useGlobalKeyDown" isHook headings={[{level: 2, slug: 'type', text: 'Type'}]}>
      <Paragraph>A utility to quickly setup hotkeys and such.</Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {useGlobalKeyDown} from '@sanity/ui'
import isHotkey from 'is-hotkey'
import React, {useCallback} from 'react'

const isSaveHotkey = isHotkey('mod+s')

function App () {
  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isSaveHotkey(event)) {
        event.preventDefault()
        // Sanity autosaves your work!
      }
    },
    []
  )
  
  useGlobalKeyDown(handleGlobalKeyDown)
  
  return <>...</>
}`}
      />

      <Heading2 id="type">Type</Heading2>

      <CodeBlock
        language="tsx"
        code={`(
  callback: (event: KeyboardEvent) => void;
) => void`}
      />
    </Article>
  )
}
