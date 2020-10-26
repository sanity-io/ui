import {Heading, Stack, Text} from '@sanity/ui'
import {groq} from 'next-sanity'
import Head from 'next/head'
import React from 'react'
import {getClient, usePreviewSubscription} from '../sanity'
import {AppLayout, ArticleContent} from '~/components'

const PAGE_QUERY = groq`
  {
    "article": *[_type == "article" && slug.current == "theme"] {
      _updatedAt,
      title,
      content
    }[0]
  }
`

export async function getStaticProps({preview = true}) {
  const params = {}
  const data = await getClient(preview).fetch(PAGE_QUERY, params)

  return {props: {data, params, preview}}
}

function ThemePage({data: initialData, params, preview}: any) {
  const {data = {}} = usePreviewSubscription(PAGE_QUERY, {params, initialData, enabled: preview})
  const {article = {}} = data

  return (
    <>
      <Head>
        <title>{article.title || 'Theme'} – Sanity Design</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            {article.title || <>Theme</>}
          </Heading>

          {article.content && <ArticleContent blocks={article.content} />}

          {article._updatedAt && (
            <Text size={[0, 1, 2]}>
              <strong>Updated</strong>: {article._updatedAt}
            </Text>
          )}
        </Stack>
      </AppLayout>
    </>
  )
}

export default ThemePage
