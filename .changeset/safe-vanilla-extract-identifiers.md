---
'@sanity/ui': patch
---

Class names in `@sanity/ui/styles.css` now include the package version, so a release no longer reuses an older release's class names for different rules.

A page that loaded stylesheets from two releases could apply an old rule to a new component. For example, `._2mi48t0` was the Button loading overlay in 4.4.2 and the Button root in 4.4.4.

Keep importing `@sanity/ui/styles.css` as before. Appearance, props, and markup are unchanged.
