# Silent failures — the catalog

This file is the catalog. These patterns fail with no error, warning, or type feedback. When a layout breaks or a style goes missing with zero console output, check here first. Wrong props on Sanity UI 5 components are mostly type errors. Run `tsc --noEmit` before you read this list.

| #   | Trigger                                                                                       | Symptom                                                                          | Fix                                                                                                                                |
| --- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1   | No `as` on `Heading` in v3 code, where the default was `<div>`                                | In v5 this is a type error. Ported code that skips `as` fails `tsc`              | Set `as` to the level. Use `size` for the visual size.                                                                             |
| 2   | v3 props on v5 components, such as `direction` on Flex or `space` on Stack                    | v5 reports most of these as type errors. Props that reach the DOM can be ignored | Migrate each prop. See `migrating-from-v3.md`                                                                                      |
| 3   | No `import '@sanity/ui/styles.css'` in `main.tsx`                                             | Every component renders as unstyled HTML                                         | Add the import to `main.tsx`                                                                                                       |
| 4   | A `var(--tone-*)` variable, such as `--tone-surface`, which no version defines                | The value resolves to nothing; background or border is invisible                 | Use `var(--background-low)`, `var(--separator-low)`, or `var(--foreground-high)`. They work everywhere and follow the nearest tone |
| 5   | A single-quoted string with an apostrophe                                                     | A Vite build error that is easy to miss                                          | Use a template literal or double quotes                                                                                            |
| 6   | A tone value the component does not accept, such as `default` on Text or `positive` on Button | A type error in v5                                                               | See `tone-and-color.md` for the values each component takes                                                                        |

## Caught by the type checker

These are not silent in Sanity UI 5. `tsc --noEmit` reports a type error for each one.

- Layout props on `Card`, such as `flexGrow`, `minWidth`, `overflow`, or `padding`. Wrap the Card in `Box` or `Flex`: `<Box flexGrow={1}><Card /></Box>`.
- `flexGrow`, `flexShrink`, or `flexBasis` on `VStack` or `HStack`. Use `<Flex flexDirection="column" gap={3}>`, or wrap the stack in `<Box flexGrow={1}>`.
- A `Heading` with no `as`. Set `as` to `h1` through `h6`.
- A tone the component does not take, such as `tone="default"` on Text or `tone="positive"` on Button.

If your project does not run the type checker, run it. Without it, these look like silent failures.

## The diagnostic habit

When something looks wrong and there is no error:

- Did you run `tsc --noEmit`? It catches layout props on `Card` and flex props on `VStack` and `HStack`.
- Is `Heading` missing an `as`? Add it.
- Are layout primitives imported from the v3 line? Switch to v5.
- Is `styles.css` imported in `main.tsx`? Add it.
- Is a `var(--tone-*)` variable in the code? No version defines it. Use `var(--background-low)` or a similar semantic variable.
