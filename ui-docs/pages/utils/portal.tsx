import {AppLayout, CodeBlock} from '~/components'
import {color} from '@sanity/color'
import {Button, Card, Heading, Portal, Stack, Text} from '@sanity/ui'
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

function PortalPage() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Portal – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Portal
          </Heading>

          <Text size={[2, 2, 3, 4]}>
            The <code>Portal</code> component is a utility for rendering DOM nodes outside of the
            application root element.
          </Text>

          <CodeBlock>{`<html>
  <div id="root">app</div>
  <div id="portals">render portals here</div>
</html>`}</CodeBlock>

          <Text size={[2, 2, 3, 4]}>
            This is useful for rendering modals, dialogs, popovers, and other components that need
            to break out of the application – either visually or interactively.
          </Text>

          <Heading as="h2" size={[1, 1, 2, 3]}>
            Example
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Button onClick={() => setOpen(true)} padding={[3, 3, 4]} size={[2, 2, 3, 4]}>
              Open portal
            </Button>
            {open && (
              <Portal>
                <Backdrop>
                  <Card padding={[3, 3, 4, 5]} radius={3} shadow={5}>
                    <Button onClick={() => setOpen(false)} padding={[3, 3, 4]} size={[2, 2, 3, 4]}>
                      Close portal
                    </Button>
                  </Card>
                </Backdrop>
              </Portal>
            )}
          </Card>

          <CodeBlock>{`<Button
  onClick={() => setOpen(true)}
  padding={[3, 3, 4]}
  size={[2, 2, 3, 4]}
>
  Open portal
</Button>
{open && (
  <Portal>
    <Backdrop>
      <Card padding={[3, 3, 4, 5]} radius={3} shadow={5}>
        <Button
          onClick={() => setOpen(false)}
          padding={[3, 3, 4]}
          size={[2, 2, 3, 4]}
        >
          Close portal
        </Button>
      </Card>
    </Backdrop>
  </Portal>
)}`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default PortalPage
