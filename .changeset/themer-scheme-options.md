---
"@sanity/themer": minor
---

**Breaking:** the root `buildTheme` and `buildPalette` options are grouped by color scheme, so the light and the dark scheme can differ in every color rather than only their background:

```ts
// Before
buildTheme({accent: "#1cb485", text: "#5c9199", background: {dark: "#0d1415", light: "#fcfdfd"}})

// After
buildTheme({
  light: {accent: "#1cb485", text: "#5c9199", background: "#fcfdfd"},
  dark: {accent: "#1cb485", text: "#5c9199", background: "#0d1415"},
})
```

Each scheme takes an optional `accent`, `text`, `background` and `contrast`, and both schemes are optional too: whatever is omitted falls back to the stock Studio colors, so `buildTheme({})` matches `buildTheme()` from `@sanity/ui/theme`. `buildPalette` returns a palette per scheme (`{light, dark}`), `presets` carry their colors per scheme, and passing the old flat shape throws a `TypeError` that points at the new one. The themer tool edits themes scheme by scheme — a light mode and a dark mode card with pickers and a contrast slider each, the scheme the Studio is showing marked as active — and its stored themes and legacy drafts are converted from the flat shape automatically.
