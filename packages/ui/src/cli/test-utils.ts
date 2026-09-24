import {mkdirSync, writeFileSync} from 'node:fs'
import {join} from 'node:path'

import {PACKAGE_NAME} from './detect.js'

export function writeInstalledUiVersion(dir: string, version: string): void {
  const root = join(dir, 'node_modules', PACKAGE_NAME)
  mkdirSync(root, {recursive: true})
  writeFileSync(join(root, 'package.json'), JSON.stringify({name: PACKAGE_NAME, version}))
}
