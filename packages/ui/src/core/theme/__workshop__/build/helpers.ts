import {isRecord} from '../../../lib/isRecord'

export function getCSSProps(value: Record<string, unknown>): Record<string, string> {
  const entries = getCSSPropsEntries(value)

  return Object.fromEntries(
    entries.map((entry) => {
      return [`--${entry.path.map(camelCaseToSnakeCase).join('-')}`, String(entry.value)]
    }),
  )
}

interface CSSPropEntry {
  path: string[]
  value: unknown
}

function getCSSPropsEntries(value: Record<string, unknown>, path: string[] = []): CSSPropEntry[] {
  const entries: CSSPropEntry[] = []

  for (const [key, val] of Object.entries(value)) {
    if (key.startsWith('_')) continue

    if (isRecord(val)) {
      entries.push(...getCSSPropsEntries(val, [...path, key]))
    } else if (Array.isArray(val)) {
      entries.push(
        ...val.map((d, idx) => {
          if (isRecord(d)) {
            entries.push(...getCSSPropsEntries(d, [...path, key, String(idx)]))
          }

          return {path: [...path, key, String(idx)], value: String(d)}
        }),
      )
    } else {
      entries.push({path: [...path, key], value: val})
    }
  }

  return entries
}

function camelCaseToSnakeCase(value: string): string {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
}
