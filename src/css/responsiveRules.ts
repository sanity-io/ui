import {type Properties, type Rules} from './types'

export function responsiveRules(className: string, props: Properties): Rules {
  return {
    [className]: props,
    [`_1:${className}`]: {
      '@media': {'screen and (min-width: 360px)': props},
    },
    [`_2:${className}`]: {
      '@media': {'screen and (min-width: 600px)': props},
    },
    [`_3:${className}`]: {
      '@media': {'screen and (min-width: 900px)': props},
    },
    [`_4:${className}`]: {
      '@media': {'screen and (min-width: 1200px)': props},
    },
    [`_5:${className}`]: {
      '@media': {'screen and (min-width: 1800px)': props},
    },
    [`_6:${className}`]: {
      '@media': {'screen and (min-width: 2400px)': props},
    },
  }
}
