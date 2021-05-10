import {ErrorFilledIcon, ToggleArrowRightIcon, WarningFilledIcon} from '@sanity/icons'
import {Box, Card, Code, Flex, Layer, Stack, Tab, TabList, TabPanel, Text} from '@sanity/ui'
import {AxeResults} from 'axe-core'
import React, {useState} from 'react'
import {TreeCard} from '../components/treeCard'
import {Knob} from '../knobs'
import {useScope} from '../useScope'

export function WorkshopStoryKnobs(props: {axeResults: AxeResults | null}) {
  const {axeResults} = props
  const scope = useScope()
  const [tab, setTab] = useState<'knobs' | 'axe-results'>('knobs')

  return (
    <Card borderLeft flex={1} overflow="auto" style={{minWidth: 180, maxWidth: 300}}>
      <Layer style={{position: 'sticky', top: 0}}>
        <Card paddingX={3} paddingY={2} shadow={1}>
          <TabList space={1}>
            <Tab
              aria-controls="knobs-panel"
              fontSize={1}
              id="knobs-tabe"
              label="Knobs"
              onClick={() => setTab('knobs')}
              selected={tab === 'knobs'}
            />
            <Tab
              aria-controls="axe-results-panel"
              fontSize={1}
              id="axe-results-tab"
              label={(<>Axe results ({axeResults?.violations.length || 0})</>) as any}
              onClick={() => setTab('axe-results')}
              selected={tab === 'axe-results'}
            />
          </TabList>
        </Card>
      </Layer>

      <TabPanel aria-labelledby="knobs-tab" hidden={tab !== 'knobs'} id="knobs-panel" padding={2}>
        {scope.knobs.map((knob, knobIndex) => (
          <Knob key={knobIndex} schema={knob.schema} value={knob.value} />
        ))}
      </TabPanel>

      <TabPanel
        aria-labelledby="axe-results-tab"
        hidden={tab !== 'axe-results'}
        id="axe-results-panel"
      >
        {axeResults && (
          <Card padding={3}>
            <TreeCard $level={1} forwardedAs="button" padding={2} radius={2}>
              <Flex>
                <Box marginRight={1}>
                  <Text size={1}>
                    <ToggleArrowRightIcon />
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text size={1} weight="bold">
                    Violations
                  </Text>
                </Box>
              </Flex>
            </TreeCard>

            <Stack marginTop={1} space={1}>
              {axeResults.violations.map((violation) => {
                return (
                  <Card key={violation.id} padding={4} radius={2} tone="critical">
                    <Flex>
                      <Box marginRight={4}>
                        <Text size={1}>
                          <ErrorFilledIcon />
                        </Text>
                      </Box>
                      <Box>
                        <Text size={1}>{violation.description}</Text>
                      </Box>
                    </Flex>
                    <Card marginTop={4} overflow="auto" padding={2} tone="inherit" shadow={1}>
                      <Code size={0}>{JSON.stringify(violation.nodes, null, 2)}</Code>
                    </Card>
                  </Card>
                )
              })}
            </Stack>

            <TreeCard $level={1} forwardedAs="button" marginTop={1} padding={2} radius={2}>
              <Flex>
                <Box marginRight={1}>
                  <Text size={1}>
                    <ToggleArrowRightIcon />
                  </Text>
                </Box>
                <Box flex={1}>
                  <Text size={1} weight="bold">
                    Incomplete
                  </Text>
                </Box>
              </Flex>
            </TreeCard>

            <Stack marginTop={1} space={1}>
              {axeResults.incomplete.map((incomplete) => {
                return (
                  <Card key={incomplete.id} padding={4} radius={2} tone="caution">
                    <Flex>
                      <Box marginRight={4}>
                        <Text size={1}>
                          <WarningFilledIcon />
                        </Text>
                      </Box>
                      <Box>
                        <Text size={1}>{incomplete.description}</Text>
                      </Box>
                    </Flex>
                    <Card marginTop={4} overflow="auto" padding={2} tone="inherit" shadow={1}>
                      <Code size={0}>{JSON.stringify(incomplete.nodes, null, 2)}</Code>
                    </Card>
                  </Card>
                )
              })}
            </Stack>

            <Code hidden language="json" size={1}>
              {JSON.stringify(axeResults, null, 2)}
            </Code>
          </Card>
        )}
      </TabPanel>
    </Card>
  )
}
