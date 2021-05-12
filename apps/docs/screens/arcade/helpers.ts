import {ArcadeQueryParams} from './types'
import {decode, encode} from '$lib/zlib'

export function getArcadeQuery(params: ArcadeQueryParams) {
  const query: Record<string, string> = {mode: params.mode || 'jsx'}

  if (typeof params.width === 'number') query.width = String(params.width)
  if (params.jsx) query.jsx = encode(params.jsx)
  if (params.hook) query.hook = encode(params.hook)
  if (params.title) query.title = params.title
  if (params.description) query.description = params.description

  return query
}

export function tryDecode(encoded: unknown) {
  if (typeof encoded === 'string') {
    try {
      return decode(encoded)
    } catch (err) {
      console.error(err)
    }
  }

  return null
}
