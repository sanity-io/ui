/* eslint-disable no-console */

import fs from 'fs'
import path from 'path'
import {_watchScopes} from './_watchScopes'
import {_loadConfig} from './config'
import {DEFAULT_PATTERN} from './constants'
import {createDevServer} from './devServer/createDevServer'
import {_compileModule} from './runtime/_compileModule'
import {buildStaticFiles} from './runtime/buildStaticFiles'

export async function devCommand(options: {cwd: string}): Promise<void> {
  const {cwd} = options

  const outDir = path.resolve(cwd, '.workshop')

  await buildStaticFiles({outDir})

  const config = await _loadConfig({packagePath: cwd})

  const scopes$ = _watchScopes({
    cwd,
    pattern: config?.pattern || DEFAULT_PATTERN,
  })

  // Write scopes
  const scopesSub = scopes$.subscribe({
    next: (scopes) => {
      const relativeScopes = scopes.map((f) => {
        return path.relative(outDir, f)
      })

      const code = _compileModule(relativeScopes)

      fs.writeFileSync(path.resolve(outDir, 'scopes.ts'), code)
    },
  })

  const app = await createDevServer({config, cwd, outDir})

  const port = config?.port || 1337

  const server = app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
  })

  server.on('close', () => {
    console.log(`server closed`)

    scopesSub.unsubscribe()

    process.exit(1)
  })
}
