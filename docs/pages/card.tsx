import {AppLayout, CodeBlock} from '~/components'
import {Button, Card, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function CardPage() {
  return (
    <>
      <Head>
        <title>Card – Sanity UI</title>
      </Head>

      <AppLayout>
        <h1>Card</h1>

        <Stack space={4}>
          <Card padding={3} radius={2} tone="transparent">
            <Card padding={4}>
              <Stack space={3}>
                <Text>
                  Text with <a href="#">link</a>
                </Text>
                <Button>Button</Button>
                <Card padding={3} tone="transparent">
                  <Stack space={3}>
                    <Text>
                      Text with <a href="#">link</a>
                    </Text>
                    <Button>Button</Button>
                    <Card padding={3} tone="contrast">
                      <Stack space={3}>
                        <Text>
                          Text with <a href="#">link</a>
                        </Text>
                        <Button>Button</Button>
                        <Card padding={3}>
                          <Stack space={3}>
                            <Text>
                              Text with <a href="#">link</a>
                            </Text>
                            <Button>Button</Button>
                          </Stack>
                        </Card>
                      </Stack>
                    </Card>
                  </Stack>
                </Card>
              </Stack>
            </Card>
          </Card>

          <CodeBlock>{`<Card padding={4}>
  <Stack space={3}>
    <Text>Text</Text>
    <Button>Button</Button>
    <Card padding={3} tone="transparent">
      <Stack space={3}>
        <Text>Text</Text>
        <Button>Button</Button>
        <Card padding={3} tone="contrast">
          <Stack space={3}>
            <Text>Text</Text>
            <Button>Button</Button>
            <Card padding={3}>
              <Stack space={3}>
                <Text>Text</Text>
                <Button>Button</Button>
              </Stack>
            </Card>
          </Stack>
        </Card>
      </Stack>
    </Card>
  </Stack>
</Card>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default CardPage
