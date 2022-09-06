import {AppLayout} from '$components/app'
import {features} from '$config'
import {loadGlobalPageData} from '$lib/page'
import {ArcadeScreen} from '$screens/arcade'

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

export default function ArcadePage({title, description}: {title: string; description: string}) {
  return (
    <AppLayout>
      <ArcadeScreen title={title} description={description} />
    </AppLayout>
  )
}
