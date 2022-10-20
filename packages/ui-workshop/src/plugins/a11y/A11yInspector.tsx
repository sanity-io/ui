import {Box, Card, CardTone, Code, Stack, Text} from '@sanity/ui'
import axe from 'axe-core'
import {memo} from 'react'
import {useA11y} from './useA11y'

/** @internal */
export const A11yInspector = memo(function A11yInspector(): React.ReactElement {
  const {results} = useA11y()

  return (
    <Box padding={2}>
      {results && (
        <>
          <Stack space={2}>
            {results.violations.map((violation) => (
              <ResultItem key={violation.id} result={violation} tone="critical" />
            ))}

            {results.passes.map((violation) => (
              <ResultItem key={violation.id} result={violation} tone="positive" />
            ))}
          </Stack>
        </>
      )}
    </Box>
  )
})

/** @internal */
const ResultItem = memo(function ResultItem(props: {result: axe.Result; tone?: CardTone}) {
  const {result, tone} = props

  return (
    <Card border radius={2} tone={tone}>
      <Stack paddingX={2} paddingY={3} space={3}>
        <Text size={1} weight="semibold">
          {result.help}
          {result.impact && <> ({result.impact})</>}
        </Text>
        <Text muted size={1}>
          {result.description}
        </Text>
        <Text size={1}>
          <a href={result.helpUrl} target="_blank" rel="noreferrer">
            Help URL &rarr;
          </a>
        </Text>
      </Stack>
      <Card borderTop tone="inherit" />
      <Stack padding={2} space={2}>
        {result.nodes.map((node, nodeIndex) => {
          return (
            <Stack key={nodeIndex} space={2}>
              {node.failureSummary && <Text size={1}>{node.failureSummary}</Text>}
              <Card border overflow="auto" padding={2} radius={2} tone="inherit">
                <Code language="html" size={0}>
                  {node.html}
                </Code>
              </Card>
            </Stack>
          )
        })}
      </Stack>
    </Card>
  )
})
