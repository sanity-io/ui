import {GlobalStyle} from '~/components'
import {studioTheme, ThemeProvider} from '@sanity/ui'
import {AppProps} from 'next/app'
import React from 'react'

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
