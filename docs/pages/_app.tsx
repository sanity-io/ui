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
import {usePageData} from '$lib/page'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

function App(props: AppProps) {
  const {Component, pageProps} = props
  const pageData = usePageData(pageProps)

  return (
    <AppProvider {...pageData}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        {/* @todo: Default metadata for OG and Twitter */}
      </Head>
      <Component {...pageProps} {...pageData} />
    </AppProvider>
  )
}

export default App
