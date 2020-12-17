import {hues} from '@sanity/color'
import NextDocument, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import React from 'react'
import {ServerStyleSheet} from 'styled-components'
import {GA_TRACKING_ID} from '$constants'

const GA_TRACKING_CODE =
  GA_TRACKING_ID &&
  `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_TRACKING_ID}');`

class Document extends NextDocument<DocumentProps & {styleTags: React.ReactNode}> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await NextDocument.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en-US">
        <Head>
          {/* Global site tag (gtag.js) - Google Analytics */}
          {GA_TRACKING_ID && (
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          )}
          {GA_TRACKING_CODE && <script dangerouslySetInnerHTML={{__html: GA_TRACKING_CODE}} />}

          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta name="theme-color" content={hues.red[500].hex} />
          <meta name="msapplication-tap-highlight" content="no" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" href="/sanity-favicon-192.png" sizes="192x192" />
          <link rel="shortcut icon" href="/sanity-favicon-72.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/sanity-favicon-72.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/sanity-favicon-144.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/sanity-favicon-180.png" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://unpkg.com/@babel/standalone/babel.min.js" />
        </body>
      </Html>
    )
  }
}

export default Document
