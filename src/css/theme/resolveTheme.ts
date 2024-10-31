import {
  _parseColorToken,
  AVATAR_COLORS,
  AVATAR_SIZE,
  COLOR_VARIANTS,
  type ColorToken,
  CONTAINER_SCALE,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  type Hue,
  HUES,
  RADIUS,
  SHADOW,
  SPACE,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_STATE_TONES,
  type Theme_v3,
  type ThemeBoxShadow,
  type ThemeColorCard_v3,
  type ThemeColorCardToneKey,
  type ThemeColorSchemeKey,
  type ThemeColorStateToneKey,
  type ThemeColorVariantKey,
  TINTS,
} from '@sanity/ui/theme'

import {_fromEntries} from '../_fromEntries'
import {buildVarContract} from './lib/contract'

/**
 * Resolve CSS theme
 *
 * @public
 */
export function resolveTheme(options: {theme: Theme_v3}) {
  const {theme} = options

  const paletteResult = buildVarContract(
    {
      palette: {
        black: theme.palette.black.hex,
        white: theme.palette.white.hex,
        ..._fromEntries(
          HUES.map((hue) => [
            hue,
            _fromEntries(TINTS.map((tint) => [tint, theme.palette.hues[hue][tint].hex])),
          ]),
        ),
      },
    },
    {layer: 'palette', prefix: 's'},
  )

  const themeResult = buildVarContract(
    {
      arrow: {
        size: null,
      },
      avatar: {
        distance: null,
        size: null,
        focusRing: {
          offset: px(theme.avatar.focusRing.offset),
          width: px(theme.avatar.focusRing.width),
        },

        sizes: _fromEntries(
          AVATAR_SIZE.map((s) => [
            s,
            {
              distance: rem(theme.avatar.sizes[s].distance),
              size: rem(theme.avatar.sizes[s].size),
            },
          ]),
        ),
      },
      button: {
        boxShadow: null,
        focusRing: {
          offset: px(theme.button.focusRing.offset),
          width: px(theme.button.focusRing.width),
        },
        border: {
          width: px(theme.button.border.width),
        },
      },
      card: {
        shadow: {
          outline: px(theme.card.shadow.outline),
        },
      },
      color: {
        backdrop: null,
        bg: null,
        border: null,

        code: {
          bg: null,
          fg: null,

          token: {
            atrule: null,
            attrName: null,
            attrValue: null,
            attribute: null,
            boolean: null,
            builtin: null,
            cdata: null,
            char: null,
            class: null,
            className: null,
            comment: null,
            constant: null,
            deleted: null,
            doctype: null,
            entity: null,
            function: null,
            hexcode: null,
            id: null,
            important: null,
            inserted: null,
            keyword: null,
            number: null,
            operator: null,
            prolog: null,
            property: null,
            pseudoClass: null,
            pseudoElement: null,
            punctuation: null,
            regex: null,
            selector: null,
            string: null,
            symbol: null,
            tag: null,
            unit: null,
            url: null,
            variable: null,
          },
        },

        fg: null,
        focusRing: null,

        link: {
          fg: null,
        },

        avatar: {
          bg: null,
          fg: null,

          ..._fromEntries(
            AVATAR_COLORS.map((c) => [
              c,
              {
                bg: null,
                fg: null,
              },
            ]),
          ),
        },

        button: {},

        input: {
          checkbox: {
            bg: null,
            border: null,
            fg: null,
          },

          radio: {
            bg: null,
            border: null,
            fg: null,
          },

          text: {
            bg: null,
            fg: null,
            border: null,
            placeholder: null,
            invalid: {
              bg: null,
              border: null,
              fg: null,
            },
          },

          switch: {
            bg: null,
            fg: null,
          },
        },

        muted: {
          bg: null,
          fg: null,
        },

        shadow: {
          outline: null,
          umbra: null,
          penumbra: null,
          ambient: null,
        },

        skeleton: {
          from: null,
          to: null,
        },

        light: _fromEntries(
          THEME_COLOR_CARD_TONES.map((t) => [
            t,
            buildCardContract({
              theme,
              scheme: 'light',
              tone: t,
            }),
          ]),
        ),

        dark: _fromEntries(
          THEME_COLOR_CARD_TONES.map((t) => [
            t,
            buildCardContract({
              theme,
              scheme: 'dark',
              tone: t,
            }),
          ]),
        ),

        // tones
        ..._fromEntries(
          THEME_COLOR_CARD_TONES.map((t) => [
            t,
            {
              avatar: {
                ..._fromEntries(AVATAR_COLORS.map((c) => [c, {bg: null, fg: null}])),
              },
              backdrop: null,
              code: {
                bg: null,
                fg: null,

                token: {
                  atrule: null,
                  attrName: null,
                  attrValue: null,
                  attribute: null,
                  boolean: null,
                  builtin: null,
                  cdata: null,
                  char: null,
                  class: null,
                  className: null,
                  comment: null,
                  constant: null,
                  deleted: null,
                  doctype: null,
                  entity: null,
                  function: null,
                  hexcode: null,
                  id: null,
                  important: null,
                  inserted: null,
                  keyword: null,
                  number: null,
                  operator: null,
                  prolog: null,
                  property: null,
                  pseudoClass: null,
                  pseudoElement: null,
                  punctuation: null,
                  regex: null,
                  selector: null,
                  string: null,
                  symbol: null,
                  tag: null,
                  unit: null,
                  url: null,
                  variable: null,
                },
              },
              focusRing: null,
              link: {
                fg: null,
              },
              shadow: {
                outline: null,
                umbra: null,
                penumbra: null,
                ambient: null,
              },
              skeleton: {
                from: null,
                to: null,
              },

              ..._fromEntries(
                COLOR_VARIANTS.map((v) => [
                  v,
                  {
                    bg: {
                      0: null,
                      1: null,
                      2: null,
                      3: null,
                      4: null,
                    },

                    fg: {
                      0: null,
                      1: null,
                      2: null,
                      3: null,
                      4: null,
                    },

                    border: {
                      0: null,
                      1: null,
                      2: null,
                      3: null,
                      4: null,
                    },

                    ..._fromEntries(
                      THEME_COLOR_STATE_TONES.map((t) => [
                        t,
                        {
                          bg: {
                            0: null,
                            1: null,
                            2: null,
                            3: null,
                            4: null,
                          },

                          fg: {
                            0: null,
                            1: null,
                            2: null,
                            3: null,
                            4: null,
                          },

                          border: {
                            0: null,
                            1: null,
                            2: null,
                            3: null,
                            4: null,
                          },
                        },
                      ]),
                    ),
                  },
                ]),
              ),
            },
          ]),
        ),

        ..._fromEntries(
          COLOR_VARIANTS.map((v) => [
            v,
            {
              bg: {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
              },

              fg: {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
              },

              border: {
                0: null,
                1: null,
                2: null,
                3: null,
                4: null,
              },

              ..._fromEntries(
                THEME_COLOR_STATE_TONES.map((t) => [
                  t,
                  {
                    bg: {
                      0: null,
                      1: null,
                      2: null,
                      3: null,
                      4: null,
                    },

                    fg: {
                      0: null,
                      1: null,
                      2: null,
                      3: null,
                      4: null,
                    },

                    border: {
                      0: null,
                      1: null,
                      2: null,
                      3: null,
                      4: null,
                    },
                  },
                ]),
              ),
            },
          ]),
        ),
      },
      container: _fromEntries(CONTAINER_SCALE.map((c) => [c, px(theme.container[c])])),
      font: {
        family: null,
        fontSize: null,
        letterSpacing: null,
        lineHeight: null,
        ascenderHeight: null,
        descenderHeight: null,
        iconSize: null,
        featureSettings: null,
        fontWeight: null,

        capHeight: null,
        iconOffset: null,
        customIconSize: null,
        customIconOffset: null,

        code: {
          family: theme.font.code.family,
          featureSettings: theme.font.code.featureSettings ?? 'normal',
          weight: {
            regular: String(theme.font.code.weight.regular),
            medium: String(theme.font.code.weight.medium),
            semibold: String(theme.font.code.weight.semibold),
            bold: String(theme.font.code.weight.bold),
          },
          sizes: _fromEntries(
            FONT_CODE_SIZE.map((s) => [
              s,
              {
                fontSize: rem(theme.font.code.sizes[s].fontSize),
                lineHeight: rem(theme.font.code.sizes[s].lineHeight),
                letterSpacing: rem(theme.font.code.sizes[s].letterSpacing),
                ascenderHeight: rem(theme.font.code.sizes[s].ascenderHeight),
                descenderHeight: rem(theme.font.code.sizes[s].descenderHeight),
                iconSize: rem(theme.font.code.sizes[s].iconSize),
                customIconSize: rem(theme.font.code.sizes[s].customIconSize),
              },
            ]),
          ),
        },

        heading: {
          family: theme.font.heading.family,
          featureSettings: theme.font.heading.featureSettings ?? 'normal',
          weight: {
            regular: String(theme.font.heading.weight.regular),
            medium: String(theme.font.heading.weight.medium),
            semibold: String(theme.font.heading.weight.semibold),
            bold: String(theme.font.heading.weight.bold),
          },
          sizes: _fromEntries(
            FONT_HEADING_SIZE.map((s) => [
              s,
              {
                fontSize: rem(theme.font.heading.sizes[s].fontSize),
                lineHeight: rem(theme.font.heading.sizes[s].lineHeight),
                letterSpacing: rem(theme.font.heading.sizes[s].letterSpacing),
                ascenderHeight: rem(theme.font.heading.sizes[s].ascenderHeight),
                descenderHeight: rem(theme.font.heading.sizes[s].descenderHeight),
                iconSize: rem(theme.font.heading.sizes[s].iconSize),
                customIconSize: rem(theme.font.heading.sizes[s].customIconSize),
              },
            ]),
          ),
        },

        label: {
          family: theme.font.label.family,
          featureSettings: theme.font.label.featureSettings ?? 'normal',
          weight: {
            regular: String(theme.font.label.weight.regular),
            medium: String(theme.font.label.weight.medium),
            semibold: String(theme.font.label.weight.semibold),
            bold: String(theme.font.label.weight.bold),
          },
          sizes: _fromEntries(
            FONT_LABEL_SIZE.map((s) => [
              s,
              {
                fontSize: rem(theme.font.label.sizes[s].fontSize),
                lineHeight: rem(theme.font.label.sizes[s].lineHeight),
                letterSpacing: rem(theme.font.label.sizes[s].letterSpacing),
                ascenderHeight: rem(theme.font.label.sizes[s].ascenderHeight),
                descenderHeight: rem(theme.font.label.sizes[s].descenderHeight),
                iconSize: rem(theme.font.label.sizes[s].iconSize),
                customIconSize: rem(theme.font.label.sizes[s].customIconSize),
              },
            ]),
          ),
        },

        text: {
          family: theme.font.text.family,
          featureSettings: theme.font.text.featureSettings ?? 'normal',
          weight: {
            regular: String(theme.font.text.weight.regular),
            medium: String(theme.font.text.weight.medium),
            semibold: String(theme.font.text.weight.semibold),
            bold: String(theme.font.text.weight.bold),
          },
          sizes: _fromEntries(
            FONT_TEXT_SIZE.map((s) => [
              s,
              {
                fontSize: rem(theme.font.text.sizes[s].fontSize),
                lineHeight: rem(theme.font.text.sizes[s].lineHeight),
                letterSpacing: rem(theme.font.text.sizes[s].letterSpacing),
                ascenderHeight: rem(theme.font.text.sizes[s].ascenderHeight),
                descenderHeight: rem(theme.font.text.sizes[s].descenderHeight),
                iconSize: rem(theme.font.text.sizes[s].iconSize),
                customIconSize: rem(theme.font.text.sizes[s].customIconSize),
              },
            ]),
          ),
        },

        skeleton: {
          lineHeight: null,
          ascenderHeight: null,
          descenderHeight: null,
        },

        weight: {
          regular: null,
          medium: null,
          semibold: null,
          bold: null,
        },
      },
      input: {
        gap: null,
        descenderHeight: null,
        ascenderHeight: null,
        fontSize: null,
        lineHeight: null,
        letterSpacing: null,
        padding: null,

        border: {
          width: px(theme.input.border.width),
        },

        checkbox: {
          size: px(theme.input.checkbox.size),

          focusRing: {
            offset: px(theme.input.checkbox.focusRing.offset),
            width: px(theme.input.checkbox.focusRing.width),
          },
        },

        radio: {
          focusRing: {
            offset: px(theme.input.radio.focusRing.offset),
            width: px(theme.input.radio.focusRing.width),
          },

          markSize: px(theme.input.radio.markSize),
          size: px(theme.input.radio.size),
        },

        select: {
          focusRing: {
            offset: px(theme.input.select.focusRing.offset),
            width: px(theme.input.select.focusRing.width),
          },
        },

        text: {
          focusRing: {
            offset: px(theme.input.text.focusRing.offset),
            width: px(theme.input.text.focusRing.width),
          },
        },

        switch: {
          width: px(theme.input.switch.width),
          height: px(theme.input.switch.height),

          focusRing: {
            offset: px(theme.input.switch.focusRing.offset),
            width: px(theme.input.switch.focusRing.width),
          },

          padding: px(theme.input.switch.padding),

          thumb: {
            offset: null,
            size: null,
          },

          transitionDurationMs: `${theme.input.switch.transitionDurationMs}ms`,
          transitionTimingFunction: theme.input.switch.transitionTimingFunction,
        },
      },
      radius: _fromEntries(RADIUS.map((r) => [r, px(theme.radius[r])])),
      shadow: _fromEntries(
        SHADOW.map((s) => [
          s,
          {
            umbra: toBoxShadow(theme.shadow[s]?.umbra),
            penumbra: toBoxShadow(theme.shadow[s]?.penumbra),
            ambient: toBoxShadow(theme.shadow[s]?.ambient),
          },
        ]),
      ),
      space: _fromEntries(SPACE.map((s) => [s, px(theme.space[s])])),
    },
    {layer: 'theme', prefix: 's'},
  )

  return {
    vars: Object.freeze({
      ...paletteResult.vars,
      ...themeResult.vars,
    }),
    varNames: Object.freeze({
      ...paletteResult.varNames,
      ...themeResult.varNames,
    }),
    properties: Object.freeze({
      ...paletteResult.properties,
      ...themeResult.properties,
    }),
  }

  function renderColor(t: ColorToken, options: {bgValue?: string; defaultHue: Hue}) {
    const {bgValue = 'transparent'} = options

    const color = _parseColorToken(t, options)

    if (color.type === 'inherit') {
      return bgValue
    }

    let value = '#000'

    if (color.type === 'color') {
      value = paletteResult.vars.palette[color.name]
    }

    if (color.type === 'tint') {
      value = paletteResult.vars.palette[color.hue][color.tint]
    }

    if (color.opacity < 1) {
      value = `color-mix(in srgb, transparent, ${value} ${color.opacity * 100}%)`
    }

    if (color.mix < 1) {
      value = `color-mix(in srgb, ${bgValue}, ${value} ${color.mix * 100}%)`
    }

    return value
  }

  function buildCardContract(options: {
    theme: Theme_v3
    scheme: ThemeColorSchemeKey
    tone: ThemeColorCardToneKey
  }) {
    const {theme, scheme, tone} = options
    const card = theme.color[tone]
    const i = scheme === 'dark' ? 1 : 0

    const defaultElement = buildElementContract({
      card,
      variant: 'tinted',
      tone: 'default',
      scheme,
    })

    const bgValue = defaultElement.bg[0]

    const cardOptions = {bgValue, defaultHue: card._hue}

    return {
      avatar: _fromEntries(
        AVATAR_COLORS.map((c) => [
          c,
          {
            bg: renderColor(card.avatar[c].bg[i], {defaultHue: c}),
            fg: renderColor(card.avatar[c].fg[i], {defaultHue: c}),
          },
        ]),
      ),
      backdrop: renderColor(card.backdrop[i], cardOptions),
      code: {
        bg: renderColor(card.code.bg[i], cardOptions),
        fg: renderColor(card.code.fg[i], cardOptions),
        token: {
          atrule: renderColor(card.code.token.atrule[i], cardOptions),
          attrName: renderColor(card.code.token.attrName[i], cardOptions),
          attrValue: renderColor(card.code.token.attrValue[i], cardOptions),
          attribute: renderColor(card.code.token.attribute[i], cardOptions),
          boolean: renderColor(card.code.token.boolean[i], cardOptions),
          builtin: renderColor(card.code.token.builtin[i], cardOptions),
          cdata: renderColor(card.code.token.cdata[i], cardOptions),
          char: renderColor(card.code.token.char[i], cardOptions),
          class: renderColor(card.code.token.class[i], cardOptions),
          className: renderColor(card.code.token.className[i], cardOptions),
          comment: renderColor(card.code.token.comment[i], cardOptions),
          constant: renderColor(card.code.token.constant[i], cardOptions),
          deleted: renderColor(card.code.token.deleted[i], cardOptions),
          doctype: renderColor(card.code.token.doctype[i], cardOptions),
          entity: renderColor(card.code.token.entity[i], cardOptions),
          function: renderColor(card.code.token.function[i], cardOptions),
          hexcode: renderColor(card.code.token.hexcode[i], cardOptions),
          id: renderColor(card.code.token.id[i], cardOptions),
          important: renderColor(card.code.token.important[i], cardOptions),
          inserted: renderColor(card.code.token.inserted[i], cardOptions),
          keyword: renderColor(card.code.token.keyword[i], cardOptions),
          number: renderColor(card.code.token.number[i], cardOptions),
          operator: renderColor(card.code.token.operator[i], cardOptions),
          prolog: renderColor(card.code.token.prolog[i], cardOptions),
          property: renderColor(card.code.token.property[i], cardOptions),
          pseudoClass: renderColor(card.code.token.pseudoClass[i], cardOptions),
          pseudoElement: renderColor(card.code.token.pseudoElement[i], cardOptions),
          punctuation: renderColor(card.code.token.punctuation[i], cardOptions),
          regex: renderColor(card.code.token.regex[i], cardOptions),
          selector: renderColor(card.code.token.selector[i], cardOptions),
          string: renderColor(card.code.token.string[i], cardOptions),
          symbol: renderColor(card.code.token.symbol[i], cardOptions),
          tag: renderColor(card.code.token.tag[i], cardOptions),
          unit: renderColor(card.code.token.unit[i], cardOptions),
          url: renderColor(card.code.token.url[i], cardOptions),
          variable: renderColor(card.code.token.variable[i], cardOptions),
        },
      },
      focusRing: renderColor(card.focusRing[i], cardOptions),
      link: {
        fg: renderColor(card.link.fg[i], cardOptions),
      },
      shadow: {
        outline: renderColor(card.shadow.outline[i], cardOptions),
        umbra: renderColor(card.shadow.umbra[i], cardOptions),
        penumbra: renderColor(card.shadow.penumbra[i], cardOptions),
        ambient: renderColor(card.shadow.ambient[i], cardOptions),
      },
      skeleton: {
        from: renderColor(card.skeleton.from[i], cardOptions),
        to: renderColor(card.skeleton.to[i], cardOptions),
      },

      ..._fromEntries(
        COLOR_VARIANTS.map((v) => [
          v,
          _fromEntries(
            THEME_COLOR_STATE_TONES.map((e) => [
              e,
              v === 'tinted' && e === 'default'
                ? defaultElement
                : buildElementContract({
                    card,
                    variant: v,
                    tone: e,
                    scheme,
                    bgValue,
                  }),
            ]),
          ),
        ]),
      ),
    } as const
  }

  function buildElementContract(options: {
    bgValue?: string
    card: ThemeColorCard_v3
    variant: ThemeColorVariantKey
    tone: ThemeColorStateToneKey
    scheme: ThemeColorSchemeKey
  }) {
    const {bgValue, card, variant: v, tone: e, scheme} = options
    const element = card.variant[v][e]
    const elementOptions = {bgValue, defaultHue: element._hue}
    const i = scheme === 'dark' ? 1 : 0

    const bg = {
      0: renderColor(element.bg[0][i], elementOptions),
      4: renderColor(element.bg[4][i], elementOptions),
    }

    const border = {
      0: renderColor(element.border[0][i], elementOptions),
      4: renderColor(element.border[4][i], elementOptions),
    }

    const fg = {
      0: renderColor(element.fg[0][i], elementOptions),
      4: renderColor(element.fg[4][i], elementOptions),
    }

    return {
      bg: {
        0: bg[0],
        1: `color-mix(in srgb, ${bg[0]}, ${bg[4]} 25%)`,
        2: `color-mix(in srgb, ${bg[0]}, ${bg[4]} 50%)`,
        3: `color-mix(in srgb, ${bg[0]}, ${bg[4]} 75%)`,
        4: bg[4],
      },
      border: {
        0: border[0],
        1: `color-mix(in srgb, ${border[0]}, ${border[4]} 25%)`,
        2: `color-mix(in srgb, ${border[0]}, ${border[4]} 50%)`,
        3: `color-mix(in srgb, ${border[0]}, ${border[4]} 75%)`,
        4: border[4],
      },
      fg: {
        0: fg[0],
        1: `color-mix(in srgb, ${fg[0]}, ${fg[4]} 25%)`,
        2: `color-mix(in srgb, ${fg[0]}, ${fg[4]} 50%)`,
        3: `color-mix(in srgb, ${fg[0]}, ${fg[4]} 75%)`,
        4: fg[4],
      },
    }
  }
}

function px(value: number): string {
  return `${value}px`
}

function rem(value: number): string {
  return `${value / 16}rem`
}

function toBoxShadow(value: ThemeBoxShadow | undefined): string {
  if (!value) return 'none'

  return value.map((n) => px(n)).join(' ')
}
