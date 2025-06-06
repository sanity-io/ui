import {COLOR_HUES, COLOR_TINTS} from '@sanity/color'
import {
  AVATAR_COLORS,
  AVATAR_SIZE,
  COLOR_VARIANTS,
  CONTAINER_SCALE,
  FONT_CODE_SIZE,
  FONT_HEADING_SIZE,
  FONT_LABEL_SIZE,
  FONT_TEXT_SIZE,
  RADIUS,
  SHADOW,
  SPACE,
  THEME_COLOR_CARD_TONES,
  THEME_COLOR_SCHEMES,
  THEME_COLOR_STATE_TONES,
} from '@sanity/ui/theme'
import {createThemeContract, createVar} from '@vanilla-extract/css'

import {_fromEntries} from './_fromEntries'
import type {_CSSThemeWithoutPalette, CSSThemeColorPalette} from './types'

/** @public */
export const paletteVars = createThemeContract({
  black: '',
  white: '',

  // hues
  ..._fromEntries(
    COLOR_HUES.map((h) => [
      h,
      {
        ..._fromEntries(COLOR_TINTS.map((t) => [t, ''])),
      },
    ]),
  ),
}) satisfies CSSThemeColorPalette

const _themeVars = createThemeContract({
  avatar: {
    focusRing: {
      offset: '',
      width: '',
    },
    scale: {
      ..._fromEntries(
        AVATAR_SIZE.map((s) => [
          s,
          {
            distance: '',
            size: '',
          },
        ]),
      ),
    },
  },
  button: {
    border: {
      width: '',
    },
    focusRing: {
      offset: '',
      width: '',
    },
  },
  card: {
    shadow: {
      outline: '',
    },
  },
  color: {
    // schemes
    ..._fromEntries(
      THEME_COLOR_SCHEMES.map((s) => [
        s,
        {
          ..._fromEntries(
            THEME_COLOR_CARD_TONES.map((t) => [
              t,
              {
                avatar: {
                  ..._fromEntries(AVATAR_COLORS.map((c) => [c, {bg: '', fg: ''}])),
                },
                backdrop: '',
                // bg: {
                //   '0': '',
                //   '4': '',
                // },
                // border: {
                //   '0': '',
                //   '4': '',
                // },
                code: {
                  bg: '',
                  fg: '',

                  token: {
                    atrule: '',
                    attrName: '',
                    attrValue: '',
                    attribute: '',
                    boolean: '',
                    builtin: '',
                    cdata: '',
                    char: '',
                    class: '',
                    className: '',
                    comment: '',
                    constant: '',
                    deleted: '',
                    doctype: '',
                    entity: '',
                    function: '',
                    hexcode: '',
                    id: '',
                    important: '',
                    inserted: '',
                    keyword: '',
                    number: '',
                    operator: '',
                    prolog: '',
                    property: '',
                    pseudoClass: '',
                    pseudoElement: '',
                    punctuation: '',
                    regex: '',
                    selector: '',
                    string: '',
                    symbol: '',
                    tag: '',
                    unit: '',
                    url: '',
                    variable: '',
                  },
                },
                // fg: {
                //   '0': '',
                //   '4': '',
                // },

                focusRing: '',
                link: {
                  fg: '',
                },

                shadow: {
                  outline: '',
                  umbra: '',
                  penumbra: '',
                  ambient: '',
                },

                skeleton: {
                  from: '',
                  to: '',
                },

                ..._fromEntries(
                  COLOR_VARIANTS.map((v) => [
                    v,
                    {
                      ..._fromEntries(
                        THEME_COLOR_STATE_TONES.map((t) => [
                          t,
                          {
                            bg: {
                              0: '',
                              4: '',
                            },
                            border: {
                              0: '',
                              4: '',
                            },
                            fg: {
                              0: '',
                              4: '',
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
        },
      ]),
    ),
  },
  container: {
    ..._fromEntries(CONTAINER_SCALE.map((w) => [w, ''])),
  },
  font: {
    code: {
      family: '',
      featureSettings: '',
      weight: {
        regular: '',
        medium: '',
        semibold: '',
        bold: '',
      },
      scale: {
        ..._fromEntries(
          FONT_CODE_SIZE.map((s) => [
            s,
            {
              fontSize: '',
              lineHeight: '',
              letterSpacing: '',
              ascenderHeight: '',
              descenderHeight: '',
              iconSize: '',
              customIconSize: '',
            },
          ]),
        ),
      },
    },
    heading: {
      family: '',
      featureSettings: '',
      weight: {
        regular: '',
        medium: '',
        semibold: '',
        bold: '',
      },
      scale: {
        ..._fromEntries(
          FONT_HEADING_SIZE.map((s) => [
            s,
            {
              fontSize: '',
              lineHeight: '',
              letterSpacing: '',
              ascenderHeight: '',
              descenderHeight: '',
              iconSize: '',
              customIconSize: '',
            },
          ]),
        ),
      },
    },
    label: {
      family: '',
      featureSettings: '',
      weight: {
        regular: '',
        medium: '',
        semibold: '',
        bold: '',
      },
      scale: {
        ..._fromEntries(
          FONT_LABEL_SIZE.map((s) => [
            s,
            {
              fontSize: '',
              lineHeight: '',
              letterSpacing: '',
              ascenderHeight: '',
              descenderHeight: '',
              iconSize: '',
              customIconSize: '',
            },
          ]),
        ),
      },
    },
    text: {
      family: '',
      featureSettings: '',
      weight: {
        regular: '',
        medium: '',
        semibold: '',
        bold: '',
      },
      scale: {
        ..._fromEntries(
          FONT_TEXT_SIZE.map((s) => [
            s,
            {
              fontSize: '',
              lineHeight: '',
              letterSpacing: '',
              ascenderHeight: '',
              descenderHeight: '',
              iconSize: '',
              customIconSize: '',
            },
          ]),
        ),
      },
    },
  },
  input: {
    border: {
      width: '',
    },
    checkbox: {
      size: '',
      focusRing: {
        offset: '',
        width: '',
      },
    },
    radio: {
      size: '',
      markSize: '',
      focusRing: {
        offset: '',
        width: '',
      },
    },
    select: {
      focusRing: {
        offset: '',
        width: '',
      },
    },
    switch: {
      focusRing: {
        width: '',
        offset: '',
      },
      height: '',
      width: '',
      padding: '',
      transitionDurationMs: '',
      transitionTimingFunction: '',
    },
    text: {
      focusRing: {
        offset: '',
        width: '',
      },
    },
  },
  radius: {
    ..._fromEntries(RADIUS.map((r) => [r, ''])),
  },
  shadow: {
    ..._fromEntries(
      SHADOW.map((s) => [
        s,
        {
          umbra: '',
          penumbra: '',
          ambient: '',
        },
      ]),
    ),
  },
  space: {
    ..._fromEntries(SPACE.map((s) => [s, ''])),
  },
}) satisfies _CSSThemeWithoutPalette

/**
 * Variables to be defined in a theme.
 *
 * @public */
export const themeVars = {
  ..._themeVars,
  color: {
    ..._themeVars.color,
    palette: paletteVars,
  },
}

/**
 * Variables to be used.
 *
 * @public
 */
export const vars = {
  ...themeVars,
  avatar: {
    ...themeVars.avatar,
    distance: createVar(),
    size: createVar(),
  },
  arrow: {
    size: createVar(),
  },
  button: {
    ...themeVars.button,
    boxShadow: createVar(),
  },
  color: {
    ...themeVars.color,
    avatar: {
      bg: createVar(),
      fg: createVar(),
      // colors
      ..._fromEntries(AVATAR_COLORS.map((c) => [c, {bg: createVar(), fg: createVar()}])),
    },
    backdrop: createVar(),
    bg: createVar(),
    border: createVar(),
    code: {
      fg: createVar(),
      bg: createVar(),
      token: {
        atrule: createVar(),
        attrName: createVar(),
        attrValue: createVar(),
        attribute: createVar(),
        boolean: createVar(),
        builtin: createVar(),
        cdata: createVar(),
        char: createVar(),
        class: createVar(),
        className: createVar(),
        comment: createVar(),
        constant: createVar(),
        deleted: createVar(),
        doctype: createVar(),
        entity: createVar(),
        function: createVar(),
        hexcode: createVar(),
        id: createVar(),
        important: createVar(),
        inserted: createVar(),
        keyword: createVar(),
        number: createVar(),
        operator: createVar(),
        prolog: createVar(),
        property: createVar(),
        pseudoClass: createVar(),
        pseudoElement: createVar(),
        punctuation: createVar(),
        regex: createVar(),
        selector: createVar(),
        string: createVar(),
        symbol: createVar(),
        tag: createVar(),
        unit: createVar(),
        url: createVar(),
        variable: createVar(),
      },
    },
    fg: createVar(),
    focusRing: createVar(),
    input: {
      checkbox: {
        bg: createVar(),
        border: createVar(),
        fg: createVar(),
      },
      text: {
        bg: createVar(),
        border: createVar(),
        fg: createVar(),
        placeholder: createVar(),
      },
      radio: {
        bg: createVar(),
        border: createVar(),
        fg: createVar(),
      },
      switch: {
        bg: createVar(),
        fg: createVar(),
      },
    },
    link: {
      fg: createVar(),
    },
    muted: {
      bg: createVar(),
      border: createVar(),
      fg: createVar(),
    },
    shadow: {
      outline: createVar(),
      umbra: createVar(),
      penumbra: createVar(),
      ambient: createVar(),
    },
    skeleton: {
      from: createVar(),
      to: createVar(),
    },
    // variants
    ..._fromEntries(
      COLOR_VARIANTS.map((v) => [
        v,
        {
          ..._fromEntries(
            THEME_COLOR_STATE_TONES.map((t) => [
              t,
              {
                bg: {
                  0: createVar(),
                  1: createVar(),
                  2: createVar(),
                  3: createVar(),
                  4: createVar(),
                },
                border: {
                  0: createVar(),
                  1: createVar(),
                  2: createVar(),
                  3: createVar(),
                  4: createVar(),
                },
                fg: {
                  0: createVar(),
                  1: createVar(),
                  2: createVar(),
                  3: createVar(),
                  4: createVar(),
                },
              },
            ]),
          ),
        },
      ]),
    ),

    // tones
    ..._fromEntries(
      THEME_COLOR_CARD_TONES.map((t) => [
        t,
        {
          avatar: {
            ..._fromEntries(AVATAR_COLORS.map((c) => [c, {bg: createVar(), fg: createVar()}])),
          },
          backdrop: createVar(),
          code: {
            fg: createVar(),
            bg: createVar(),
            token: {
              atrule: createVar(),
              attrName: createVar(),
              attrValue: createVar(),
              attribute: createVar(),
              boolean: createVar(),
              builtin: createVar(),
              cdata: createVar(),
              char: createVar(),
              class: createVar(),
              className: createVar(),
              comment: createVar(),
              constant: createVar(),
              deleted: createVar(),
              doctype: createVar(),
              entity: createVar(),
              function: createVar(),
              hexcode: createVar(),
              id: createVar(),
              important: createVar(),
              inserted: createVar(),
              keyword: createVar(),
              number: createVar(),
              operator: createVar(),
              prolog: createVar(),
              property: createVar(),
              pseudoClass: createVar(),
              pseudoElement: createVar(),
              punctuation: createVar(),
              regex: createVar(),
              selector: createVar(),
              string: createVar(),
              symbol: createVar(),
              tag: createVar(),
              unit: createVar(),
              url: createVar(),
              variable: createVar(),
            },
          },
          bg: createVar(),
          border: createVar(),
          fg: createVar(),
          focusRing: createVar(),
          link: {
            fg: createVar(),
          },
          muted: {
            bg: createVar(),
            border: createVar(),
            fg: createVar(),
          },
          shadow: {
            outline: createVar(),
            umbra: createVar(),
            penumbra: createVar(),
            ambient: createVar(),
          },
          skeleton: {
            from: createVar(),
            to: createVar(),
          },
          ..._fromEntries(
            COLOR_VARIANTS.map((v) => [
              v,
              {
                ..._fromEntries(
                  THEME_COLOR_STATE_TONES.map((t) => [
                    t,
                    {
                      bg: {
                        0: createVar(),
                        4: createVar(),
                      },
                      border: {
                        0: createVar(),
                        4: createVar(),
                      },
                      fg: {
                        0: createVar(),
                        4: createVar(),
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
  },
  font: {
    ...themeVars.font,
    family: createVar(),
    featureSettings: createVar(),
    fontSize: createVar(),
    lineHeight: createVar(),
    letterSpacing: createVar(),
    fontWeight: createVar(),
    ascenderHeight: createVar(),
    descenderHeight: createVar(),
    capHeight: createVar(),
    iconSize: createVar(),
    iconOffset: createVar(),
    customIconOffset: createVar(),
    customIconSize: createVar(),
    skeleton: {
      ascenderHeight: createVar(),
      descenderHeight: createVar(),
      lineHeight: createVar(),
    },
    weight: {
      regular: createVar(),
      medium: createVar(),
      semibold: createVar(),
      bold: createVar(),
    },
  },
  input: {
    ...themeVars.input,
    switch: {
      ...themeVars.input.switch,
      thumb: {
        offset: createVar(),
        size: createVar(),
      },
    },
    text: {
      ...themeVars.input.text,
      fontSize: createVar(),
      lineHeight: createVar(),
      letterSpacing: createVar(),
      ascenderHeight: createVar(),
      descenderHeight: createVar(),
      padding: createVar(),
      gap: createVar(),
    },
  },
}
