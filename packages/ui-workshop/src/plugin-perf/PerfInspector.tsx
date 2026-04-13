import {PlayIcon, TrashIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'

import {usePerfInspector} from './hooks/usePerf'

/** @internal */
export function PerfInspector() {
  const {clearResults, results, runTest, testDetails} = usePerfInspector()

  if (testDetails.length === 0) {
    return (
      <Box paddingX={4} paddingY={5}>
        <Text muted size={[2, 2, 1]}>
          No tests
        </Text>
      </Box>
    )
  }

  return (
    <Stack gap={2} padding={3}>
      {testDetails.map((detail) => {
        const testResults = results.filter((r) => r.name === detail.name)
        const hasRunningTest = testResults.some((r) => r.running === true)

        return (
          <Card key={detail.name} overflow="hidden" radius={3} shadow={1}>
            <Flex>
              <Stack flex={1} gap={2} padding={2}>
                <Text size={1} weight="semibold">
                  {detail.title ?? detail.name}
                </Text>
                {detail.description && (
                  <Text muted size={1}>
                    {detail.description}
                  </Text>
                )}
              </Stack>
              <Flex align="flex-start" gap={1} padding={1}>
                <Button
                  aria-label="Clear results"
                  disabled={hasRunningTest}
                  fontSize={1}
                  icon={TrashIcon}
                  mode="bleed"
                  padding={1}
                  onClick={() => clearResults(detail.name)}
                />
              </Flex>
            </Flex>

            <Stack>
              {testResults.map((result, resultIndex) => (
                <Card key={resultIndex} borderTop="muted" borderWidth={1}>
                  <Flex padding={2}>
                    <Box flex={1}>
                      <Text muted size={1}>
                        {result.running
                          ? 'Running...'
                          : result.error
                            ? `Failed: ${result.error}`
                            : `${result.timing?.runs} runs`}
                      </Text>
                    </Box>

                    <Box>
                      {result.timing && (
                        <Text size={1}>Avg. {result.timing.avgDuration.toFixed(3)}ms</Text>
                      )}
                    </Box>
                  </Flex>
                </Card>
              ))}

              <Card borderTop="muted" borderWidth={1}>
                <Stack>
                  <Button
                    aria-label="Run"
                    disabled={hasRunningTest}
                    fontSize={1}
                    icon={PlayIcon}
                    mode="bleed"
                    padding={2}
                    radius={0}
                    onClick={() => runTest(detail.name)}
                  />
                </Stack>
              </Card>
            </Stack>
          </Card>
        )
      })}
    </Stack>
  )
}
