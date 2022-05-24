import {
  ApiClass,
  ApiConstructor,
  ApiItem,
  ApiMethod,
  ApiProperty,
  Parameter,
  TypeParameter,
} from '@microsoft/api-extractor-model'
import {SanityArrayObjectItem} from '../sanity'
import {
  APIClassDocument,
  SerializedAPIClassMember,
  SerializedAPIParameter,
  SerializedAPITypeParameter,
} from '../types'
import {_transformTokens} from './_transformTokens'
import {RELEASE_TAGS} from './constants'
import {_createExportMemberId, hash, _sanitizeName, _slugify} from './helpers'
import {transformDocComment, _transformDocCommentContent} from './transformDocComment'
import {TransformContext} from './types'

export function transformClass(ctx: TransformContext, node: ApiClass): APIClassDocument {
  if (!ctx.export) {
    throw new Error('transformClass: missing `export` document')
  }

  if (!ctx.package) {
    throw new Error('transformClass: missing `package` document')
  }

  if (!ctx.release) {
    throw new Error('transformClass: missing `release` document')
  }

  const docComment = node.tsdocComment
  const name = _sanitizeName(node.name)

  return {
    _type: 'api.class',
    _id: _createExportMemberId(ctx, node.canonicalReference.toString()),
    comment: docComment ? transformDocComment(docComment) : undefined,
    export: {_type: 'reference', _ref: ctx.export._id},
    members: node.members.map((m) => _transformClassMember(ctx, m)),
    name,
    package: {_type: 'reference', _ref: ctx.package._id},
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(name)},
  }
}

function _transformClassMember(
  ctx: TransformContext,
  m: ApiItem
): SanityArrayObjectItem<SerializedAPIClassMember> {
  if (m.kind === 'Constructor') {
    const mem = m as ApiConstructor
    const docComment = mem.tsdocComment

    return {
      _type: 'api.constructorMember',
      _key: hash(mem.canonicalReference.toString()),
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      comment: docComment ? transformDocComment(docComment) : undefined,
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
    }
  }

  if (m.kind === 'Method') {
    const mem = m as ApiMethod
    const docComment = mem.tsdocComment

    return {
      _type: 'api.methodMember',
      _key: hash(mem.canonicalReference.toString()),
      comment: docComment ? transformDocComment(docComment) : undefined,
      name: mem.name,
      isOptional: mem.isOptional,
      isStatic: mem.isStatic,
      parameters: mem.parameters.map((p) => _transformParameter(ctx, mem, p)),
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      returnType: _transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.returnTypeExcerpt.tokenRange.startIndex,
          mem.returnTypeExcerpt.tokenRange.endIndex
        )
      ),
      typeParameters: mem.typeParameters.map((p) => _transformTypeParameter(ctx, mem, p)),
    }
  }

  if (m.kind === 'Property') {
    const mem = m as ApiProperty
    const docComment = mem.tsdocComment

    return {
      _type: 'api.propertyMember',
      _key: hash(mem.canonicalReference.toString()),
      comment: docComment ? transformDocComment(docComment) : undefined,
      name: mem.name,
      isEventProperty: mem.isEventProperty,
      isOptional: mem.isOptional,
      isStatic: mem.isStatic,
      releaseTag: RELEASE_TAGS[mem.releaseTag],
      type: _transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.propertyTypeExcerpt.tokenRange.startIndex,
          mem.propertyTypeExcerpt.tokenRange.endIndex
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

function _transformParameter(
  ctx: TransformContext,
  node: ApiConstructor,
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
