import {defineBlueprint} from '@sanity/blueprints'

import {invalidateSyncTagsFunction} from './functions/invalidate-sync-tags/function'

export default defineBlueprint({
  resources: [invalidateSyncTagsFunction],
})
