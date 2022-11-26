import {dev} from '../src/runtime'

global.__DEV__ = true

dev({cwd: process.cwd()}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
