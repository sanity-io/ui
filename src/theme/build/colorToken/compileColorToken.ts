import { TokenColorValueNode } from '../../config/tokens/types'

export function compileColorTokenValue(node: TokenColorValueNode): string {
  let key = ''

  if (node.key === 'black' || node.key === 'white') {
    key = node.key
  } else {
    key = `${node.hue}/${node.tint}`
  }

  if (node.mix !== undefined) {
    return `${key} ${node.mix * 100}%`
  }

  if (node.opacity !== undefined) {
    key += `/${node.opacity}`
  }

  return key
}
