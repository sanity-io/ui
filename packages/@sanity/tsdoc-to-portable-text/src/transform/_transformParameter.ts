import {
  ApiCallSignature,
  ApiConstructor,
  ApiFunction,
  ApiIndexSignature,
  Parameter,
} from '@microsoft/api-extractor-model'
import {SanityArrayItem} from '../_lib/sanity'
import {SerializedAPIParameter} from '../types'
import {_transformTokens} from './_transformTokens'
import {RELEASE_TAGS} from './constants'
import {_transformDocCommentContent} from './transformDocComment'
import {TransformContext} from './types'

export function _transformParameter(
  ctx: TransformContext,
  node: ApiCallSignature | ApiConstructor | ApiFunction | ApiIndexSignature,
  param: Parameter,
  idx: number
): SanityArrayItem<SerializedAPIParameter> {
  const tsDocComment = param.tsdocParamBlock?.content

  return {
    _type: 'api.parameter',
    _key: `param${idx}`,
    comment: tsDocComment
      ? {
          _type: 'tsdoc.docComment',
          summary: _transformDocCommentContent(tsDocComment),
        }
      : undefined,
    name: param.name,
    releaseTag: RELEASE_TAGS[node.releaseTag],
    type: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        param.parameterTypeExcerpt.tokenRange.startIndex,
        param.parameterTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}
