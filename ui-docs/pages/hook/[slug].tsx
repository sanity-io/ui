import {Heading, Stack, Text} from '@sanity/ui'
import {groq} from 'next-sanity'
import Head from 'next/head'
import React from 'react'
import {hookRoutes} from '../../routes'
import {AppLayout, ArticleContent} from '~/components'
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

export async function getStaticProps({params, preview = __DEV__}) {
  const data = await getClient(preview).fetch(PAGE_QUERY, params)

  return {props: {data, params, preview}}
}

export function getStaticPaths() {
  return {
    paths: hookRoutes.map((route) => ({params: {slug: route.slug}})),
    fallback: true,
  }
}

function HookPage({data: initialData, params, preview}: any) {
  const {data = {}} = usePreviewSubscription(PAGE_QUERY, {params, initialData, enabled: preview})
  const {article} = data

  return (
    <>
      <Head>
        {article && <title>{article.title} – Sanity UI</title>}
        {!article && 'Missing article – Sanity UI'}
      </Head>

      <AppLayout>
        {!article && (
          <Text>
            Missing article with slug <code>{params.slug}</code>!
          </Text>
        )}

        {article && (
          <Stack space={[4, 4, 5, 6]}>
            <Heading as="h1" size={[2, 2, 3, 4]}>
              {article.title}
            </Heading>

            {article.content && <ArticleContent blocks={article.content} />}

            {article._updatedAt && (
              <Text size={[0, 1, 2]}>
                <strong>Updated</strong>: {article._updatedAt}
              </Text>
            )}
          </Stack>
        )}
      </AppLayout>
    </>
  )
}

export default HookPage
