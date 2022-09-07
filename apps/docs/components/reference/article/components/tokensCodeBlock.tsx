import {Card, Code, Label, Stack} from '@sanity/ui'
import {useMemo} from 'react'
import {prettify} from '../helpers'

export function TokensCodeBlock(props: any) {
  const {data, label, prefix} = props
  const code = useMemo(
    () => prettify((prefix || '') + data.map((t: any) => t.text).join('')),
    [data, prefix]
  )

  return (
    <Stack marginY={[4, 4, 5]} space={3}>
      {label && <Label>{label}</Label>}

      <Card overflow="auto" padding={4} radius={2} shadow={1}>
        <Code language="typescript">{code}</Code>
      </Card>
    </Stack>
  )
}
