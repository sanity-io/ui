import {
  THEME_COLOR_BASE_TONES,
  THEME_COLOR_BUTTON_MODES,
  THEME_COLOR_INPUT_MODES,
  THEME_COLOR_INPUT_STATES,
  THEME_COLOR_STATES,
  THEME_COLOR_STATE_TONES,
  ThemeColorSpotKey,
  studioTheme,
} from '@sanity/ui/theme'
import {get} from 'segmented-property'
import {WriteConfig} from '../config'
import {BASE_KEYS, FigmaSanityUIColorVariable, INPUT_KEYS, SCHEMES, STATE_KEYS} from './types'

const AVATAR_COLORS: ThemeColorSpotKey[] = [
  'gray',
  'blue',
  'purple',
  'magenta',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
]

export function prepareSanityUIColorVariables(config: WriteConfig): FigmaSanityUIColorVariable[] {
  const variables: FigmaSanityUIColorVariable[] = []

  for (const scheme of SCHEMES) {
    for (const tone of THEME_COLOR_BASE_TONES) {
      const toneConfig = config.tones[tone]

      if (!toneConfig) continue

      const toneColor = studioTheme.color[scheme][tone]

      // base
      for (const key of BASE_KEYS) {
        const baseColor = toneColor.base

        variables.push({
          scheme,
          tone,
          key,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value: get(baseColor as any, key.replace(/-/g, '/')) as any,
        })
      }

      // avatar
      if (toneConfig.avatar) {
        for (const color of AVATAR_COLORS) {
          const avatarColor = toneColor.avatar?.[color]

          variables.push({
            scheme,
            tone,
            key: `avatar/${color}/bg`,
            value: avatarColor?.bg,
          })

          variables.push({
            scheme,
            tone,
            key: `avatar/${color}/fg`,
            value: avatarColor?.fg,
          })
        }
      }

      // badge
      if (toneConfig.badge) {
        for (const badgeTone of THEME_COLOR_STATE_TONES) {
          const badgeColor = toneColor.badge?.[badgeTone]

          variables.push({
            scheme,
            tone,
            key: `badge/${badgeTone}/bg`,
            value: badgeColor?.bg,
          })

          variables.push({
            scheme,
            tone,
            key: `badge/${badgeTone}/fg`,
            value: badgeColor?.fg,
          })
        }
      }

      // button
      if (toneConfig.button) {
        for (const mode of THEME_COLOR_BUTTON_MODES) {
          for (const buttonTone of THEME_COLOR_STATE_TONES) {
            for (const state of THEME_COLOR_STATES) {
              for (const key of STATE_KEYS) {
                const buttonColor = toneColor.button[mode][buttonTone][state]

                variables.push({
                  scheme,
                  tone,
                  key: `button/${mode}/${buttonTone}/${state}/${key}`,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  value: get(buttonColor as any, key.replace(/-/g, '/')) as any,
                })
              }
            }
          }
        }
      }

      // card
      if (toneConfig.card) {
        for (const state of THEME_COLOR_STATES) {
          if (toneConfig.card[state]) {
            for (const key of STATE_KEYS) {
              const cardColor = toneColor.card[state]

              variables.push({
                scheme,
                tone,
                key: `card/${state}/${key}`,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value: get(cardColor as any, key.replace(/-/g, '/')) as any,
              })
            }
          }
        }
      }

      // input
      if (toneConfig.input) {
        for (const mode of THEME_COLOR_INPUT_MODES) {
          for (const state of THEME_COLOR_INPUT_STATES) {
            for (const key of INPUT_KEYS) {
              const inputColor = toneColor.input[mode][state]

              variables.push({
                scheme,
                tone,
                key: `input/${mode}/${state}/${key}`,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value: get(inputColor as any, key.replace(/-/g, '/')) as any,
              })
            }
          }
        }
      }

      // kbd
      if (toneConfig.kbd) {
        const kbdColor = toneColor.kbd

        variables.push(
          {
            scheme,
            tone,
            key: `kbd/bg`,
            value: kbdColor?.bg,
          },
          {
            scheme,
            tone,
            key: `kbd/fg`,
            value: kbdColor?.fg,
          },
          {
            scheme,
            tone,
            key: `kbd/border`,
            value: kbdColor?.border,
          },
        )
      }

      // selectable
      if (toneConfig.selectable) {
        for (const selectableTone of THEME_COLOR_STATE_TONES) {
          for (const state of THEME_COLOR_STATES) {
            for (const key of STATE_KEYS) {
              const selectableColor = toneColor.selectable?.[selectableTone][state]

              variables.push({
                scheme,
                tone,
                key: `selectable/${selectableTone}/${state}/${key}`,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value: get(selectableColor as any, key.replace(/-/g, '/')) as any,
              })
            }
          }
        }
      }
    }
  }

  return variables
}
