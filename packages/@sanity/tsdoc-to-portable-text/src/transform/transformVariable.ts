import {ApiVariable} from '@microsoft/api-extractor-model'
import {DocComment, DocPlainText} from '@microsoft/tsdoc'
import {SanityDocumentValue} from '../sanity'
import {RELEASE_TAGS} from './constants'
import {createId, sanitizeName, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'
import {TransformContext} from './types'

export function transformVariable(ctx: TransformContext, node: ApiVariable): SanityDocumentValue {
  if (!ctx.package) {
    throw new Error('transformVariable: missing `package` document')
  }

  if (!ctx.release) {
    throw new Error('transformVariable: missing `release` document')
  }

  if (!ctx.export) {
    throw new Error('transformVariable: missing `export` document')
  }

  const name = sanitizeName(node.name)
  const docComment = node.tsdocComment
  const comment = docComment ? transformDocComment(docComment) : undefined
  const type = transformTokens(
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
    _id: createId(ctx, node.canonicalReference.toString()),
    package: {_type: 'reference', _ref: ctx.package._id, _weak: true},
    release: {_type: 'reference', _ref: ctx.release._id, _weak: true},
    name,
    slug: {_type: 'slug', current: slugify(name)},
    comment,
    releaseTag: RELEASE_TAGS[node.releaseTag],
    type,
    isReactComponentType,
    propsType,
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

function _variablePropsType(ctx: TransformContext, node: ApiVariable, docComment?: DocComment) {
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
        _ref: createId(ctx, sanityUIRef.canonicalReference.toString()),
        _weak: true,
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
          _ref: createId(ctx, `@sanity/ui!${text}:interface`),
          _weak: true,
        }
      }
    }
  }

  // console.warn(`WARN: could not detect props type for \`${node.name}\` (variable)`)

  return undefined
}
