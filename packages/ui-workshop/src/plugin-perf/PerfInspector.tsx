import {PlayIcon, TrashIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {memo} from 'react'
import {usePerf} from './hooks'

/** @internal */
export const PerfInspector = memo(function PerfInspector(): React.ReactElement {
  const {clearResults, results, runTest, testDetails} = usePerf()

  if (testDetails.length === 0) {
    return (
      <Box padding={2}>
        <Box padding={2}>
          <Text muted size={1}>
            No tests
          </Text>
        </Box>
      </Box>
    )
  }

  return (
    <Stack padding={2} space={2}>
      {testDetails.map((detail) => {
        const testResults = results.filter((r) => r.name === detail.name)

        return (
          <Card border key={detail.name} overflow="hidden" radius={2} style={{lineHeight: 0}}>
            <Flex>
              <Stack flex={1} padding={2} space={2}>
                <Text size={1} weight="semibold">
                  {detail.title || detail.name}
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
                  fontSize={1}
                  icon={TrashIcon}
                  mode="bleed"
                  onClick={() => clearResults(detail.name)}
                  padding={1}
                />
              </Flex>
            </Flex>

            <Stack>
              {testResults.map((result, resultIndex) => (
                <Card borderTop key={resultIndex}>
                  <Stack>
                    {result.renders.map((r, rIdx) => {
                      return <Card key={rIdx}>{r.phase}</Card>
                    })}
                  </Stack>

                  <Flex padding={2}>
                    <Box flex={1}>
                      <Text muted size={1}>
                        {result.timing?.runs} runs
                      </Text>
                    </Box>

                    <Box>
                      <Text size={1}>Avg. {result.timing?.avgDuration.toFixed(3)}ms</Text>
                    </Box>
                  </Flex>
                </Card>
              ))}

              <Card borderTop>
                <Stack>
                  <Button
                    aria-label="Run"
                    fontSize={1}
                    icon={PlayIcon}
                    mode="bleed"
                    onClick={() => runTest(detail.name)}
                    padding={2}
                    radius={0}
                  />
                </Stack>
              </Card>
            </Stack>
          </Card>
        )
      })}
    </Stack>
  )
})
