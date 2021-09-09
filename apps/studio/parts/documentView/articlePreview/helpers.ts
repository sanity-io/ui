import client from 'part:@sanity/base/client'
import {startWith, switchMap} from 'rxjs/operators'

const configuredClient = client.withConfig({apiVersion: '2021-08-30'})

const MAIN_NAV_FILTER = `_type == "nav" && id == "main"`

const MAIN_NAV_QUERY = `
*[${MAIN_NAV_FILTER}]{
  // id,
  items[]{
    hidden,
    collapsed,
    "title": coalesce(title, route.title),
    menuTitle,
    segment,
    "targetId": target->_id,
    items[]{
      hidden,
      collapsed,
      "title": coalesce(title, route.title),
      menuTitle,
      segment,
      "targetId": target->_id,
      title,
      items[]{
        hidden,
        collapsed,
        "title": coalesce(title, route.title),
        menuTitle,
        segment,
        "targetId": target->_id,
        title
      }
    }
  }
}[0]
`

export function getNav$() {
  const navChange$ = configuredClient.listen(`*[${MAIN_NAV_FILTER}]`).pipe(startWith(null))

  return navChange$.pipe(switchMap(() => configuredClient.observable.fetch(MAIN_NAV_QUERY)))
}

export function findNavPath(item: any, targetId: string, path: string[]): any {
  const nextPath = item.segment ? path.concat([item.segment]) : path

  if (item.targetId === targetId) {
    return nextPath
  }

  if (item.items) {
    for (const childItem of item.items) {
      const result = findNavPath(childItem, targetId, nextPath)

      if (result) {
        return result
      }
    }
  }

  return null
}
