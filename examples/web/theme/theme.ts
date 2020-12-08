import {RootTheme} from '@sanity/ui'
import {color} from './color'
import {fonts} from './fonts'

export const sanityTheme: RootTheme = {
  avatar: {
    sizes: [
      {distance: -3, size: 23},
      {distance: -6, size: 35},
      {distance: -9, size: 55},
    ],
  },
  button: {
    textWeight: 'medium',
  },
  color,
  container: [480, 960, 1440, 1920, 2400],
  focusRing: {
    offset: 1,
    width: 2,
  },
  fonts,
  media: [320, 640, 960, 1280, 1600, 1920],
  radius: [0, 1, 3, 6, 9, 12, 21],
  shadows: [
    null,
    // 1
    // {umbra: [0, 2, 1, -1], penumbra: [0, 1, 1, 0], ambient: [0, 1, 3, 0]},
    {umbra: [0, 0, 0, 0], penumbra: [0, 0, 0, 0], ambient: [0, 0, 0, 0]},
    // 6
    {umbra: [0, 3, 5, -1], penumbra: [0, 6, 10, 0], ambient: [0, 1, 18, 0]},
    // 12
    {umbra: [0, 7, 8, -4], penumbra: [0, 12, 17, 2], ambient: [0, 5, 22, 4]},
    // 18
    {umbra: [0, 9, 11, -5], penumbra: [0, 18, 28, 2], ambient: [0, 7, 34, 6]},
    // 24
    {umbra: [0, 11, 15, -7], penumbra: [0, 24, 38, 3], ambient: [0, 9, 46, 8]},
  ],
  space: [0, 8, 12, 20, 32, 52, 84, 136, 220, 356],
  input: {
    border: {
      width: 1,
    },
    checkbox: {
      size: 17,
    },
    radio: {
      size: 17,
      markSize: 9,
    },
    switch: {
      width: 33,
      height: 17,
      padding: 4,
      transitionDurationMs: 150,
      transitionTimingFunction: 'ease-out',
    },
  },
}
