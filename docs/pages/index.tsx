import {Button} from '@sanity/ui'
import Head from 'next/head'
import React from 'react'

function IndexPage() {
  return (
    <>
      <Head>
        <title>Sanity Design – Sanity.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Sanity Design</h1>

        <div>
          <h2>Button example</h2>

          <Button tone="brand">Test</Button>

          <pre>
            <code>{`import {Button} from '@sanity/ui'

<Button tone="brand">Test</Button>`}</code>
          </pre>
        </div>
      </main>

      <footer>
        <hr />
        Sanity &copy; 2017–2020
      </footer>
    </>
  )
}

export default IndexPage
