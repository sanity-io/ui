/* eslint-disable @typescript-eslint/no-explicit-any */

import {TokenEntry} from './types'

export function buildTokenEntries(
  obj: Record<string, unknown> | unknown[],
  path: (string | number)[] = [],
): TokenEntry[] {
  if (_isArray(obj)) {
    return obj.reduce<TokenEntry[]>((acc, value, index) => {
      if (_isRecord(value)) {
        return acc.concat(buildTokenEntries(value, path.concat(index)))
      }

      if (_isArray(value)) {
        return acc.concat(buildTokenEntries(value, path.concat(index)))
      }

      acc.push([`${path.concat(index.toString()).join('/')}` as any, value as any])

      return acc
    }, [])
  }

  return Object.entries(obj).reduce<TokenEntry[]>((acc, [key, value]) => {
    if (_isRecord(value)) {
      return acc.concat(buildTokenEntries(value, path.concat(key)))
    }

    if (_isArray(value)) {
      // color value
      if (value.length === 2 && _isString(value[0]) && _isString(value[1])) {
        acc.push([`${path.concat(key).join('/')}` as any, value as any])

        return acc
      }

      // shadow value
      if (
        value.length === 4 &&
        _isNumber(value[0]) &&
        _isNumber(value[1]) &&
        _isNumber(value[2]) &&
        _isNumber(value[3])
      ) {
        acc.push([`${path.concat(key).join('/')}` as any, value as any])

        return acc
      }

      return acc.concat(buildTokenEntries(value, path.concat(key)))
    }

    acc.push([`${path.concat(key).join('/')}` as any, value as any])

    return acc
  }, [])
}

function _isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

function _isString(value: unknown): value is string {
  return typeof value === 'string'
}

function _isRecord<T>(value: unknown): value is Record<keyof T, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function _isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}
