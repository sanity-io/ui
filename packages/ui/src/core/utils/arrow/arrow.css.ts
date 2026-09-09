import {createVar, globalStyle, style} from '@vanilla-extract/css'

export const arrowSize = createVar()

export const arrow = style({
  position: 'absolute',
  width: arrowSize,
  height: arrowSize,
  selectors: {
    ':empty + &': {display: 'none'},
    "[data-placement^='top'] > &": {bottom: `calc(-1 * ${arrowSize})`},
    "[data-placement^='right'] > &": {left: `calc(-1 * ${arrowSize})`},
    "[data-placement^='left'] > &": {right: `calc(-1 * ${arrowSize})`},
    "[data-placement^='bottom'] > &": {top: `calc(-1 * ${arrowSize})`},
  },
})

globalStyle(`${arrow} > svg`, {
  display: 'block',
  lineHeight: 0,
  transformOrigin: `calc(${arrowSize} / 2) calc(${arrowSize} / 2)`,
})

globalStyle(`[data-placement^='top'] > ${arrow} > svg`, {transform: 'rotate(0)'})
globalStyle(`[data-placement^='right'] > ${arrow} > svg`, {transform: 'rotate(90deg)'})
globalStyle(`[data-placement^='left'] > ${arrow} > svg`, {transform: 'rotate(-90deg)'})
globalStyle(`[data-placement^='bottom'] > ${arrow} > svg`, {transform: 'rotate(180deg)'})

export const arrowStroke = style({
  stroke: 'var(--card-shadow-outline-color)',
})

export const arrowShape = style({
  fill: 'var(--card-bg-color)',
})
