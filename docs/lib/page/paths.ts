import {getNavStaticPaths} from '$lib/nav'
import {MAIN_NAV_QUERY} from '$queries'
import {getClient} from '$sanity'

export async function loadPagePaths({preview}: {preview?: boolean}) {
  const nav = await getClient(preview).fetch(MAIN_NAV_QUERY)

  return getNavStaticPaths(nav.items)
}
