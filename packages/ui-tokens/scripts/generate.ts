import {exec as execCallback} from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {promisify} from 'node:util'

import {system} from '@sanity/ui-tokens/system'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const exec = promisify(execCallback)

async function generate() {
  const systemFile = path.resolve(__dirname, '../src/main/system.ts')

  await fs.writeFile(
    systemFile,
    [
      `// This file is auto-generated`,
      `import type {TokenSystem} from '@sanity/ui-tokens/system'`,
      `/** @internal */\nexport const system: TokenSystem = ${JSON.stringify(system, null, 2)}\n`,
    ].join('\n\n'),
  )

  // format src/tokens.ts file
  await exec(`npx prettier --write ${systemFile}`)
}

generate().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
