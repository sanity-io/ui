import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'Toast | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Toast',
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
      title="Toast"
      isComponent
      headings={[
        {level: 2, slug: 'toast-provider', text: 'ToastProvider'},
        {level: 2, slug: 'use-toast', text: 'useToast'},
      ]}
    >
      <Paragraph>
        {'The '}
        <code>{'<Toast />'}</code>
        {' component gives feedback to users when an action has taken place.'}
      </Paragraph>

      <Paragraph>
        Toasts can be closed with a close button, or auto-dismiss after a certain timeout (defaults
        to 5 seconds).
      </Paragraph>

      <CodeExampleBlock
        title="ToastProvider example"
        description="A basic example of using the ToastProvider component in Sanity UI."
        code={`<Card padding={4} style={{textAlign: 'center'}}>
<Button
  onClick={() => 
    toast.push({
      status: 'success',
      title: 'You triggered this toast!'
    })
  }
  text="Push toast now" 
/>
</Card>`}
        hookCode={`const toast = useToast()`}
      />

      <Heading2 id="toast-provider">
        <code>ToastProvider</code>
      </Heading2>

      <Paragraph>
        {'In order to use toasts, you need to wrap your application in the '}
        <code>{'<ToastProvider />'}</code>:
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {ToastProvider} from '@sanity/ui'

export function App () {
  return <ToastProvider>[...]</ToastProvider>
}`}
      />

      <Heading2 id="use-toast">
        <code>useToast</code>
      </Heading2>

      <Paragraph>
        {'When a component is wrapped in the '}
        <code>{'<ToastProvider />'}</code>, the hook to push toasts to the stack of toasts is
        available:
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`import {Button, useToast} from '@sanity/ui'

function Section () {
  const toast = useToast()
  
  return (
    <Button
      icon="rocket"
      onClick={
        () => toast.push({
          title: 'An important message'
        })
      }
    />
  )
}`}
      />
    </Article>
  )
}
