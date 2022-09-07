import {AppProps} from 'next/app'
import Head from 'next/head'
import {AppProvider} from '$components'

function App({Component, pageProps}: AppProps) {
  return (
    <AppProvider>
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

export default App
