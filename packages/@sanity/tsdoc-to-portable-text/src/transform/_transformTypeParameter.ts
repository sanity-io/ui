import {ApiFunction, TypeParameter} from '@microsoft/api-extractor-model'
import {SanityArrayObjectItem} from '../sanity'
import {SerializedAPITypeParameter} from '../types'
import {_transformTokens} from './_transformTokens'
import {TransformContext} from './types'

export function _transformTypeParameter(
  ctx: TransformContext,
  method: ApiFunction,
  typeParam: TypeParameter
): SanityArrayObjectItem<SerializedAPITypeParameter> {
  return {
    _type: 'api.typeParameter',
    _key: typeParam.name,
    name: typeParam.name,
    defaultType: _transformTokens(
      ctx,
      method.excerptTokens.slice(
        typeParam.defaultTypeExcerpt.tokenRange.startIndex,
        typeParam.defaultTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}
