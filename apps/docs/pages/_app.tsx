import {AppProps} from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import {useEffect, useState} from 'react'
import Refractor from 'react-refractor'
import bash from 'refractor/lang/bash'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {AppProvider} from '../components/app'
import {app} from '../config'
import {useDocsPageData, useGlobalPageData, useReferencePageData} from '../lib/page'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

function App(props: AppProps) {
  const {pageProps} = props
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      // console.log('start')
      setLoading(true)
    }

    const end = () => {
      // console.log('finished')
      setLoading(false)
    }

    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)

    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  // console.log('loading', loading)

  if (pageProps.scope === 'docs') {
    return <DocsApp {...props} loading={loading} />
  }

  if (pageProps.scope === 'reference') {
    return <ReferenceApp {...props} loading={loading} />
  }

  return <GlobalApp {...props} loading={loading} />
}

function DefaultMeta() {
  return (
    <Head>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />

      {/* Default meta data */}
      <meta name="description" content={app.description} />

      {/* Default Twitter metadata */}
      <meta name="twitter:site" content="@sanity_io" />

      {/* Default OG metadata */}
      <meta property="og:site_name" content={app.siteName} />
    </Head>
  )
}

function GlobalApp(props: AppProps & {loading: boolean}) {
  const {Component, loading, pageProps} = props
  const pageData = useGlobalPageData(pageProps)

  return (
    <AppProvider {...pageData} loading={loading} params={pageProps.params || {}}>
      <DefaultMeta />
      <Component {...pageProps} {...pageData} />
    </AppProvider>
  )
}

function DocsApp(props: AppProps & {loading: boolean}) {
  const {Component, loading, pageProps} = props
  const pageData = useDocsPageData(pageProps)

  return (
    <AppProvider {...pageData} loading={loading} params={pageProps.params || {}}>
      <DefaultMeta />
      <Component {...pageProps} {...pageData} />
    </AppProvider>
  )
}

function ReferenceApp(props: AppProps & {loading: boolean}) {
  const {Component, loading, pageProps} = props
  const pageData = useReferencePageData(pageProps)

  return (
    <AppProvider {...pageData} loading={loading} params={pageProps.params || {}}>
      <DefaultMeta />
      <Component {...pageProps} {...pageData} />
    </AppProvider>
  )
}

export default App
