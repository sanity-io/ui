import {defineBlueprint} from '@sanity/blueprints'

import {enrichIconFunction} from './functions/enrich-icon/function'

export default defineBlueprint({
  resources: [enrichIconFunction],
})
