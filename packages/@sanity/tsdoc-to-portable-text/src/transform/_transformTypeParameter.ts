import {
  ApiCallSignature,
  ApiFunction,
  ApiInterface,
  TypeParameter,
} from '@microsoft/api-extractor-model'
import {SanityArrayItem} from '../_lib/sanity'
import {SerializedAPITypeParameter} from '../types'
import {_transformTokens} from './_transformTokens'
import {TransformContext} from './types'

export function _transformTypeParameter(
  ctx: TransformContext,
  node: ApiCallSignature | ApiFunction | ApiInterface,
  p: TypeParameter,
  idx: number
): SanityArrayItem<SerializedAPITypeParameter> {
  return {
    _type: 'api.typeParameter',
    _key: `typeParameter${idx}`,
    name: p.name,
    constraintType: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        p.constraintExcerpt.tokenRange.startIndex,
        p.constraintExcerpt.tokenRange.endIndex
      )
    ),
    defaultType: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        p.defaultTypeExcerpt.tokenRange.startIndex,
        p.defaultTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}
