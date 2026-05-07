import {existsSync} from 'node:fs'
import path from 'node:path'

export function getTransformPath(root: string, version: string, name: string) {
  const jsPath = path.join(root, `dist/transforms/${version}/${name}/${name}.js`)
  const tsPath = path.join(root, `src/transforms/${version}/${name}/${name}.ts`)

  if (existsSync(jsPath)) {
    return jsPath
  }

  if (existsSync(tsPath)) {
    return tsPath
  }

  throw new Error(`Could not find ${name} codemod`)
}
