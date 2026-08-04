# DOM depth testing

Compares the DOM each library emits between `@sanity/ui` v3 and `@sanity/ui` v5.

Two near-identical pages, one per library:

- `/` — Sanity UI v5
- `/ui3` — Sanity UI v3

Both routes are stubs for now — add the component tree you want to compare to each, keeping them in sync so the comparison stays fair.

## Running

- `pnpm dev` — dev server.
- `pnpm build && pnpm preview` — production build. Prefer this for any measurement; dev mode adds React's extra checking work.
