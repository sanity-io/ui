# sanity-ui-docs

This is the source code of [sanity.io/ui](https://www.sanity.io/ui). It was
migrated from the standalone [`sanity-io/ui-docs`](https://github.com/sanity-io/ui-docs)
repository (with its full git history). It is linted by the root oxlint config
(with the Next.js plugin rules enabled via an override in `.oxlintrc.json`) and
formatted by the root oxfmt configuration (`pnpm format` at the repo root).

## Development

```sh
pnpm --filter sanity-ui-docs dev
```

This starts Next.js on http://localhost:3000 (the site is served under the
`/ui` base path, so open http://localhost:3000/ui) and the Sanity Studio dev
server on http://localhost:3333.

### Add the preview token

Rendering draft content (draft mode / presentation tool) requires a viewer
token:

- Create a file named `.env.local` in this directory
- Create a new viewer token in [sanity.io/manage](https://sanity.io/manage)
- Add a new entry named `SANITY_API_READ_TOKEN` with the token value
