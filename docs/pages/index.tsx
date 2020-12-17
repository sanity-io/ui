import Head from 'next/head'
import React from 'react'
import {AppLayout, SEO, useApp} from '$components'
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
  const seo: Record<string, any> | null = isRecord(target) ? (target.seo as any) : null

  return (
    <>
      <Head>
        <title>Sanity UI</title>
      </Head>

      <SEO seo={seo} title={isRecord(target) && target.title} />

      <AppLayout>
        {isRecord(target) && target._type === 'screen' && <Screen target={target} />}
      </AppLayout>
    </>
  )
}

export default IndexPage
