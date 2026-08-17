/**
 * No-op placeholder for leftover callers of the pre-DS-276 revalidation
 * endpoint. The docs app is fully static now, so there is nothing to expire —
 * we still 200 so deployed callers don't spike error rates.
 */
export async function POST(request: Request) {
  const url = new URL(request.url)
  let tags = url.searchParams.getAll('tag')

  if (tags.length === 0) {
    try {
      const body: unknown = await request.json()
      if (
        body &&
        typeof body === 'object' &&
        'tags' in body &&
        Array.isArray(body.tags) &&
        body.tags.every((tag) => typeof tag === 'string')
      ) {
        tags = body.tags
      }
    } catch {
      // no valid JSON body
    }
  }

  return Response.json({service: 'sanity-ui-docs', tags})
}
