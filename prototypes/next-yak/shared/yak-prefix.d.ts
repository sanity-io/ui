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
export declare function yakPrefixFor(name: string, version: string): string;
