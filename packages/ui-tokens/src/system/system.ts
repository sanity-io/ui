import {type AvatarCollection, avatarCollection} from './avatar/avatar'
import {type BorderCollection, borderCollection} from './border/border'
import {_buttonModeCollection, type ButtonModeCollection} from './button/_buttonMode'
import {type ButtonCollection, buttonCollection} from './button/button'
import {type CardCollection, cardCollection} from './card/card'
// import {type AvatarColorCollection, avatarColorCollection} from './color/_avatarColor'
import {type CardToneCollection, cardToneCollection} from './color/_cardTone'
import {_colorSchemeCollection, type ColorSchemeCollection} from './color/_colorScheme'
import {_coreCollection, type CoreCollection} from './color/_core'
// import {type ElementToneCollection, elementToneCollection} from './color/_elementTone'
import {type PaletteCollection, paletteCollection} from './color/_palette'
import {type ColorCollection, colorCollection} from './color/color'
import {type ContainerCollection, containerCollection} from './container/container'
import {type CornerCollection, cornerCollection} from './corner/corner'
import {type FocusRingCollection, focusRingCollection} from './focusRing/focusRing'
import {type FontCollection, fontCollection} from './font/font'
import {type InputCollection, inputCollection} from './input/input'
import {type RadiusCollection, radiusCollection} from './radius/radius'
import {type SelectableCollection, selectableCollection} from './selectable/selectable'
import {type ShadowCollection, shadowCollection} from './shadow/shadow'
import {type SpaceCollection, spaceCollection} from './space/space'

/**
 * The complete Sanity UI token system containing all token collections.
 *
 * @remarks
 * The token system is organized into 17 collections:
 * - **6 internal collections** (prefixed with `_`): Implementation details, not for direct consumption
 * - **11 public collections**: Stable API for application code
 *
 * ## Resolution Pipeline
 *
 * Tokens are resolved through an ordered pipeline:
 * ```
 * _palette → _core → _colorScheme → _cardTone → _elementTone → _avatarColor → public collections
 * ```
 *
 * ## Internal Collections (Order Matters)
 *
 * 1. `_palette` - Literal color values (only collection with hex/RGB)
 * 2. `_core` - Organized primitive colors (references palette)
 * 3. `_colorScheme` - Global appearance (light/dark modes with color mixing)
 * 4. `_cardTone` - Surface-level context (8 tone modes)
 * 5. `_elementTone` - Element-level intent (7 tone modes)
 * 6. `_avatarColor` - Avatar color variants (9 color modes)
 *
 * ## Public Collections (Alphabetical)
 *
 * Stable API consumed by application code: avatar, border, button, card, color,
 * container, corner, focusRing, font, radius, shadow, space
 *
 * @see {@link https://github.com/sanity-io/design-tokens/blob/main/packages/ui-tokens/SPEC.md | Token System Specification}
 *
 * @internal
 */
export interface TokenSystem {
  /**
   * All token collections (internal and public).
   *
   * @remarks
   * - Internal collections (prefixed with `_`) MUST NOT be consumed directly by applications
   * - Public collections form the stable API contract
   * - Collection order in the internal section matters for resolution
   * - Public collections are ordered alphabetically for consistency
   */
  collections: {
    // internal collections
    // order matters for resolution
    _palette: PaletteCollection
    _core: CoreCollection
    _colorScheme: ColorSchemeCollection
    _cardTone: CardToneCollection
    // _elementTone: ElementToneCollection
    // _avatarColor: AvatarColorCollection
    _buttonMode: ButtonModeCollection

    // public collections
    // alphabetical order for consistency
    avatar: AvatarCollection
    border: BorderCollection
    button: ButtonCollection
    card: CardCollection
    color: ColorCollection
    container: ContainerCollection
    corner: CornerCollection
    focusRing: FocusRingCollection
    font: FontCollection
    input: InputCollection
    radius: RadiusCollection
    selectable: SelectableCollection
    shadow: ShadowCollection
    space: SpaceCollection
  }
}

/** @internal */
export const system: TokenSystem = {
  collections: {
    // internal collections
    // order matters
    _palette: paletteCollection,
    _core: _coreCollection,
    _colorScheme: _colorSchemeCollection,
    _cardTone: cardToneCollection,
    // _elementTone: elementToneCollection,
    // _avatarColor: avatarColorCollection,
    _buttonMode: _buttonModeCollection,

    // public collections
    // alphabetical order
    avatar: avatarCollection,
    border: borderCollection,
    button: buttonCollection,
    card: cardCollection,
    color: colorCollection,
    container: containerCollection,
    corner: cornerCollection,
    focusRing: focusRingCollection,
    font: fontCollection,
    input: inputCollection,
    radius: radiusCollection,
    selectable: selectableCollection,
    shadow: shadowCollection,
    space: spaceCollection,
  },
}
