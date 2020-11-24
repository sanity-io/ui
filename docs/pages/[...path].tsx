import Head from 'next/head'
import React from 'react'
import {AppLayout, Article, Screen, useApp} from '$components'
import {PageLayout} from '$components'
import {getNavItems, getNavStaticPaths} from '$lib/nav'
import {MAIN_NAV_QUERY} from '$queries'
import {getClient} from '$sanity'

const __DEV__ = process.env.NODE_ENV === 'development'

export function getStaticProps({params, preview = __DEV__}: {params: any; preview?: boolean}) {
  return {props: {params, preview}}
}

export async function getStaticPaths() {
  const nav = await getClient(__DEV__).fetch(MAIN_NAV_QUERY)

  return {
    paths: getNavStaticPaths(nav.items),
    fallback: false,
  }
}

export default function PathPage(props: {params: {path: string[]}}) {
  const {params = {path: []}} = props
  const {nav, target} = useApp()
  const structure = getNavItems(nav.items || [])
  const currentStructure = structure.find((n) => n.segment === params.path[0])

  return (
    <>
      <Head>
        {target && <title>{target.title} – Sanity Design</title>}
        {!target && 'Missing target – Sanity Design'}
      </Head>

      <AppLayout>
        {target._type === 'article' && (
          <PageLayout structure={currentStructure} {...(target.layout || {})}>
            <Article article={target} />
          </PageLayout>
        )}

        {target._type === 'screen' && <Screen target={target} />}
      </AppLayout>
    </>
  )
}
