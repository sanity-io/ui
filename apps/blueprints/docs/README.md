# blueprints-docs

[Sanity Blueprint](https://www.sanity.io/docs/compute-and-ai/blueprints) for the
sanity.io/ui docs (Sanity project `mos42crl`). It deploys the serverless
functions that keep the Next.js cache of [`apps/docs`](../../docs) in sync with
content changes.

## Functions

### `invalidate-sync-tags`

Listens for [sync tag invalidation events](https://www.sanity.io/docs/compute-and-ai/functions)
on the `mos42crl.production` dataset and forwards the invalidated sync tags to
the docs deployment's expire-tags endpoint
(`https://www.sanity.io/ui/api/expire-tags`, hardcoded in
`functions/invalidate-sync-tags/index.ts`), which calls
`revalidateTag('sanity:<tag>', 'max')` so cached pages are background-revalidated.

The endpoint is guarded by a single shared secret, which must be set in two
places with the same value:

| Where                               | Key                  | How                                                                                                                           |
| ----------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| the deployed function               | `EXPIRE_TAGS_SECRET` | `pnpm dlx @sanity/runtime-cli@latest functions env add invalidate-sync-tags EXPIRE_TAGS_SECRET <value>` (from this directory) |
| the docs Vercel project (apps/docs) | `EXPIRE_TAGS_SECRET` | `vercel env add EXPIRE_TAGS_SECRET production` (or the Vercel dashboard), then redeploy                                       |

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

# Manage function env vars
pnpm dlx @sanity/runtime-cli@latest functions env list invalidate-sync-tags

# Tail function logs
pnpm dlx @sanity/runtime-cli@latest functions logs invalidate-sync-tags
```

All commands expect `SANITY_AUTH_TOKEN`, `SANITY_PROJECT_ID=mos42crl` and
`SANITY_BLUEPRINT_STACK_ID` in the environment (or a `.sanity/blueprint.config.json`
from a previous `blueprints deploy`).
