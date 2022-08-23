import {ApiVariable} from '@microsoft/api-extractor-model'
import {DocComment, DocPlainText} from '@microsoft/tsdoc'
import {SanityReferenceValue} from '../_lib/sanity'
import {SerializedAPIVariable} from '../types'
import {_transformTokens} from './_transformTokens'
import {RELEASE_TAGS} from './constants'
import {_createExportMemberId, _sanitizeName, _slugify} from './helpers'
import {_transformDocComment} from './transformDocComment'
import {TransformContext} from './types'

/**
 * @internal
 */
export function _transformVariable(
  ctx: TransformContext,
  node: ApiVariable
): SerializedAPIVariable {
  if (!ctx.export) {
    throw new Error('transformVariable: missing `export` document')
  }

  if (!ctx.package) {
    throw new Error('transformVariable: missing `package` document')
  }

  if (!ctx.release) {
    throw new Error('transformVariable: missing `release` document')
  }

  const name = _sanitizeName(node.name)
  const docComment = node.tsdocComment
  const comment = docComment ? _transformDocComment(docComment) : undefined
  const type = _transformTokens(
    ctx,
    node.excerptTokens.slice(
      node.variableTypeExcerpt.tokenRange.startIndex,
      node.variableTypeExcerpt.tokenRange.endIndex
    )
  )
  const isReactComponentType = _variableIsReactComponentType(node)
  const propsType = isReactComponentType ? _variablePropsType(ctx, node, docComment) : undefined

  return {
    _type: 'api.variable',
    comment,
    export: {_type: 'reference', _ref: ctx.export._id},
    isReactComponentType,
    name,
    package: {_type: 'reference', _ref: ctx.package._id},
    propsType,
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(name)},
    type,
  }
}

function _variableIsReactComponentType(node: ApiVariable) {
  const typeTokens = node.excerptTokens.slice(
    node.variableTypeExcerpt.tokenRange.startIndex,
    node.variableTypeExcerpt.tokenRange.endIndex
  )

  const typeCode = typeTokens
    .map((t) => t.text)
    .join('')
    .trim()

  const isNamedExoticComponent = typeCode.startsWith('React.NamedExoticComponent<')
  const isForwardRefExoticComponent = typeCode.startsWith('React.ForwardRefExoticComponent<')
  const isStyledComponent = typeCode.startsWith('StyledComponent<')
  const returnsReactElement = typeCode.endsWith('=> React.ReactElement')

  if (
    isNamedExoticComponent ||
    isForwardRefExoticComponent ||
    isStyledComponent ||
    returnsReactElement
  ) {
    return true
  }

  return false
}

function _variablePropsType(
  ctx: TransformContext,
  node: ApiVariable,
  docComment?: DocComment
): SanityReferenceValue | undefined {
  const typeTokens = node.excerptTokens.slice(
    node.variableTypeExcerpt.tokenRange.startIndex,
    node.variableTypeExcerpt.tokenRange.endIndex
  )

  if (
    typeTokens[0].kind === 'Reference' &&
    typeTokens[0].text === 'React.ForwardRefExoticComponent'
  ) {
    const sanityUIRef = typeTokens.find(
      (t) =>
        t.kind === 'Reference' &&
        t.canonicalReference?.source?.toString() === '@sanity/ui!' &&
        t.text.endsWith('Props')
    )

    if (sanityUIRef && sanityUIRef.canonicalReference) {
      return {
        _type: 'reference',
        _ref: _createExportMemberId(ctx, sanityUIRef.canonicalReference.toString()),
      }
    }
  }

  if (docComment) {
    for (const seeBlock of docComment.seeBlocks) {
      const seeBlockNodes = seeBlock.getChildNodes()
      const blockContentNode = seeBlockNodes[1]
      const blockContentNodes = blockContentNode.getChildNodes()
      const paragraphNode = blockContentNodes[0]
      const textNode = paragraphNode.getChildNodes().find((n) => n.kind === 'PlainText')

      if (textNode) {
        const text = (textNode as DocPlainText).text.trim()

        return {
          _type: 'reference',
          _ref: _createExportMemberId(ctx, `@sanity/ui!${text}:interface`),
        }
      }
    }
  }

  return undefined
}
