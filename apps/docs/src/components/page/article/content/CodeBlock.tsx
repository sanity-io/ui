import {Card} from '@sanity/ui'
import {Code} from '@sanity/ui/code'
import {ReactElement} from 'react'

export function CodeBlock(props: {code: string; language?: string}): ReactElement {
  const {code, language} = props

  return (
    <Card marginY={5} overflow="auto" padding={3} radius={2} shadow={1}>
      <Code language={language} size={1}>
        {code}
      </Code>
    </Card>
  )
}
