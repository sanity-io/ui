import {
  ApiIndexSignature,
  ApiInterface,
  ApiItem,
  ApiPropertySignature,
  Parameter,
} from '@microsoft/api-extractor-model'
import {SanityDocumentValue} from '../sanity'
import {RELEASE_TAGS} from './constants'
import {createId, hash, sanitizeName, slugify} from './helpers'
import {transformDocComment} from './transformDocComment'
import {transformTokens} from './transformTokens'
import {TransformContext} from './types'

export function transformInterface(ctx: TransformContext, node: ApiInterface): SanityDocumentValue {
  const docComment = node.tsdocComment
  const name = sanitizeName(node.name)

  return {
    _type: 'api.interface',
    _id: createId(ctx, node.canonicalReference.toString()),
    release: {_type: 'reference', _ref: ctx.releaseDoc._id, _weak: true},
    name,
    slug: {_type: 'slug', current: slugify(name)},
    comment: docComment ? transformDocComment(docComment) : undefined,
    extends: node.extendsTypes.map((t, idx) => {
      return {
        _type: 'api.extend',
        _key: `extend${idx}`,
        type: transformTokens(
          ctx,
          t.excerpt.tokens.slice(t.excerpt.tokenRange.startIndex, t.excerpt.tokenRange.endIndex)
        ),
      }
    }),
    members: node.members.map((m) => transformInterfaceMember(ctx, m)),
    releaseTag: RELEASE_TAGS[node.releaseTag],
    typeParameters: node.typeParameters.map((p, idx: number) => {
      return {
        _type: 'api.typeParameter',
        _key: `typeParameter${idx}`,
        name: p.name,
        constraintType: transformTokens(
          ctx,
          node.excerptTokens.slice(
            p.constraintExcerpt.tokenRange.startIndex,
            p.constraintExcerpt.tokenRange.endIndex
          )
        ),
        defaultTypeType: transformTokens(
          ctx,
          node.excerptTokens.slice(
            p.defaultTypeExcerpt.tokenRange.startIndex,
            p.defaultTypeExcerpt.tokenRange.endIndex
          )
        ),
      }
    }),
  }
}

function transformInterfaceMember(ctx: TransformContext, m: ApiItem): any {
  if (m.kind === 'PropertySignature') {
    const mem = m as ApiPropertySignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.property',
      _key: hash(mem.name),
      type: transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.propertyTypeExcerpt.tokenRange.startIndex,
          mem.propertyTypeExcerpt.tokenRange.endIndex
        )
      ),
      name: mem.name,
      comment: docComment ? transformDocComment(docComment) : undefined,
      optional: mem.isOptional,
      releaseTag: RELEASE_TAGS[mem.releaseTag],
    }
  }

  if (m.kind === 'IndexSignature') {
    const mem = m as ApiIndexSignature
    const docComment = mem.tsdocComment

    return {
      _type: 'api.indexProperty',
      _key: hash(mem.canonicalReference.toString()),
      members: mem.members.map((m) => transformInterfaceMember(ctx, m)),
      comment: docComment ? transformDocComment(docComment) : undefined,
      parameters: mem.parameters.map((p) => transformIndexParameter(ctx, mem, p)),
      returnType: transformTokens(
        ctx,
        mem.excerptTokens.slice(
          mem.returnTypeExcerpt.tokenRange.startIndex,
          mem.returnTypeExcerpt.tokenRange.endIndex
        )
      ),
    }
  }

  throw new Error(`Unknown interface member kind: ${m.kind}`)
}

function transformIndexParameter(ctx: TransformContext, node: ApiIndexSignature, param: Parameter) {
  return {
    _type: 'api.indexParameter',
    _key: hash(param.name),
    name: param.name,
    type: transformTokens(
      ctx,
      node.excerptTokens.slice(
        param.parameterTypeExcerpt.tokenRange.startIndex,
        param.parameterTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}
