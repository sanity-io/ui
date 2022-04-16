import {
  ApiClass,
  ApiConstructor,
  ApiItem,
  ApiMethod,
  ApiProperty,
  Parameter,
  TypeParameter,
} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {RELEASE_TAGS} from './constants'
import {createId, hash, sanitizeName, slugify} from './helpers'
import {transformDocComment, _transformDocCommentContent} from './transformDocComment'
import {transformTokens} from './transformTokens'
import {TransformContext} from './types'

export function transformClass(ctx: TransformContext, node: ApiClass): SanityDocumentValue {
  const docComment = node.tsdocComment
  const name = sanitizeName(node.name)

  if (!ctx.package) {
    throw new Error('transformClass: missing package document')
  }

  if (!ctx.export) {
    throw new Error('transformClass: missing export document')
  }

  return {
    _type: 'api.class',
    _id: createId(ctx, node.canonicalReference.toString()),
    package: {_type: 'reference', _ref: ctx.package._id, _weak: true},
    name,
    slug: {_type: 'slug', current: slugify(name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    releaseTag: RELEASE_TAGS[node.releaseTag],
    members: node.members.map((m) => _transformClassMember(ctx, m)),
  }
}

function _transformClassMember(ctx: TransformContext, m: ApiItem): Record<string, unknown> {
  if (m.kind === 'Constructor') {
    const mem = m as ApiConstructor
    const docComment = mem.tsdocComment

    return {
      _type: 'api.constructor',
      _key: hash(mem.canonicalReference.toString()),
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      comment: docComment ? transformDocComment(docComment) : undefined,
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      members: mem.members.map((m) => _transformConstructorMember(ctx, m)),
    }
  }

  if (m.kind === 'Property') {
    const mem = m as ApiProperty
    const docComment = mem.tsdocComment

    return {
      _type: 'api.property',
      _key: hash(mem.canonicalReference.toString()),
      name: mem.name,
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      comment: docComment ? transformDocComment(docComment) : undefined,
      isEventProperty: mem.isEventProperty,
      isOptional: mem.isOptional,
      isStatic: mem.isStatic,
      type: transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.propertyTypeExcerpt.tokenRange.startIndex,
          mem.propertyTypeExcerpt.tokenRange.endIndex
        )
      ),
    }
  }

  if (m.kind === 'Method') {
    const mem = m as ApiMethod
    const docComment = mem.tsdocComment

    return {
      _type: 'api.method',
      _key: hash(mem.canonicalReference.toString()),
      name: mem.name,
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      comment: docComment ? transformDocComment(docComment) : undefined,
      isOptional: mem.isOptional,
      isStatic: mem.isStatic,
      members: mem.members.map((m) => _transformMethodMember(ctx, m)),
      typeParameters: mem.typeParameters.map((p) => _transformTypeParameter(ctx, mem, p)),
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      returnType: transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.returnTypeExcerpt.tokenRange.startIndex,
          mem.returnTypeExcerpt.tokenRange.endIndex
        )
      ),
    }
  }

  throw new Error(`Unknown class member kind: ${m.kind}`)
}

function _transformTypeParameter(
  ctx: TransformContext,
  method: ApiMethod,
  typeParam: TypeParameter
) {
  return {
    _type: 'api.typeParameter',
    _key: typeParam.name,
    name: typeParam.name,
    defaultType: transformTokens(
      ctx,
      method.excerptTokens.slice(
        typeParam.defaultTypeExcerpt.tokenRange.startIndex,
        typeParam.defaultTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}

function _transformParameter(ctx: TransformContext, node: ApiConstructor, param: Parameter) {
  const tsDocComment = param.tsdocParamBlock?.content

  return {
    _type: 'api.parameter',
    _key: hash(param.name),
    name: param.name,
    comment: tsDocComment ? _transformDocCommentContent(tsDocComment) : undefined,
    type: transformTokens(
      ctx,
      node.excerptTokens.slice(
        param.parameterTypeExcerpt.tokenRange.startIndex,
        param.parameterTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}

function _transformConstructorMember(_ctx: TransformContext, m: ApiItem): Record<string, unknown> {
  // @todo
  throw new Error(`Unknown constructor member kind: ${m.kind}`)
}

function _transformMethodMember(_ctx: TransformContext, m: ApiItem): Record<string, unknown> {
  // @todo
  throw new Error(`Unknown method member kind: ${m.kind}`)
}
