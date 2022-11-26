import {WorkshopConfigOptions} from '@sanity/ui-workshop'
import {TransformOptions} from 'esbuild'
import {_findConfigFile} from './_findConfigFile'

/** @internal */
export async function _loadConfig(options: {
  packagePath: string
}): Promise<WorkshopConfigOptions | undefined> {
  const {packagePath} = options

  const configPath = _findConfigFile({packagePath})

  if (!configPath) {
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {register} = require('esbuild-register/dist/node')

  const eslintOptions: TransformOptions = {
    // eslint options
    jsx: 'automatic',
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
    jsxImportSource: 'react',
    logLevel: 'silent',
  }

  const {unregister} = globalThis.__DEV__ ? {unregister: () => undefined} : register(eslintOptions)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(configPath)

  // Unregister the require hook if you don't need it anymore
  unregister()

  return config?.default || config
}
