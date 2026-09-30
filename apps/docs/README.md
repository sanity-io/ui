# sanity-ui-docs

This is the source code of [sanity.io/ui](https://www.sanity.io/ui). It is
linted by the root oxlint config (with the Next.js plugin rules enabled via an
override in `.oxlintrc.json`) and formatted by the root oxfmt configuration
(`pnpm format` at the repo root).

The site is fully static: it fetches nothing from Sanity at runtime (no
`@sanity/client`, no Sanity Live) and needs no environment variables. The
`POST /ui/api/expire-tags` route is a no-op that returns a 200 JSON response,
so callers of that revalidation endpoint don't see errors.

## Content lives in code

Every page is a `page.tsx` under [`src/app/(website)/`](<src/app/(website)/>),
written with the content components in
[`src/components/page/article/`](src/components/page/article/) — edit the page
files directly to change the docs.

The navigation tree mirrors the route file structure: each route folder has a
colocated `nav.ts` with its title, ordering and display flags, collected with
Turbopack's `import.meta.glob` in
[`src/app/(website)/navTree.ts`](<src/app/(website)/navTree.ts>) — there is no
manually maintained route list. Adding a page means creating a folder with a
`page.tsx` and a `nav.ts`; group folders (e.g. `docs/primitive/`) only have a
`nav.ts`.

[`apps/studio`](../studio) holds the content of the previous docs site. Its
`export:docs` script writes the page files here from that content, overwriting
any changes made to them.

## Development

```sh
pnpm --filter sanity-ui-docs dev
```

This starts Next.js on http://localhost:3000. The site is served under the
`/ui` base path, so open http://localhost:3000/ui.
