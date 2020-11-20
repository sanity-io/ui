import {groq} from 'next-sanity'
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
import {getClient, usePreviewSubscription} from '$sanity'

const __DEV__ = process.env.NODE_ENV === 'development'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

const PAGE_QUERY = groq`
  {
    "features": *[_type == "features" && _id == "features"][0]
  }
`

function App(props: AppProps) {
  const {data: initialData, preview} = props.pageProps
  const {data = {}} = usePreviewSubscription(PAGE_QUERY, {initialData, enabled: preview})
  const {Component, pageProps} = props

  return (
    <AppProvider features={data.features || {}}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>

      <Component {...pageProps} />
    </AppProvider>
  )
}

App.getInitialProps = async ({preview = __DEV__}) => {
  const data = await getClient(preview).fetch(PAGE_QUERY)

  return {pageProps: {data, preview}}
}

export default App
