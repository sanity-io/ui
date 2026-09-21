# Spinner wobble recording rig

Throwaway app for capturing the Safari spinner bug fixed in
[#2897](https://github.com/sanity-io/ui/pull/2897). It is not part of the
published packages.

Two copies of `@sanity/ui` are installed under alias names:

- `@sanity/ui-wobbly` → `npm:@sanity/ui@4.2.0`, the last release without the fix
- `@sanity/ui-fixed` → `npm:@sanity/ui@4.2.1`, the first release with `round(1em, 2px)`

While `packages/ui` is also at 4.2.1, pnpm's `linkWorkspacePackages: deep`
links `@sanity/ui-fixed` to that source instead of npm. It is the same code,
and the vite config compiles it like `apps/icons` does. Once the workspace
version moves on, the alias installs the published 4.2.1 build.

Both versions emit the same spinner class name, so each variant is its own
lazy chunk and a document only ever loads one of them.

```sh
pnpm --filter spinner-wobble dev
```

- http://localhost:5199/ picks a variant
- http://localhost:5199/?variant=before
- http://localhost:5199/?variant=after

Record in Safari — other engines do not wobble. The checkerboard is a 640×360
stage (16:9) scaled to fit the window in whole device pixels. That composition
is what a 620px-wide blog embed shows, so the odd-pixel snap stays about one
pixel instead of being shrunk away. Press `f` for fullscreen, `b` / `a` to
switch versions.
