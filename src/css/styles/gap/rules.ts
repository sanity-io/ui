import {SPACE} from '@sanity/ui/theme'

import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'
import {vars} from '../../vars'

export const gapRules: Rules = {
  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`g-${space}`.replace('.', '_'), {
        gap: vars.space[space],
      }),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`gx-${space}`.replace('.', '_'), {
        columnGap: vars.space[space],
      }),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`gy-${space}`.replace('.', '_'), {
        rowGap: vars.space[space],
      }),
    }
  }, {}),
}
