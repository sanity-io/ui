import {set} from 'lodash'

import {TokenEntry} from './types'

export function buildConfigFromEntries(entries: TokenEntry[]): Record<string, unknown> {
  const config: Record<string, unknown> = {}

  for (const [key, value] of entries) {
    set(config, key.split('/'), value)
  }

  return config
}
