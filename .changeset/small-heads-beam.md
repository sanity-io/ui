---
'@sanity/ui-workshop': patch
'@sanity/ui-tokens': patch
'@sanity/ui-css': patch
'@sanity/ui': patch
---

Refine component color tokens and CSS token output.

This release updates component color tokens to better separate variant-level and interaction-state color decisions, adds component color aliases, and improves support for color mix expressions. Opacity-based colors are now represented as color mix expressions, transparent color tokens are serialized correctly, and precomputed tokens are excluded from CSS output.

Button styling now includes a pressed state, while obsolete selected button styles have been removed. Input and boolean color variables are now applied correctly in CSS.
