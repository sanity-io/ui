/**
 * One-shot migration script for DS-276 ("Make Sanity UI docs app fully
 * static"): exports the docs content from the `mos42crl`/`production` Sanity
 * dataset into static `page.tsx` + `nav.ts` files under
 * `apps/docs/src/app/(website)/`, and downloads every referenced image asset
 * into `apps/docs/public/images/`.
 *
 * The script walks the `v3` nav document (the tree that used to drive
 * routing), converts each target document's Portable Text `content` into JSX
 * that renders through the same components the site used before, and mirrors
 * the nav hierarchy as a folder hierarchy. It is kept for reference — the
 * generated files are committed, and the content in the dataset is frozen
 * (UI5 docs will live on sanity.io/docs).
 *
 * Run with: pnpm --filter sanity-ui-studio export:docs
 */

// oxlint-disable no-console, no-await-in-loop

import {mkdir, rm, writeFile} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

import slugify from '@sindresorhus/slugify'

const PROJECT_ID = 'mos42crl'
const DATASET = 'production'
const API_VERSION = '2026-07-01'
const NAV_ID = 'v3'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '../../..')
const websiteDir = join(repoRoot, 'apps/docs/src/app/(website)')
const imagesDir = join(repoRoot, 'apps/docs/public/images')

// --- Sanity data types (raw document shapes, no typegen) ---------------------

interface SanityReference {
  _ref: string
}

interface SpanChild {
  _type: string
  text: string
  marks?: string[]
}

interface MarkDef {
  _key: string
  _type: string
  href?: string
}

interface CodeValue {
  code?: string
  language?: string
}

interface ContentItem {
  _type: string
  _key: string
  // block
  style?: string
  listItem?: 'bullet' | 'number'
  level?: number
  children?: SpanChild[]
  markDefs?: MarkDef[]
  // code
  code?: string | CodeValue
  language?: string
  // codeExample
  title?: string
  description?: string
  hook?: CodeValue
  // callout
  tone?: string
  icon?: string
  content?: ContentItem[]
  // propertyTable
  properties?: {
    name?: string
    type?: string
    required?: boolean
    deprecated?: string
    description?: ContentItem[]
  }[]
  caption?: string
  // image
  asset?: SanityReference
  alt?: string
  // npmPackageBadge
  name?: string
  // figma
  url?: string
}

interface Seo {
  title?: string
  description?: string
  twitter?: {cardType?: string}
  og?: {
    type?: string
    title?: string
    description?: string
    image?: {asset?: SanityReference}
  }
}

interface ArticleDoc {
  _id: string
  _type: 'article'
  title?: string
  content?: ContentItem[]
  seo?: Seo
  layout?: {wide?: boolean}
  apiMember?: {isComponent?: boolean; isHook?: boolean}
}

interface ScreenDoc {
  _id: string
  _type: 'screen'
  title?: string
  seo?: Seo
  sections?: {
    _type: string
    _key: string
    headline?: string
    copy?: string
    ctas?: {_key: string; href?: string; label?: string; mode?: string; tone?: string}[]
    linksHeader?: string
    links?: {_key: string; href?: string; title?: string; subtitle?: string}[]
    backgroundImage?: {
      dark?: {asset?: SanityReference}
      light?: {asset?: SanityReference}
    }
  }[]
}

interface NavItem {
  hidden?: boolean
  collapsed?: boolean
  title?: string
  menuTitle?: string
  segment?: string
  target?: {_id: string; _type: 'article' | 'screen'}
  items?: NavItem[]
}

// --- Fetching ----------------------------------------------------------------

async function query<T>(groq: string): Promise<T> {
  const url = new URL(`https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`)
  url.searchParams.set('query', groq)
  url.searchParams.set('perspective', 'published')
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Query failed (${res.status}): ${await res.text()}`)
  const body: {result: T} = await res.json()
  return body.result
}

// --- Image assets --------------------------------------------------------------

/** asset ref (image-<sha>-<WxH>-<ext>) -> local basename under public/images */
const imageFiles = new Map<string, string>()

function assetUrl(ref: string): string {
  const [, sha, dimensions, extension] = ref.split('-')
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${sha}-${dimensions}.${extension}`
}

/** Registers an asset for download and returns its basePath-relative URL */
function localImage(ref: string, suggestedName: string): string {
  const extension = ref.split('-').at(-1) ?? 'png'
  let name = imageFiles.get(ref)
  if (!name) {
    name = `${suggestedName}.${extension}`
    if ([...imageFiles.values()].includes(name)) {
      name = `${suggestedName}-${imageFiles.size}.${extension}`
    }
    imageFiles.set(ref, name)
  }
  return `/images/${name}`
}

async function downloadImages() {
  await mkdir(imagesDir, {recursive: true})
  for (const [ref, name] of imageFiles) {
    const res = await fetch(assetUrl(ref))
    if (!res.ok) throw new Error(`Image download failed (${res.status}): ${ref}`)
    await writeFile(join(imagesDir, name), Buffer.from(await res.arrayBuffer()))
    console.log(`downloaded ${name}`)
  }
}

// --- JS/JSX emission helpers ---------------------------------------------------

/** Quoted JS string literal (single quotes, matching the oxfmt style) */
function jsString(value: string): string {
  const escaped = value
    .replaceAll('\\', '\\\\')
    .replaceAll("'", "\\'")
    .replaceAll('\n', '\\n')
    .replaceAll('\r', '\\r')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029')
  return `'${escaped}'`
}

/** Template literal for multi-line code snippets */
function jsTemplate(value: string): string {
  const escaped = value.replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${')
  return `\`${escaped}\``
}

/**
 * Emits a text run for JSX. Plain JSX text collapses/strips whitespace and
 * interprets `{}<>` and HTML entities, so anything ambiguous is emitted as a
 * string expression instead.
 */
function jsxText(value: string): string {
  const safe =
    !/[{}<>&\\]/.test(value) &&
    value === value.trim() &&
    !value.includes('\n') &&
    !value.includes('  ')
  return safe ? value : `{${jsString(value)}}`
}

function jsxStringAttr(name: string, value: string): string {
  return /["\\\n{}<>&]/.test(value) ? `${name}={${jsString(value)}}` : `${name}="${value}"`
}

// --- Portable Text -> JSX ------------------------------------------------------

function spanToJsx(span: SpanChild, markDefs: MarkDef[]): string {
  let out = jsxText(span.text)
  // The old renderer nested marks outermost-first in the order they appear on
  // the span (single-mark spans everywhere in this dataset, so ordering is
  // inconsequential — links just also handle the general case)
  for (const mark of [...(span.marks ?? [])].reverse()) {
    const def = markDefs.find((markDef) => markDef._key === mark)
    if (def) {
      if (def._type !== 'link') throw new Error(`Unsupported annotation: ${def._type}`)
      const href = def.href
      // Like the old renderer, external hrefs open in a new tab (absent
      // hrefs render a bare <a> — fix those up manually)
      const attrs = [
        href ? jsxStringAttr('href', href) : '',
        href?.startsWith('http') ? `target="_blank" rel="nofollow noopener noreferrer"` : '',
      ].filter(Boolean)
      out = `<a${attrs.length ? ` ${attrs.join(' ')}` : ''}>${out}</a>`
    } else {
      if (!['strong', 'em', 'code'].includes(mark)) throw new Error(`Unsupported mark: ${mark}`)
      out = `<${mark}>${out}</${mark}>`
    }
  }
  return out
}

function blockChildrenToJsx(block: ContentItem): string {
  const markDefs = block.markDefs ?? []
  const parts: string[] = []
  for (const span of block.children ?? []) {
    if (span._type !== 'span') throw new Error(`Unsupported child: ${span._type}`)
    parts.push(spanToJsx(span, markDefs))
  }
  return parts.join('')
}

function blockText(block: ContentItem): string {
  return (block.children ?? []).map((span) => span.text).join('')
}

interface Heading {
  level: number
  slug: string
  text: string
}

function getHeadings(content: ContentItem[]): Heading[] {
  return content
    .filter((item) => item._type === 'block' && /^h\d/.test(item.style ?? ''))
    .map((block) => {
      const text = blockText(block)
      return {
        level: Number((block.style ?? '').replaceAll(/[^\d]/g, '')),
        text,
        slug: slugify(text).toLowerCase(),
      }
    })
}

interface Emitter {
  imports: Set<string>
  lines: string[]
}

function emitBlock(block: ContentItem, emitter: Emitter): string {
  const children = blockChildrenToJsx(block)
  const style = block.style ?? 'normal'
  if (style === 'normal') {
    // Empty blocks (authoring artifacts) would only render stray vertical
    // whitespace
    if (!children) return ''
    emitter.imports.add('Paragraph')
    return `<Paragraph>${children}</Paragraph>`
  }
  if (style === 'h2' || style === 'h3') {
    const component = style === 'h2' ? 'Heading2' : 'Heading3'
    emitter.imports.add(component)
    const slug = slugify(blockText(block)).toLowerCase()
    return `<${component} id="${slug}">${children}</${component}>`
  }
  throw new Error(`Unsupported block style: ${style}`)
}

function emitPlainBlocks(blocks: ContentItem[], emitter: Emitter): string {
  // Callout content and property descriptions only ever use `normal` blocks
  return blocks
    .map((block) => {
      if (block._type !== 'block' || (block.style ?? 'normal') !== 'normal') {
        throw new Error(`Unsupported plain block: ${block._type}/${block.style}`)
      }
      emitter.imports.add('PlainParagraph')
      return `<PlainParagraph>${blockChildrenToJsx(block)}</PlainParagraph>`
    })
    .join('\n')
}

function emitContentItem(item: ContentItem, emitter: Emitter, imageName: string): string {
  switch (item._type) {
    case 'code': {
      emitter.imports.add('CodeBlock')
      const language = item.language ? ` ${jsxStringAttr('language', item.language)}` : ''
      const code = typeof item.code === 'string' ? item.code : ''
      return `<CodeBlock${language} code={${jsTemplate(code)}} />`
    }

    case 'codeExample': {
      emitter.imports.add('CodeExampleBlock')
      const code = typeof item.code === 'object' ? item.code : undefined
      if (!code?.code) return ''
      const attrs = [
        item.title ? jsxStringAttr('title', item.title) : '',
        item.description ? jsxStringAttr('description', item.description) : '',
        `code={${jsTemplate(code.code)}}`,
        item.hook?.code ? `hookCode={${jsTemplate(item.hook.code)}}` : '',
      ].filter(Boolean)
      return `<CodeExampleBlock\n${attrs.join('\n')}\n/>`
    }

    case 'callout': {
      emitter.imports.add('Callout')
      const attrs = [
        item.icon ? jsxStringAttr('icon', item.icon) : '',
        item.tone ? jsxStringAttr('tone', item.tone) : '',
      ].filter(Boolean)
      const children = emitPlainBlocks(item.content ?? [], emitter)
      return `<Callout${attrs.length ? ` ${attrs.join(' ')}` : ''}>\n${children}\n</Callout>`
    }

    case 'propertyTable': {
      emitter.imports.add('PropertyTable')
      const properties = (item.properties ?? []).map((property) => {
        const fields = [
          property.name === undefined ? '' : `name: ${jsString(property.name)}`,
          property.type === undefined ? '' : `type: ${jsString(property.type)}`,
          property.required === undefined ? '' : `required: ${property.required}`,
          property.deprecated === undefined ? '' : `deprecated: ${jsString(property.deprecated)}`,
          property.description
            ? `description: (\n<PlainContent>\n${emitPlainBlocks(property.description, emitter)}\n</PlainContent>\n)`
            : '',
        ].filter(Boolean)
        if (property.description) emitter.imports.add('PlainContent')
        return `{${fields.join(', ')}}`
      })
      const caption = item.caption ? `\ncaption={${jsString(item.caption)}}` : ''
      return `<PropertyTable${caption}\nproperties={[\n${properties.join(',\n')},\n]}\n/>`
    }

    case 'image': {
      emitter.imports.add('ContentImage')
      if (!item.asset?._ref) return ''
      const src = localImage(item.asset._ref, imageName)
      const attrs = [
        jsxStringAttr('src', src),
        item.alt ? jsxStringAttr('alt', item.alt) : '',
        item.caption ? jsxStringAttr('caption', item.caption) : '',
      ].filter(Boolean)
      return `<ContentImage ${attrs.join(' ')} />`
    }

    case 'npmPackageBadge': {
      emitter.imports.add('NpmPackageBadge')
      return `<NpmPackageBadge ${jsxStringAttr('name', item.name ?? '')} />`
    }

    case 'content.figmaEmbed': {
      emitter.imports.add('FigmaEmbed')
      if (!item.url) return ''
      return `<FigmaEmbed ${jsxStringAttr('url', item.url)} />`
    }

    case 'content.figmaButton': {
      emitter.imports.add('FigmaButton')
      if (!item.url) return ''
      const title = item.title ? ` ${jsxStringAttr('title', item.title)}` : ''
      return `<FigmaButton${title} ${jsxStringAttr('url', item.url)} />`
    }

    case 'content.colorGrid': {
      emitter.imports.add('ColorGrid')
      return `<ColorGrid />`
    }

    case 'content.sanityLogoGrid': {
      emitter.imports.add('SanityLogoGrid')
      return `<SanityLogoGrid />`
    }

    case 'content.groqLogoGrid': {
      emitter.imports.add('GroqLogoGrid')
      return `<GroqLogoGrid />`
    }

    default:
      throw new Error(`Unsupported content type: ${item._type}`)
  }
}

function emitContent(content: ContentItem[], emitter: Emitter, imageName: string): string {
  const out: string[] = []
  for (let index = 0; index < content.length; index++) {
    const item = content[index]
    if (item._type === 'block' && item.listItem) {
      if (item.level && item.level > 1) throw new Error('Nested lists are not supported')
      if (item.listItem !== 'bullet') throw new Error(`Unsupported list: ${item.listItem}`)
      const items: string[] = []
      while (content[index]?._type === 'block' && content[index]?.listItem === 'bullet') {
        emitter.imports.add('ListItem')
        items.push(`<ListItem>${blockChildrenToJsx(content[index])}</ListItem>`)
        index++
      }
      index--
      emitter.imports.add('BulletList')
      out.push(`<BulletList>\n${items.join('\n')}\n</BulletList>`)
    } else if (item._type === 'block') {
      out.push(emitBlock(item, emitter))
    } else {
      out.push(emitContentItem(item, emitter, `${imageName}-${index}`))
    }
  }
  return out.filter(Boolean).join('\n\n')
}

// --- Metadata ------------------------------------------------------------------

const DEFAULT_META_DESCRIPTION = 'An ergonomic toolkit to design with code.'

function emitMetadata(doc: ArticleDoc | ScreenDoc, imageName: string): string {
  const seo = doc.seo
  const ogImageRef = seo?.og?.image?.asset?._ref
  // og:image URLs resolve against `metadataBase` (the site origin), so the
  // /ui basePath has to be part of the path
  const ogImage = ogImageRef ? `/ui${localImage(ogImageRef, imageName)}` : undefined
  const fields = [
    `title: ${jsString(doc.title ? `${doc.title} | Sanity UI` : 'Sanity UI')}`,
    `description: ${jsString(seo?.description || DEFAULT_META_DESCRIPTION)}`,
    `openGraph: {
type: ${jsString(seo?.og?.type || 'website')},
title: ${jsString(seo?.og?.title || doc.title || 'Sanity UI')},
description: ${jsString(seo?.og?.description || DEFAULT_META_DESCRIPTION)},
siteName: 'Sanity UI',${ogImage ? `\nimages: [${jsString(ogImage)}],` : ''}
}`,
    `twitter: {
card: ${jsString(seo?.twitter?.cardType || 'summary')},
site: '@sanity_io',
}`,
  ]
  return `export const metadata: Metadata = {\n${fields.join(',\n')},\n}`
}

// --- Page + nav emission ---------------------------------------------------------

const CONTENT_IMPORTS: Record<string, string> = {
  BulletList: '@/components/page/article/content/lists',
  Callout: '@/components/page/article/content/Callout',
  CodeBlock: '@/components/page/article/content/CodeBlock',
  CodeExampleBlock: '@/components/page/article/content/CodeExampleBlock',
  ColorGrid: '@/components/page/article/content/ColorGrid',
  ContentImage: '@/components/page/article/content/ContentImage',
  FigmaButton: '@/components/page/article/content/FigmaButton',
  FigmaEmbed: '@/components/page/article/content/FigmaEmbed',
  GroqLogoGrid: '@/components/page/article/content/LogoGrid',
  Heading2: '@/components/page/article/content/headings',
  Heading3: '@/components/page/article/content/headings',
  ListItem: '@/components/page/article/content/lists',
  NpmPackageBadge: '@/components/page/article/content/NpmPackageBadge',
  Paragraph: '@/components/page/article/content/Paragraph',
  PlainContent: '@/components/page/article/PlainContent',
  PlainParagraph: '@/components/page/article/PlainContent',
  PropertyTable: '@/components/page/article/content/PropertyTable',
  SanityLogoGrid: '@/components/page/article/content/LogoGrid',
}

function emitImports(emitter: Emitter): string {
  const byModule = new Map<string, string[]>()
  for (const name of [...emitter.imports].sort()) {
    const module_ = CONTENT_IMPORTS[name]
    if (!module_) throw new Error(`Unknown import: ${name}`)
    byModule.set(module_, [...(byModule.get(module_) ?? []), name])
  }
  return [...byModule.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([module_, names]) => `import {${names.join(', ')}} from '${module_}'`)
    .join('\n')
}

function emitArticlePage(article: ArticleDoc, imageName: string): string {
  const emitter: Emitter = {imports: new Set(), lines: []}
  const headings = getHeadings(article.content ?? [])
  const content = emitContent(article.content ?? [], emitter, imageName)
  const metadata = emitMetadata(article, `social-${imageName}`)

  const articleAttrs = [
    jsxStringAttr('title', article.title ?? ''),
    article.apiMember?.isComponent ? 'isComponent' : '',
    article.apiMember?.isHook ? 'isHook' : '',
    article.layout?.wide ? 'wide' : '',
    headings.length
      ? `headings={[\n${headings
          .map(
            (heading) =>
              `{level: ${heading.level}, slug: ${jsString(heading.slug)}, text: ${jsString(heading.text)}}`,
          )
          .join(',\n')},\n]}`
      : '',
  ].filter(Boolean)

  return `import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
${emitImports(emitter)}

${metadata}

export default function Page() {
return (
<Article
${articleAttrs.join('\n')}
>
${content}
</Article>
)
}
`
}

function emitNavFile(item: NavItem, order: number, target?: ArticleDoc | ScreenDoc): string {
  const apiMember = target?._type === 'article' ? target.apiMember : undefined
  const fields = [
    `title: ${jsString(item.title ?? '')}`,
    `order: ${order}`,
    item.menuTitle ? `menuTitle: ${jsString(item.menuTitle)}` : '',
    item.hidden ? `hidden: true` : '',
    item.collapsed ? `collapsed: true` : '',
    apiMember?.isComponent ? `isComponent: true` : '',
    apiMember?.isHook ? `isHook: true` : '',
  ].filter(Boolean)
  return `import type {NavItemMeta} from '@/lib/nav/types'

export const nav: NavItemMeta = {\n${fields.join(',\n')},\n}
`
}

// --- Screens (home + arcade are hand-written; emit their data for reference) ----

function emitHomePage(screen: ScreenDoc): string {
  const hero = screen.sections?.find((section) => section._type === 'screenSection.hero')
  if (!hero) throw new Error('Home screen has no hero section')

  const dark = hero.backgroundImage?.dark?.asset?._ref
  const light = hero.backgroundImage?.light?.asset?._ref

  const ctas = (hero.ctas ?? [])
    .filter((cta) => cta.href)
    .map(
      (cta) =>
        `{href: ${jsString(cta.href ?? '')}, label: ${jsString(cta.label ?? '')}, mode: ${jsString(cta.mode || 'default')}, tone: ${jsString(cta.tone || 'default')}}`,
    )
  const links = (hero.links ?? [])
    .filter((link) => link.href)
    .map(
      (link) =>
        `{href: ${jsString(link.href ?? '')}, title: ${jsString(link.title ?? '')}, subtitle: ${jsString(link.subtitle ?? '')}}`,
    )

  // No metadata export: like before, the home page inherits the root layout
  // metadata (the screen document's own seo field was never rendered)
  return `import {HeroSection} from '@/components/page/sections/HeroSection'

export default function Page() {
return (
<HeroSection
headline={${jsString(hero.headline ?? '')}}
copy={${jsString(hero.copy ?? '')}}
backgroundImage={{
dark: ${jsString(dark ? localImage(dark, 'home-hero-dark') : '')},
light: ${jsString(light ? localImage(light, 'home-hero-light') : '')},
}}
ctas={[
${ctas.join(',\n')},
]}
linksHeader={${jsString(hero.linksHeader ?? '')}}
links={[
${links.join(',\n')},
]}
/>
)
}
`
}

function emitArcadePage(screen: ScreenDoc): string {
  const metadata = emitMetadata(screen, 'social-arcade')
  return `import type {Metadata} from 'next'

import {ArcadePage} from './ArcadePage'

${metadata}

export default function Page() {
return <ArcadePage />
}
`
}

// --- Main ------------------------------------------------------------------------

async function main() {
  const nav = await query<{items: NavItem[]} | null>(
    `*[_type == "nav" && id == "${NAV_ID}"][0]{
      items[]{
        hidden, collapsed, title, menuTitle, segment,
        target->{_id, _type},
        items[]{
          hidden, collapsed, title, menuTitle, segment,
          target->{_id, _type},
          items[]{
            hidden, collapsed, title, menuTitle, segment,
            target->{_id, _type}
          }
        }
      }
    }`,
  )
  if (!nav) throw new Error(`Nav document ${NAV_ID} not found`)

  const targetIds = new Set<string>()
  const collectIds = (items: NavItem[]) => {
    for (const item of items) {
      if (item.target) targetIds.add(item.target._id)
      if (item.items) collectIds(item.items)
    }
  }
  collectIds(nav.items)

  const targets = await query<(ArticleDoc | ScreenDoc)[]>(
    `*[_id in [${[...targetIds].map((id) => `"${id}"`).join(', ')}]]`,
  )
  const targetsById = new Map(targets.map((target) => [target._id, target]))

  const files = new Map<string, string>()

  const walk = (items: NavItem[], parentSegments: string[]) => {
    items.forEach((item, index) => {
      const segments = item.segment ? [...parentSegments, item.segment] : parentSegments
      const dir = segments.join('/')
      const target = item.target ? targetsById.get(item.target._id) : undefined
      files.set(join(dir, 'nav.ts'), emitNavFile(item, index, target))

      if (target?._type === 'article') {
        const imageName = segments.at(-1) ?? 'home'
        files.set(join(dir, 'page.tsx'), emitArticlePage(target, imageName))
      } else if (target?._type === 'screen') {
        if (segments.length === 0) {
          files.set(join(dir, 'page.tsx'), emitHomePage(target))
        } else if (segments.at(-1) === 'arcade') {
          files.set(join(dir, 'page.tsx'), emitArcadePage(target))
        } else {
          throw new Error(`Unexpected screen at /${dir}`)
        }
      }

      if (item.items) walk(item.items, segments)
    })
  }
  walk(nav.items, [])

  // The default og:image (DEFAULT_META_OG_IMAGE in src/app/constants.ts) is
  // referenced by the root layout rather than a generated page
  localImage('image-f378d0067c1406f4e3d3ed6874cd715c72f52d2c-1920x1080-png', 'social-default')

  for (const [file, contents] of files) {
    const path = join(websiteDir, file)
    await rm(path, {force: true})
    await mkdir(dirname(path), {recursive: true})
    await writeFile(path, contents)
    console.log(`wrote ${file}`)
  }

  await downloadImages()

  console.log(`\n${files.size} files, ${imageFiles.size} images`)
  console.log('Now run `pnpm format` at the repo root to format the generated files.')
}

await main()
