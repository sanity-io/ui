import {build} from '../src/runtime'

build({cwd: process.cwd()}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
