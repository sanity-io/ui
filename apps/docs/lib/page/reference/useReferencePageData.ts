import {DATA_QUERY} from './queries'
import {getReleaseMenu} from '$components/reference'
import {isRecord, isString} from '$lib/types'
import {usePreviewSubscription} from '$sanity'

export function useReferencePageData(props: {
  data: unknown
  params: {version: string}
  preview: boolean
}) {
  const {data: dataProp, params, preview} = props
  const basePath = `/reference/${params.version}`

  const {data} = usePreviewSubscription(DATA_QUERY, {
    enabled: preview,
    initialData: dataProp,
    params,
  })

  const pkg = (isRecord(data) && isRecord(data.package) && data.package) || null
  const release = pkg && isRecord(pkg.release) && isString(pkg.release.version) && pkg.release
  const menu = release ? getReleaseMenu(release, basePath) : undefined

  return {data, menu}
}
