import {type QueryResponseInitial} from '@sanity/react-loader'
import {wrapData} from '@sanity/react-loader/jsx'
import {draftMode} from 'next/headers'

import {Page} from '@/components/page'
import {API_DOCUMENT_TYPES, TARGET_QUERY, TargetData} from '@/lib/data'
import {loadQuery} from '@/lib/sanity/loadQuery'

import {PreviewPage} from '../components/page/PreviewPage'

export default async function RootRoute() {
  let initial: QueryResponseInitial<TargetData | null>

  // Only the data loading is guarded: JSX must not be constructed inside
  // try/catch, since components render later and rendering errors would not
  // be caught here anyway.
  try {
    initial = await loadQuery<TargetData | null>(TARGET_QUERY, {
      memberTypes: API_DOCUMENT_TYPES,
      path: [null],
    })
  } catch (error) {
    return <Page error={error as Error} path={[]} />
  }

  const {data: rawData, sourceMap} = initial

  if ((await draftMode()).isEnabled) {
    return <PreviewPage initial={{data: rawData, sourceMap}} path={[]} />
  }

  const data = rawData ? wrapData({baseUrl: '/studio'}, rawData, sourceMap) : null

  return <Page data={data} path={[]} />
}
