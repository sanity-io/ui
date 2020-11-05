// Convert an array of bytes to string
export const bytesToString = (arr: Uint8Array) => {
  let str = ''
  for (let i = 0; i < arr.length; i++) {
    str += String.fromCharCode(arr[i])
  }
  return str
}
