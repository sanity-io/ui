---
"@sanity/ui": minor
---

**All components are plain function components — `ref` is a regular prop (React 19 semantics).**

Refs keep working exactly as before. The one observable change: components no longer pass `react-is` checks such as `isForwardRef`.

Internally, the legacy React APIs (`forwardRef`, `createRef`, `createElement`) are now banned via oxlint `no-restricted-imports`, and class components via `react/prefer-function-component` (with `allowErrorBoundary` so the `ErrorBoundary` class remains valid).
