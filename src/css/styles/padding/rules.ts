import {SPACE} from '@sanity/ui/theme'

import {responsiveRules} from '../../responsiveRules'
import {type Rules} from '../../types'
import {vars} from '../../vars'

export const paddingRules: Rules = {
  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`p-${space}`.replace('.', '_'), {padding: vars.space[space]}),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`px-${space}`.replace('.', '_'), {
        paddingLeft: vars.space[space],
        paddingRight: vars.space[space],
      }),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`py-${space}`.replace('.', '_'), {
        paddingTop: vars.space[space],
        paddingBottom: vars.space[space],
      }),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`pt-${space}`.replace('.', '_'), {paddingTop: vars.space[space]}),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`pr-${space}`.replace('.', '_'), {paddingRight: vars.space[space]}),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`pb-${space}`.replace('.', '_'), {paddingBottom: vars.space[space]}),
    }
  }, {}),

  ...SPACE.reduce<Rules>((acc, space) => {
    return {
      ...acc,
      ...responsiveRules(`pl-${space}`.replace('.', '_'), {paddingLeft: vars.space[space]}),
    }
  }, {}),
}
