// import {scopeClassName as _} from './scopeClassName'
import {ResponsiveProp} from './types'

function _(className: string) {
  return className
}

export function _resp<T>(
  prefix: string | undefined,
  prop: ResponsiveProp<T> | undefined,
): string | undefined {
  if (prop === undefined || prop === false) {
    return undefined
  }

  if (Array.isArray(prop)) {
    return prop
      .map((value, index) => {
        if (value === undefined || (typeof prop === 'boolean' && prop === false)) return undefined

        const className = (typeof value === 'boolean' ? [prefix] : [prefix, value])
          .filter((s) => s === 0 || Boolean(s))
          .join('-')
          .replace(/\./g, '_')

        return index === 0 ? _(className) : _(`${index}:${className}`)
      })
      .filter(Boolean)
      .join(' ')
  }

  return _(
    (typeof prop === 'boolean' ? [prefix] : [prefix, prop])
      .filter((s) => s === 0 || Boolean(s))
      .join('-')
      .replace(/\./g, '_'),
  )
}
