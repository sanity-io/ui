import {
  Box,
  Button,
  Card,
  CardProvider,
  Code,
  Flex,
  Heading,
  Stack,
  Text,
  useClickOutside,
} from '@sanity/ui'
import Head from 'next/head'
import React, {useCallback, useState} from 'react'
import {AppLayout} from '~/components'

function UseClickOutsidePage() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null)
  const [log, setLog] = useState<string[]>([])

  const logPush = useCallback((msg: string) => setLog((val) => [msg].concat(val)), [])

  useClickOutside(() => logPush('outside'), [buttonElement], boundaryElement)

  return (
    <>
      <Head>
        <title>useClickOutside – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            useClickOutside
          </Heading>

          <Text size={[2, 2, 3, 4]}>
            The <code>useClickOutside</code> is React hook for handling click events outside of
            elements.
          </Text>

          <Stack space={1}>
            <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent" ref={setBoundaryElement}>
              <Flex>
                <Box flex={1}>
                  <Button onClick={() => logPush('inside')} ref={setButtonElement}>
                    Click inside
                  </Button>
                </Box>
                <Box padding={3}>
                  <Text>Click outside</Text>
                </Box>
              </Flex>
            </Card>

            <CardProvider scheme="dark">
              <Card padding={[3, 3, 4, 5]} radius={2} style={{height: 100, overflow: 'auto'}}>
                <Code>{log.join('\n')}</Code>
              </Card>
            </CardProvider>
          </Stack>
        </Stack>
      </AppLayout>
    </>
  )
}

export default UseClickOutsidePage
