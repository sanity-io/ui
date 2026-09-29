# sanity-ui-studio

The Sanity Studio for the `mos42crl` project (dataset `production`) that used
to power [sanity.io/ui](https://www.sanity.io/ui). The docs site (`apps/docs`)
is now fully static — every page is a `page.tsx` in the repo — so nothing
reads from this project at runtime anymore. The studio, its schemas and all
content are preserved in case the docs ever move back to a data-driven
approach (no data was deleted).

The `icon` documents in this dataset used to back the
[icons.sanity.dev](https://icons.sanity.dev) search. The search, its studio and
the `enrich-icon` Sanity Function now live in
[sanity-io/icons](https://github.com/sanity-io/icons) (project `ppsg7ml5`), so
this studio no longer has an `icon` type; the documents were left in place.

Compared to the previous embedded studio there is no presentation tool /
preview setup (there is no draft mode to preview against).

## Development

```sh
pnpm --filter sanity-ui-studio dev
```

This starts the studio dev server on http://localhost:3333.

## Deployment

The studio is no longer embedded in the docs site (sanity.io/ui/studio). Use
Sanity's hosting instead:

```sh
pnpm --filter sanity-ui-studio deploy
```

The app id in `sanity.cli.ts` keeps deploys pointed at the existing hosted
studio.

## Schema deployment

```sh
pnpm --filter sanity-ui-studio schema:deploy
```

## One-shot docs export

`scripts/export-docs-to-code.ts` is the migration script that converted the
Sanity-hosted docs content into the static `page.tsx`/`nav.ts` files in
`apps/docs` (see the `DS-276` migration). It is kept for reference and is not
part of any build.
