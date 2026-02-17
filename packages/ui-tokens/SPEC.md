# Sanity UI tokens – Layered Resolution Specification

> **Status:** v1 / Internal
>
> **Audience:** Design system engineers, tooling authors, platform integrators (CSS, Figma, iOS, Android)

This document specifies the **layered design token model** used by `@sanity/ui-tokens`.

It is intentionally detailed and explicit. The goal is not just to describe _what tokens exist_, but **how tokens are resolved across multiple layers, tools, and platforms**, and _why_ the system is structured this way.

---

## 1. Problem Statement

Large design systems must simultaneously:

- Provide a **small, stable semantic API** to application code
- Support **multiple contextual axes** (color scheme, surface tone, element tone, etc.)
- Avoid leaking primitive/palette tokens
- Stay compatible with:
  - CSS (including vanilla-extract)
  - Figma Variables / Tokens Studio
  - Native platforms (iOS, Android)
  - Documentation and machine-readable specs (MCP)

Most token systems fail by either:

- flattening everything into semantic names (loss of flexibility), or
- exposing primitives directly (loss of consistency), or
- encoding context into token names (combinatorial explosion).

This system instead treats tokens as the **result of ordered decisions**.

## 1.1 Non-Goals

This system explicitly does NOT aim to:

- Expose palette or internal collection tokens to consumers
- Allow arbitrary token selection outside the resolution pipeline
- Encode contextual decisions (scheme, cardTone, elementTone) into semantic token names
- Provide a general-purpose theming language

Any usage that relies on these behaviors is considered unsupported.

---

## 2. Core Idea: Tokens as a Resolution Pipeline

A semantic token (e.g. `color.fg`) is **not a value**.
It is the _output_ of a resolution pipeline.

Resolution always flows in the same direction:

```
_palette → _core → _colorScheme → _cardTone → _elementTone → _avatarColor → public collections
```

The set and order of collections is fixed. Additional collections MUST NOT be introduced without revising this specification.

Each stage:

- introduces **no new semantics**
- only aliases the previous stage into a narrower namespace
- narrows the design space

This makes the system:

- deterministic
- debuggable
- composable across tools

## 2.1 Terminology and Invariants

This specification uses the following terms intentionally and consistently:

- **Palette** (`_palette`) — Literal color values. The only collection containing raw hex/RGB values.
- **Core** (`_core`) — The complete primitive design space organized by scheme. References palette.
- **Color Scheme** (`_colorScheme`) — A global appearance decision (light/dark). References core.
- **Card Tone** (`_cardTone`) — A surface-level context (default, primary, critical, etc.). References color scheme.
- **Element Tone** (`_elementTone`) — An intent or emphasis applied to UI controls within a surface. References card tone.
- **Avatar Color** (`_avatarColor`) — A color variant applied to avatar components. References card tone.
- **Public collections** (`color`, `card`, `button`, etc.) — The stable API consumed by application code. References internal collections.

These terms are **not interchangeable**.

**Collection visibility:**

- Collections prefixed with `_` are **internal** and MUST NOT be consumed directly by application code
- Public collections (without `_` prefix) form the stable API contract
- All public collections reference internal collections through token aliases

In particular:

- "Element tone" does not mean a primitive UI element—it represents intent (default, primary, critical, etc.)
- "Variant" refers to visual treatment (tinted, solid) within element tokens
- Mode names (e.g. `default`, `critical`) are scoped to their collection and MUST NOT be inferred across collections

## 2.2 No Overrides Invariant

This system explicitly forbids overrides.

- No collection replaces values from another collection
- No precedence rules exist between collections
- No implicit fallback resolution or shadowing is allowed

All resolution is explicit and traceable through alias paths.

This invariant is fundamental to the system and MUST be preserved across all tools and platforms.

---

## 3. Token Format (DTCG-based)

This system uses the DTCG (Design Token Community Group) format for token values. Each token is an object with `$type`, `$value`, and optional `$description` and `$extensions` properties.

### 3.1 Collection Envelope

Each collection is represented as a `TokenCollection` object with explicit mode metadata and token trees organized by mode value.

A collection NEVER overrides another collection. Collections are combined by placing them side-by-side. Aliases are the only mechanism for moving between collections.

A collection MAY be unmoded (no modes, uses `'default'` as single mode value) or moded (exactly one mode dimension).

#### Moded layer shape

```ts
const layer: ColorSchemeCollection = {
  namespace: '_colorScheme',
  title: 'Color scheme',
  modes: {
    light: {
      _colorScheme: {
        /* tokens for light mode */
      },
    },
    dark: {
      _colorScheme: {
        /* tokens for dark mode */
      },
    },
  },
}
```

#### Unmoded layer shape

```ts
const paletteCollection: PaletteCollection = {
  namespace: '_palette',
  title: 'Palette',
  modes: {
    default: {
      _palette: {
        /* literal color values */
      },
    },
  },
}
```

---

## TypeScript types (practical, tool-friendly)

The implementation uses these TypeScript types:

```ts
// Token leaf types (DTCG format)
export type TokenLeaf =
  | SanityColorToken
  | SanityFontFamilyToken
  | SanityFontWeightToken
  | SanityFontStyleToken
  | SanityShadowToken
  | DTCGColorToken
  | DTCGDimensionToken
  | DTCGNumberToken
  | DTCGShadowToken

// Recursive token tree
export type TokenTree = {
  [key: string | number]: TokenLeaf | TokenTree
}

// Collection structure
export type TokenCollection<
  Namespace extends string = string,
  ModeValue extends string = string,
  Tokens extends Record<Namespace, TokenTree> = Record<Namespace, TokenTree>,
> = {
  /**
   * The namespace identifier for the collection.
   * Examples: "_palette", "_core", "_colorScheme", "_cardTone", "_elementTone", "color"
   */
  namespace: Namespace

  /**
   * The title of the collection.
   * Examples: "Palette", "Color scheme", "Card tone", "Color"
   */
  title: string

  /**
   * Tokens for each mode value.
   * Keys are mode values (e.g., 'light', 'dark', 'default', 'primary', etc.)
   * Values are token trees namespaced by collection namespace
   */
  modes: Record<ModeValue, Tokens>
}
```

### 3.2 Format Rules

- Each collection is a **separate structure** (TypeScript constant exported from its module)
- Literal values exist only in `_palette` collection
- All other tokens are aliases to preceding collections using DTCG reference syntax: `{namespace.path.to.token}`
- Aliases always reference a collection earlier in the resolution pipeline
- Aliases MUST only reference tokens in preceding collections (never skip collections or reference later collections)

### 3.3 Collection Structures

Each collection is shown with its actual implementation structure:

#### Palette Collection (`_palette`)

**Internal collection.** No modes (uses `'default'` as single mode). Contains literal color values only.

```ts
export const paletteCollection: PaletteCollection = {
  namespace: '_palette',
  title: 'Palette',
  modes: {
    default: {
      _palette: {
        black: {
          $type: 'color',
          $value: {
            colorSpace: 'srgb',
            components: [0, 0, 0],
            hex: '#000000',
          },
        },
        white: {
          $type: 'color',
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            hex: '#ffffff',
          },
        },
        gray: {
          '50': {
            $type: 'color',
            $value: {
              /* ... */
            },
          },
          '950': {
            $type: 'color',
            $value: {
              /* ... */
            },
          },
        },
        // ... other hues (red, orange, yellow, etc.)
      },
    },
  },
}
```

#### Core Collection (`_core`)

**Internal collection.** No modes (uses `'default'` as single mode). Organizes palette references by scheme and tone.

```ts
export const _coreCollection: CoreCollection = {
  namespace: '_core',
  title: 'Core',
  modes: {
    default: {
      _core: {
        color: {
          light: {
            default: {
              element: {
                tinted: {
                  default: {
                    bg: {
                      0: {$type: 'color', $value: '{_palette.gray.50}'},
                      4: {$type: 'color', $value: '{_palette.gray.200}'},
                    },
                    fg: {
                      0: {$type: 'color', $value: '{_palette.gray.950}'},
                      4: {$type: 'color', $value: '{_palette.gray.600}'},
                    },
                  },
                },
              },
            },
          },
          dark: {
            // ... similar structure for dark scheme
          },
        },
      },
    },
  },
}
```

#### Color Scheme Collection (`_colorScheme`)

**Internal collection.** Modes: `light | dark`

References core collection with scheme-specific paths.

```ts
export const _colorSchemeCollection: ColorSchemeCollection = {
  namespace: '_colorScheme',
  title: 'Color scheme',
  modes: {
    light: {
      _colorScheme: {
        color: {
          default: {
            element: {
              tinted: {
                default: {
                  bg: {
                    0: {
                      $type: 'color',
                      $value: '{_core.color.light.default.element.tinted.default.bg.0}',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    dark: {
      _colorScheme: {
        color: {
          default: {
            element: {
              tinted: {
                default: {
                  bg: {
                    0: {
                      $type: 'color',
                      $value: '{_core.color.dark.default.element.tinted.default.bg.0}',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
```

#### Card Tone Collection (`_cardTone`)

**Internal collection.** Modes: `default | neutral | primary | suggest | positive | caution | critical | transparent`

References color scheme collection with tone-specific paths.

```ts
export const _cardToneCollection: CardToneCollection = {
  namespace: '_cardTone',
  title: 'Card tone',
  modes: {
    default: {
      _cardTone: {
        color: {
          element: {
            tinted: {
              default: {
                bg: {
                  0: {
                    $type: 'color',
                    $value: '{_colorScheme.color.default.element.tinted.default.bg.0}',
                  },
                },
              },
            },
          },
        },
      },
    },
    primary: {
      _cardTone: {
        color: {
          element: {
            tinted: {
              default: {
                bg: {
                  0: {
                    $type: 'color',
                    $value: '{_colorScheme.color.primary.element.tinted.default.bg.0}',
                  },
                },
              },
            },
          },
        },
      },
    },
    // ... other tones
  },
}
```

#### Element Tone Collection (`_elementTone`)

**Internal collection.** Modes: `default | neutral | primary | suggest | positive | caution | critical`

References card tone collection with element tone-specific paths.

```ts
export const _elementToneCollection: ElementToneCollection = {
  namespace: '_elementTone',
  title: 'Element tone',
  modes: {
    default: {
      _elementTone: {
        color: {
          tinted: {
            bg: {
              0: {$type: 'color', $value: '{_cardTone.color.element.tinted.default.bg.0}'},
            },
          },
        },
      },
    },
    // ... other element tones
  },
}
```

#### Public Color Collection (`color`)

**Public collection.** No modes (uses `'default'` as single mode). The stable API consumed by application code.

```ts
export const colorCollection: ColorCollection = {
  namespace: 'color',
  title: 'Color',
  modes: {
    default: {
      color: {
        bg: {$type: 'color', $value: '{_elementTone.color.tinted.bg.0}'},
        fg: {$type: 'color', $value: '{_elementTone.color.tinted.fg.0}'},
        muted: {
          bg: {$type: 'color', $value: '{_elementTone.color.tinted.bg.1}'},
          fg: {$type: 'color', $value: '{_elementTone.color.tinted.fg.4}'},
        },
        tinted: {
          bg: {
            0: {$type: 'color', $value: '{_elementTone.color.tinted.bg.0}'},
            1: {$type: 'color', $value: '{_elementTone.color.tinted.bg.1}'},
            2: {$type: 'color', $value: '{_elementTone.color.tinted.bg.2}'},
            3: {$type: 'color', $value: '{_elementTone.color.tinted.bg.3}'},
            4: {$type: 'color', $value: '{_elementTone.color.tinted.bg.4}'},
          },
        },
      },
    },
  },
}
```

### 3.4 System Structure

The complete token system exports all collections under a single `TokenSystem` interface:

```ts
export interface TokenSystem {
  collections: {
    // Internal collections (prefixed with _)
    // Order matters for resolution
    _palette: PaletteCollection
    _core: CoreCollection
    _colorScheme: ColorSchemeCollection
    _cardTone: CardToneCollection
    _elementTone: ElementToneCollection
    _avatarColor: AvatarColorCollection

    // Public collections (alphabetical order)
    avatar: AvatarCollection
    border: BorderCollection
    button: ButtonCollection
    card: CardCollection
    color: ColorCollection
    container: ContainerCollection
    corner: CornerCollection
    focusRing: FocusRingCollection
    font: FontCollection
    radius: RadiusCollection
    shadow: ShadowCollection
    space: SpaceCollection
  }
}

export const system: TokenSystem = {
  collections: {
    // Internal collections
    _palette: paletteCollection,
    _core: _coreCollection,
    _colorScheme: _colorSchemeCollection,
    _cardTone: _cardToneCollection,
    _elementTone: _elementToneCollection,
    _avatarColor: _avatarColorCollection,

    // Public collections
    avatar: avatarCollection,
    border: borderCollection,
    button: buttonCollection,
    card: cardCollection,
    color: colorCollection,
    container: containerCollection,
    corner: cornerCollection,
    focusRing: focusRingCollection,
    font: fontCollection,
    radius: radiusCollection,
    shadow: shadowCollection,
    space: spaceCollection,
  },
}
```

**Key structure points:**

- Internal collections (prefixed with `_`) MUST NOT be consumed directly by applications
- Public collections form the stable API contract
- Collection order in the internal section matters for resolution
- Public collections are ordered alphabetically for consistency

### 3.5 Resolution process

Resolution selects a mode from each moded collection and follows alias chains to resolve final values.

```ts
// Given mode selections
const modeSelections = {
  colorScheme: 'light',
  cardTone: 'critical',
  elementTone: 'default',
}

// Resolve by selecting modes from each collection
const resolvedCollections = {
  palette: system.collections._palette.modes.default,
  core: system.collections._core.modes.default,
  colorScheme: system.collections._colorScheme.modes[modeSelections.colorScheme],
  cardTone: system.collections._cardTone.modes[modeSelections.cardTone],
  elementTone: system.collections._elementTone.modes[modeSelections.elementTone],
  avatarColor: system.collections._avatarColor.modes[modeSelections.avatarColor],
  color: system.collections.color.modes.default,
}

// Follow alias chain to resolve a token
function resolveToken(alias: string, resolvedCollections): ColorValue {
  // Parse alias: "{_elementTone.color.tinted.fg.0}"
  const path = alias.slice(1, -1).split('.')
  const namespace = path[0]

  // Navigate to token in resolved collection
  let token = resolvedCollections[namespace]
  for (let i = 1; i < path.length; i++) {
    token = token[path[i]]
  }

  // If token.$value is an alias, recurse
  if (typeof token.$value === 'string' && token.$value.startsWith('{')) {
    return resolveToken(token.$value, resolvedCollections)
  }

  return token.$value
}
```

Resolvers MUST preserve collection namespaces.

Flattening collections into a single object is not permitted.
Token values are resolved by following alias paths across collection namespaces.

**Token trace example** with `{ colorScheme: 'light', cardTone: 'critical', elementTone: 'default' }`:

```
color.fg
→ {_elementTone.color.tinted.fg.0}                                 // from color collection
→ {_cardTone.color.element.tinted.default.fg.0}                    // from _elementTone.default
→ {_colorScheme.color.critical.element.tinted.default.fg.0}        // from _cardTone.critical
→ {_core.color.light.critical.element.tinted.default.fg.0}         // from _colorScheme.light
→ {_palette.gray.950}                                              // from _core
→ { colorSpace: 'srgb', components: [0.04, 0.04, 0.04] }          // literal value from _palette
```

**Key points:**

- Collections organize tokens by mode value
- Mode selection picks one mode per moded collection
- Collections do not override each other
- Each collection exists in its own namespace (e.g. `_palette`, `_core`, `_colorScheme`, `_cardTone`, `_elementTone`, `_avatarColor`)
- Resolution occurs only through explicit alias references between collections
- Internal collections (`_*`) MUST NOT be referenced directly by application code
- Public collections remain stable regardless of mode selections
- Collection titles are semantically specific and stable (e.g. "Color scheme", "Card tone", "Element tone", "Avatar color")

No collection may shadow, replace, or override values from another collection.
All value selection happens via alias resolution, not by precedence.

### 3.6 Resolver Contract

A compliant token resolver MUST:

- Not apply precedence, cascading, or override semantics
- Resolve collections strictly in the declared order
- Require an explicit mode selection for each moded collection
- Detect and report alias cycles
- Preserve public token paths and collection namespaces
- Produce identical resolved values across tools given the same mode selections
- Never expose internal collections (`_*`) to application code
- Handle `$extensions['io.sanity']` metadata correctly:
  - Preserve extension data during resolution
  - Process color mixing expressions (`expr`) when computing values
  - Map Figma scopes appropriately when syncing to Figma
  - Respect typography metadata when generating styles

Failure to meet these requirements indicates a non-conformant implementation.

---

## 4. Collections (Authoritative Definition)

### 4.1 Palette Collection (`_palette`)

**Purpose**

- Contain literal color values
- Provide the foundation for all color tokens

**Characteristics**

- Internal collection (prefixed with `_`)
- No modes (uses `'default'` as single mode)
- Contains only DTCG color tokens with literal values
- Never exposed to consumers

**Structure**

```ts
palette.black       // #000000
palette.white       // #ffffff
palette.gray.50     // #fafafa
palette.gray.950    // #0a0a0a
palette.red.500     // #ef4444
// ... other hues and tints
```

> Palette is the _only_ place literal color values exist.

---

### 4.2 Core Collection (`_core`)

**Purpose**

- Organize palette references by color scheme and tone
- Provide structured access to primitive colors

**Characteristics**

- Internal collection (prefixed with `_`)
- No modes (uses `'default'` as single mode)
- Contains only aliases to palette collection
- Organized by: scheme → tone → element → variant → element tone → property → step

**Structure**

```ts
_core.color.light.default.element.tinted.default.bg.0
  → {palette.gray.50}

_core.color.dark.default.element.tinted.default.bg.0
  → {palette.gray.950}
```

**Tool Mapping**

- Internal only, not exposed to CSS or Figma directly

### Note on Tone Interpolation

Intermediate tone steps (e.g. `bg.1`–`bg.3`) are generated at the `_colorScheme` collection using color mixing.

The `_core` collection defines only anchor values (0 and 4).
Interpolation is performed using the Sanity color extension (`$extensions['io.sanity'].expr`) with `mix` operation.

---

### 4.3 Color Scheme Collection (`_colorScheme`)

**Decision:** Which global color scheme is active?

**Modes**

- `light`
- `dark`

**Behavior**

- Aliases Core tokens with scheme-specific paths
- Generates interpolated steps (1, 2, 3) using color mixing
- Introduces no new structure beyond mixing

**Alias Example**

```ts
_colorScheme.color.default.element.tinted.default.bg.0
  → {_core.color.light.default.element.tinted.default.bg.0}  // when colorScheme: 'light'
  → {_core.color.dark.default.element.tinted.default.bg.0}   // when colorScheme: 'dark'
```

**Tool Mapping**

- CSS: root theme (`:root`, `[data-scheme="light"]`, `[data-scheme="dark"]`)
- Figma: Variable Collection with modes `light | dark`
- iOS/Android: global appearance / trait

---

### 4.4 Card Tone Collection (`_cardTone`)

**Decision:** What type of surface context are we in?

**Modes**

- `default`
- `neutral`
- `primary`
- `suggest`
- `positive`
- `caution`
- `critical`
- `transparent`

**Behavior**

- Aliases Color Scheme tokens with tone-specific paths
- Adjusts which tone's colors are used for the surface
- Introduces no new structure

**Alias Example**

```ts
_cardTone.color.element.tinted.default.bg.0
  → {_colorScheme.color.default.element.tinted.default.bg.0}  // when cardTone: 'default'
  → {_colorScheme.color.critical.element.tinted.default.bg.0} // when cardTone: 'critical'
```

**Tool Mapping**

- CSS: nested theme on container components (`[data-tone="critical"]`)
- Figma: Variable Collection with modes for each tone
- Native: container-level appearance context

---

### 4.5 Element Tone Collection (`_elementTone`)

**Decision:** What is the intent or emphasis of this element?

**Modes**

- `default`
- `neutral`
- `primary`
- `suggest`
- `positive`
- `caution`
- `critical`

**Behavior**

- Aliases Card Tone tokens with element tone-specific paths
- Selects which element tone to use for controls within a surface
- Used for actions, alerts, emphasis

**Alias Example**

```ts
_elementTone.color.tinted.bg.0
  → {_cardTone.color.element.tinted.default.bg.0}  // when elementTone: 'default'
  → {_cardTone.color.element.tinted.primary.bg.0}  // when elementTone: 'primary'
```

**Tool Mapping**

- CSS: nested theme on component roots (`[data-tone="primary"]`)
- Figma: Variable Collection with modes for each tone
- Native: control state / role

---

### 4.6 Avatar Color Collection (`_avatarColor`)

**Decision:** Which avatar color variant is active?

**Modes**

- `gray`, `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `magenta`

**Purpose**

- Maps avatar color variants to specific color tokens
- References `_cardTone` collection
- Used for avatar component theming

**Characteristics**

- Internal collection (prefixed with `_`)
- Moded (9 color variants)
- References cardTone collection

**Alias Example**

```ts
_avatarColor.color.bg
  → {_cardTone.color.avatar.gray.bg}    // when avatarColor: 'gray'
  → {_cardTone.color.avatar.blue.bg}    // when avatarColor: 'blue'
```

**Tool Mapping**

- CSS: Component-level attribute (`[data-avatar="blue"]`)
- Figma: Variable Collection with modes for each color
- Native: Component appearance context

---

## 5. Public Collections (Stable API Contract)

Public collections are the **only collections consumed by application code**.

### 5.1 Characteristics

- No `_` prefix
- Most have no modes (use `'default'` as single mode)
- Stable naming over time
- Alias internal collections only
- Form the public API contract

### 5.2 Color Collection

The primary public collection for color tokens.

**Structure:**

```ts
color.bg           → {_elementTone.color.tinted.bg.0}
color.fg           → {_elementTone.color.tinted.fg.0}
color.muted.fg     → {_elementTone.color.tinted.fg.4}
color.tinted.bg[0..4]  → {_elementTone.color.tinted.bg[0..4]}
color.solid.bg[0..4]   → {_elementTone.color.solid.bg[0..4]}
```

> Public tokens never encode colorScheme, cardTone, or elementTone in their names.

### 5.3 Public Collection List

All public collections (no `_` prefix):

- **`avatar`** - Avatar component tokens (outline shadow, border radius)
- **`border`** - Border width tokens (scale 1-4)
- **`button`** - Button-specific tokens (border, focus ring)
- **`card`** - Card component tokens (focus ring, shadow outline)
- **`color`** - Color tokens (primary public API for fg/bg colors)
- **`container`** - Container sizing tokens
- **`corner`** - Corner radius tokens
- **`focusRing`** - Focus ring styling tokens
- **`font`** - Typography tokens (family, weight, style scales)
- **`radius`** - Border radius scale (0-4)
- **`shadow`** - Shadow elevation tokens (0-5)
- **`space`** - Spacing scale (0-9, Fibonacci sequence: 0rem to 220rem)

Each follows the same pattern: stable public names that alias to internal collections.

### 5.4 Extension Patterns

Public tokens may include `$extensions['io.sanity']` metadata for tool-specific features.

#### Color Extensions

**Color mixing expressions:**

```ts
$extensions: {
  'io.sanity': {
    expr: {
      v: 1,
      op: 'mix',
      space: 'srgb' | 'oklab',
      stops: [
        { color: '{_palette.white}', stop: 0 },
        { color: '{_palette.purple.100}', stop: 0.75 }
      ],
      hue?: 'shorter' | 'longer' | 'increasing' | 'decreasing',
      alpha?: 'premultiply'
    }
  }
}
```

Used by `_colorScheme` collection to generate intermediate tone steps (1, 2, 3) via interpolation.

**Opacity modifier:**

```ts
$extensions: {
  'io.sanity': {
    opacity: 0.5  // 0-1 range
  }
}
```

#### Figma Scopes

Map tokens to specific Figma variable scopes:

```ts
$extensions: {
  'io.sanity': {
    scopes: [
      'effect/color',      // EFFECT_COLOR
      'effect/float',      // EFFECT_FLOAT
      'fill/frame',        // FRAME_FILL
      'fill/shape',        // SHAPE_FILL
      'fill/text',         // TEXT_FILL
      'stroke/color',      // STROKE_COLOR
      'stroke/float',      // STROKE_FLOAT
      'corner/radius',     // CORNER_RADIUS
      'corner/shape',      // CORNER_SMOOTHING
      'gap',              // GAP
      'width'             // WIDTH_HEIGHT
    ]
  }
}
```

Scopes control which Figma properties can use the variable.

#### Typography Extensions

**Font family metadata:**

```ts
$extensions: {
  'io.sanity': {
    figma: { value: 'Inter' },           // Figma font name
    textBoxEdge: 'cap-height',           // Text box alignment
    baselineOffset: { value: 4, unit: 'px' }
  }
}
```

**Font style metadata:**

```ts
$extensions: {
  'io.sanity': {
    lineHeight: { value: 20, unit: 'px' },
    ascenderHeight: { value: 16, unit: 'px' },
    descenderHeight: { value: 4, unit: 'px' },
    capHeight: { value: 11, unit: 'px' }
  }
}
```

**Font weight metadata:**

```ts
$extensions: {
  'io.sanity': {
    figma: { value: 'SemiBold' }  // Figma weight style name
  }
}
```

---

## 6. Alias Chains (End-to-End Example)

Resolving `color.muted.fg` with:

```ts
{ colorScheme: 'dark', cardTone: 'critical', elementTone: 'default', avatarColor: 'gray' }
```

Resolution trace:

```
color.muted.fg
→ {_elementTone.color.tinted.fg.4}                              // from color collection
→ {_cardTone.color.element.tinted.default.fg.4}                 // from _elementTone.default
→ {_colorScheme.color.critical.element.tinted.default.fg.4}     // from _cardTone.critical
→ {_core.color.dark.critical.element.tinted.default.fg.4}       // from _colorScheme.dark
→ {palette.gray.400}                                            // from _core
→ { colorSpace: 'srgb', components: [0.6, 0.6, 0.6] }          // literal from palette
```

This same chain exists:

- in CSS (resolved to CSS custom properties)
- in Figma via variable aliases
- in native token exports

The key difference is which mode values are selected at each collection.

---

## 7. Mapping to Tools

### 7.1 CSS / vanilla-extract

- Only **public collections** are exposed as CSS custom properties
- Internal collections remain hidden
- Each mode selection produces a theme variant via alias resolution

```ts
// Public API (exposed)
var(--color-fg)
var(--color-muted-fg)
var(--space-3)

// Internal collections (not exposed)
// --_core-color-light-...
// --_colorScheme-color-...
```

Theme classes are generated by resolving public tokens with specific mode selections:

```css
[data-scheme='dark'][data-tone='critical'] {
  /* Resolved with colorScheme: 'dark', cardTone: 'critical', elementTone: 'default' */
}
```

---

### 7.2 Figma / Tokens Studio

**Collections**

| Collection         | Modes                                                                        | Internal |
| ------------------ | ---------------------------------------------------------------------------- | -------- |
| Palette            | —                                                                            | Yes      |
| Core               | —                                                                            | Yes      |
| Color Scheme       | light, dark                                                                  | Yes      |
| Card Tone          | default, neutral, primary, suggest, positive, caution, critical, transparent | Yes      |
| Element Tone       | default, neutral, primary, suggest, positive, caution, critical              | Yes      |
| Avatar Color       | gray, red, orange, yellow, green, cyan, blue, purple, magenta                | Yes      |
| Avatar (Public)    | —                                                                            | No       |
| Border (Public)    | —                                                                            | No       |
| Button (Public)    | —                                                                            | No       |
| Card (Public)      | —                                                                            | No       |
| Color (Public)     | —                                                                            | No       |
| Container (Public) | —                                                                            | No       |
| Corner (Public)    | —                                                                            | No       |
| FocusRing (Public) | —                                                                            | No       |
| Font (Public)      | —                                                                            | No       |
| Radius (Public)    | —                                                                            | No       |
| Shadow (Public)    | —                                                                            | No       |
| Space (Public)     | —                                                                            | No       |

**Rules**

- Collections represent **decision points** or **primitive groups**
- Variables alias across collections following the same resolution order
- Internal collections (Palette, Core, Color Scheme, Card Tone, Element Tone, Avatar Color) should be hidden or marked as internal
- Public collections (Avatar, Border, Button, Card, Color, Container, Corner, FocusRing, Font, Radius, Shadow, Space) are what designers interact with

**Alias Behavior**

Figma variable alias chain:

```
Color/fg
→ _elementTone/color/tinted/fg/0
→ _cardTone/color/element/tinted/default/fg/0
→ _colorScheme/color/[tone]/element/tinted/default/fg/0
→ _core/color/[scheme]/[tone]/element/tinted/default/fg/0
→ _palette/gray/950
```

---

### 7.3 Native platforms (iOS / Android)

- Each collection maps to a token table or resource file
- Resolution occurs at build time or runtime depending on platform
- Public collection names remain identical across platforms

Example (conceptual):

```swift
// Public API
Color.color.fg
Color.color.muted.fg

// Internal collections not exposed
// Color._core.color.light...
```

Resolved via active appearance traits and context.

Resolution MAY occur at build time or runtime, but MUST follow the same ordered alias traversal defined in this specification.

---

## 8. Machine-Readable Metadata

The token system exports structured metadata via the `system.collections` object that describes:

- Available collections (internal and public)
- Resolution order (internal collection order matters)
- Mode values per collection (via `modes` object keys)
- Collection relationships (which collections reference which via aliases)
- Public vs internal collection distinction (via `_` prefix)
- Extension schemas (`$extensions['io.sanity']` structure)

This allows tooling to:

- Validate token graphs and detect alias cycles
- Generate documentation automatically
- Power Figma sync (via figma-sanity-ui-tokens-sync plugin)
- Build type-safe APIs (TypeScript definitions)
- Generate platform-specific exports (CSS, iOS, Android)
- Parse and understand color mixing expressions
- Map tokens to Figma variable scopes

The system is designed to be machine-readable first, human-readable second.

---

## 9. Gotchas & Watch Outs

### 9.1 Mode Explosion

Do **not** combine all mode dimensions into a single mode matrix.

- `colorScheme` is global (affects entire application)
- `cardTone` is surface-contextual (container level)
- `elementTone` is element-contextual (component level)

Treating them equally leads to exponential complexity (2 × 8 × 7 = 112 combinations).

Instead, they are **nested contexts** that compose at runtime.

---

### 9.2 Alias Cycles

Long alias chains require:

- Cycle detection in build tools
- Trace tooling for debugging

Resolvers **must** detect and report cycles.

---

### 9.3 Naming Collisions

Avoid reusing the same labels across collections unless semantics are identical.

Example: `critical` appears as both:

- A `cardTone` mode (surface is critical)
- An `elementTone` mode (element is critical)

This is intentional—the modes have parallel semantics but apply at different scopes.

---

### 9.4 Public API Discipline

Public collections are the **only supported API surface**.

- Internal collections (`_palette`, `_core`, `_colorScheme`, `_cardTone`, `_elementTone`, `_avatarColor`) MUST NOT be consumed directly by application code
- Internal CSS variables (e.g., `--_core-color-light-...`) MUST NOT be documented or relied upon
- Any dependency on internal collections is considered a bug and may break in future versions

Public collections are a contract. Internal collections are implementation details.

### 9.5 Accidental Override Semantics

Implementations must not treat collections as cascading overrides.

This includes:

- Merging objects by precedence
- Allowing later collections to replace earlier values
- Emulating CSS cascade behavior

Doing so breaks traceability and invalidates the resolution model.

All resolution happens through explicit aliases.

### 9.6 Collection Title Stability

Collection titles ("Color scheme", "Card tone", "Element tone", "Avatar color") are part of the public contract.

Changing these breaks:

- CSS attribute selectors (`[data-scheme]`, `[data-tone]`)
- Figma collection names
- Type definitions
- Documentation

Collection titles MUST remain stable across versions.

### 9.7 Terminology: Collection vs Layer

**Implementation uses "collection"** as the primary term (e.g., `system.collections`, `TokenCollection` type).

**"Layer"** is used conceptually in documentation to describe resolution order.

When writing code or tooling:

- Use `collection` (e.g., `system.collections._palette`)
- Use `namespace` field (NOT `id`)
- Use `modes.default` for unmoded collections (NOT `modes.value`)

This specification may use "layer" and "collection" interchangeably when discussing concepts, but code must use the implementation terminology.

### 9.8 Collection Namespace vs Mode Value Distinction

**Collection namespace** identifies the collection: `'_colorScheme'`, `'_cardTone'`, `'_elementTone'`, `'_avatarColor'`

**Mode values** are the actual selections within a collection: `'light' | 'dark'`, `'default' | 'primary' | 'critical' | ...`

Do not confuse:

- Collection namespace: `'_colorScheme'` (the collection identifier)
- Mode values: `'light' | 'dark'` (the contextual variants within that collection)

Unmoded collections use `'default'` as their single mode value, NOT `'value'`.

---

## 10. Why This Model Scales

- Public API stays small and stable
- Contextual complexity lives in internal collections
- Tooling mirrors the same mental model
- Designers and engineers share a vocabulary of **decisions** (colorScheme, cardTone, elementTone, avatarColor), not values
- Internal collections can evolve without breaking public contracts

This system is intentionally opinionated.

> **Stable public API + contextual resolution > direct value selection**

---

## 11. Summary

This specification defines a **layered, alias-driven design token system** with **17 collections**:

**6 Internal collections** (implementation details, prefixed with `_`):

- `_palette` - Literal color values (only collection with hex/RGB)
- `_core` - Organized primitive colors (references palette)
- `_colorScheme` - Global appearance (light/dark, with color mixing)
- `_cardTone` - Surface-level context (8 tone modes)
- `_elementTone` - Element-level intent (7 tone modes)
- `_avatarColor` - Avatar color variants (9 color modes)

**11 Public collections** (stable API):

- `avatar`, `border`, `button`, `card`, `color`, `container`, `corner`,
  `focusRing`, `font`, `radius`, `shadow`, `space`

**Collection flow:**

```
_palette → _core → _colorScheme → _cardTone → _elementTone → _avatarColor → public collections
```

**Key technical details:**

- Collections use `namespace` (not `id`) and `title` fields
- Unmoded collections use `'default'` mode value (not `'value'`)
- System exports `collections` object (not `layers`)
- Extensions via `$extensions['io.sanity']` for:
  - Color mixing expressions (`expr` with mix operation)
  - Figma variable scopes (`scopes` array)
  - Typography metadata (`figma` mappings, `textBoxEdge`, measurements)
  - Opacity modifiers

**Key principles:**

1. **No overrides** — Collections never replace or shadow each other; resolution happens through explicit aliases
2. **Mode composition** — Modes are nested contexts (global → surface → element → avatar), not a flat matrix
3. **Stable contracts** — Public collection names and structure remain stable; internal collections can evolve
4. **Tooling alignment** — The same model works across CSS, Figma, native platforms, and documentation
5. **Extension-based features** — Tool-specific behaviors live in `$extensions`, not core token structure

The result is a system that scales across CSS, Figma, native platforms, documentation tools, and type generation

…without fragmenting the mental model or leaking implementation details.
