import {
  BUTTON_MODES,
  CARD_TONES,
  // INPUT_MODES,
  // INPUT_STATES,
  ELEMENT_TONES,
  // STATES,
} from '@sanity/ui/theme'
import {get} from 'segmented-property'

import type {WriteConfig} from '../config'
import {theme} from '../theme'
import {
  BASE_KEYS,
  type FigmaSanityUIColorVariable,
  // INPUT_KEYS,
  SCHEMES,
  // STATE_KEYS,
} from './types'

export function prepareSanityUIColorVariables(config: WriteConfig): FigmaSanityUIColorVariable[] {
  const variables: FigmaSanityUIColorVariable[] = []

  for (const scheme of SCHEMES) {
    for (const tone of CARD_TONES) {
      const toneConfig = config.tones[tone]

      if (!toneConfig) continue

      const toneColor = theme.color[scheme][tone]

      // base
      for (const key of BASE_KEYS) {
        if (key.startsWith('accent') && !toneConfig.accent) continue
        if (key.startsWith('avatar') && !toneConfig.avatar) continue
        if (key.startsWith('badge') && !toneConfig.badge) continue
        if (key.startsWith('code') && !toneConfig.code) continue
        if (key.startsWith('kbd') && !toneConfig.kbd) continue
        if (key.startsWith('link') && !toneConfig.link) continue
        if (key.startsWith('skeleton') && !toneConfig.skeleton) continue

        variables.push({
          scheme,
          tone,
          key,
          value: get(toneColor as any, key.replace(/\./g, '/').replace(/-/g, '/')) as any,
        })
      }

      // button
      if (toneConfig.button) {
        for (const mode of BUTTON_MODES) {
          if (!toneConfig?.button?.modes?.[mode]) {
            continue
          }

          for (const buttonTone of ELEMENT_TONES) {
            const buttonToneConfig = toneConfig.button.modes[mode]?.[buttonTone]

            if (!buttonToneConfig) {
              continue
            }

            // for (const state of STATES) {
            //   for (const key of STATE_KEYS) {
            //     if (key.startsWith('accent') && !buttonToneConfig.accent) continue
            //     if (key.startsWith('avatar') && !buttonToneConfig.avatar) continue
            //     if (key.startsWith('badge') && !buttonToneConfig.badge) continue
            //     if (key.startsWith('code') && !buttonToneConfig.code) continue
            //     if (key.startsWith('kbd') && !buttonToneConfig.kbd) continue
            //     if (key.startsWith('link') && !buttonToneConfig.link) continue
            //     if (key.startsWith('skeleton') && !buttonToneConfig.skeleton) continue

            //     const buttonColor = toneColor.button[mode][buttonTone][state]

            //     variables.push({
            //       scheme,
            //       tone,
            //       key: `button/${mode}/${buttonTone}/${state}/${key}`,
            //       value: get(buttonColor as any, key.replace(/\./g, '/').replace(/-/g, '/')) as any,
            //     })
            //   }
            // }
          }
        }
      }

      // // input
      // if (toneConfig.input) {
      //   for (const mode of INPUT_MODES) {
      //     for (const state of INPUT_STATES) {
      //       for (const key of INPUT_KEYS) {
      //         const inputColor = toneColor.input[mode][state]

      //         variables.push({
      //           scheme,
      //           tone,
      //           key: `input/${mode}/${state}/${key}`,
      //           value: get(inputColor as any, key.replace(/\./g, '/').replace(/-/g, '/')) as any,
      //         })
      //       }
      //     }
      //   }
      // }

      // selectable
      if (toneConfig.selectable) {
        for (const selectableTone of ELEMENT_TONES) {
          const selectableToneConfig = toneConfig.selectable[selectableTone]

          if (!selectableToneConfig) {
            continue
          }

          // for (const state of STATES) {
          //   for (const key of STATE_KEYS) {
          //     if (key.startsWith('accent') && !selectableToneConfig.accent) continue
          //     if (key.startsWith('avatar') && !selectableToneConfig.avatar) continue
          //     if (key.startsWith('badge') && !selectableToneConfig.badge) continue
          //     if (key.startsWith('code') && !selectableToneConfig.code) continue
          //     if (key.startsWith('kbd') && !selectableToneConfig.kbd) continue
          //     if (key.startsWith('link') && !selectableToneConfig.link) continue
          //     if (key.startsWith('skeleton') && !selectableToneConfig.skeleton) continue

          //     const selectableColor = toneColor.selectable?.[selectableTone][state]

          //     variables.push({
          //       scheme,
          //       tone,
          //       key: `selectable/${selectableTone}/${state}/${key}`,
          //       value: get(
          //         selectableColor as any,
          //         key.replace(/\./g, '/').replace(/-/g, '/'),
          //       ) as any,
          //     })
          //   }
          // }
        }
      }
    }
  }

  return variables
}
