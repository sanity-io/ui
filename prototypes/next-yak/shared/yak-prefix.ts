/**
 * next-yak names every class/CSS variable `<prefix><fnv1a(relative file path)><per-file counter>`
 * (packages/yak-swc/yak_swc/src/naming_convention.rs). Nothing in that scheme depends on the
 * package name, its version or the CSS content, so two versions of the same library produce
 * identical class names for different rules. The only knob the compiler offers is `prefix`.
 *
 * This derives a deterministic prefix from `name@version` so that every published version of a
 * library gets a disjoint class namespace. It is reproducible across machines (no randomness),
 * but it is a *version* hash, not a *content* hash: two versions with byte-identical CSS still
 * get different class names and therefore duplicate CSS instead of deduplicating it.
 */
export function yakPrefixFor(name: string, version: string): string {
  const input = `${name}@${version}`
  // FNV-1a 32-bit — plenty for a per-version namespace, keeps class names short
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  // CSS identifiers must not start with a digit, so lead with a letter
  return `s${hash.toString(36)}_`
}
