import Head from 'next/head'
import {AppLayout, SEO, useApp} from '$components/app'
import {Article} from '$components/article'
import {PageLayout} from '$components/page'
import {Screen} from '$components/screen'
import {app, features} from '$config'
import {loadGlobalPageData, loadGlobalPagePaths} from '$lib/page'
import {isRecord} from '$lib/types'
import {NotFoundScreen} from '$screens/notFound'

export async function getStaticProps(opts: {params?: {path?: string[]}; preview?: boolean}) {
  const {params = {}, preview = features.preview} = opts
  const pageData = await loadGlobalPageData({params, preview})

  return {props: {...pageData, params, preview}}
}

export async function getStaticPaths() {
  const paths = await loadGlobalPagePaths({preview: features.preview})

  return {paths, fallback: false}
}

export default function PathPage() {
  const {data, menu} = useApp()
  const target = isRecord(data) && isRecord(data.target) ? data.target : undefined
  const layout = isRecord(target?.layout) ? target?.layout : undefined
  const seo: Record<string, any> | null = target ? (target.seo as any) : null

  return (
    <>
      <Head>
        <title>
          {target ? `${target.title} – ${app.siteName}` : `Page not found – ${app.siteName}`}
        </title>
      </Head>

      <SEO seo={seo} title={isRecord(target) && target.title} />

      <AppLayout>
        {target && target._type === 'article' && (
          <PageLayout menu={menu} {...layout}>
            <Article article={target} />
          </PageLayout>
        )}

        {target && target._type === 'screen' && <Screen target={target} />}

        {(!target || (target._type !== 'article' && target._type === 'screen')) && (
          <NotFoundScreen />
        )}
      </AppLayout>
    </>
  )
}
