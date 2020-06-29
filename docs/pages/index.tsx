import {Box, Button} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function IndexPage() {
  return (
    <>
      <Head>
        <title>Sanity Design – Sanity.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="header" padding={4} style={{borderBottom: '1px solid #ccc'}}>
        <div>Sanity Design</div>
      </Box>

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
        Sanity &copy; 2017–2020
      </Box>
    </>
  )
}

export default IndexPage
