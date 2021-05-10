import {WorkshopScope, WorkshopStory} from './types'

export function resolveLocation(
  scopes: WorkshopScope[],
  path: string
): {scope: WorkshopScope | null; story: WorkshopStory | null} {
  let segments = path.split('/').slice(1).filter(Boolean)

  const p = segments.join('/')

  if (segments.length === 0) {
    return {
      scope: null,
      story: null,
    }
  }

  const scope =
    scopes.find((scope) => {
      return p.startsWith(`${scope.name}/`)
    }) || null

  const len = scope?.name.split('/').length || 0

  segments = segments.slice(len)

  return {
    scope,
    story:
      (scope &&
        scope.stories.find((story) => {
          return story.name === segments.join('/')
        })) ||
      null,
  }
}
