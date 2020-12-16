import Head from 'next/head'
import React from 'react'
import {AppLayout, useApp} from '$components'
import {Screen} from '$components/screen'
import {PREVIEW} from '$features'
import {loadPageData} from '$lib/page'
import {isRecord} from '$lib/types'

export async function getStaticProps(opts: {preview?: boolean}) {
  const {preview = PREVIEW} = opts
  const data = await loadPageData({preview})

  return {props: {...data, preview}}
}

function IndexPage() {
  const {target} = useApp()

  return (
    <>
      <Head>
        <title>Sanity UI</title>
      </Head>

      <AppLayout>
        {isRecord(target) && target._type === 'screen' && <Screen target={target} />}
      </AppLayout>
    </>
  )
}

export default IndexPage
