import {ApiFunction} from '@microsoft/api-extractor-model'
import {SerializedAPIFunction} from '../types'
import {_transformParameter} from './_transformParameter'
import {_transformTokens} from './_transformTokens'
import {_transformTypeParameter} from './_transformTypeParameter'
import {RELEASE_TAGS} from './constants'
import {_sanitizeName, _slugify} from './helpers'
import {_transformDocComment} from './transformDocComment'
import {TransformContext} from './types'

/**
 * @internal
 */
export function _transformFunction(
  ctx: TransformContext,
  node: ApiFunction
): SerializedAPIFunction {
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
    comment: docComment ? _transformDocComment(docComment) : undefined,
    export: {_type: 'reference', _ref: ctx.export._id},
    isReactComponentType,
    name,
    package: {_type: 'reference', _ref: ctx.package._id},
    parameters: node.parameters.map((p, idx) => _transformParameter(ctx, node, p, idx)),
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
    typeParameters: node.typeParameters.map((p, idx) => _transformTypeParameter(ctx, node, p, idx)),
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

  return undefined
}
