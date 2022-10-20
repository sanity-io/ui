import pako from 'pako'

const btoa =
  typeof window === 'undefined'
    ? (str: string) => Buffer.from(str, 'binary').toString('base64')
    : window.btoa

const atob =
  typeof window === 'undefined'
    ? (str: string) => Buffer.from(str, 'base64').toString('binary')
    : window.atob

function uint8ArrayToBase64(uint8array: Uint8Array): string {
  let str = ''

  for (let i = 0, {length} = uint8array; i < length; i++) {
    str += String.fromCharCode(uint8array[i])
  }

  return btoa(str)
}

function base64ToUint8Array(base64: string) {
  const binStr = atob(base64)
  const len = binStr.length
  const bytes = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    bytes[i] = binStr.charCodeAt(i)
  }

  return bytes
}

/** @internal */
export function decode(input: string): string {
  if (input.length === 0) return ''

  const arr = base64ToUint8Array(input)

  return pako.inflate(arr, {to: 'string'})
}

/** @internal */
export function encode(input: string): string {
  if (input.length === 0) return ''

  const arr = pako.deflate(input)

  return uint8ArrayToBase64(arr)
}
