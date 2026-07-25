---
"@sanity/ui": minor
---

`TreeItem` accepts a new `linkProps` prop with additional props for the link element that is rendered when `href` is set — for example `next/link`'s `prefetch`: `<TreeItem linkAs={Link} linkProps={{prefetch: true}} href="…">`. Props controlled by `TreeItem` itself (`href`, `role`, `tabIndex`, `aria-expanded` and the ref) take precedence.
