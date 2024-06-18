import {_getArrayProp} from '@sanity/ui'
import stylex from '@stylexjs/stylex'

type Style = ReturnType<typeof stylex.create>[0]

const _ = stylex.create({
  '0_0': {padding: '0'},
  '0_1': {padding: {'@media (min-width: 360px)': '0'}},
  '0_2': {padding: {'@media (min-width: 600px)': '0'}},
  '0_3': {padding: {'@media (min-width: 900px)': '0'}},
  '0_4': {padding: {'@media (min-width: 1200px)': '0'}},
  '0_5': {padding: {'@media (min-width: 1800px)': '0'}},
  '0_6': {padding: {'@media (min-width: 2400px)': '0'}},

  '1_0': {padding: `4px`},
  '1_1': {padding: {'@media (min-width: 360px)': `4px`}},
  '1_2': {padding: {'@media (min-width: 600px)': `4px`}},
  '1_3': {padding: {'@media (min-width: 900px)': `4px`}},
  '1_4': {padding: {'@media (min-width: 1200px)': `4px`}},
  '1_5': {padding: {'@media (min-width: 1800px)': `4px`}},
  '1_6': {padding: {'@media (min-width: 2400px)': `4px`}},

  '2_0': {padding: `8px`},
  '2_1': {padding: {'@media (min-width: 360px)': `8px`}},
  '2_2': {padding: {'@media (min-width: 600px)': `8px`}},
  '2_3': {padding: {'@media (min-width: 900px)': `8px`}},
  '2_4': {padding: {'@media (min-width: 1200px)': `8px`}},
  '2_5': {padding: {'@media (min-width: 1800px)': `8px`}},
  '2_6': {padding: {'@media (min-width: 2400px)': `8px`}},

  '3_0': {padding: `12px`},
  '3_1': {padding: {'@media (min-width: 360px)': `12px`}},
  '3_2': {padding: {'@media (min-width: 600px)': `12px`}},
  '3_3': {padding: {'@media (min-width: 900px)': `12px`}},
  '3_4': {padding: {'@media (min-width: 1200px)': `12px`}},
  '3_5': {padding: {'@media (min-width: 1800px)': `12px`}},
  '3_6': {padding: {'@media (min-width: 2400px)': `12px`}},

  '4_0': {padding: `20px`},
  '4_1': {padding: {'@media (min-width: 360px)': `20px`}},
  '4_2': {padding: {'@media (min-width: 600px)': `20px`}},
  '4_3': {padding: {'@media (min-width: 900px)': `20px`}},
  '4_4': {padding: {'@media (min-width: 1200px)': `20px`}},
  '4_5': {padding: {'@media (min-width: 1800px)': `20px`}},
  '4_6': {padding: {'@media (min-width: 2400px)': `20px`}},

  '5_0': {padding: `32px`},
  '5_1': {padding: {'@media (min-width: 360px)': `32px`}},
  '5_2': {padding: {'@media (min-width: 600px)': `32px`}},
  '5_3': {padding: {'@media (min-width: 900px)': `32px`}},
  '5_4': {padding: {'@media (min-width: 1200px)': `32px`}},
  '5_5': {padding: {'@media (min-width: 1800px)': `32px`}},
  '5_6': {padding: {'@media (min-width: 2400px)': `32px`}},

  '6_0': {padding: `52px`},
  '6_1': {padding: {'@media (min-width: 360px)': `52px`}},
  '6_2': {padding: {'@media (min-width: 600px)': `52px`}},
  '6_3': {padding: {'@media (min-width: 900px)': `52px`}},
  '6_4': {padding: {'@media (min-width: 1200px)': `52px`}},
  '6_5': {padding: {'@media (min-width: 1800px)': `52px`}},
  '6_6': {padding: {'@media (min-width: 2400px)': `52px`}},

  '7_0': {padding: `84px`},
  '7_1': {padding: {'@media (min-width: 360px)': `84px`}},
  '7_2': {padding: {'@media (min-width: 600px)': `84px`}},
  '7_3': {padding: {'@media (min-width: 900px)': `84px`}},
  '7_4': {padding: {'@media (min-width: 1200px)': `84px`}},
  '7_5': {padding: {'@media (min-width: 1800px)': `84px`}},
  '7_6': {padding: {'@media (min-width: 2400px)': `84px`}},

  '8_0': {padding: `136px`},
  '8_1': {padding: {'@media (min-width: 360px)': `136px`}},
  '8_2': {padding: {'@media (min-width: 600px)': `136px`}},
  '8_3': {padding: {'@media (min-width: 900px)': `136px`}},
  '8_4': {padding: {'@media (min-width: 1200px)': `136px`}},
  '8_5': {padding: {'@media (min-width: 1800px)': `136px`}},
  '8_6': {padding: {'@media (min-width: 2400px)': `136px`}},

  '9_0': {padding: `220px`},
  '9_1': {padding: {'@media (min-width: 360px)': `220px`}},
  '9_2': {padding: {'@media (min-width: 600px)': `220px`}},
  '9_3': {padding: {'@media (min-width: 900px)': `220px`}},
  '9_4': {padding: {'@media (min-width: 1200px)': `220px`}},
  '9_5': {padding: {'@media (min-width: 1800px)': `220px`}},
  '9_6': {padding: {'@media (min-width: 2400px)': `220px`}},
})

export function paddingStyle(value: number | number[]): Style[] {
  return _getArrayProp(value).map((v, i) => {
    const _v = clamp(v, 0, 9) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    const _i = clamp(i, 0, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6

    return _[`${_v}_${_i}`]
  })
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(Math.min(value, max), min)
}
