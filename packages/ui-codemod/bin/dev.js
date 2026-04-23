#!/usr/bin/env node

import {createRequire} from 'node:module'
import {pathToFileURL} from 'node:url'

const require = createRequire(import.meta.url)
const {register} = await import(pathToFileURL(require.resolve('tsx/esm/api')))
register()

const {execute} = await import('@oclif/core')
await execute({development: true, dir: import.meta.url})
