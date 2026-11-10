# DTCG token files

These files hold the values of the Sanity UI 5 tokens. The token docs in `tokens/` do not repeat the values. Each token entry points here through its `source`, for example `./dtcg/json/space.tokens.json#space-1`.

## Where they come from

The files are a copy of `dist/json` and `dist/css` from [sanity-labs/design-tokens](https://github.com/sanity-labs/design-tokens/tree/main/dist/json).

| Field   | Value                            |
| ------- | -------------------------------- |
| Package | `@sanity-labs/design-tokens`     |
| Version | `0.0.2-alpha.6`                  |
| Commit  | Not recorded in the npm package  |
| Copied  | 2026-10-05, from the npm package |

Sanity UI 5 alpha.14 depends on this version. Keep the copy on the version Sanity UI pins.

## The semantic file

Two files do not come from the design-tokens repo. `json/semantic.tokens.json` and `css/semantic.css` hold the semantic layer: `--background-low`, `--separator-low` and the rest. Sanity UI 5 defines that layer in its CSS. The `build-semantic.mjs` script makes both files from that CSS.

Each light value points at a palette token. The dark value and the tone value sit in `$extensions`. Rerun the script when Sanity UI changes version:

```sh
node tokens/dtcg/build-semantic.mjs <path to sanity-io/ui/packages/ui>
```

## How agents read them

Read these files directly. Each token's name and value is in the JSON. Its CSS custom property is in the matching file under `css/`, so use that name instead of guessing it.

## How to update

1. Check which version of `@sanity-labs/design-tokens` Sanity UI pins.
2. Copy that version's `dist/json` into `json/` and its `dist/css` into `css/`.
3. Update the table above.
4. Check the values against the JSON files, and check the CSS custom property names against the CSS files.

Do not edit these files by hand. The design-tokens repo generates them.
