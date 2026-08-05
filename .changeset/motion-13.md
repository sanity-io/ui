---
"@sanity/ui": patch
---

fix(deps): update dependency motion to ^13.0.0

Motion 13 no longer loads the optional `@emotion/is-prop-valid` dependency to decide which props a
`motion` component forwards to the DOM; it now only does so when an `isValidProp` function is passed
to `MotionConfig`. `@sanity/ui` composes motion the way the upgrade guide recommends
(`motion.create(StyledComponent)`, never `styled(motion.div)`), so its own components are unaffected:
for custom components motion still forwards every non-motion prop and lets the styled component
filter, exactly as before. Apps that wrap a DOM-level motion component in a CSS-in-JS factory —
`styled(motion.div)` — may need to pass `isValidProp` to `MotionConfig`, use transient props, or
reverse the composition.
