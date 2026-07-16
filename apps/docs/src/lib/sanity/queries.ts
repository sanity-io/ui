import {defineQuery} from 'next-sanity'

import {API_DOCUMENT_TYPES} from '#lib/data/api/constants.ts'
import {primaryNavId} from '@/constants'

import {TARGET_PROJECTION} from '../data/target'

// @TODO add 'v4' when it's ready
// type Id = 'v3' | 'v4'
type NavId = 'v3'

export const screensQuery = defineQuery(`
*[_type == "nav" && id == $id][0].items[defined(segment) && segment != ""] {
  "screen": segment
}`)
export interface ScreensQueryParams {
  id: NavId
}

export const articlesQuery = defineQuery(`
  *[_type == "nav" && id == $id][0].items[defined(segment) && segment != ""] {
    "params": coalesce(items[defined(segment) && segment != ""] {
      "params": [{
        "screen": ^.segment,
        "article": [segment]
      }] + coalesce(items[defined(segment) && segment != ""] {
        "screen": ^.^.segment,
        "article": [^.segment, segment]
      }, [])
    }.params[], [])
  }.params[]`)
export interface ArticlesQueryParams {
  id: NavId
}

export const targetByPathQuery = defineQuery(`
*[_type == "nav" && id == $id][0]{
  'child': items[segment == $path[0]][0]{
    length($path) == 1 => {target},
    'child': items[defined($path[1]) && segment == $path[1]][0]{
      length($path) == 2 => {target},
      'child': items[defined($path[2]) && segment == $path[2]][0]{
        length($path) == 3 => {target},
        'child': items[defined($path[3]) && segment == $path[3]][0]{
          length($path) == 4 => {target},
        }
      }
    }
  }
}{
  length($path) == 1 => child,
  length($path) == 2 => child.child,
  length($path) == 3 => child.child.child,
  length($path) == 4 => child.child.child.child,
}{target->{${TARGET_PROJECTION}}}.target`)
export interface TargetByPathQueryParams {
  id: NavId
  path: (string | null)[]
  memberTypes: string[]
}
export function buildTargetByPathParams({
  id = primaryNavId,
  memberTypes = API_DOCUMENT_TYPES,
  screen,
  article,
}: {
  id?: NavId
  memberTypes?: string[]
  screen: string | null
  article?: string[]
}): TargetByPathQueryParams {
  return {
    id,
    memberTypes,
    path: Array.isArray(article) ? [screen, ...article] : [screen],
  }
}
