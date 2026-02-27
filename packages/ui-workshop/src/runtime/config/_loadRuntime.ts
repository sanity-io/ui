import type {ViteDevServer} from 'vite'

import {_loadRuntimeModule} from '../_loadRuntimeModule'
import type {WorkshopRuntimeOptions} from '../types'
import {_findRuntimeFile} from './_findRuntimeFile'

/** @internal */
export async function _loadRuntimeConfig(options: {
  packagePath: string
  viteServer: ViteDevServer
}): Promise<WorkshopRuntimeOptions | undefined> {
  const {packagePath, viteServer} = options

  const runtimePath = _findRuntimeFile({packagePath})

  if (!runtimePath) {
    return undefined
  }

  const runtime = await _loadRuntimeModule<WorkshopRuntimeOptions>({
    root: packagePath,
    filePath: runtimePath,
    viteServer,
  })

  return runtime
}
