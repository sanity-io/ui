// import {MEDIA} from './constants'
import {BREAKPOINTS} from './constants'
import type {ResponsiveProp, ResponsiveRuleOptions} from './types'

export function _responsiveClassName<T extends string | number>(
  rules: ResponsiveRuleOptions<T>,
  _value: ResponsiveProp<T | boolean> | T | undefined,
  options?: {
    valueWhenTrue: T
  },
): string | undefined {
  let value = _value

  if (value === undefined) {
    return undefined
  }

  if (typeof value === 'boolean') {
    if (value && options?.valueWhenTrue) {
      value = options.valueWhenTrue
    } else {
      return undefined
    }
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return rules[value]?.[0]
  }

  const classNames: string[] = []

  for (const _index of Object.keys(BREAKPOINTS)) {
    const index = Number(_index) as keyof typeof BREAKPOINTS

    const valueAtIndex = value[index]

    if (valueAtIndex !== undefined && valueAtIndex !== null && typeof valueAtIndex !== 'boolean') {
      const rule = rules[valueAtIndex]

      classNames.push(rule[index])
    }
  }

  return classNames.join(' ') || undefined
}
