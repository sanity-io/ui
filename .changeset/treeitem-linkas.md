---
"@sanity/ui": patch
---

`TreeItem` now renders custom link components passed via `linkAs` correctly. Previously the internal styled wrapper forwarded a stray `as="a"` prop to the custom component — breaking components like `next/link`, which interpret `as` as a URL override — and dropped the `display: block`/`text-decoration: none` styles from the rendered link. `<TreeItem linkAs={Link} href="…">` now behaves like `<Button as={Link} href="…">`.
