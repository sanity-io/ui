# Tone and color: full reference

Read this file when you choose a tone or set a color. The values below were checked against `@sanity/ui` 5.0.0-alpha.22.

## The five semantic tones

Each tone carries a meaning. Use the meaning, not a raw color.

| Intent                     | Tone       |
| -------------------------- | ---------- |
| Neutral surface or default | `neutral`  |
| Success                    | `positive` |
| Suggestion or AI hint      | `suggest`  |
| Warning                    | `caution`  |
| Error or destructive       | `critical` |

`suggest` is the tone for content the agent produced or proposed. Reach for it when the UI marks an AI hint.

## Which component takes which tone

Tone values are not the same across components. A tone the component does not take is a type error in v5.

| Components                                     | Tones accepted                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| Card, Box, Flex, Grid, Container               | `default`, `neutral`, `positive`, `suggest`, `caution`, `critical` |
| Text, Heading, Icon, Eyebrow, Badge, Indicator | `neutral`, `positive`, `suggest`, `caution`, `critical`            |
| Button                                         | `neutral`, `critical`                                              |

`default` on the layout surfaces paints the page backdrop. Use `neutral` for a plain surface.

v3 used `default` for neutral on `Button` and `Badge`. Replace it with `neutral` when you port code. The tone names are the same across the other components.

## Watch the seams

- `tone="default"` on `Text`, `Heading`, `Icon`, `Badge`, or `Eyebrow` is a type error. Use `neutral`.
- `tone="positive"`, `"caution"`, or `"suggest"` on `Button` is a type error. Button takes `neutral` and `critical` only.
- A toned Badge, Text, or Heading should lead with the state in its words, or carry an icon. A tone alone is not enough.

## Color restraint

- The base is near-monochrome on purpose. A restrained base makes one accent count.
- A toned or colored element should mean something. If everything is colored, nothing reads.
- Default to neutral surfaces. Spend color where it carries weight.

## Semantic variables for custom markup

When no component covers a case, use the semantic variables. They resolve everywhere and follow the nearest tone:

- `var(--background-low)` for a surface
- `var(--separator-low)` for a border
- `var(--foreground-high)` and `var(--foreground-low)` for text

Toned elements set these variables for their children. A toned Card therefore sets its own surface and text colors on its own.

The names `--tone-surface` and `--tone-separator` are not defined by any version. A declaration that uses them does nothing.
