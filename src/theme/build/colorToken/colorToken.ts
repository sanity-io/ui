import {parseTokenValue, ThemeColorTokenValue} from '../../config'
import {compileColorTokenValue} from './compileColorToken'
import {ColorTokenContext} from './types'

const DEFAULT_COLOR_TOKEN_VALUE: ThemeColorTokenValue = ['500', '500']

export function resolveColorTokenValue(
  context: ColorTokenContext,
  value: ThemeColorTokenValue = DEFAULT_COLOR_TOKEN_VALUE,
): string {
  const {hue, scheme} = context
  const node = parseTokenValue(value[scheme === 'light' ? 0 : 1])

  if (!node || node.type !== 'color') {
    throw new Error(`Invalid color token: ${value[0]}`)
  }

  return compileColorTokenValue({...node, hue: node.hue || hue})
}
