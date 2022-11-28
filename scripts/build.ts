import path from 'path'
import {build} from '@sanity/ui-workshop/runtime'

global.__DEV__ = true

build({cwd: path.resolve(__dirname, '..')}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
