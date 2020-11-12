import pako from 'pako'
import {Cursor} from './types'

/**
 * Convert an array of bytes to a string.
 */
export const bytesToString = (arr: Uint8Array) => {
  let str = ''

  for (let i = 0; i < arr.length; i++) {
    str += String.fromCharCode(arr[i])
  }

  return str
}

export function decodeCode(str: string) {
  try {
    const data = atob(str)
    const inflated = bytesToString(pako.inflateRaw(data))

    return decodeURIComponent(inflated)
  } catch (err) {
    return null
  }
}

export function encodeCode(code: string) {
  if (!code.length) {
    return ''
  }

  const data = encodeURIComponent(code)
  const deflated = pako.deflateRaw(data)

  return btoa(bytesToString(deflated))
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
