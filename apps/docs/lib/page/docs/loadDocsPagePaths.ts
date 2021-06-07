import {getNavStaticPaths} from '$lib/nav'
import {isArray, isRecord} from '$lib/types'
import {MAIN_NAV_QUERY} from '$queries'
import {getClient} from '$sanity'

export async function loadDocsPagePaths({preview}: {preview?: boolean}) {
  const nav: unknown = await getClient(preview).fetch(MAIN_NAV_QUERY)
  const navItems = (isRecord(nav) && isArray(nav.items) && nav.items) || []
  const navStaticPaths = getNavStaticPaths(navItems)

  return (
    navStaticPaths
      // @todo: Document this
      .filter((p) => !p.params.path.includes('//'))

      // Remove paths that do not match the pattern `/docs/*`
      .filter((p) => p.params.path.length > 1 && p.params.path[0] === 'docs')

      .map((p) => ({...p, params: {...p.params, path: p.params.path.slice(1)}}))
  )
}
