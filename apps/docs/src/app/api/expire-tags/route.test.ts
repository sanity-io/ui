import {describe, expect, it} from 'vitest'

import {GET, POST} from './route'

function post(init?: RequestInit & {url?: string}) {
  const {url = 'https://www.sanity.io/ui/api/expire-tags', ...requestInit} = init ?? {}
  return POST(new Request(url, {method: 'POST', ...requestInit}))
}

describe('/api/expire-tags', () => {
  it('echoes tags from a JSON body and does not require a secret', async () => {
    const response = await post({
      body: JSON.stringify({secret: 'unused', tags: ['s1:abc', 's1:def']}),
      headers: {'Content-Type': 'application/json'},
    })

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      service: 'sanity-ui-docs',
      tags: ['s1:abc', 's1:def'],
    })
  })

  it('echoes tags from query params', async () => {
    const response = await post({
      url: 'https://www.sanity.io/ui/api/expire-tags?tag=s1:abc&tag=s1:def',
    })

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      service: 'sanity-ui-docs',
      tags: ['s1:abc', 's1:def'],
    })
  })

  it('returns an empty tags list when the body is missing or invalid', async () => {
    const empty = await post()
    expect(empty.status).toBe(200)
    expect(await empty.json()).toEqual({service: 'sanity-ui-docs', tags: []})

    const invalid = await post({
      body: 'not-json',
      headers: {'Content-Type': 'application/json'},
    })
    expect(invalid.status).toBe(200)
    expect(await invalid.json()).toEqual({service: 'sanity-ui-docs', tags: []})
  })

  it('also 200s GET so redirected POSTs do not 405', async () => {
    const response = await GET(
      new Request('https://www.sanity.io/ui/api/expire-tags?tag=s1:abc', {method: 'GET'}),
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({service: 'sanity-ui-docs', tags: ['s1:abc']})
  })
})
