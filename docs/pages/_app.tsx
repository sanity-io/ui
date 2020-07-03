import {GlobalStyle} from '~/components'
import {studioTheme, ThemeProvider} from '@sanity/ui'
import {AppProps} from 'next/app'
import React from 'react'
import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'

Refractor.registerLanguage(javascript as any)
Refractor.registerLanguage(json as any)
Refractor.registerLanguage(jsx as any)
Refractor.registerLanguage(typescript as any)

function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider theme={studioTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
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
