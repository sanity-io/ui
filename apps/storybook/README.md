# Sanity UI Storybook

## Storybook guidelines

- All stories must export either a named `Default` or `Basic` story.
- Avoid creating custom titles for stories - these should be inferred via folder structure alone.
- Where possible, stories should be kept as simple as possible with minimal custom / presentational props.
- Prefer setting component values via storybook [args](https://storybook.js.org/docs/react/writing-stories/args) instead of passing them manually in props.

## Things to note

- All stories are wrapped with a [common decorator](https://storybook.js.org/docs/react/writing-stories/decorators#story-decorators) which wraps stories in both a `<ThemeProvider>` but also a `<Card>` with padding. Stories that depend on exact viewport dimensions (e.g. stories with interaction tests that assert on responsive behavior) can opt out with the `padding: 0` parameter.
- Interaction tests are written as story `play` functions and run in a real browser with the [Vitest addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon) (`pnpm test:browser`). Take care when renaming stories or ids that `play` functions rely on.

## Areas of improvement

- Scheme (dark / light mode) toggles should be removed on non-applicable pages (such as non-story pages like this one).
- We may want to reconsider whether scheme toggling impacts the 'manager' (or general interface) as well.
- This Storybook should not load the Nunito Sans font, which is not being used in this current theme.
- We currently override some manager + preview CSS to prevent unsightly flashes of white backgrounds on mount.
