import {AppLayout, CodeBlock} from '~/components'
import {Button, Card, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function CardPage() {
  return (
    <>
      <Head>
        <title>Card – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Card
          </Heading>

          <Card padding={[3, 3, 4, 5]} radius={2} tone="transparent">
            <Card padding={[3, 3, 4, 5]}>
              <Stack space={[3, 3, 4, 5]}>
                <Text size={[2, 2, 3, 4]}>
                  Text with <a href="#">link</a>
                </Text>
                <Button padding={[2, 2, 3, 4]} size={[2, 2, 3, 4]}>
                  Button
                </Button>
                <Card padding={[3, 3, 4, 5]} tone="transparent">
                  <Stack space={[3, 3, 4, 5]}>
                    <Text size={[2, 2, 3, 4]}>
                      Text with <a href="#">link</a>
                    </Text>
                    <Button padding={[2, 2, 3, 4]} size={[2, 2, 3, 4]}>
                      Button
                    </Button>
                    <Card padding={[3, 3, 4, 5]} tone="contrast">
                      <Stack space={[3, 3, 4, 5]}>
                        <Text size={[2, 2, 3, 4]}>
                          Text with <a href="#">link</a>
                        </Text>
                        <Button padding={[2, 2, 3, 4]} size={[2, 2, 3, 4]}>
                          Button
                        </Button>
                        <Card padding={[3, 3, 4, 5]}>
                          <Stack space={[3, 3, 4, 5]}>
                            <Text size={[2, 2, 3, 4]}>
                              Text with <a href="#">link</a>
                            </Text>
                            <Button padding={[2, 2, 3, 4]} size={[2, 2, 3, 4]}>
                              Button
                            </Button>
                          </Stack>
                        </Card>
                      </Stack>
                    </Card>
                  </Stack>
                </Card>
              </Stack>
            </Card>
          </Card>

          <CodeBlock>{`<Card padding={[3, 3, 4, 5]}>
  <Stack space={[3, 3, 4, 5]}>
    <Text size={[2, 2, 3, 4]}>
      Text with <a href="#">link</a>
    </Text>
    <Button>Button</Button>
    <Card padding={[3, 3, 4, 5]} tone="transparent">
      <Stack space={[3, 3, 4, 5]}>
        <Text size={[2, 2, 3, 4]}>
          Text with <a href="#">link</a>
        </Text>
        <Button>Button</Button>
        <Card padding={[3, 3, 4, 5]} tone="contrast">
          <Stack space={[3, 3, 4, 5]}>
            <Text size={[2, 2, 3, 4]}>
              Text with <a href="#">link</a>
            </Text>
            <Button>Button</Button>
            <Card padding={[3, 3, 4, 5]}>
              <Stack space={[3, 3, 4, 5]}>
                <Text size={[2, 2, 3, 4]}>
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
</Card>`}</CodeBlock>
        </Stack>
      </AppLayout>
    </>
  )
}

export default CardPage
