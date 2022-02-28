import {ExcerptToken} from '@microsoft/api-extractor-model'
import {createId} from './helpers'
import {TransformContext} from './types'

export function transformTokens(
  ctx: TransformContext,
  tokens: ExcerptToken[]
): Record<string, unknown>[] {
  return tokens.map((t, idx) => {
    if (t.kind === 'Content') {
      return {
        _type: 'api.text',
        _key: `token${idx}`,
        text: t.text,
      }
    }

    if (t.kind === 'Reference') {
      if (!t.canonicalReference) {
        return {
          _type: 'api.text',
          _key: `token${idx}`,
          text: t.text,
        }
      }

      const sourceShortName = t.canonicalReference.source?.toString()
      const _sourceNameParts = sourceShortName?.split('/')
      const sourceScope = _sourceNameParts?.length === 2 ? _sourceNameParts[0] : undefined
      let sourceName = _sourceNameParts?.length === 2 ? _sourceNameParts[1] : _sourceNameParts?.[0]

      if (sourceName && sourceName.endsWith('!')) {
        sourceName = sourceName.slice(0, -1)
      }

      const refContext: TransformContext = sourceName
        ? {
            ...ctx,
            package: {
              ...ctx.package,
              scope: sourceScope || null,
              name: sourceName,
            },
          }
        : ctx

      return {
        _type: 'api.reference',
        _key: `token${idx}`,
        text: t.text,
        reference: {
          _type: 'reference',
          _ref: createId(refContext, t.canonicalReference.toString()),
          _weak: true,
        },
      }
    }

    throw new Error(`tokens: unknown type: ${t.kind}`)
  })
}
