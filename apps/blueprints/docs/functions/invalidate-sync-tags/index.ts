import {syncTagInvalidateEventHandler} from '@sanity/functions'

// The sanity.io/ui docs deployment (apps/docs). `www` is required: the apex
// domain 301-redirects, which would downgrade the POST to a GET.
const EXPIRE_TAGS_URLS = ['https://www.sanity.io/ui/api/expire-tags']

/*
 * Env vars — set via
 * `pnpm dlx @sanity/runtime-cli@latest functions env add invalidate-sync-tags <KEY> <VALUE>`:
 *
 *   EXPIRE_TAGS_SECRET   shared secret, must match the docs deployment's EXPIRE_TAGS_SECRET
 */

async function ack(done: (tags: string[]) => Promise<Response>, tags: string[]) {
  const start = performance.now()
  try {
    const response = await done(tags)
    const ms = Math.round(performance.now() - start)
    console.info(`done() responded with HTTP ${response.status} (${ms}ms)`)
  } catch (error) {
    const ms = Math.round(performance.now() - start)
    console.error(`Error invoking done callback (${ms}ms)`, error)
  }
}

async function expireTags(url: string, secret: string, tags: string[]) {
  const start = performance.now()
  const res = await fetch(url, {
    body: JSON.stringify({secret, tags}),
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
  })
  const ms = Math.round(performance.now() - start)

  if (res.ok) {
    console.info(`Revalidated ${tags.length} tags via ${url} (${ms}ms)`, res.status)
  } else {
    const body = await res.text()
    console.error(`Non-OK response from ${url} (${ms}ms)`, res.status, body)
  }
}

export const handler = syncTagInvalidateEventHandler(async ({done, event}) => {
  const start = performance.now()
  const syncTags = event.data.syncTags
  const secret = process.env.EXPIRE_TAGS_SECRET

  if (!secret) {
    console.error(
      'EXPIRE_TAGS_SECRET is not configured — set it with `functions env add invalidate-sync-tags EXPIRE_TAGS_SECRET <value>`',
    )
    await ack(done, syncTags)
    return
  }

  console.info(`Forwarding ${syncTags.length} tags to ${EXPIRE_TAGS_URLS.length} endpoint(s)`)

  const results = await Promise.allSettled(
    EXPIRE_TAGS_URLS.map((url) => expireTags(url, secret, syncTags)),
  )

  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    if (result.status === 'rejected') {
      console.error(`Failed to call ${EXPIRE_TAGS_URLS[i]}`, result.reason)
    }
  }

  await ack(done, syncTags)
  console.info(`Total handler time: ${Math.round(performance.now() - start)}ms`)
})
