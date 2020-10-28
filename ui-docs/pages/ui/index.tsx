import {groq} from 'next-sanity'
import Head from 'next/head'
import React from 'react'
import {UIPageLayout} from './_common/layout'
import {AppLayout, Article} from '~/components'
import {getClient, usePreviewSubscription} from '~/sanity'

const __DEV__ = process.env.NODE_ENV === 'development'

const PAGE_QUERY = groq`
  {
    "article": *[_type == "article" && slug.current == $slug] {
      _updatedAt,
      title,
      content
    }[0]
  }
`

export async function getStaticProps({preview = __DEV__}) {
  const params = {slug: 'intro'}
  const data = await getClient(preview).fetch(PAGE_QUERY, params)

  return {props: {data, params, preview}}
}

function IndexPage({data: initialData, params = {}, preview}: any) {
  const {data = {}} = usePreviewSubscription(PAGE_QUERY, {params, initialData, enabled: preview})

  const {article} = data

  return (
    <>
      <Head>
        {article && <title>{article.title} – Sanity UI</title>}
        {!article && 'Missing article – Sanity UI'}
      </Head>

      <AppLayout>
        <UIPageLayout>
          <Article article={article} slug={params.slug} />
        </UIPageLayout>
      </AppLayout>
    </>
  )
}

export default IndexPage
