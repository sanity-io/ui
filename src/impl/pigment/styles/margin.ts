import {css} from '@pigment-css/react'
import {_getArrayProp} from '@sanity/ui'

const marginStyles = [
  [
    css(({theme}) => ({margin: theme.space[0]})),
    css(({theme}) => ({'@media (min-width: 360px)': {margin: theme.space[0]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {margin: theme.space[0]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {margin: theme.space[0]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {margin: theme.space[0]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {margin: theme.space[0]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {margin: theme.space[0]}})),
  ],
  [
    css(({theme}) => ({margin: theme.space[1]})),
    css(({theme}) => ({'@media (min-width: 360px)': {margin: theme.space[1]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {margin: theme.space[1]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {margin: theme.space[1]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {margin: theme.space[1]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {margin: theme.space[1]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {margin: theme.space[1]}})),
  ],
  [
    css(({theme}) => ({margin: theme.space[2]})),
    css(({theme}) => ({'@media (min-width: 360px)': {margin: theme.space[2]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {margin: theme.space[2]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {margin: theme.space[2]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {margin: theme.space[2]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {margin: theme.space[2]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {margin: theme.space[2]}})),
  ],
  [
    css(({theme}) => ({margin: theme.space[3]})),
    css(({theme}) => ({'@media (min-width: 360px)': {margin: theme.space[3]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {margin: theme.space[3]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {margin: theme.space[3]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {margin: theme.space[3]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {margin: theme.space[3]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {margin: theme.space[3]}})),
  ],
  [
    css(({theme}) => ({margin: theme.space[4]})),
    css(({theme}) => ({'@media (min-width: 360px)': {margin: theme.space[4]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {margin: theme.space[4]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {margin: theme.space[4]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {margin: theme.space[4]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {margin: theme.space[4]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {margin: theme.space[4]}})),
  ],
  [
    css(({theme}) => ({margin: theme.space[5]})),
    css(({theme}) => ({'@media (min-width: 360px)': {margin: theme.space[5]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {margin: theme.space[5]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {margin: theme.space[5]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {margin: theme.space[5]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {margin: theme.space[5]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {margin: theme.space[5]}})),
  ],
  [
    css(({theme}) => ({margin: theme.space[6]})),
    css(({theme}) => ({'@media (min-width: 360px)': {margin: theme.space[6]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {margin: theme.space[6]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {margin: theme.space[6]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {margin: theme.space[6]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {margin: theme.space[6]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {margin: theme.space[6]}})),
  ],
  [
    css(({theme}) => ({margin: theme.space[7]})),
    css(({theme}) => ({'@media (min-width: 360px)': {margin: theme.space[7]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {margin: theme.space[7]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {margin: theme.space[7]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {margin: theme.space[7]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {margin: theme.space[7]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {margin: theme.space[7]}})),
  ],
  [
    css(({theme}) => ({margin: theme.space[8]})),
    css(({theme}) => ({'@media (min-width: 360px)': {margin: theme.space[8]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {margin: theme.space[8]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {margin: theme.space[8]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {margin: theme.space[8]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {margin: theme.space[8]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {margin: theme.space[8]}})),
  ],
  [
    css(({theme}) => ({margin: theme.space[9]})),
    css(({theme}) => ({'@media (min-width: 360px)': {margin: theme.space[9]}})),
    css(({theme}) => ({'@media (min-width: 600px)': {margin: theme.space[9]}})),
    css(({theme}) => ({'@media (min-width: 900px)': {margin: theme.space[9]}})),
    css(({theme}) => ({'@media (min-width: 1200px)': {margin: theme.space[9]}})),
    css(({theme}) => ({'@media (min-width: 1800px)': {margin: theme.space[9]}})),
    css(({theme}) => ({'@media (min-width: 2400px)': {margin: theme.space[9]}})),
  ],
]

export function marginStyle(value: number | number[]): string[] {
  return [..._getArrayProp(value).map((v, i) => marginStyles[v][i])]
}
