/* eslint-disable no-console */

import fs from 'fs'
import path from 'path'
import {_watchScopes} from './_watchScopes'
import {_loadRuntime} from './config/_loadRuntime'
import {DEFAULT_PATTERN} from './constants'
import {createDevServer} from './devServer'
import {_compileModule} from './runtime/_compileModule'
import {buildStaticFiles} from './runtime/buildStaticFiles'

/** @alpha */
export async function dev(options: {cwd: string}): Promise<void> {
  const {cwd} = options
  const runtime = await _loadRuntime({packagePath: cwd})
  const runtimeDir = path.resolve(cwd, '.workshop')
  const outDir = path.resolve(cwd, 'dist')

  await buildStaticFiles({runtimeDir})

  const scopes$ = _watchScopes({
    cwd,
    pattern: runtime?.pattern || DEFAULT_PATTERN,
  })

  // Write scopes
  const scopesSub = scopes$.subscribe({
    next: (scopes) => {
      const relativeScopes = scopes.map((f) => {
        return path.relative(runtimeDir, f)
      })

      const code = _compileModule(relativeScopes)

      fs.writeFileSync(path.resolve(runtimeDir, 'scopes.ts'), code)
    },
  })

  const app = await createDevServer({cwd, outDir, runtime, runtimeDir})

  const port = runtime?.server?.port || 1337

  const server = app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`)
  })

  server.on('close', () => {
    console.log(`server closed`)

    scopesSub.unsubscribe()

    process.exit(1)
  })
}
