import type {API, Collection} from 'jscodeshift'

import type {BaseOptions} from '../types/BaseOptions'
import {getComponentLocalNames} from './getComponentLocalNames'
import {getStyledComponentAliases} from './getStyledComponentAliases'

export function getComponentJsxNames(
  j: API['jscodeshift'],
  root: Collection,
  componentName: string,
  options?: BaseOptions,
): Set<string> {
  const localNames = getComponentLocalNames(j, root, componentName, options)
  const styledAliases = getStyledComponentAliases(j, root, localNames)

  return new Set([...localNames, ...styledAliases])
}
