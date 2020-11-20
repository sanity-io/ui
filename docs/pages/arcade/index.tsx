import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'
import {AppLayout} from '$components'

const ArcadeApp = dynamic(import('$components/arcade/app'), {ssr: false})

function ArcadePage() {
  return (
    <>
      <Head>
        <title>Arcade – Sanity Design</title>
      </Head>

      <AppLayout>
        <ArcadeApp />
      </AppLayout>
    </>
  )
}

export default ArcadePage
