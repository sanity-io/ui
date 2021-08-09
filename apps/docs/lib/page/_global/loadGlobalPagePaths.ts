import {app} from '$config'
import {getNavStaticPaths} from '$lib/nav'
import {isArray, isRecord} from '$lib/types'
import {MAIN_NAV_QUERY} from '$queries'
import {getClient} from '$sanity'

export async function loadGlobalPagePaths({preview}: {preview?: boolean}) {
  const nav: unknown = await getClient(preview).fetch(MAIN_NAV_QUERY)
  const navItems = (isRecord(nav) && isArray(nav.items) && nav.items) || []
  const navStaticPaths = getNavStaticPaths(navItems)

  return (
    navStaticPaths
      // @todo: Document this
      .filter((p) => !p.params.path.includes('//'))

      // Remove paths that start with `/docs`
      .filter((p) => p.params.path[0] !== 'docs')

      // Remove paths that are `/`,
      // since that is reserved for the `/[...path]` page component
      .filter((p) => !(p.params.path.length === 1 && p.params.path[0] === ''))

      // Remove paths that are `/<static-screen-id>`,
      // since that is reserved for the `/<static-screen-id>` page component
      .filter(
        (p) => !(p.params.path.length === 1 && app.staticScreenIds.includes(p.params.path[0]))
      )
  )
}
