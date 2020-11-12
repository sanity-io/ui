import {groq} from 'next-sanity'
import Head from 'next/head'
import React from 'react'
import {AppLayout, Article} from '$components'
import {UIPageLayout} from '$components/_uiPage/layout'
import {utilRoutes} from '$routes'
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

export async function getStaticProps({
  params,
  preview = __DEV__,
}: {
  params: Record<string, any>
  preview?: boolean
}) {
  const data = await getClient(preview).fetch(PAGE_QUERY, params)

  return {props: {data, params, preview}}
}

export function getStaticPaths() {
  return {
    paths: utilRoutes.map((route) => ({params: {slug: route.slug}})),
    fallback: true,
  }
}

function ComponentPage({data: initialData, params = {}, preview}: any) {
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

export default ComponentPage
