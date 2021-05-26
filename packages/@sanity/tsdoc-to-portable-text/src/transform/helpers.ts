import crypto from 'crypto'
import _slugify from 'slugify'
import {TransformOpts} from './types'

export function hash(key: string): string {
  return crypto.createHash('md5').update(key).digest('hex')
}

export function createId(config: TransformOpts, key: string): string {
  if (config.package.scope) {
    return hash(`${config.package.scope}/${config.package.name}@${config.package.version}/${key}`)
  }

  return hash(`${config.package.name}@${config.package.version}/${key}`)
}

export function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val)
}

export function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && Boolean(val)
}

export function sanitizeName(str: string): string {
  // Since `Text` is part of the default browser scope, API extractor will append `_2` to other
  // implementations. So we need to replace it for the case of readable docs.
  if (str === 'Text_2') {
    return 'Text'
  }

  return str
}

export function slugify(str: string): string {
  return _slugify(str)
}
