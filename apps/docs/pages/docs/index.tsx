import Head from 'next/head'
import React from 'react'
import {AppLayout, SEO, useApp} from '../../components/app'
import {Article} from '../../components/article'
import {PageLayout} from '../../components/page'
import {Screen} from '../../components/screen'
import {app, features} from '../../config'
import {loadDocsPageData} from '../../lib/page'
import {isRecord} from '../../lib/types'

export async function getStaticProps(opts: {preview?: boolean}) {
  const {preview = features.preview} = opts
  const pageData = await loadDocsPageData({preview})

  return {props: {...pageData, preview}}
}

export default function DocsPage() {
  const {data, menu} = useApp()
  const target = isRecord(data) && isRecord(data.target) ? data.target : undefined
  const layout = isRecord(target?.layout) ? target?.layout : undefined
  const seo: Record<string, any> | null = target ? (target.seo as any) : null

  return (
    <>
      <Head>
        {target && (
          <title>
            {target.title} – {app.siteName}
          </title>
        )}
      </Head>

      <SEO seo={seo} title={isRecord(target) && target.title} />

      <AppLayout>
        {target && target._type === 'article' && (
          <PageLayout menu={menu} {...layout}>
            <Article article={target} />
          </PageLayout>
        )}

        {target && target._type === 'screen' && <Screen target={target} />}
      </AppLayout>
    </>
  )
}
