import {BREAKPOINTS} from './constants'
import {type Properties, type Rules} from './types'

export function responsiveRules(className: string, props: Properties): Rules {
  const rules: Rules = {
    [className]: props,
  }

  for (const [index, width] of Object.entries(BREAKPOINTS)) {
    rules[`_${index}:${className}`] = {
      '@media': {
        [`screen and (min-width: ${width}px)`]: props,
      },
    }
  }

  return rules
}
