---
'@sanity/ui': minor
---

Move more static CSS to `@sanity/ui/styles.css`:

- Migrate the static styled-components levels of `Avatar`, `AvatarCounter`, `Button` and `Switch` to [vanilla-extract](https://vanilla-extract.style/), along with `Button`'s `width="fill"`, which takes a fixed set of values.
- No API or DOM changes.

As with the components migrated in 4.1.0 and 4.2.0, equal-specificity consumer overrides of the migrated rules (for example `styled(Button)` with `white-space`) win only if `@sanity/ui/styles.css` loads before styled-components' runtime style tags. That is the usual case when the stylesheet is in the entry chunk.
