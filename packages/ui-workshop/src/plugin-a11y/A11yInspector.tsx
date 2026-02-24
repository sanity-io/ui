import {Box, Card, Code, Stack, Text} from '@sanity/ui'
import type {CardTone} from '@sanity/ui/theme'
import axe from 'axe-core'

import {useA11y} from './useA11y'

/** @internal */
export function A11yInspector() {
  const {results} = useA11y()

  return (
    <Box padding={2}>
      {results && (
        <>
          <Stack gap={2}>
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
    <Card radius={3} shadow={1} tone={tone}>
      <Stack gap={3} paddingX={2} paddingY={3}>
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

      <Stack gap={2} padding={2}>
        {result.nodes.map((node, nodeIndex) => {
          return (
            <Stack key={nodeIndex} gap={2}>
              {node.failureSummary && <Text size={1}>{node.failureSummary}</Text>}
              <Card overflow="auto" padding={2} radius={2} shadow={1}>
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
}
