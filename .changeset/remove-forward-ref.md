---
"@sanity/ui": minor
---

All components are now plain function components that receive `ref` as a regular prop (React 19 semantics) instead of being wrapped in `forwardRef`. Refs keep working exactly as before, but the components no longer pass `react-is` checks like `isForwardRef`. The legacy React APIs (`forwardRef`, `createRef`, `createElement`, `Component`, `PureComponent`) are now banned via oxlint across the repo.
