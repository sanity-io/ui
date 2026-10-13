import {defineConfig} from 'vite'

import {createLibConfig} from '../../shared/vite-lib.ts'
import pkg from './package.json' with {type: 'json'}

export default defineConfig(createLibConfig({name: pkg.name, version: pkg.version}))
