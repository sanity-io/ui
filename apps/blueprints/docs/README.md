# blueprints-docs

[Sanity Blueprint](https://www.sanity.io/docs/compute-and-ai/blueprints) for the
sanity.io/ui docs (Sanity project `mos42crl`).

## Functions

### `enrich-icon`

Listens for created/updated `icon` documents on the `mos42crl.production`
dataset that don't have a `description` yet (see
`packages/icons/scripts/seed-icons-dataset.ts`, which clears it when an icon
changes) and uses [Agent Actions](https://www.sanity.io/docs/agent-actions)
to look at the rasterized icon preview and write a search-friendly
`description` plus search `tags`, which power the semantic icon search on
[icons.sanity.dev](https://icons.sanity.dev) (`apps/icons`).

It resolves the schema as `_.schemas.production`, so the studio schema
must be deployed (`pnpm --filter sanity-ui-studio schema:deploy`)
for the agent actions to work.

### Removed: `invalidate-sync-tags`

The blueprint used to also deploy an `invalidate-sync-tags` function that
forwarded sync tag invalidation events to the docs deployment's
`/ui/api/expire-tags` endpoint. The docs app (`apps/docs`) is fully static now
— it doesn't fetch from Sanity at all — so the function is gone. The endpoint
remains as a no-op that returns `{service: 'sanity-ui-docs', tags}` so leftover
callers don't spike error rates. The `EXPIRE_TAGS_SECRET` env vars (on the
deployed function and the docs Vercel project) are no longer used and can be
deleted.

## Deploys

`.github/workflows/sanity-blueprint-docs.yml` runs
`blueprints doctor` + `blueprints plan` on pull requests and
`blueprints deploy` on pushes to `main`, via `@sanity/runtime-cli`. It uses the
`SANITY_UI_DOCS_AUTH_TOKEN` repository secret (a token with deploy permissions
on project `mos42crl`) and the stack id in the workflow's
`SANITY_BLUEPRINT_STACK_ID` env.

## Local development

```sh
# Validate the blueprint
pnpm dlx @sanity/runtime-cli@latest blueprints doctor

# Diff against the deployed stack
pnpm dlx @sanity/runtime-cli@latest blueprints plan

# Tail function logs
pnpm dlx @sanity/runtime-cli@latest functions logs enrich-icon
```

All commands expect `SANITY_AUTH_TOKEN`, `SANITY_PROJECT_ID=mos42crl` and
`SANITY_BLUEPRINT_STACK_ID` in the environment (or a `.sanity/blueprint.config.json`
from a previous `blueprints deploy`).
