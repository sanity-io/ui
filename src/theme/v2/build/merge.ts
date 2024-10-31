import {isRecord} from './lib/isRecord'

export function merge<T extends Record<string, any>>(...records: (T | undefined)[]): T {
  const _records = records.filter(Boolean) as T[]

  if (_records.length === 0) {
    return {} as T
  }

  return _records.reduce(_merge, {} as T)
}

function _merge<T extends Record<string, any>>(acc: T, source: T): T {
  for (const key of Object.keys(source)) {
    const prevValue = acc[key]
    const nextValue = source[key]

    if (isRecord(prevValue) && isRecord(nextValue)) {
      ;(acc as any)[key] = merge(prevValue, nextValue)
    } else {
      ;(acc as any)[key] = nextValue
    }
  }

  return acc
}
