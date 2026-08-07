import {existsSync} from 'node:fs'
import {dirname, join, resolve} from 'node:path'

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'] as const

export function resolveRelativeModulePath(
  fromFilePath: string,
  moduleSpecifier: string,
): string | null {
  if (!moduleSpecifier.startsWith('.')) {
    return null
  }

  const base = resolve(dirname(fromFilePath), moduleSpecifier)

  for (const ext of EXTENSIONS) {
    const filePath = `${base}${ext}`

    if (existsSync(filePath)) {
      return filePath
    }
  }

  for (const ext of EXTENSIONS) {
    const indexPath = join(base, `index${ext}`)

    if (existsSync(indexPath)) {
      return indexPath
    }
  }

  if (existsSync(base)) {
    return base
  }

  return null
}
