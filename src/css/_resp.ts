import {ResponsiveProp} from './types'

export function _resp<T>(
  prefix: string | undefined,
  prop: ResponsiveProp<T> | undefined,
): string | undefined {
  if (prop === undefined) {
    return undefined
  }

  if (Array.isArray(prop)) {
    return prop
      .map((value, index) => {
        const className = (typeof value === 'boolean' ? [prefix] : [prefix, value])
          .filter((s) => s === 0 || Boolean(s))
          .join('-')
          .replace(/\./g, '_')

        return index === 0 ? `${className}` : `_${index}:${className}`
      })
      .join(' ')
  }

  return (typeof prop === 'boolean' ? [prefix] : [prefix, prop])
    .filter((s) => s === 0 || Boolean(s))
    .join('-')
    .replace(/\./g, '_')
}
