import {AppLayout, CodeBlock} from '~/components'
import {Button, Card, Popover, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React, {useState} from 'react'

function PopoverPage() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Popover – Sanity UI</title>
      </Head>

      <AppLayout>
        <h1>Popover</h1>

        <Stack space={4}>
          <Card padding={3} radius={2} tone="transparent" style={{textAlign: 'center'}}>
            <Popover content={<Text>Hello, world</Text>} padding={4} open={open}>
              <Button onClick={() => setOpen(!open)}>Toggle popover</Button>
            </Popover>
          </Card>

          <CodeBlock>{`<Popover
  content={<Text>Hello, world</Text>}
  padding={4}
  open={open}
>
  <Button
    onClick={() => setOpen(!open)}
  >Toggle popover</Button>
</Popover>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default PopoverPage
