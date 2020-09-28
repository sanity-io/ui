import {AppLayout} from '~/components'
import icons, {IconSymbol} from '@sanity/icons'
import {Card, Code, Icon, Heading, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

const ICON_SYMBOLS = Object.keys(icons) as IconSymbol[]

function IconPage() {
  return (
    <>
      <Head>
        <title>Icon – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 5, 6]}>
          <Heading as="h1" size={3}>
            Icon
          </Heading>

          <Stack>
            {ICON_SYMBOLS.map((symbol) => (
              <Card key={symbol} padding={[3, 4]} shadow={1}>
                <Code>
                  <Icon symbol={symbol} />
                  &nbsp;&nbsp;{symbol}
                </Code>
              </Card>
            ))}
          </Stack>
        </Stack>
      </AppLayout>
    </>
  )
}

export default IconPage
