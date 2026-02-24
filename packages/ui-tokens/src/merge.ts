/* eslint-disable @typescript-eslint/no-explicit-any */

export function merge<T extends Record<string, any>>(...records: (T | undefined)[]): T {
  return (records.filter(Boolean) as T[]).reduce(_merge, {} as T)
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

function isRecord(value: unknown): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
