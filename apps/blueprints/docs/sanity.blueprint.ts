import {defineBlueprint} from '@sanity/blueprints'

import {enrichIconFunction} from './functions/enrich-icon/function'
import {invalidateSyncTagsFunction} from './functions/invalidate-sync-tags/function'

export default defineBlueprint({
  resources: [enrichIconFunction, invalidateSyncTagsFunction],
})
