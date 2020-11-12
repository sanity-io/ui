import pako from 'pako'

/*
 * Convert an array of bytes to string
 */
export const bytesToString = (arr: Uint8Array) => {
  let str = ''

  for (let i = 0; i < arr.length; i++) {
    str += String.fromCharCode(arr[i])
  }

  return str
}

export const decodeCode = (base64: string) => {
  const data = atob(base64)
  const inflated = bytesToString(pako.inflateRaw(data))

  return decodeURIComponent(inflated)
}

export const encodeCode = (code: string) => {
  if (!code.length) {
    return ''
  }

  const data = encodeURIComponent(code)
  const deflated = pako.deflateRaw(data)

  return btoa(bytesToString(deflated))
}
