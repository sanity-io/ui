#!/usr/bin/env node
// The native event surface of a component, read out of @types/react.
//
// Why this is here at all: a component whose props type extends
// `React.ComponentProps<'select'>` accepts every native `<select>` attribute,
// and `generate.mjs` can only say so as one sentence — the runtime `selectProps`
// record holds three Sanity props and knows nothing about `onChange`. So the
// rendered table said "Also accepts native <select> attributes" and stopped,
// and the DSDS document had a hand-written event table to fill the gap. That
// table is the thing this file exists to delete: a hand-kept copy of React's
// API, in a document, going stale silently.
//
// Same rule as the rest of the tool: derive, don't transcribe. Every event
// name and every signature below is read from the installed `@types/react`,
// which is what the compiler itself checks against. If those types are not
// resolvable the answer is "no events", never a guess.
//
// The one editorial decision is WHICH events to surface. `DOMAttributes<T>`
// declares 168 handlers (84 events, each with a `-Capture` variant), and a
// table of 84 rows per component is not documentation. So two sets are
// gathered, both derived:
//
//   - the handlers the element's own `*HTMLAttributes` interface declares.
//     React specializes these per element — `<select>` narrows `onChange` to
//     `ChangeEventHandler<T, HTMLSelectElement>` — which is exactly the set
//     that is element-specific rather than universal.
//   - the handlers named in UNIVERSAL and FORM below, filtered to those React
//     actually declares for the tag.
//
// Those two lists are the only hand-written thing in this file, and they hold
// *names* — never a type or a signature. Nothing is reported unless
// @types/react declares it, so the lists can only make the output shorter or
// longer, never wrong.

import {existsSync, readdirSync, readFileSync} from 'node:fs'
import {join} from 'node:path'

/**
 * The handlers worth putting in front of a reader. Ordered the way a component
 * is wired, not alphabetically.
 *
 * Two tiers, because `DOMAttributes<T>` declares every handler for every
 * element: React's types accept `onChange` on a `<div>`, and reporting it
 * would be true of the type and false of the DOM. `FORM` handlers are only
 * reported where the element's own interface specializes them, which is
 * exactly the set of form controls — `<select>`, `<input>` and `<textarea>`
 * narrow `onChange` to `ChangeEventHandler<T, HTMLSelectElement>` and friends,
 * and nothing else does.
 *
 * Element-specific handlers are added on top of both tiers automatically, so
 * `<dialog>` gets `onCancel` and `onClose` without being named here.
 */
const FORM = ['onChange', 'onInput']
const UNIVERSAL = ['onFocus', 'onBlur', 'onClick', 'onKeyDown']
const COMMON = [...FORM, ...UNIVERSAL]

/** Every non-capture handler is counted; the `-Capture` twins are noise. */
const isCapture = (name) => name.endsWith('Capture')

/**
 * Find the installed @types/react. Walks up from the UI checkout, then falls
 * back to pnpm's virtual store, which is where a pnpm workspace actually puts
 * it — the ui repo has no `node_modules/@types/react` path at all.
 */
export function findReactTypes(uiRoot) {
  let dir = uiRoot
  for (let i = 0; i < 6; i++) {
    const direct = join(dir, 'node_modules/@types/react/index.d.ts')
    if (existsSync(direct)) return direct

    const store = join(dir, 'node_modules/.pnpm')
    if (existsSync(store)) {
      // Highest version wins, so a repo with several copies is deterministic.
      const candidates = readdirSync(store)
        .filter((n) => n.startsWith('@types+react@'))
        .sort((a, b) => b.localeCompare(a, undefined, {numeric: true}))
      for (const c of candidates) {
        const p = join(store, c, 'node_modules/@types/react/index.d.ts')
        if (existsSync(p)) return p
      }
    }
    dir = join(dir, '..')
  }
  return null
}

/** The body of `interface Name<...> {...}`, brace-matched. */
function interfaceBody(src, name) {
  const head = new RegExp(`interface ${name}(?:<[^>]*>)?[^{]*\\{`).exec(src)
  if (!head) return null
  let i = head.index + head[0].length
  let depth = 1
  while (depth > 0 && i < src.length) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') depth--
    i++
  }
  return src.slice(head.index + head[0].length, i - 1)
}

/** What `interface X extends A, B {` names, so a chain can be walked. */
function extendsOf(src, name) {
  const head = new RegExp(`interface ${name}(?:<[^>]*>)?\\s+extends\\s+([^{]+)\\{`).exec(src)
  if (!head) return []
  return head[1]
    .split(',')
    .map((s) =>
      s
        .trim()
        .replace(/^React\./, '')
        .replace(/<.*$/, ''),
    )
    .filter(Boolean)
}

/** `onFocus?: FocusEventHandler<T>;` → [name, handlerType] */
function handlersIn(body) {
  const out = new Map()
  if (!body) return out
  const re = /\n\s+(on[A-Z]\w*)\?:\s*([A-Za-z]+Handler<[^;]*?)\s*(?:\|\s*undefined)?;/g
  for (const [, name, type] of body.matchAll(re)) {
    if (!out.has(name)) out.set(name, type.replace(/\s+/g, ' ').trim())
  }
  return out
}

/**
 * handler alias → the event interface it carries, read from the declarations:
 * `type FocusEventHandler<T> = EventHandler<FocusEvent<T>>`.
 *
 * Stripping `Handler` off the name is nearly right and wrong where it counts:
 * `ReactEventHandler` carries a `SyntheticEvent`, not a `ReactEvent`, and
 * `<dialog>`'s `onCancel`/`onClose` use exactly that alias. Reading the
 * aliases costs one regex and cannot drift.
 */
function eventAliases(src) {
  const out = new Map()
  const re = /type\s+(\w+EventHandler)<[^>]*>\s*=\s*EventHandler<\s*(\w+)</g
  for (const [, handler, event] of src.matchAll(re)) out.set(handler, event)
  return out
}

/**
 * `ChangeEventHandler<T, HTMLSelectElement>` → the signature a reader can
 * copy: `(event: React.ChangeEvent<HTMLSelectElement>) => void`.
 *
 * The declared type's own generic arguments are dropped on purpose: they are
 * written in terms of `T`, and `T` is the element being resolved here.
 */
function signature(handlerType, element, aliases) {
  const alias = /^(\w+Handler)</.exec(handlerType)?.[1]
  if (!alias) return null
  const event = aliases.get(alias)
  if (!event) return null
  return `(event: React.${event}<${element}>) => void`
}

/**
 * An index of the native event surface, keyed by HTML tag.
 *
 * @param {string} uiRoot - the packages/ui directory, used to resolve @types/react
 * @returns {{source: string, version: string, forTag: (tag: string) => object|null}|null}
 */
export function eventIndex(uiRoot) {
  const typesPath = findReactTypes(uiRoot)
  if (!typesPath) return null

  const src = readFileSync(typesPath, 'utf8')
  const version =
    /@types\+react@([^/]+)/.exec(typesPath)?.[1] ??
    JSON.parse(readFileSync(join(typesPath, '../package.json'), 'utf8')).version

  // tag → {attrs, element}, from JSX.IntrinsicElements. Only the tags that map
  // to a DetailedHTMLProps pair are usable; the rest (svg's children, web
  // components) have no element type to instantiate.
  const tags = new Map()
  const intrinsic =
    /\n\s+([a-z][a-zA-Z0-9]*):\s*React\.DetailedHTMLProps<\s*React\.(\w+)<\s*(\w+)\s*>\s*,\s*\w+\s*>;/g
  for (const [, tag, attrs, element] of src.matchAll(intrinsic)) {
    if (!tags.has(tag)) tags.set(tag, {attrs, element})
  }
  // SVG tags are declared as `svg: React.SVGProps<SVGSVGElement>` — no
  // DetailedHTMLProps pair. Two components accept native <svg> attributes, so
  // without this they would report no events at all.
  const svgIntrinsic = /\n\s+([a-z][a-zA-Z0-9]*):\s*React\.SVGProps<\s*(\w+)\s*>;/g
  for (const [, tag, element] of src.matchAll(svgIntrinsic)) {
    if (!tags.has(tag)) tags.set(tag, {attrs: 'SVGProps', element})
  }

  const aliases = eventAliases(src)
  const baseCache = new Map()

  /** Every handler a tag's attribute interface has, own ones marked. */
  function surfaceFor(attrsName) {
    if (baseCache.has(attrsName)) return baseCache.get(attrsName)
    const own = handlersIn(interfaceBody(src, attrsName))
    const inherited = new Map()
    const seen = new Set([attrsName])
    const queue = extendsOf(src, attrsName)
    while (queue.length) {
      const next = queue.shift()
      if (seen.has(next)) continue
      seen.add(next)
      for (const [k, v] of handlersIn(interfaceBody(src, next))) {
        if (!inherited.has(k)) inherited.set(k, v)
      }
      queue.push(...extendsOf(src, next))
    }
    const result = {own, inherited}
    baseCache.set(attrsName, result)
    return result
  }

  return {
    source: `@types/react@${version}`,
    version,
    /**
     * The events for one tag, or null if @types/react has no mapping for it.
     * `specialized` marks a handler the element's own interface declares —
     * `<select>`'s `onChange` — as opposed to one every element inherits.
     */
    forTag(tag) {
      const entry = tags.get(tag)
      if (!entry) return null
      const {own, inherited} = surfaceFor(entry.attrs)
      const all = new Map([...inherited, ...own])

      // A form handler is reported only where this element specializes it.
      const wanted = [...own.keys(), ...UNIVERSAL, ...FORM.filter((n) => own.has(n))]
      const names = [...new Set(wanted)].filter((n) => all.has(n) && !isCapture(n))
      // Element-specific first, then COMMON's order, which follows how a form
      // is wired rather than the alphabet.
      names.sort((a, b) => {
        const ownDiff = Number(own.has(b)) - Number(own.has(a))
        if (ownDiff) return ownDiff
        return COMMON.indexOf(a) - COMMON.indexOf(b)
      })

      return {
        tag,
        element: entry.element,
        handlers: names.map((name) => ({
          name,
          type: all.get(name),
          signature: signature(all.get(name), entry.element, aliases),
          specialized: own.has(name),
        })),
        // What the table is a subset of, so the number is never hidden.
        nativeHandlerCount: [...all.keys()].filter((n) => !isCapture(n)).length,
      }
    },
  }
}
