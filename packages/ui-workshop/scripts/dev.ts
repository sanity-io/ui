import {dev} from '../src/runtime'

dev({cwd: process.cwd()}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
