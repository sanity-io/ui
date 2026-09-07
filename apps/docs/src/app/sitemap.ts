import type {MetadataRoute} from 'next'

import type {NavNode} from '@/lib/nav/types'

import {navTree} from './(website)/navTree'

// Served at /ui/sitemap.xml (the basePath applies to the route, but not to
// the entry URLs, so the base path must be part of the origin here). Every
// routable page is included — `hidden` only excludes a page from the navbar
// and sidebar, not from indexing.
const ORIGIN = 'https://www.sanity.io/ui'

function collectPageUrls(node: NavNode, urls: string[]): string[] {
  if (node.hasPage) urls.push(`${ORIGIN}${node.href}`)
  for (const child of node.children ?? []) collectPageUrls(child, urls)
  return urls
}

export default function sitemap(): MetadataRoute.Sitemap {
  return collectPageUrls(navTree, []).map((url) => ({url}))
}
