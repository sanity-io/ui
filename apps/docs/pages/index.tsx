import Head from 'next/head'
import React from 'react'
import {AppLayout, SEO, useApp} from '$components/app'
import {Screen} from '$components/screen'
import {features} from '$config'
import {loadGlobalPageData} from '$lib/page'
import {isRecord} from '$lib/types'

export async function getStaticProps(opts: {preview?: boolean}) {
  const {preview = features.preview} = opts
  const pageData = await loadGlobalPageData({preview})

  return {props: {...pageData, preview}}
}

function IndexPage() {
  const {data} = useApp()
  const target = isRecord(data) && isRecord(data.target) && data.target
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
