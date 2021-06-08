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

      return {
        _type: 'api.reference',
        _key: `token${idx}`,
        text: t.text,
        reference: {
          _type: 'reference',
          _ref: createId(ctx, t.canonicalReference.toString()),
          _weak: true,
        },
      }
    }

    throw new Error(`tokens: unknown type: ${t.kind}`)
  })
}
