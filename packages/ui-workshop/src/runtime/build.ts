import {writeFile} from 'fs/promises'
import path from 'path'
import {build as viteBuild} from 'vite'
import {_loadConfig} from './config'
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
  const config = await _loadConfig({packagePath: cwd})
  const outDir = path.resolve(cwd, '.workshop')

  await buildStaticFiles({outDir})

  const scopes = await getScopes({
    cwd,
    pattern: config?.pattern || DEFAULT_PATTERN,
  })

  const relativeScopes = scopes.map((f) => {
    return path.relative(outDir, f)
  })

  const code = _compileModule(relativeScopes)

  await writeFile(path.resolve(outDir, 'scopes.ts'), code)

  await viteBuild(createViteConfig({config, cwd, outDir}))
}
