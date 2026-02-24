import {EMPTY_RECORD} from '../../constants'
import {decode, encode} from './lib/zlib'

/** @internal */
export function encodeValue(val: Record<string, unknown>): string {
  return encode(JSON.stringify(val))
}

/** @internal */
export function decodeValue(val: string): Record<string, unknown> {
  try {
    return JSON.parse(decode(val))
  } catch {
    return EMPTY_RECORD
  }
}
