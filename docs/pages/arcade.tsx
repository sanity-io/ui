import React from 'react'
import {AppLayout} from '$components'
import {features} from '$config'
import {loadPageData} from '$lib/page'
import {ArcadeScreen} from '$screens/arcade'

export async function getServerSideProps(opts: {preview?: boolean; query: Record<string, string>}) {
  const {preview = features.preview, query} = opts
  const data = await loadPageData({preview})

  return {
    props: {
      ...data,
      title: query.title || '',
      description: query.description || '',
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
