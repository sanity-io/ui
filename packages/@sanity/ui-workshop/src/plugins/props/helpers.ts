import {decode, encode} from './lib/zlib'

export function encodeValue(val: Record<string, unknown>): string {
  return encode(JSON.stringify(val))
}

export function decodeValue(val: string): Record<string, unknown> {
  try {
    return JSON.parse(decode(val))
  } catch (_) {
    return {}
  }
}
