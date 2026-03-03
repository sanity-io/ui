import {wrapData} from '@sanity/react-loader/jsx'
import {draftMode} from 'next/headers'

import {Page} from '@/components/page'
import {PreviewPage} from '@/components/page/PreviewPage'
import {TARGET_QUERY, TargetData} from '@/lib/data'

import {getContext} from './context'

export default async function RootRoute() {
  try {
    const {studioBaseUrl, sanityFetch} = await getContext()

    const result = await sanityFetch({
      query: TARGET_QUERY,
      params: {
        path: [null],
      },
    })

    const rawData = result.data as TargetData | null
    const sourceMap = result.sourceMap || undefined
    const _draftMode = await draftMode()

    if (_draftMode.isEnabled) {
      // eslint-disable-next-line react-hooks/error-boundaries
      return <PreviewPage initial={{data: rawData, sourceMap}} path={[]} />
    }

    const data = rawData
      ? wrapData(
          {
            baseUrl: studioBaseUrl,
          },
          rawData,
          sourceMap,
        )
      : null
    // eslint-disable-next-line react-hooks/error-boundaries
    return <Page data={data} path={[]} />
  } catch (error) {
    return <Page error={error as Error} path={[]} />
  }
}
