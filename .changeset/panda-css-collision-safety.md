---
'@sanity/ui': patch
---

- Replace vanilla-extract with Panda CSS for much stronger guarantees against CSS class name collisions.
- Put static CSS in CSS `@layer` so unlayered styled-components overrides take precedence even when the `<link rel="stylesheet">` for `@sanity/ui/styles.css` appears after `<style data-styled>` in the DOM. This prevents equal-specificity overrides from breaking in embedded Studios, such as those in Next.js, where stylesheet ordering can vary.
- Hash Panda-generated CSS variables and generate stricter style types.
