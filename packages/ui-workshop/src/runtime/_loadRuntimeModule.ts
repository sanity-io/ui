import path from 'node:path'
import {pathToFileURL} from 'node:url'

import type {ViteDevServer} from 'vite'

export async function _loadRuntimeModule<T = unknown>(args: {
  root: string
  filePath: string
  viteServer: ViteDevServer
}): Promise<T | undefined> {
  // Use a file URL to avoid Windows path quirks
  const url = pathToFileURL(path.resolve(args.filePath)).href

  const mod = await args.viteServer.ssrLoadModule(url)
  return (mod?.['default'] ?? mod) as T | undefined
}
