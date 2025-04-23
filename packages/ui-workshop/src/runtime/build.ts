import cpx from 'cpx'
import {writeFile} from 'fs/promises'
import path from 'path'
import rimraf from 'rimraf'
import {build as viteBuild} from 'vite'

import {_loadRuntime} from './config/_loadRuntime'
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
export async function build(options: {cwd: string}): Promise<void> {
  const {cwd} = options
  const runtime = await _loadRuntime({packagePath: cwd})
  const runtimeDir = path.resolve(cwd, '.workshop')
  const outDir = runtime?.build?.outDir || path.resolve(cwd, 'dist')

  await buildStaticFiles({runtimeDir})

  const scopes = await getScopes({
    cwd,
    pattern: runtime?.pattern || DEFAULT_PATTERN,
  })

  const relativeScopes = scopes.map((f) => {
    return path.relative(outDir, f)
  })

  const code = _compileModule(relativeScopes)

  await writeFile(path.resolve(runtimeDir, 'scopes.ts'), code)

  const baseViteConfig = createViteConfig({cwd, outDir, runtimeDir})

  let viteConfig = runtime?.vite?.(baseViteConfig) || baseViteConfig

  // check if viteConfig is a promise
  if (typeof viteConfig === 'object' && 'then' in viteConfig) {
    viteConfig = await viteConfig
  }

  await viteBuild(viteConfig)

  // copy
  cpx.copySync(path.resolve(outDir, '.workshop', '**/*'), outDir)

  await rimraf(path.resolve(outDir, '.workshop'))
}
