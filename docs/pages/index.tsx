import {AppHeader} from '~/components'
import {Box, Button, Text} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function IndexPage() {
  return (
    <>
      <Head>
        <title>Sanity UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />

      <Box as="main" padding={4}>
        <h1>Sanity UI documention</h1>

        <div>
          <h2>Button example</h2>

          <Button tone="brand">Test</Button>

          <pre>
            <code>{`import {Button} from '@sanity/ui'

<Button tone="brand">Test</Button>`}</code>
          </pre>
        </div>
      </Box>

      <Box as="footer" padding={4} style={{borderTop: '1px solid #ccc'}}>
        <Text size={1}>Sanity &copy; 2017–2020</Text>
      </Box>
    </>
  )
}

export default IndexPage
