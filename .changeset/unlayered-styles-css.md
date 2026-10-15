---
'@sanity/ui': patch
---

Fix app resets and base styles unexpectedly overriding Sanity UI's hover, focus, and selected states.

`@sanity/ui/styles.css` now ships without CSS cascade layers, restoring the behavior from before 4.4.6. With layers, unlayered app styles took precedence over Sanity UI's styles—even when Sanity UI's selectors were more specific. Removing the layers lets specificity determine which styles win again. Class names are unchanged.

**Check your stylesheet order:** Load `@sanity/ui/styles.css` before styled-components' `<style data-styled>` tags so custom overrides such as `styled(Button)` keep working. When selectors have equal specificity, the rule that appears later wins.

Import the stylesheet in your app's entry point, before rendering. If your app loads CSS lazily or your framework controls stylesheet placement, verify the order in your browser's developer tools. See the README's “Load order” section for details.
