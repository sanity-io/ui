import {COLOR_HUES, COLOR_TINTS, hues} from '@sanity/color'
import {Box, Button, Code, Flex, Heading, Stack, Text, useToast} from '@sanity/ui'
import {readableColor} from 'polished'
import React from 'react'
import styled from 'styled-components'
import {AppLayout} from '$components'
import {ResourcesPageLayout} from '$components/_resourcesPage/layout'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2em 1.25em;
`

function ColorsPage() {
  const toast = useToast()

  return (
    <AppLayout>
      <ResourcesPageLayout>
        <Box as="main" padding={[4, 5, 6, 7]}>
          <Stack space={[4, 4, 5, 6]}>
            <Heading as="h1" size={[2, 2, 3, 4]}>
              Colors
            </Heading>

            <Heading as="h2" size={[1, 1, 2, 3]}>
              Hues
            </Heading>

            <Grid>
              {COLOR_HUES.map((hueKey) => (
                <Stack key={hueKey} space={3}>
                  <Heading as="h2" size={[0, 0, 1, 2]}>
                    {hueKey}
                  </Heading>

                  <Box>
                    {COLOR_TINTS.map((tintKey) => {
                      const tint = hues[hueKey][tintKey]

                      return (
                        <Flex align="center" key={tintKey}>
                          <Box
                            flex={1}
                            padding={3}
                            style={{backgroundColor: tint.hex, color: readableColor(tint.hex)}}
                          >
                            <Flex justify="space-between">
                              <Text size={1} weight="semibold">
                                {tint.title}
                              </Text>
                              <Code size={1}>{tint.hex}</Code>
                            </Flex>
                          </Box>
                          <Box paddingLeft={1}>
                            <Button
                              icon="clipboard"
                              mode="bleed"
                              onClick={() => {
                                navigator.clipboard.writeText(tint.hex)
                                toast.push({
                                  title: (
                                    <>
                                      Copied <em>{tint.title}</em> to clipboard
                                    </>
                                  ),
                                  status: 'info',
                                })
                              }}
                              padding={2}
                              size={1}
                              title="Copy hex value"
                            />
                          </Box>
                        </Flex>
                      )
                    })}
                  </Box>
                </Stack>
              ))}
            </Grid>
          </Stack>
        </Box>
      </ResourcesPageLayout>
    </AppLayout>
  )
}

export default ColorsPage
