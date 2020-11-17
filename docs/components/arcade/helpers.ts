import pako from 'pako'
import {Cursor} from './types'

export const uint8ArrayToBase64 = (uint8array: Uint8Array) => {
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

export function decode(input: string) {
  if (input.length === 0) return ''

  const arr = base64ToUint8Array(input)

  return pako.inflate(arr, {to: 'string'})
}

export function encode(input: string) {
  if (input.length === 0) return ''

  const arr = pako.deflate(input)

  return uint8ArrayToBase64(arr)
}

export function getCursorOffset(code: string, cursor: Cursor) {
  const lines = code.split('\n')

  const lenBefore = lines
    .slice(0, cursor.line)
    .map((l) => l.length + 1)
    .reduce((acc, l) => (acc += l), 0)

  return lenBefore + cursor.column
}

export function getCursor(code: string, cursorOffset: number) {
  const lines = code.split('\n')

  let offset = cursorOffset
  let line = 0
  let column = 0

  for (let i = 0; i < lines.length; i += 1) {
    if (offset <= lines[i].length) {
      line = i
      column = offset
      break
    }

    offset -= lines[i].length + 1
  }

  return {line, column}
}
