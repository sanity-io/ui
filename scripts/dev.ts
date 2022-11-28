import path from 'path'
import {dev} from '@sanity/ui-workshop/runtime'

global.__DEV__ = true

dev({cwd: path.resolve(__dirname, '..')}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
