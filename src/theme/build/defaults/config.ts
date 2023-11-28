import {RootTheme} from '../../system'

const BORDER_WIDTH = 1
const OUTLINE_WIDTH = 0.5

export const defaultThemeConfig: Omit<RootTheme, 'color' | 'fonts'> = {
  avatar: {
    sizes: [
      {distance: -3, size: 25},
      {distance: -6, size: 35},
      {distance: -9, size: 55},
    ],
    focusRing: {offset: 1, width: 1},
  },
  button: {
    textWeight: 'medium',
    border: {width: BORDER_WIDTH},
    focusRing: {offset: -1, width: 2},
  },
  card: {
    border: {width: BORDER_WIDTH},
    focusRing: {offset: -1, width: 1},
    shadow: {outline: OUTLINE_WIDTH},
  },
  container: [480, 640, 960, 1280, 1600, 1920],
  focusRing: {
    offset: 1,
    width: 2,
  },
  media: [360, 600, 900, 1200, 1800, 2400],
  radius: [0, 1, 3, 6, 9, 12, 21],
  shadows: [
    null,
    {umbra: [0, 0, 0, 0], penumbra: [0, 0, 0, 0], ambient: [0, 0, 0, 0]},
    {umbra: [0, 3, 5, -2], penumbra: [0, 6, 10, 0], ambient: [0, 1, 18, 1]},
    {umbra: [0, 7, 8, -4], penumbra: [0, 12, 17, 2], ambient: [0, 5, 22, 4]},
    {umbra: [0, 9, 11, -5], penumbra: [0, 18, 28, 2], ambient: [0, 7, 34, 6]},
    {umbra: [0, 11, 15, -7], penumbra: [0, 24, 38, 3], ambient: [0, 9, 46, 8]},
  ],
  space: [0, 4, 8, 12, 20, 32, 52, 84, 136, 220],
  input: {
    border: {
      width: BORDER_WIDTH,
    },
    checkbox: {
      size: 17,
      focusRing: {offset: -1, width: 1},
    },
    radio: {
      size: 17,
      markSize: 9,
      focusRing: {offset: -1, width: 1},
    },
    switch: {
      width: 25,
      height: 17,
      padding: 2,
      transitionDurationMs: 150,
      transitionTimingFunction: 'ease-out',
      focusRing: {offset: 1, width: 1},
    },
    select: {
      focusRing: {offset: -1, width: 1},
    },
    text: {
      focusRing: {offset: -1, width: 1},
    },
  },
  styles: {
    button: {
      root: {
        transition: 'background-color 100ms,border-color 100ms,color 100ms',
      },
    },
    // card: {
    //   root: {
    //     transition: 'background-color 100ms,border-color 100ms,color 100ms',
    //   },
    // },
  },
}
