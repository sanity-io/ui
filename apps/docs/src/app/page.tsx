import {wrapData} from '@sanity/react-loader/jsx'
import {draftMode} from 'next/headers'

import {Page} from '@/components/page'
import {API_DOCUMENT_TYPES, TARGET_QUERY, TargetData} from '@/lib/data'
import {loadQuery} from '@/lib/sanity/loadQuery'

import {PreviewPage} from '../components/page/PreviewPage'

export default async function RootRoute() {
  try {
    const {data: rawData, sourceMap} = await loadQuery<TargetData | null>(TARGET_QUERY, {
      memberTypes: API_DOCUMENT_TYPES,
      path: [null],
    })

    if (draftMode().isEnabled) {
      return <PreviewPage initial={{data: rawData, sourceMap}} path={[]} />
    }

    const data = rawData ? wrapData({baseUrl: '/studio'}, rawData, sourceMap) : null

    return <Page data={data} path={[]} />
  } catch (error) {
    return <Page error={error as Error} path={[]} />
  }
}
