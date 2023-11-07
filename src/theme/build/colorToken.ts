import {ColorHueKey} from '@sanity/color'
import {ThemeColorTokenValue, parseTokenValue, TokenColorValueNode} from '../config'

export interface ColorTokenContext {
  hue: ColorHueKey
  scheme: 'light' | 'dark'
}

export function resolveColorTokenValue(
  context: ColorTokenContext,
  value: ThemeColorTokenValue,
): string {
  const {hue, scheme} = context
  const node = parseTokenValue(value[scheme === 'light' ? 0 : 1])

  if (!node || node.type !== 'color') {
    throw new Error(`Invalid color token: ${value[0]}`)
  }

  return compileColorTokenValue({...node, hue: node.hue || hue})
}

export function compileColorTokenValue(node: TokenColorValueNode): string {
  let key = ''

  if (node.key === 'black' || node.key === 'white') {
    key = node.key
  } else {
    key = `${node.hue}/${node.tint}`
  }

  if (node.opacity !== undefined) {
    key += `/${node.opacity}`
  }

  return key
}
