# sanity-ui-studio

The Sanity Studio for the `mos42crl` project (dataset `production`). It holds
the schemas and content of the previous [sanity.io/ui](https://www.sanity.io/ui)
docs site. [`apps/docs`](../docs) is fully static and reads nothing from this
project, so the studio has no presentation tool.

## Development

```sh
pnpm --filter sanity-ui-studio dev
```

This starts the studio dev server on http://localhost:3333.

## Deployment

The studio is deployed to Sanity's hosting:

```sh
pnpm --filter sanity-ui-studio run deploy
```

`run` is required: without it, `deploy` is pnpm's built-in `pnpm deploy`
command. The app id in `sanity.cli.ts` keeps deploys pointed at the existing
hosted studio.

## Schema deployment

```sh
pnpm --filter sanity-ui-studio schema:deploy
```

## Docs export

```sh
pnpm --filter sanity-ui-studio export:docs
```

`scripts/export-docs-to-code.ts` writes the docs content in this dataset to the
`page.tsx`/`nav.ts` files under `apps/docs/src/app/(website)/` and downloads the
images they use to `apps/docs/public/images/`, overwriting any changes made to
those files. It is not part of any build.
