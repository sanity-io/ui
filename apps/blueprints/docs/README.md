# blueprints-docs

[Sanity Blueprint](https://www.sanity.io/docs/compute-and-ai/blueprints) for the
sanity.io/ui docs (Sanity project `mos42crl`). It deploys the serverless
functions that keep the Next.js cache of [`apps/docs`](../../docs) in sync with
content changes.

## Functions

### `invalidate-sync-tags`

Listens for [sync tag invalidation events](https://www.sanity.io/docs/compute-and-ai/functions)
on the `mos42crl.production` dataset and forwards the invalidated sync tags to
the docs app's `/ui/api/expire-tags` endpoint(s), which call
`revalidateTag('sanity:<tag>', 'max')` so cached pages are background-revalidated.

Per-environment configuration is provided via function env vars
(`sanity functions env add invalidate-sync-tags <KEY> <VALUE>`):

| Key                                | Value                                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------- |
| `PRODUCTION_URLS`                  | comma-separated expire-tags endpoints, e.g. `https://www.sanity.io/ui/api/expire-tags` |
| `PRODUCTION_SECRET`                | must match `EXPIRE_TAGS_SECRET` on the production deployment                           |
| `STAGING_URLS`                     | comma-separated expire-tags endpoints for staging (optional)                           |
| `STAGING_SECRET`                   | must match `EXPIRE_TAGS_SECRET` on the staging deployment                              |
| `STAGING_VERCEL_PROTECTION_BYPASS` | `x-vercel-protection-bypass` token for staging (optional)                              |

An environment is skipped unless both its `_URLS` and `_SECRET` are set.

## Deploys

`.github/workflows/sanity-blueprint-docs.yml` runs
`blueprints doctor` + `blueprints plan` on pull requests and
`blueprints deploy` on pushes to `main`, via `@sanity/runtime-cli`. It needs:

- the `SANITY_UI_DOCS_AUTH_TOKEN` repository secret (a token with deploy
  permissions on project `mos42crl`)
- the `SANITY_BLUEPRINT_STACK_ID` value in the workflow, which is printed by the
  first manual `pnpm dlx @sanity/runtime-cli@latest blueprints deploy` from this
  directory (the first deploy creates the stack)

## Local development

```sh
# Validate the blueprint
pnpm dlx @sanity/runtime-cli@latest blueprints doctor

# Diff against the deployed stack
pnpm dlx @sanity/runtime-cli@latest blueprints plan

# Manage function env vars
pnpm --filter blueprints-docs exec sanity functions env list invalidate-sync-tags
```

All commands expect `SANITY_AUTH_TOKEN`, `SANITY_PROJECT_ID=mos42crl` and (once
created) `SANITY_BLUEPRINT_STACK_ID` in the environment.
