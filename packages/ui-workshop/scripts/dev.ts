import {dev} from '@sanity/ui-workshop/runtime'

dev().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
