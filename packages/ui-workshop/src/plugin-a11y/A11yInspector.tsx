import {Box, Card, Code, Stack, Text} from '@sanity/ui'
import type {CardTone} from '@sanity/ui/tokens'
import axe from 'axe-core'

import {useA11y} from './useA11y'

/** @internal */
export function A11yInspector() {
  const {results} = useA11y()

  return (
    <Box padding={3}>
      {results && (
        <>
          <Stack gap={3}>
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
}

/** @internal */
function ResultItem(props: {result: axe.Result; tone?: CardTone}) {
  const {result, tone} = props

  return (
    <Card overflow="hidden" radius={2} shadow={1} tone={tone}>
      <Stack gap={3} padding={3} shadow={1}>
        <Text size={1} weight="semibold">
          {result.help}
          {result.impact && <> ({result.impact})</>}
        </Text>
        <Text muted size={1}>
          {result.description}
        </Text>
        <Text size={1}>
          <a href={result.helpUrl} rel="noreferrer" target="_blank">
            Help URL &rarr;
          </a>
        </Text>
      </Stack>

      <Stack gap={2} padding={3}>
        {result.nodes.map((node, nodeIndex) => {
          return (
            <Stack key={nodeIndex} gap={3}>
              {node.failureSummary && <Text size={1}>{node.failureSummary}</Text>}
              {/* <Card overflow="auto" padding={3} radius={2} shadow={1}> */}
              <Code language="html" size={1}>
                {node.html}
              </Code>
              {/* </Card> */}
            </Stack>
          )
        })}
      </Stack>
    </Card>
  )
}
