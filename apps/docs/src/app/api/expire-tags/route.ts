import {revalidateTag} from 'next/cache'
import type {NextRequest} from 'next/server'

const expireTagsSecret = process.env.EXPIRE_TAGS_SECRET

/**
 * Called by the `invalidate-sync-tags` Sanity Function (deployed from
 * `apps/blueprints/docs`) whenever content changes, with the sync tags that
 * the Live Content API reported as expired.
 */
export async function POST(request: NextRequest) {
  const url = new URL(request.url)

  if (!expireTagsSecret) {
    console.error('EXPIRE_TAGS_SECRET environment variable is required')
    return Response.json({error: 'Unexpected error'}, {status: 500})
  }

  let secret = url.searchParams.get('secret')
  let tags = url.searchParams.getAll('tag')

  if (!secret || tags.length === 0) {
    try {
      const body = await request.json()
      if (!secret && body.secret) secret = body.secret
      if (tags.length === 0 && Array.isArray(body.tags)) tags = body.tags
    } catch {
      // no valid JSON body
    }
  }

  if (secret !== expireTagsSecret) {
    return Response.json({error: 'Unauthorized'}, {status: 401})
  }

  if (tags.length === 0) {
    return Response.json({error: 'No tags provided'}, {status: 400})
  }

  // oxlint-disable-next-line no-console
  console.info('Expiring tags from expirator service', tags)

  for (const tag of tags) {
    revalidateTag(`sanity:${tag}`)
  }

  return Response.json({service: 'sanity-ui-docs', tags})
}
