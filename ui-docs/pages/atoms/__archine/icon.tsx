import icons, {IconSymbol} from '@sanity/icons'
import {Card, Code, Icon, Heading, Stack} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '~/components'

const ICON_SYMBOLS = Object.keys(icons) as IconSymbol[]

function IconPage() {
  return (
    <>
      <Head>
        <title>Icon – Sanity UI</title>
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            Icon
          </Heading>

          <Stack>
            {ICON_SYMBOLS.map((symbol) => (
              <Card key={symbol} padding={[3, 3, 4, 5]} shadow={1}>
                <Code size={[2, 2, 3, 4]}>
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
