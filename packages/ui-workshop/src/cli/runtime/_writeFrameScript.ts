import {writeFile} from 'fs/promises'
import path from 'path'

const SCRIPT = `// THIS FILE IS AUTO-GENERATED

import {mountFrame} from '@sanity/ui-workshop'
import {scopes} from '../scopes'
import config from '../../workshop.config'

mountFrame({
  config: {...config, scopes},
  element: document.getElementById('root'),
})
`

export async function _writeFrameScript(options: {outDir: string}): Promise<void> {
  await writeFile(path.resolve(options.outDir, 'frame/main.tsx'), SCRIPT)
}
