import {BREAKPOINT_KEYS} from './constants'
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
    if (value === true && options?.valueWhenTrue) {
      value = options.valueWhenTrue
    } else {
      return undefined
    }
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return rules[value]?.[0]
  }

  const classNames: string[] = []

  for (const key of BREAKPOINT_KEYS) {
    const valueAtKey = value[key]

    if (valueAtKey !== undefined && valueAtKey !== null && typeof valueAtKey !== 'boolean') {
      const rule = rules[valueAtKey]

      if (!rule) {
        // eslint-disable-next-line no-console
        console.warn(`Rule not found for value at key:`, {
          rules,
          valueAtIndex: valueAtKey,
          rule,
          key,
        })
        continue
      }

      classNames.push(rule?.[key])
    }
  }

  return classNames.join(' ') || undefined
}
