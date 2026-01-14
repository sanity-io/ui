import {preview} from '@sanity/ui-workshop/runtime'

preview().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
