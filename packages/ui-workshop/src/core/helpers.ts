import {ThemeColorSchemeKey} from '@sanity/ui'

import {WorkshopScope, WorkshopStory} from './config'

/** @internal */
export function resolveLocation(
  scopes: WorkshopScope[],
  path: string,
): {scope: WorkshopScope | null; story: WorkshopStory | null} {
  const segments = path.split('/').slice(1).filter(Boolean)

  const p = segments.join('/')

  if (segments.length === 0) {
    return {
      scope: null,
      story: null,
    }
  }

  for (const scope of scopes) {
    for (const story of scope.stories) {
      const storyPath = [scope.name, story.name].filter(Boolean).join('/')

      if (p === storyPath) {
        return {scope, story}
      }
    }
  }

  return {scope: null, story: null}
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
