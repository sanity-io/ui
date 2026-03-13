import cpx from 'cpx'
import {writeFile} from 'fs/promises'
import path from 'path'
import {rimraf} from 'rimraf'
import {build as viteBuild, createServer} from 'vite'

import {_loadRuntimeConfig} from './config/_loadRuntime'
import {DEFAULT_PATTERN} from './constants'
import {_getFiles} from './lib/_getFiles'
import {_compileModule} from './runtime/_compileModule'
import {buildStaticFiles} from './runtime/buildStaticFiles'
import {createViteConfig} from './viteConfig'

function getScopes(options: {cwd: string; pattern: string | string[]}): Promise<string[]> {
  return new Promise((resolve) => {
    const files$ = _getFiles(options)

    files$.subscribe({
      next: resolve,
    })
  })
}

/** @alpha */
export async function build(options?: {cwd?: string}): Promise<void> {
  const {cwd = process.cwd()} = options ?? {}

  // Create runtime loader Vite server for SSR module loading
  const runtimeLoaderServer = await createServer({
    root: cwd,
    logLevel: 'error',
    server: {
      middlewareMode: true,
      ws: false, // Disable WebSocket server entirely
      hmr: false, // Disable HMR
    },
    appType: 'custom',
    clearScreen: false,
  })

  const runtimeConfig = await _loadRuntimeConfig({
    packagePath: cwd,
    viteServer: runtimeLoaderServer,
  })
  const runtimeDir = path.resolve(cwd, '.workshop')

  const outDir = runtimeConfig?.build?.outDir ?? path.resolve(cwd, '.workshop/dist')

  await buildStaticFiles({runtimeDir})

  const scopes = await getScopes({
    cwd,
    pattern: runtimeConfig?.pattern ?? DEFAULT_PATTERN,
  })

  const relativeScopes = scopes.map((f) => path.relative(runtimeDir, f))
  const scopesCode = _compileModule(relativeScopes)

  await writeFile(path.resolve(runtimeDir, 'scopes.ts'), scopesCode)

  const baseViteConfig = createViteConfig({
    cwd,
    mode: 'production',
    outDir,
    runtimeDir,
  })

  let viteConfig = runtimeConfig?.vite?.(baseViteConfig) ?? baseViteConfig

  // check if viteConfig is a promise
  if (typeof viteConfig === 'object' && 'then' in viteConfig) {
    viteConfig = await viteConfig
  }

  await viteBuild(viteConfig)

  // Clean up the runtime loader server
  await runtimeLoaderServer.close()

  // copy
  cpx.copySync(path.resolve(outDir, '.workshop', '**/*'), outDir)

  await rimraf(path.resolve(outDir, '.workshop'))
}
