import {ColorConfig} from './types'

/** @internal */
export const config: ColorConfig = {
  black: {
    title: 'Black',
    hsl: [240, 16, 6],
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
        hsl: [240, 14, 97],
      },
      100: {
        title: 'Gray 100',
        hsl: [232, 9, 94],
      },
      200: {
        title: 'Gray 200',
        hsl: [232, 10, 86],
      },
      300: {
        title: 'Gray 300',
        hsl: [232, 11, 74],
      },
      400: {
        title: 'Gray 400',
        hsl: [232, 12, 62],
      },
      500: {
        title: 'Gray 500',
        hsl: [232, 14, 49],
      },
      600: {
        title: 'Gray 600',
        hsl: [233, 16, 39],
      },
      700: {
        title: 'Gray 700',
        hsl: [234, 18, 30],
      },
      800: {
        title: 'Gray 800',
        hsl: [235, 20, 22],
      },
      900: {
        title: 'Gray 900',
        hsl: [236, 21, 14],
      },
      950: {
        title: 'Gray 950',
        hsl: [234, 19, 9],
      },
    },
  },
  blue: {
    title: 'Blue',
    tints: {
      50: {
        title: 'Blue 50',
        hsl: [220, 100, 98],
      },
      100: {
        title: 'Blue 100',
        hsl: [216, 100, 95],
      },
      200: {
        title: 'Blue 200',
        hsl: [217, 100, 88],
      },
      300: {
        title: 'Blue 300',
        hsl: [221, 100, 80],
      },
      400: {
        title: 'Blue 400',
        hsl: [227, 100, 73],
      },
      500: {
        title: 'Blue 500',
        hsl: [237, 98, 66],
      },
      600: {
        title: 'Blue 600',
        hsl: [248, 93, 56],
      },
      700: {
        title: 'Blue 700',
        hsl: [252, 84, 45],
      },
      800: {
        title: 'Blue 800',
        hsl: [249, 70, 33],
      },
      900: {
        title: 'Blue 900',
        hsl: [235, 52, 18],
      },
      950: {
        title: 'Blue 950',
        hsl: [243, 43, 11],
      },
    },
  },
  purple: {
    title: 'Purple',
    tints: {
      50: {
        title: 'Purple 50',
        hsl: [260, 100, 98],
      },
      100: {
        title: 'Purple 100',
        hsl: [260, 100, 96],
      },
      200: {
        title: 'Purple 200',
        hsl: [263, 96, 91],
      },
      300: {
        title: 'Purple 300',
        hsl: [262, 92, 82],
      },
      400: {
        title: 'Purple 400',
        hsl: [262, 88, 73],
      },
      500: {
        title: 'Purple 500',
        hsl: [262, 83, 62],
      },
      600: {
        title: 'Purple 600',
        hsl: [265, 79, 51],
      },
      700: {
        title: 'Purple 700',
        hsl: [263, 72, 40],
      },
      800: {
        title: 'Purple 800',
        hsl: [258, 60, 28],
      },
      900: {
        title: 'Purple 900',
        hsl: [257, 46, 16],
      },
      950: {
        title: 'Purple 950',
        hsl: [260, 41, 10],
      },
    },
  },
  magenta: {
    title: 'Magenta',
    tints: {
      50: {
        title: 'Magenta 50',
        hsl: [340, 82, 98],
      },
      100: {
        title: 'Magenta 100',
        hsl: [339, 83, 96],
      },
      200: {
        title: 'Magenta 200',
        hsl: [339, 83, 91],
      },
      300: {
        title: 'Magenta 300',
        hsl: [340, 82, 83],
      },
      400: {
        title: 'Magenta 400',
        hsl: [340, 81, 70],
      },
      500: {
        title: 'Magenta 500',
        hsl: [340, 80, 58],
      },
      600: {
        title: 'Magenta 600',
        hsl: [337, 78, 46],
      },
      700: {
        title: 'Magenta 700',
        hsl: [333, 73, 35],
      },
      800: {
        title: 'Magenta 800',
        hsl: [328, 63, 22],
      },
      900: {
        title: 'Magenta 900',
        hsl: [327, 46, 14],
      },
      950: {
        title: 'Magenta 950',
        hsl: [341, 35, 9],
      },
    },
  },
  red: {
    title: 'Red',
    tints: {
      50: {
        title: 'Red 50',
        hsl: [5, 100, 98],
      },
      100: {
        title: 'Red 100',
        hsl: [4, 100, 96],
      },
      200: {
        title: 'Red 200',
        hsl: [4, 100, 92],
      },
      300: {
        title: 'Red 300',
        hsl: [5, 91, 82],
      },
      400: {
        title: 'Red 400',
        hsl: [6, 86, 69],
      },
      500: {
        title: 'Red 500',
        hsl: [5, 83, 57],
      },
      600: {
        title: 'Red 600',
        hsl: [5, 78, 45],
      },
      700: {
        title: 'Red 700',
        hsl: [4, 70, 34],
      },
      800: {
        title: 'Red 800',
        hsl: [3, 58, 23],
      },
      900: {
        title: 'Red 900',
        hsl: [2, 41, 14],
      },
      950: {
        title: 'Red 950',
        hsl: [356, 30, 9],
      },
    },
  },
  orange: {
    title: 'Orange',
    tints: {
      50: {
        title: 'Orange 50',
        hsl: [28, 100, 97],
      },
      100: {
        title: 'Orange 100',
        hsl: [25, 100, 95],
      },
      200: {
        title: 'Orange 200',
        hsl: [24, 100, 89],
      },
      300: {
        title: 'Orange 300',
        hsl: [22, 100, 80],
      },
      400: {
        title: 'Orange 400',
        hsl: [21, 100, 69],
      },
      500: {
        title: 'Orange 500',
        hsl: [20, 100, 59],
      },
      600: {
        title: 'Orange 600',
        hsl: [20, 98, 46],
      },
      700: {
        title: 'Orange 700',
        hsl: [20, 94, 33],
      },
      800: {
        title: 'Orange 800',
        hsl: [18, 82, 19],
      },
      900: {
        title: 'Orange 900',
        hsl: [18, 65, 16],
      },
      950: {
        title: 'Orange 950',
        hsl: [15, 43, 11],
      },
    },
  },
  yellow: {
    title: 'Yellow',
    tints: {
      50: {
        title: 'Yellow 50',
        hsl: [51, 100, 97],
      },
      100: {
        title: 'Yellow 100',
        hsl: [52, 97, 91],
      },
      200: {
        title: 'Yellow 200',
        hsl: [50, 97, 82],
      },
      300: {
        title: 'Yellow 300',
        hsl: [47, 98, 74],
      },
      400: {
        title: 'Yellow 400',
        hsl: [44, 99, 65],
      },
      500: {
        title: 'Yellow 500',
        hsl: [41, 97, 54],
      },
      600: {
        title: 'Yellow 600',
        hsl: [38, 90, 43],
      },
      700: {
        title: 'Yellow 700',
        hsl: [34, 80, 30],
      },
      800: {
        title: 'Yellow 800',
        hsl: [30, 66, 17],
      },
      900: {
        title: 'Yellow 900',
        hsl: [24, 40, 14],
      },
      950: {
        title: 'Yellow 950',
        hsl: [24, 20, 10],
      },
    },
  },
  green: {
    title: 'Green',
    tints: {
      50: {
        title: 'Green 50',
        hsl: [161, 89, 96],
      },
      100: {
        title: 'Green 100',
        hsl: [160, 100, 90],
      },
      200: {
        title: 'Green 200',
        hsl: [162, 90, 79],
      },
      300: {
        title: 'Green 300',
        hsl: [162, 92, 67],
      },
      400: {
        title: 'Green 400',
        hsl: [162, 94, 54],
      },
      500: {
        title: 'Green 500',
        hsl: [162, 96, 43],
      },
      600: {
        title: 'Green 600',
        hsl: [162, 98, 33],
      },
      700: {
        title: 'Green 700',
        hsl: [162, 98, 22],
      },
      800: {
        title: 'Green 800',
        hsl: [162, 91, 12],
      },
      900: {
        title: 'Green 900',
        hsl: [162, 72, 10],
      },
      950: {
        title: 'Green 950',
        hsl: [172, 51, 8],
      },
    },
  },
  cyan: {
    title: 'Cyan',
    tints: {
      50: {
        title: 'Cyan 50',
        hsl: [185, 92, 95],
      },
      100: {
        title: 'Cyan 100',
        hsl: [185, 92, 90],
      },
      200: {
        title: 'Cyan 200',
        hsl: [185, 91, 83],
      },
      300: {
        title: 'Cyan 300',
        hsl: [185, 91, 74],
      },
      400: {
        title: 'Cyan 400',
        hsl: [185, 92, 61],
      },
      500: {
        title: 'Cyan 500',
        hsl: [187, 93, 49],
      },
      600: {
        title: 'Cyan 600',
        hsl: [191, 95, 39],
      },
      700: {
        title: 'Cyan 700',
        hsl: [194, 95, 27],
      },
      800: {
        title: 'Cyan 800',
        hsl: [194, 86, 15],
      },
      900: {
        title: 'Cyan 900',
        hsl: [195, 68, 12],
      },
      950: {
        title: 'Cyan 950',
        hsl: [196, 37, 8],
      },
    },
  },
}
