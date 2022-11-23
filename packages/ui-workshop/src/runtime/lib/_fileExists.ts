import {accessSync} from 'fs'

/** @internal */
export function _fileExists(file: string): boolean {
  try {
    accessSync(file)

    return true
  } catch (_) {
    return false
  }
}
