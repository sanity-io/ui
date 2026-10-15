---
'@sanity/ui': patch
---

Publish `@sanity/ui/styles.css` without CSS cascade layers, like the releases before 4.4.6. CSS outside any layer beats every layered rule, whatever its specificity, so a reset or base style in your app (such as Tailwind's preflight, or `button { font-weight: inherit }`) also overrode Sanity UI's hover, focus and selected styles. Without layers, the stylesheet cascades by specificity and then source order, so overriding a base style no longer removes the more specific state styles. Class names are unchanged.

**Check your load order:** `@sanity/ui/styles.css` must load before styled-components' `<style data-styled>` tag. When one of your styled-components overrides, such as `styled(Button)`, has the same specificity as the static style it overrides, the rule that loads last wins, so the override breaks if the stylesheet loads after the tag. Importing the stylesheet in your app's entry point, before anything renders, gives this order. Check it in your browser's devtools if the stylesheet loads lazily or your framework decides where stylesheets go. See the README's "Load order" section.
