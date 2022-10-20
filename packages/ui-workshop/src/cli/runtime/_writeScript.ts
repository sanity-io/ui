import {writeFile} from 'fs/promises'
import path from 'path'

const SCRIPT = `// THIS FILE IS AUTO-GENERATED

import {mount} from '@sanity/ui-workshop'
import {scopes} from './scopes'
import config from '../workshop.config'

mount({
  config: {...config, scopes},
  element: document.getElementById('root'),
})
`

export async function _writeScript(options: {outDir: string}): Promise<void> {
  await writeFile(path.resolve(options.outDir, 'main.tsx'), SCRIPT)
}
