import {groq} from 'next-sanity'
import Head from 'next/head'
import React from 'react'
import {AppLayout, Article} from '$components'
import {UIPageLayout} from '$components/_uiPage/layout'
import {getClient, usePreviewSubscription} from '$sanity'

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
  const params = {slug: 'theme'}
  const data = await getClient(preview).fetch(PAGE_QUERY, params)

  return {props: {data, params, preview}}
}

function ThemePage({data: initialData, params = {}, preview}: any) {
  const {data = {}} = usePreviewSubscription(PAGE_QUERY, {params, initialData, enabled: preview})

  const {article} = data

  return (
    <>
      <Head>
        {article && <title>{article.title} – UI – Sanity Design</title>}
        {!article && 'Missing article – UI – Sanity Design'}
      </Head>

      <AppLayout>
        <UIPageLayout>
          <Article article={article} slug={params.slug} />
        </UIPageLayout>
      </AppLayout>
    </>
  )
}

export default ThemePage
