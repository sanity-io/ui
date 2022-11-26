import {build} from '../src/runtime'

global.__DEV__ = true

build({cwd: process.cwd()}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
