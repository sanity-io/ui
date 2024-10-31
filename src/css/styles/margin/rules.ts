import {SPACE} from '@sanity/ui/theme'

import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'
import {vars} from '../../vars'

export const marginRules: Rules = {
  // NOTE: order matters

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`m-${space}`.replace('.', '_'), {margin: vars.space[space]}),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`mx-${space}`.replace('.', '_'), {
        marginLeft: vars.space[space],
        marginRight: vars.space[space],
      }),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`my-${space}`.replace('.', '_'), {
        marginTop: vars.space[space],
        marginBottom: vars.space[space],
      }),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`mt-${space}`.replace('.', '_'), {marginTop: vars.space[space]}),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`mr-${space}`.replace('.', '_'), {marginRight: vars.space[space]}),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`mb-${space}`.replace('.', '_'), {marginBottom: vars.space[space]}),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`ml-${space}`.replace('.', '_'), {marginLeft: vars.space[space]}),
    }
  }, {}),
}
