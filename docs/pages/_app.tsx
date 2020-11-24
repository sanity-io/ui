import {AppProps} from 'next/app'
import Head from 'next/head'
import React from 'react'
import Refractor from 'react-refractor'
import bash from 'refractor/lang/bash'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {AppProvider} from '$components'
import {findNavNode} from '$lib/nav'
import {FEATURES_QUERY, MAIN_NAV_QUERY, TARGET_QUERY} from '$queries'
import {getClient, usePreviewSubscription} from '$sanity'

const __DEV__ = process.env.NODE_ENV === 'development'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

function App(props: AppProps) {
  const {Component, pageProps} = props

  const {
    features: initialFeatures,
    nav: initialNav,
    params = {},
    preview,
    target: initialTarget,
    ...restPageProps
  } = pageProps

  const {data: features = {}} = usePreviewSubscription(FEATURES_QUERY, {
    initialData: initialFeatures,
    enabled: preview,
  })

  const {data: nav = {}} = usePreviewSubscription(MAIN_NAV_QUERY, {
    initialData: initialNav,
    enabled: preview,
  })

  const node = findNavNode(nav.items, params.path || ['ui'])

  const {data: target = {}} = usePreviewSubscription(TARGET_QUERY, {
    initialData: initialTarget || undefined,
    enabled: preview,
    params: {id: node.targetId},
  })

  return (
    <AppProvider features={features || {}} nav={nav} node={node} target={target}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        {/* @todo: Default metadata for OG and Twitter */}
      </Head>
      <Component {...restPageProps} params={params} preview={preview} />
    </AppProvider>
  )
}

App.getInitialProps = async ({preview = __DEV__, router}: any) => {
  const params = router.query
  const features = await getClient(preview).fetch(FEATURES_QUERY)
  const nav = await getClient(preview).fetch(MAIN_NAV_QUERY)

  if (!params.path) return {pageProps: {features, nav, preview}}

  const node = findNavNode(nav.items, params)
  const target = await getClient(preview).fetch(TARGET_QUERY, {id: node.targetId})

  return {pageProps: {features, nav, params, preview, target}}
}

export default App
