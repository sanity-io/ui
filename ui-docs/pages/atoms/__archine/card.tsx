import {Button, Card, Heading, Stack, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '~/components'

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
                <Button padding={[2, 2, 3, 4]} size={[2, 2, 3, 4]} text="Label" />

                <Card padding={[3, 3, 4, 5]} tone="transparent">
                  <Stack space={[3, 3, 4, 5]}>
                    <Text size={[2, 2, 3, 4]}>
                      Text with <a href="#">link</a>
                    </Text>
                    <Button padding={[2, 2, 3, 4]} size={[2, 2, 3, 4]} text="Label" />

                    <Card padding={[3, 3, 4, 5]}>
                      <Stack space={[3, 3, 4, 5]}>
                        <Text size={[2, 2, 3, 4]}>
                          Text with <a href="#">link</a>
                        </Text>
                        <Button padding={[2, 2, 3, 4]} size={[2, 2, 3, 4]} text="Label" />
                      </Stack>
                    </Card>
                  </Stack>
                </Card>
              </Stack>
            </Card>
          </Card>
        </Stack>
      </AppLayout>
    </>
  )
}

export default CardPage
