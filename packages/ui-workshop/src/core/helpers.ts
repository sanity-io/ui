import {ThemeColorSchemeKey} from '@sanity/ui'
import {WorkshopScope, WorkshopStory} from './config'

/** @internal */
export function resolveLocation(
  scopes: WorkshopScope[],
  path: string
): {scope: WorkshopScope | null; story: WorkshopStory | null} {
  let segments = path?.split('/').slice(1).filter(Boolean)

  const p = segments.join('/')

  if (segments.length === 0) {
    return {
      scope: null,
      story: null,
    }
  }

  const scope = scopes.find((scope) => p.startsWith(`${scope.name}/`)) || null

  const len = scope?.name.split('/').length || 0

  segments = segments.slice(len)

  const story = (scope && scope.stories.find((story) => story.name === segments.join('/'))) || null

  return {scope, story}
}

/** @internal */
export function buildFrameUrl(params: {
  baseUrl?: string
  path: string
  payload: Record<string, unknown>
  scheme: ThemeColorSchemeKey
  viewport: string
  zoom: number
}): string {
  const {baseUrl = '/frame/', path, payload, scheme, viewport, zoom} = params

  return [
    baseUrl,
    `?path=${encodeURIComponent(path)}`,
    `&scheme=${scheme}`,
    `&viewport=${viewport}`,
    `&zoom=${zoom}`,
    ...Object.entries(payload).map(([key, value]) => {
      return `&${key}=${value}`
    }),
  ].join('')
}
