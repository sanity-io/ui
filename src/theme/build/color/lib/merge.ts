import {isRecord} from '../../../../lib/isRecord'

export function merge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const ret = {...target}

  for (const key of Object.keys(source)) {
    const prevValue = target[key]
    const nextValue = source[key]

    if (isRecord(prevValue) && isRecord(nextValue)) {
      ret[key] = merge(prevValue, nextValue)
    } else {
      ret[key] = nextValue
    }
  }

  return ret
}
