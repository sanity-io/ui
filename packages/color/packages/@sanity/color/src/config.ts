import {ColorConfig} from './types'

/** @internal */
export const config: ColorConfig = {
  black: {
    title: 'Black',
    hsl: [210, 6, 7],
  },
  white: {
    title: 'White',
    hsl: [0, 0, 100],
  },
  gray: {
    title: 'Gray',
    tints: {
      50: {
        title: 'Gray 50',
        hsl: [210, 25, 98],
      },
      100: {
        title: 'Gray 100',
        hsl: [216, 19, 95],
      },
      200: {
        title: 'Gray 200',
        hsl: [216, 14, 84],
      },
      300: {
        title: 'Gray 300',
        hsl: [216, 11, 73],
      },
      400: {
        title: 'Gray 400',
        hsl: [219, 10, 62],
      },
      500: {
        title: 'Gray 500',
        hsl: [218, 10, 52],
      },
      600: {
        title: 'Gray 600',
        hsl: [221, 10, 43],
      },
      700: {
        title: 'Gray 700',
        hsl: [222, 11, 35],
      },
      800: {
        title: 'Gray 800',
        hsl: [222, 13, 26],
      },
      900: {
        title: 'Gray 900',
        hsl: [220, 13, 19],
      },
      950: {
        title: 'Gray 950',
        hsl: [216, 9, 11],
      },
    },
  },
  blue: {
    title: 'Blue',
    tints: {
      50: {
        title: 'Blue 50',
        hsl: [210, 100, 96],
      },
      100: {
        title: 'Blue 100',
        hsl: [211, 100, 91],
      },
      200: {
        title: 'Blue 200',
        hsl: [211, 100, 84],
      },
      300: {
        title: 'Blue 300',
        hsl: [210, 100, 76],
      },
      400: {
        title: 'Blue 400',
        hsl: [212, 100, 69],
      },
      500: {
        title: 'Blue 500',
        hsl: [215, 100, 61],
      },
      600: {
        title: 'Blue 600',
        hsl: [218, 99, 54],
      },
      700: {
        title: 'Blue 700',
        hsl: [220, 97, 45],
      },
      800: {
        title: 'Blue 800',
        hsl: [221, 91, 35],
      },
      900: {
        title: 'Blue 900',
        hsl: [221, 78, 24],
      },
      950: {
        title: 'Blue 950',
        hsl: [218, 57, 14],
      },
    },
  },
  purple: {
    title: 'Purple',
    tints: {
      50: {
        title: 'Purple 50',
        hsl: [270, 100, 96],
      },
      100: {
        title: 'Purple 100',
        hsl: [270, 95, 92],
      },
      200: {
        title: 'Purple 200',
        hsl: [270, 95, 84],
      },
      300: {
        title: 'Purple 300',
        hsl: [270, 90, 75],
      },
      400: {
        title: 'Purple 400',
        hsl: [270, 73, 67],
      },
      500: {
        title: 'Purple 500',
        hsl: [271, 59, 58],
      },
      600: {
        title: 'Purple 600',
        hsl: [272, 55, 49],
      },
      700: {
        title: 'Purple 700',
        hsl: [273, 66, 40],
      },
      800: {
        title: 'Purple 800',
        hsl: [273, 61, 29],
      },
      900: {
        title: 'Purple 900',
        hsl: [272, 48, 18],
      },
      950: {
        title: 'Purple 950',
        hsl: [271, 35, 13],
      },
    },
  },
  magenta: {
    title: 'Magenta',
    tints: {
      50: {
        title: 'Magenta 50',
        hsl: [330, 92, 95],
      },
      100: {
        title: 'Magenta 100',
        hsl: [340, 85, 90],
      },
      200: {
        title: 'Magenta 200',
        hsl: [340, 83, 81],
      },
      300: {
        title: 'Magenta 300',
        hsl: [340, 82, 71],
      },
      400: {
        title: 'Magenta 400',
        hsl: [340, 81, 62],
      },
      500: {
        title: 'Magenta 500',
        hsl: [340, 80, 52],
      },
      600: {
        title: 'Magenta 600',
        hsl: [337, 78, 43],
      },
      700: {
        title: 'Magenta 700',
        hsl: [333, 76, 34],
      },
      800: {
        title: 'Magenta 800',
        hsl: [328, 71, 26],
      },
      900: {
        title: 'Magenta 900',
        hsl: [328, 64, 18],
      },
      950: {
        title: 'Magenta 950',
        hsl: [340, 55, 14],
      },
    },
  },
  red: {
    title: 'Red',
    tints: {
      50: {
        title: 'Red 50',
        hsl: [5, 83, 95],
      },
      100: {
        title: 'Red 100',
        hsl: [5, 87, 91],
      },
      200: {
        title: 'Red 200',
        hsl: [5, 85, 82],
      },
      300: {
        title: 'Red 300',
        hsl: [5, 84, 71],
      },
      400: {
        title: 'Red 400',
        hsl: [5, 81, 60],
      },
      500: {
        title: 'Red 500',
        hsl: [5, 77, 50],
      },
      600: {
        title: 'Red 600',
        hsl: [5, 73, 41],
      },
      700: {
        title: 'Red 700',
        hsl: [5, 69, 33],
      },
      800: {
        title: 'Red 800',
        hsl: [5, 65, 25],
      },
      900: {
        title: 'Red 900',
        hsl: [5, 49, 16],
      },
      950: {
        title: 'Red 950',
        hsl: [3, 32, 12],
      },
    },
  },
  orange: {
    title: 'Orange',
    tints: {
      50: {
        title: 'Orange 50',
        hsl: [25, 83, 95],
      },
      100: {
        title: 'Orange 100',
        hsl: [25, 85, 90],
      },
      200: {
        title: 'Orange 200',
        hsl: [24, 85, 80],
      },
      300: {
        title: 'Orange 300',
        hsl: [23, 86, 69],
      },
      400: {
        title: 'Orange 400',
        hsl: [22, 87, 59],
      },
      500: {
        title: 'Orange 500',
        hsl: [21, 87, 49],
      },
      600: {
        title: 'Orange 600',
        hsl: [21, 86, 40],
      },
      700: {
        title: 'Orange 700',
        hsl: [21, 81, 31],
      },
      800: {
        title: 'Orange 800',
        hsl: [20, 72, 23],
      },
      900: {
        title: 'Orange 900',
        hsl: [21, 54, 15],
      },
      950: {
        title: 'Orange 950',
        hsl: [23, 34, 11],
      },
    },
  },
  yellow: {
    title: 'Yellow',
    tints: {
      50: {
        title: 'Yellow 50',
        hsl: [52, 100, 95],
      },
      100: {
        title: 'Yellow 100',
        hsl: [52, 95, 85],
      },
      200: {
        title: 'Yellow 200',
        hsl: [53, 92, 75],
      },
      300: {
        title: 'Yellow 300',
        hsl: [50, 90, 65],
      },
      400: {
        title: 'Yellow 400',
        hsl: [47, 88, 57],
      },
      500: {
        title: 'Yellow 500',
        hsl: [45, 93, 49],
      },
      600: {
        title: 'Yellow 600',
        hsl: [42, 90, 42],
      },
      700: {
        title: 'Yellow 700',
        hsl: [39, 86, 35],
      },
      800: {
        title: 'Yellow 800',
        hsl: [35, 80, 29],
      },
      900: {
        title: 'Yellow 900',
        hsl: [32, 67, 20],
      },
      950: {
        title: 'Yellow 950',
        hsl: [34, 26, 11],
      },
    },
  },
  green: {
    title: 'Green',
    tints: {
      50: {
        title: 'Green 50',
        hsl: [146, 54, 95],
      },
      100: {
        title: 'Green 100',
        hsl: [145, 54, 84],
      },
      200: {
        title: 'Green 200',
        hsl: [145, 55, 74],
      },
      300: {
        title: 'Green 300',
        hsl: [145, 57, 63],
      },
      400: {
        title: 'Green 400',
        hsl: [145, 59, 52],
      },
      500: {
        title: 'Green 500',
        hsl: [145, 73, 42],
      },
      600: {
        title: 'Green 600',
        hsl: [145, 72, 35],
      },
      700: {
        title: 'Green 700',
        hsl: [146, 69, 27],
      },
      800: {
        title: 'Green 800',
        hsl: [145, 62, 21],
      },
      900: {
        title: 'Green 900',
        hsl: [147, 53, 16],
      },
      950: {
        title: 'Green 950',
        hsl: [150, 31, 10],
      },
    },
  },
  cyan: {
    title: 'Cyan',
    tints: {
      50: {
        title: 'Cyan 50',
        hsl: [188, 92, 95],
      },
      100: {
        title: 'Cyan 100',
        hsl: [188, 92, 85],
      },
      200: {
        title: 'Cyan 200',
        hsl: [187, 91, 75],
      },
      300: {
        title: 'Cyan 300',
        hsl: [187, 91, 65],
      },
      400: {
        title: 'Cyan 400',
        hsl: [188, 88, 55],
      },
      500: {
        title: 'Cyan 500',
        hsl: [189, 78, 47],
      },
      600: {
        title: 'Cyan 600',
        hsl: [191, 79, 39],
      },
      700: {
        title: 'Cyan 700',
        hsl: [193, 81, 31],
      },
      800: {
        title: 'Cyan 800',
        hsl: [193, 76, 24],
      },
      900: {
        title: 'Cyan 900',
        hsl: [193, 64, 17],
      },
      950: {
        title: 'Cyan 950',
        hsl: [195, 37, 11],
      },
    },
  },
}
