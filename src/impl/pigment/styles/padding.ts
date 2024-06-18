import {css} from '@pigment-css/react'
import {_getArrayProp} from '@sanity/ui'

const paddingStyles = [
  [
    css(({theme}) => ({padding: theme.space[0]})),
    css(({theme}) => ({'@media (min-width: 360px)': {padding: theme.space[0]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {padding: theme.space[0]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {padding: theme.space[0]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {padding: theme.space[0]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {padding: theme.space[0]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {padding: theme.space[0]}})),
  ],
  [
    css(({theme}) => ({padding: theme.space[1]})),
    css(({theme}) => ({'@media (min-width: 360px)': {padding: theme.space[1]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {padding: theme.space[1]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {padding: theme.space[1]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {padding: theme.space[1]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {padding: theme.space[1]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {padding: theme.space[1]}})),
  ],
  [
    css(({theme}) => ({padding: theme.space[2]})),
    css(({theme}) => ({'@media (min-width: 360px)': {padding: theme.space[2]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {padding: theme.space[2]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {padding: theme.space[2]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {padding: theme.space[2]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {padding: theme.space[2]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {padding: theme.space[2]}})),
  ],
  [
    css(({theme}) => ({padding: theme.space[3]})),
    css(({theme}) => ({'@media (min-width: 360px)': {padding: theme.space[3]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {padding: theme.space[3]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {padding: theme.space[3]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {padding: theme.space[3]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {padding: theme.space[3]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {padding: theme.space[3]}})),
  ],
  [
    css(({theme}) => ({padding: theme.space[4]})),
    css(({theme}) => ({'@media (min-width: 360px)': {padding: theme.space[4]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {padding: theme.space[4]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {padding: theme.space[4]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {padding: theme.space[4]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {padding: theme.space[4]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {padding: theme.space[4]}})),
  ],
  [
    css(({theme}) => ({padding: theme.space[5]})),
    css(({theme}) => ({'@media (min-width: 360px)': {padding: theme.space[5]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {padding: theme.space[5]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {padding: theme.space[5]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {padding: theme.space[5]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {padding: theme.space[5]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {padding: theme.space[5]}})),
  ],
  [
    css(({theme}) => ({padding: theme.space[6]})),
    css(({theme}) => ({'@media (min-width: 360px)': {padding: theme.space[6]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {padding: theme.space[6]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {padding: theme.space[6]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {padding: theme.space[6]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {padding: theme.space[6]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {padding: theme.space[6]}})),
  ],
  [
    css(({theme}) => ({padding: theme.space[7]})),
    css(({theme}) => ({'@media (min-width: 360px)': {padding: theme.space[7]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {padding: theme.space[7]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {padding: theme.space[7]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {padding: theme.space[7]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {padding: theme.space[7]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {padding: theme.space[7]}})),
  ],
  [
    css(({theme}) => ({padding: theme.space[8]})),
    css(({theme}) => ({'@media (min-width: 360px)': {padding: theme.space[8]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {padding: theme.space[8]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {padding: theme.space[8]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {padding: theme.space[8]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {padding: theme.space[8]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {padding: theme.space[8]}})),
  ],
  [
    css(({theme}) => ({padding: theme.space[9]})),
    css(({theme}) => ({'@media (min-width: 360px)': {padding: theme.space[9]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {padding: theme.space[9]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {padding: theme.space[9]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {padding: theme.space[9]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {padding: theme.space[9]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {padding: theme.space[9]}})),
  ],
]

export function paddingStyle(value: number | number[]): string[] {
  return [..._getArrayProp(value).map((v, i) => paddingStyles[v][i])]
}
