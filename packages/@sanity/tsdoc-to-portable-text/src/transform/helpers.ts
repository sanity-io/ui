import crypto from 'crypto'
import slugify from 'slugify'
import {TransformContext} from './types'

export function hash(key: string): string {
  return crypto.createHash('md5').update(key).digest('hex')
}

export function _createExportMemberId(ctx: TransformContext, key: string): string {
  const {scope, name, export: exp, version} = ctx

  const exportName = [scope, name, exp.path !== '.' && exp.path].filter(Boolean).join('/')

  return hash(`${exportName}@${version}/${key}`)
}

export function isArray(val: unknown): val is unknown[] {
  return Array.isArray(val)
}

export function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && Boolean(val)
}

export function _sanitizeName(str: string): string {
  // Since `Text` is part of the default browser scope, API extractor will append `_2` to other
  // implementations. So we need to replace it for the case of readable docs.
  if (str === 'Text_2') {
    return 'Text'
  }

  return str
}

export function _slugify(str: string): string {
  return slugify(str)
}

export function _parsePackageName(nameStr: string): [string | undefined, string] {
  const p = nameStr.split('/')

  const packageScope = p.length > 1 ? p[0] : undefined
  const packageName = p.length > 1 ? p[1] : p[0]

  return [packageScope, packageName]
}
