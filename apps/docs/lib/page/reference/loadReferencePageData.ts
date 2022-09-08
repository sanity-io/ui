import {getReleaseMenu} from '../../../components/reference'
import {getClient} from '../../../sanity.server'
import {isRecord, isString} from '../../types'
import {DATA_QUERY} from './queries'

export async function loadReferencePageData({
  params,
  preview,
}: {
  params: {name?: string; version?: string; slug?: string}
  preview?: boolean
}) {
  const basePath = `/reference/${params.name}/${params.version}`
  const data: unknown = await getClient(preview).fetch(DATA_QUERY, params)
  const pkg = (isRecord(data) && isRecord(data.package) && data.package) || null
  const release = pkg && isRecord(pkg.release) && isString(pkg.release.version) && pkg.release
  const menu = release && getReleaseMenu(release, basePath)
  const menuData = isRecord(menu) ? {menu} : {}

  return {scope: 'reference', data, ...menuData, preview}
}
