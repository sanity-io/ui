import {getNavStaticPaths} from '$lib/nav'
import {isArray, isRecord} from '$lib/types'
import {MAIN_NAV_QUERY} from '$queries'
import {getClient} from '$sanity'

export async function loadPagePaths({preview}: {preview?: boolean}) {
  const nav: unknown = await getClient(preview).fetch(MAIN_NAV_QUERY)
  const navItems = (isRecord(nav) && isArray(nav.items) && nav.items) || []

  return getNavStaticPaths(navItems)
}
