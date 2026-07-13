import {syncTagInvalidateEventHandler} from '@sanity/functions'

/*
 * Per-environment env vars — set via `sanity functions env add invalidate-sync-tags <KEY> <VALUE>`:
 *
 *   PRODUCTION_URLS                       comma-separated /api/expire-tags endpoints for production
 *   PRODUCTION_SECRET                     shared secret for those endpoints
 *   STAGING_URLS                          comma-separated /api/expire-tags endpoints for staging
 *   STAGING_SECRET                        shared secret for those endpoints
 *   STAGING_VERCEL_PROTECTION_BYPASS      x-vercel-protection-bypass token for staging (optional)
 *
 * A single deployment of this function fans out to every configured environment.
 * Either environment can be omitted — only targets with both URLS and SECRET are called.
 */

interface Target {
  env: string
  secret: string
  urls: string[]
  vercelProtectionBypass?: string
}

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

async function expireTags(target: Target, tags: string[]) {
  const results = await Promise.allSettled(
    target.urls.map(async (url) => {
      const start = performance.now()
      const res = await fetch(url, {
        body: JSON.stringify({secret: target.secret, tags}),
        headers: {
          'Content-Type': 'application/json',
          ...(target.vercelProtectionBypass && {
            'x-vercel-protection-bypass': target.vercelProtectionBypass,
          }),
        },
        method: 'POST',
      })
      const ms = Math.round(performance.now() - start)

      if (res.ok) {
        console.info(
          `[${target.env}] Revalidated ${tags.length} tags via ${url} (${ms}ms)`,
          res.status,
        )
      } else {
        const body = await res.text()
        console.error(`[${target.env}] Non-OK response from ${url} (${ms}ms)`, res.status, body)
      }
    }),
  )

  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    if (result.status === 'rejected') {
      console.error(`[${target.env}] Failed to call ${target.urls[i]}`, result.reason)
    }
  }
}

function getTargets(): Target[] {
  const envs = ['PRODUCTION', 'STAGING'] as const
  const targets: Target[] = []

  for (const env of envs) {
    const rawUrls = process.env[`${env}_URLS`]
    const secret = process.env[`${env}_SECRET`]
    if (!rawUrls || !secret) continue

    const urls = parseUrls(rawUrls)
    if (urls.length > 0) {
      targets.push({
        env: env.toLowerCase(),
        secret,
        urls,
        vercelProtectionBypass: process.env[`${env}_VERCEL_PROTECTION_BYPASS`],
      })
    }
  }

  return targets
}

function parseUrls(raw: string): string[] {
  return raw
    .split(',')
    .map((u) => u.trim())
    .filter(Boolean)
}

export const handler = syncTagInvalidateEventHandler(async ({done, event}) => {
  const start = performance.now()
  const syncTags = event.data.syncTags
  const targets = getTargets()

  if (targets.length === 0) {
    console.error('No targets configured — set PRODUCTION_URLS/SECRET and/or STAGING_URLS/SECRET')
    await ack(done, syncTags)
    return
  }

  const totalEndpoints = targets.reduce((sum, t) => sum + t.urls.length, 0)
  const envNames = targets.map((t) => t.env).join(', ')
  console.info(
    `Forwarding ${syncTags.length} tags to ${totalEndpoints} endpoint(s) across ${envNames}`,
  )

  await Promise.all(targets.map((target) => expireTags(target, syncTags)))

  await ack(done, syncTags)
  console.info(`Total handler time: ${Math.round(performance.now() - start)}ms`)
})
