import {Box, Button, Card, Dialog, Heading, Inline, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React, {useState} from 'react'
import {AppLayout} from '~/components'

function DialogPage() {
  return (
    <>
      <Head>
        <title>Dialog – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Dialog
          </Heading>

          <DialogExample />
        </Stack>
      </AppLayout>
    </>
  )
}

export default DialogPage

function DialogExample() {
  const [open, setOpen] = useState(false)

  return (
    <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
      <Button onClick={() => setOpen(true)} text="Open dialog" />
      {open && (
        <Dialog
          footer={
            <Box padding={2}>
              <Inline space={2} style={{textAlign: 'right'}}>
                <Button mode="bleed" onClick={() => setOpen(false)} text="Cancel" />
                <Button icon="checkmark" onClick={() => setOpen(false)} tone="brand" text="OK" />
              </Inline>
            </Box>
          }
          header="Dialog example"
          id="dialog1"
          onClose={() => setOpen(false)}
        >
          <Box padding={4}>
            <Text>Dialog</Text>
          </Box>
        </Dialog>
      )}
    </Card>
  )
}
