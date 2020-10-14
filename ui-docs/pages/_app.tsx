import {LayerProvider, studioTheme, ThemeProvider} from '@sanity/ui'
import {AppProps} from 'next/app'
import Head from 'next/head'
import React from 'react'
import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {AppProvider} from '../components'

Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

function App({Component, pageProps}: AppProps) {
  return (
    <AppProvider>
      <LayerProvider id="root">
        <ThemeProvider theme={studioTheme}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
            />
          </Head>

          <Component {...pageProps} />
        </ThemeProvider>
      </LayerProvider>
    </AppProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await NextApp.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App
