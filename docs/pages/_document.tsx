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
      <Html>
        <Head>
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta name="theme-color" content="#F03E2F" />
          <meta name="msapplication-tap-highlight" content="no" />
          {/* @todo: OG and twitter */}
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
