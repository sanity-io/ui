// A small CSS reader for the unminified lightningcss output of the libraries: extracts every
// generated identifier (class names, keyframes, custom properties) together with the rule
// content it carries, so two stylesheets can be compared by identifier.

function splitTopLevel(css) {
  const rules = []
  let depth = 0
  let start = 0
  let preludeEnd = -1
  for (let i = 0; i < css.length; i++) {
    const ch = css[i]
    if (ch === '{') {
      if (depth === 0) preludeEnd = i
      depth++
    } else if (ch === '}') {
      depth--
      if (depth === 0) {
        rules.push({
          prelude: css.slice(start, preludeEnd).trim(),
          body: css.slice(preludeEnd + 1, i).trim(),
        })
        start = i + 1
      }
    }
  }
  return rules
}

function normalize(text) {
  return text.replace(/\s+/g, ' ').replace(/\s*([:;{},])\s*/g, '$1').trim()
}

function walk(css, context, onRule) {
  for (const {prelude, body} of splitTopLevel(css)) {
    if (/^@(media|supports|layer|container)\b/.test(prelude)) {
      walk(body, [...context, normalize(prelude)], onRule)
    } else {
      onRule({prelude: normalize(prelude), body: normalize(body), context})
    }
  }
}

/**
 * @returns {Map<string, Set<string>>} identifier → set of normalized rule fragments it appears in.
 * Keys are `.class`, `@keyframes name` or `--var`.
 */
export function collectIdentifiers(css) {
  const identifiers = new Map()
  const add = (key, content) => {
    if (!identifiers.has(key)) identifiers.set(key, new Set())
    identifiers.get(key).add(content)
  }

  walk(css, [], ({prelude, body, context}) => {
    const scope = context.length ? `${context.join(' ')} ` : ''
    const keyframes = prelude.match(/^@keyframes\s+(\S+)/)
    if (keyframes) {
      add(`@keyframes ${keyframes[1]}`, `${scope}{${body}}`)
      return
    }
    for (const match of prelude.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) {
      add(`.${match[1]}`, `${scope}${prelude}{${body}}`)
    }
    // A custom property's meaning is the value it is assigned (theme classes are compared as
    // classes on their own), so the enclosing selector is left out here.
    for (const declaration of body.split(';')) {
      const custom = declaration.match(/^(--[\w-]+):(.*)$/)
      if (custom) add(custom[1], `${scope}${custom[1]}:${custom[2]}`)
    }
  })
  return identifiers
}

export function compareStylesheets(cssA, cssB) {
  const a = collectIdentifiers(cssA)
  const b = collectIdentifiers(cssB)
  const shared = [...a.keys()].filter((key) => b.has(key))
  const same = (x, y) => x.size === y.size && [...x].every((item) => y.has(item))
  const identical = shared.filter((key) => same(a.get(key), b.get(key)))
  const conflicting = shared.filter((key) => !same(a.get(key), b.get(key)))
  return {
    countA: a.size,
    countB: b.size,
    shared,
    identical,
    conflicting,
    detail: (key) => ({a: [...(a.get(key) ?? [])], b: [...(b.get(key) ?? [])]}),
  }
}
