import {defineSyncTagInvalidateFunction} from '@sanity/blueprints'

// The dataset operated by https://www.sanity.io/ui
export const invalidateSyncTagsFunction = defineSyncTagInvalidateFunction({
  event: {
    resource: {
      id: 'mos42crl.production',
      type: 'dataset',
    },
  },
  name: 'invalidate-sync-tags',
})
