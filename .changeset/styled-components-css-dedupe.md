---
'@sanity/ui': patch
---

Improve rendering performance by sharing common CSS across components instead of generating duplicate styles for each combination of props. This reduces the amount of CSS your app generates and the work needed to render it, especially on pages with many Sanity UI components.

Across our Storybook stories in both light and dark mode, generated CSS was 77% smaller and style generation took 54% less time. In a server-rendering benchmark, generated CSS was 80% smaller and rendering took 63% less time. Results will vary by app.

No changes to your code are needed to benefit from these improvements, and components using the built-in themes look the same.
