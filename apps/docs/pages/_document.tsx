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
import {app, basePath, ga} from '../config'

const GA_TRACKING_CODE =
  ga.trackingId &&
  `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ga.trackingId}');`

class Document extends NextDocument<DocumentProps & {styleTags: React.ReactNode}> {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) =>
            function EnhancedApp(props) {
              return sheet.collectStyles(<App {...props} />)
            },
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
          {ga.trackingId && (
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga.trackingId}`} />
          )}
          {GA_TRACKING_CODE && <script dangerouslySetInnerHTML={{__html: GA_TRACKING_CODE}} />}
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta name="theme-color" content={app.themeColor} />
          <meta name="msapplication-tap-highlight" content="no" />
          <link rel="apple-touch-icon" sizes="48x48" href={`${basePath}/sanity-favicon-48.png`} />
          <link rel="apple-touch-icon" sizes="72x72" href={`${basePath}/sanity-favicon-72.png`} />
          <link rel="apple-touch-icon" sizes="96x96" href={`${basePath}/sanity-favicon-96.png`} />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={`${basePath}/sanity-favicon-144.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${basePath}/sanity-favicon-180.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href={`${basePath}/sanity-favicon-192.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="256x256"
            href={`${basePath}/sanity-favicon-256.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="384x384"
            href={`${basePath}/sanity-favicon-384.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href={`${basePath}/sanity-favicon-512.png`}
          />
          <link rel="shortcut icon" href={`${basePath}/favicon.ico`} />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${basePath}/sanity-favicon-16.png`}
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${basePath}/sanity-favicon-32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href={`${basePath}/sanity-favicon-48.png`}
          />
          <link rel="apple-touch-icon" sizes="57x57" href={`${basePath}/sanity-favicon-57.png`} />
          <link rel="apple-touch-icon" sizes="60x60" href={`${basePath}/sanity-favicon-60.png`} />
          <link rel="apple-touch-icon" sizes="72x72" href={`${basePath}/sanity-favicon-72.png`} />
          <link rel="apple-touch-icon" sizes="76x76" href={`${basePath}/sanity-favicon-76.png`} />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href={`${basePath}/sanity-favicon-114.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={`${basePath}/sanity-favicon-120.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={`${basePath}/sanity-favicon-144.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={`${basePath}/sanity-favicon-152.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href={`${basePath}/sanity-favicon-167.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${basePath}/sanity-favicon-180.png`}
          />
          <link
            rel="apple-touch-icon"
            sizes="1024x1024"
            href={`${basePath}/sanity-favicon-1024.png`}
          />
          {this.props.styleTags}
          <script async src="https://unpkg.com/@babel/standalone/babel.min.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
