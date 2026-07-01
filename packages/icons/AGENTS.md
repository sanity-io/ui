# AGENTS.md

## Cursor Cloud specific instructions

`@sanity/icons` is a single-package React icon library (pnpm, TypeScript). There is one runnable service: a Vite "workshop" showcase app that renders all icons with a name filter.

- Package manager is pnpm (`pnpm-lock.yaml`). Node 24 is auto-provisioned by pnpm via `devEngines` during `pnpm install`, so the system Node version does not matter.
- Standard commands live in `package.json` scripts; use them directly:
  - Dev showcase app: `pnpm dev` (Vite on http://localhost:5173/, entry `src/__workshop__/main.tsx`).
  - Lint: `pnpm lint` (oxlint). Format: `pnpm format` (oxfmt).
  - Test: `pnpm test` (vitest, jsdom).
  - Build the library: `pnpm build` (runs `clean` → `generate` → `pkg:build` → `pkg:check`).
  - Dead-code/deps check: `pnpm knip`.
- Non-obvious: `pnpm build` runs `generate`, which deletes and regenerates `src/icons/*` and `src/icons/index.ts` from the SVG sources in `export/`. These generated files are committed; do not hand-edit them—edit the SVGs in `export/` or `scripts/generate.ts` instead.
- The pre-commit hook (lefthook) runs oxfmt + oxlint on staged files.
