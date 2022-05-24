import {ApiFunction, Parameter} from '@microsoft/api-extractor-model'
import {SanityArrayObjectItem} from '../sanity'
import {APIFunctionDocument, SerializedAPIParameter} from '../types'
import {_transformTokens} from './_transformTokens'
import {_transformTypeParameter} from './_transformTypeParameter'
import {RELEASE_TAGS} from './constants'
import {_createExportMemberId, hash, _sanitizeName, _slugify} from './helpers'
import {transformDocComment, _transformDocCommentContent} from './transformDocComment'
import {TransformContext} from './types'

export function transformFunction(ctx: TransformContext, node: ApiFunction): APIFunctionDocument {
  if (!ctx.export) {
    throw new Error('transformFunction: missing `export` document')
  }

  if (!ctx.package) {
    throw new Error('transformFunction: missing `package` document')
  }

  if (!ctx.release) {
    throw new Error('transformFunction: missing `release` document')
  }

  const docComment = node.tsdocComment
  const name = _sanitizeName(node.name)
  const isReactComponentType = _functionIsReactComponentType(node)
  const propsType = isReactComponentType ? _functionPropsType(ctx, node) : undefined

  return {
    _type: 'api.function',
    _id: _createExportMemberId(ctx, node.canonicalReference.toString()),
    comment: docComment ? transformDocComment(docComment) : undefined,
    export: {_type: 'reference', _ref: ctx.export._id},
    isReactComponentType,
    name,
    package: {_type: 'reference', _ref: ctx.package._id},
    parameters: node.parameters.map((p) => transformFunctionParameter(ctx, node, p)),
    propsType,
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(name)},
    returnType: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        node.returnTypeExcerpt.tokenRange.startIndex,
        node.returnTypeExcerpt.tokenRange.endIndex
      )
    ),
    typeParameters: node.typeParameters.map((p) => _transformTypeParameter(ctx, node, p)),
  }
}

function transformFunctionParameter(
  ctx: TransformContext,
  node: ApiFunction,
  param: Parameter
): SanityArrayObjectItem<SerializedAPIParameter> {
  const tsDocComment = param.tsdocParamBlock?.content

  return {
    _type: 'api.parameter',
    _key: hash(param.name),
    comment: tsDocComment
      ? {
          _type: 'tsdoc.docComment',
          summary: _transformDocCommentContent(tsDocComment),
        }
      : undefined,
    name: param.name,
    type: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        param.parameterTypeExcerpt.tokenRange.startIndex,
        param.parameterTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}

function _functionIsReactComponentType(node: ApiFunction) {
  const returnTypeTokens = node.excerptTokens.slice(
    node.returnTypeExcerpt.tokenRange.startIndex,
    node.returnTypeExcerpt.tokenRange.endIndex
  )

  const returnTypeCode = returnTypeTokens
    .map((t) => t.text)
    .join('')
    .trim()

  const returnsReactElement = returnTypeCode === 'React.ReactElement'
  const returnsReactNode = returnTypeCode === 'React.ReactNode'

  const returnsReactPortal =
    returnTypeCode === 'React.ReactPortal' || returnTypeCode.startsWith('React.ReactPortal |')

  if (returnsReactElement || returnsReactNode || returnsReactPortal) {
    return true
  }

  return false
}

function _functionPropsType(ctx: TransformContext, node: ApiFunction) {
  const propsParam = node.parameters[0] && node.parameters[0].name === 'props' && node.parameters[0]

  if (propsParam) {
    const propsTokens = _transformTokens(
      ctx,
      node.excerptTokens.slice(
        propsParam.parameterTypeExcerpt.tokenRange.startIndex,
        propsParam.parameterTypeExcerpt.tokenRange.endIndex
      )
    )

    if (propsTokens.length) {
      return propsTokens[0].member
    }
  }

  // console.warn(`WARN: could not detect props type for \`${node.name}\` (function)`)

  return undefined
}
