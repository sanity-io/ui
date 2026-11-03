import {Code} from '@sanity/ui'

// `language` is a Refractor language name; it enables syntax highlighting.
export function Snippet() {
  return (
    <Code language="javascript" size={2}>
      {`const client = createClient({projectId: 'abc', dataset: 'production'})`}
    </Code>
  )
}
