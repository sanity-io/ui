import {isArray} from 'lodash'
import {DATA_QUERY} from './queries'
import {findNavNode} from '$lib/nav'
import {isRecord} from '$lib/types'
import {TARGET_QUERY} from '$queries'
import {getClient} from '$sanity'

export async function loadGlobalPageData({
  params = {},
  preview,
}: {
  params?: {path?: string[]}
  preview?: boolean
}) {
  const path = params.path || []
  const pageData: unknown = await getClient(preview).fetch(DATA_QUERY)
  const nav = isRecord(pageData) && pageData.nav
  const settings = isRecord(pageData) && pageData.settings
  const navValues: unknown[] = (isRecord(nav) && isArray(nav.items) && nav.items) || []
  const node = findNavNode(navValues, path)
  const targetData: unknown = await getClient(preview).fetch(TARGET_QUERY, {
    id: node ? node.targetId : '404',
  })

  return {
    scope: 'global',
    data: {
      nav,
      settings,
      target: targetData,
    },
    preview,
  }
}
