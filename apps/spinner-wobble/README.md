# Spinner wobble recording rig

Throwaway app for capturing the Safari spinner bug fixed in
[#2897](https://github.com/sanity-io/ui/pull/2897). It is not part of the
published packages.

Both copies are the published npm builds, vendored as tarballs
(`vendor/ui-4.2.0.tgz` and `vendor/ui-4.2.1.tgz`) and installed under alias
names. A plain `npm:@sanity/ui@4.2.1` dependency would link this workspace
instead, because the workspace package is also `4.2.1`. Regenerate them with
`pnpm --filter spinner-wobble vendor`.

- `@sanity/ui-wobbly` → `@sanity/ui@4.2.0` (last release without the fix)
- `@sanity/ui-fixed` → `@sanity/ui@4.2.1` (`latest` when this was added; first release that includes the fix)

They publish the same CSS class name for the spinner, so each version has its
own page. Loading both stylesheets in one document would let the second rule
win.

```sh
pnpm --filter spinner-wobble dev
```

- Before: http://localhost:5199/before.html
- After: http://localhost:5199/after.html

Record in Safari — other engines do not wobble. The checkerboard is a 640×360
stage (16:9) scaled to the window. That composition is what a 620px-wide blog
embed shows, so the odd-pixel snap stays about one pixel instead of being
shrunk away. Make the window 16:9 before recording, or press `f` and crop to
the checkerboard. `b` / `a` switch versions. Add `?native` to keep the stage
at 1× instead of scaling it.
