import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {Callout} from '@/components/page/article/content/Callout'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'useClickOutside | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'useClickOutside',
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
      title="useClickOutside"
      isHook
      headings={[
        {level: 2, slug: 'basic-example', text: 'Basic example'},
        {level: 2, slug: 'type', text: 'Type'},
      ]}
    >
      <Callout icon="warning-outline" tone="caution">
        <PlainParagraph>
          <strong>Deprecated</strong>
          {': '}
          <code>useClickOutside</code>
          {' has been replaced by the '}
          <code>
            <a
              href="https://www.sanity.io/ui/docs/hook/use-click-outside-event"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              useClickOutsideEvent
            </a>
          </code>
          {' hook, which takes element refs instead of element state.'}
        </PlainParagraph>
      </Callout>

      <Paragraph>
        {'The '}
        <code>useClickOutside()</code>
        {' is React hook for handling click events outside of elements.'}
      </Paragraph>

      <Heading2 id="basic-example">Basic example</Heading2>

      <CodeBlock
        language="tsx"
        code={`import {useClickOutside} from '@sanity/ui'

function MyButton () {
  const [buttonElement, setButtonElement] = useState(null)
  
  const handleClickOutside = useCallback(() => {
    console.log('outside')
  }, [])

  useClickOutside(handleClickOutside, [buttonElement])
  
  return <Button ref={setButtonElement} text="Label" />
}`}
      />

      <Heading2 id="type">Type</Heading2>

      <CodeBlock
        language="typescript"
        code={`(
  callback: () => void;
  elements: HTMLElement[];
  boundaryElement?: HTMLElement;
) => (el: HTMLElement | null) => void`}
      />
    </Article>
  )
}
