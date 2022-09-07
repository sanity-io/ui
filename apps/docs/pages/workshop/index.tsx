import {Workshop} from '@sanity/ui-workshop'
import Head from 'next/head'
import {AppLayout, SEO, useApp} from '../../components/app'
import {app, features} from '../../config'
import {loadGlobalPageData} from '../../lib/page'
import {isRecord} from '../../lib/types'
import {config} from '../../workshop/config'
import {useNextLocationStore} from '../../workshop/useNextLocationStore'

export async function getServerSideProps(opts: {preview?: boolean; query: Record<string, string>}) {
  const {preview = features.preview, query} = opts
  const pageData = await loadGlobalPageData({preview})

  return {
    props: {
      ...pageData,
      title: query.title || '',
      description: query.description || '',
      preview,
    },
  }
}

function WorkshopPage() {
  const {colorScheme, data, setColorScheme} = useApp()
  const target = isRecord(data) && isRecord(data.target) && data.target
  const seo: Record<string, any> | null = isRecord(target) ? (target.seo as any) : null

  const locationStore = useNextLocationStore()

  return (
    <>
      <Head>
        <title>Workshop – {app.siteName}</title>
      </Head>

      <SEO seo={seo} title={isRecord(target) && target.title} />

      <AppLayout>
        <Workshop
          config={config}
          locationStore={locationStore}
          onSchemeChange={setColorScheme}
          scheme={colorScheme}
        />
      </AppLayout>
    </>
  )
}

export default WorkshopPage
