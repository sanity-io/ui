import {AppLayout, CodeBlock} from '~/components'
import {color} from '@sanity/color'
import {Button, Card, Heading, Layer, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import {rgba} from 'polished'
import React, {useState} from 'react'
import styled from 'styled-components'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${rgba(color.gray[500].hex, 0.25)};
  display: flex;
  align-items: center;
  justify-content: center;
`

function LayerPage() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Layer – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Layer
          </Heading>

          <Text size={[2, 2, 3, 4]}>
            The <code>Layer</code> component is a utility for rendering DOM nodes on top of each
            other. Each layer are dynamically assigned a `z-index` value.
          </Text>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Button onClick={() => setOpen(true)} padding={[3, 3, 4]} size={[2, 2, 3, 4]}>
              Open layer
            </Button>
            {open && (
              <Layer>
                <Backdrop>
                  <Card padding={[3, 3, 4, 5]} radius={3} shadow={5}>
                    <Button onClick={() => setOpen(false)} padding={[3, 3, 4]} size={[2, 2, 3, 4]}>
                      Close layer
                    </Button>
                  </Card>
                </Backdrop>
              </Layer>
            )}
          </Card>

          <CodeBlock>{`<Button onClick={() => setOpen(true)}>
  Open layer
</Button>
{open && (
  <Layer>
    <Backdrop>
      <Card padding={3} radius={3} shadow={5}>
        <Button onClick={() => setOpen(false)}>
          Close layer
        </Button>
      </Card>
    </Backdrop>
  </Layer>
)}`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default LayerPage
