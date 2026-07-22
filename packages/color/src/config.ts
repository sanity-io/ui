import {ColorConfig} from './types'

/** @internal */
export const config: ColorConfig = {
  black: {
    title: 'Black',
    hsl: [225, 16, 6],
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
        hsl: [240, 12, 97],
      },
      100: {
        title: 'Gray 100',
        hsl: [240, 10, 94],
      },
      200: {
        title: 'Gray 200',
        hsl: [231, 10, 90],
      },
      300: {
        title: 'Gray 300',
        hsl: [232, 11, 76],
      },
      400: {
        title: 'Gray 400',
        hsl: [228, 13, 63],
      },
      500: {
        title: 'Gray 500',
        hsl: [229, 13, 51],
      },
      600: {
        title: 'Gray 600',
        hsl: [228, 16, 38],
      },
      700: {
        title: 'Gray 700',
        hsl: [229, 18, 27],
      },
      800: {
        title: 'Gray 800',
        hsl: [229, 19, 18],
      },
      900: {
        title: 'Gray 900',
        hsl: [228, 19, 13],
      },
      950: {
        title: 'Gray 950',
        hsl: [233, 17, 9],
      },
    },
  },
  blue: {
    title: 'Blue',
    tints: {
      50: {
        title: 'Blue 50',
        hsl: [222, 100, 98],
      },
      100: {
        title: 'Blue 100',
        hsl: [222, 100, 95],
      },
      200: {
        title: 'Blue 200',
        hsl: [223, 100, 93],
      },
      300: {
        title: 'Blue 300',
        hsl: [224, 100, 83],
      },
      400: {
        title: 'Blue 400',
        hsl: [226, 100, 73],
      },
      500: {
        title: 'Blue 500',
        hsl: [232, 96, 66],
      },
      600: {
        title: 'Blue 600',
        hsl: [239, 78, 58],
      },
      700: {
        title: 'Blue 700',
        hsl: [241, 63, 41],
      },
      800: {
        title: 'Blue 800',
        hsl: [230, 55, 22],
      },
      900: {
        title: 'Blue 900',
        hsl: [234, 49, 17],
      },
      950: {
        title: 'Blue 950',
        hsl: [235, 43, 11],
      },
    },
  },
  purple: {
    title: 'Purple',
    tints: {
      50: {
        title: 'Purple 50',
        hsl: [260, 95, 98],
      },
      100: {
        title: 'Purple 100',
        hsl: [260, 98, 96],
      },
      200: {
        title: 'Purple 200',
        hsl: [263, 96, 94],
      },
      300: {
        title: 'Purple 300',
        hsl: [262, 92, 84],
      },
      400: {
        title: 'Purple 400',
        hsl: [262, 88, 75],
      },
      500: {
        title: 'Purple 500',
        hsl: [262, 83, 64],
      },
      600: {
        title: 'Purple 600',
        hsl: [265, 79, 51],
      },
      700: {
        title: 'Purple 700',
        hsl: [263, 72, 36],
      },
      800: {
        title: 'Purple 800',
        hsl: [258, 60, 24],
      },
      900: {
        title: 'Purple 900',
        hsl: [257, 46, 17],
      },
      950: {
        title: 'Purple 950',
        hsl: [260, 41, 11],
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
        hsl: [339, 83, 95],
      },
      200: {
        title: 'Magenta 200',
        hsl: [339, 83, 93],
      },
      300: {
        title: 'Magenta 300',
        hsl: [340, 82, 82],
      },
      400: {
        title: 'Magenta 400',
        hsl: [340, 81, 69],
      },
      500: {
        title: 'Magenta 500',
        hsl: [340, 80, 53],
      },
      600: {
        title: 'Magenta 600',
        hsl: [337, 78, 39],
      },
      700: {
        title: 'Magenta 700',
        hsl: [333, 73, 28],
      },
      800: {
        title: 'Magenta 800',
        hsl: [328, 63, 18],
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
        hsl: [4, 100, 95],
      },
      200: {
        title: 'Red 200',
        hsl: [4, 98, 93],
      },
      300: {
        title: 'Red 300',
        hsl: [5, 95, 82],
      },
      400: {
        title: 'Red 400',
        hsl: [6, 90, 69],
      },
      500: {
        title: 'Red 500',
        hsl: [5, 85, 57],
      },
      600: {
        title: 'Red 600',
        hsl: [5, 78, 45],
      },
      700: {
        title: 'Red 700',
        hsl: [4, 70, 32],
      },
      800: {
        title: 'Red 800',
        hsl: [3, 58, 19],
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
        hsl: [25, 100, 93],
      },
      200: {
        title: 'Orange 200',
        hsl: [24, 100, 89],
      },
      300: {
        title: 'Orange 300',
        hsl: [24, 100, 76],
      },
      400: {
        title: 'Orange 400',
        hsl: [24, 100, 63],
      },
      500: {
        title: 'Orange 500',
        hsl: [24, 100, 49],
      },
      600: {
        title: 'Orange 600',
        hsl: [24, 98, 35],
      },
      700: {
        title: 'Orange 700',
        hsl: [24, 94, 25],
      },
      800: {
        title: 'Orange 800',
        hsl: [22, 82, 15],
      },
      900: {
        title: 'Orange 900',
        hsl: [17, 65, 12],
      },
      950: {
        title: 'Orange 950',
        hsl: [14, 43, 9],
      },
    },
  },
  yellow: {
    title: 'Yellow',
    tints: {
      50: {
        title: 'Yellow 50',
        hsl: [51, 94, 94],
      },
      100: {
        title: 'Yellow 100',
        hsl: [52, 91, 86],
      },
      200: {
        title: 'Yellow 200',
        hsl: [50, 90, 78],
      },
      300: {
        title: 'Yellow 300',
        hsl: [47, 91, 65],
      },
      400: {
        title: 'Yellow 400',
        hsl: [44, 95, 53],
      },
      500: {
        title: 'Yellow 500',
        hsl: [39, 96, 42],
      },
      600: {
        title: 'Yellow 600',
        hsl: [34, 90, 31],
      },
      700: {
        title: 'Yellow 700',
        hsl: [31, 80, 22],
      },
      800: {
        title: 'Yellow 800',
        hsl: [28, 66, 14],
      },
      900: {
        title: 'Yellow 900',
        hsl: [24, 40, 11],
      },
      950: {
        title: 'Yellow 950',
        hsl: [24, 20, 8],
      },
    },
  },
  green: {
    title: 'Green',
    tints: {
      50: {
        title: 'Green 50',
        hsl: [157, 89, 95],
      },
      100: {
        title: 'Green 100',
        hsl: [158, 89, 88],
      },
      200: {
        title: 'Green 200',
        hsl: [158, 87, 82],
      },
      300: {
        title: 'Green 300',
        hsl: [158, 86, 65],
      },
      400: {
        title: 'Green 400',
        hsl: [159, 88, 50],
      },
      500: {
        title: 'Green 500',
        hsl: [159, 96, 37],
      },
      600: {
        title: 'Green 600',
        hsl: [159, 98, 24],
      },
      700: {
        title: 'Green 700',
        hsl: [158, 98, 16],
      },
      800: {
        title: 'Green 800',
        hsl: [158, 91, 10],
      },
      900: {
        title: 'Green 900',
        hsl: [162, 72, 8],
      },
      950: {
        title: 'Green 950',
        hsl: [172, 51, 6],
      },
    },
  },
  cyan: {
    title: 'Cyan',
    tints: {
      50: {
        title: 'Cyan 50',
        hsl: [180, 92, 95],
      },
      100: {
        title: 'Cyan 100',
        hsl: [180, 91, 88],
      },
      200: {
        title: 'Cyan 200',
        hsl: [180, 87, 78],
      },
      300: {
        title: 'Cyan 300',
        hsl: [180, 81, 66],
      },
      400: {
        title: 'Cyan 400',
        hsl: [180, 81, 49],
      },
      500: {
        title: 'Cyan 500',
        hsl: [182, 96, 38],
      },
      600: {
        title: 'Cyan 600',
        hsl: [185, 96, 26],
      },
      700: {
        title: 'Cyan 700',
        hsl: [185, 95, 16],
      },
      800: {
        title: 'Cyan 800',
        hsl: [187, 86, 11],
      },
      900: {
        title: 'Cyan 900',
        hsl: [188, 68, 9],
      },
      950: {
        title: 'Cyan 950',
        hsl: [196, 37, 8],
      },
    },
  },
}
