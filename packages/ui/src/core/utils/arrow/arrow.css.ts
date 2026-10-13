import {css} from '#styled-system/css'

const arrowSize = 'var(--arrow-size)'

export const arrow = css({
  'position': 'absolute',
  'width': arrowSize,
  'height': arrowSize,
  ':empty + &': {display: 'none'},
  "[data-placement^='top'] > &": {
    'bottom': `calc(-1 * ${arrowSize})`,
    '& > svg': {transform: 'rotate(0)'},
  },
  "[data-placement^='right'] > &": {
    'left': `calc(-1 * ${arrowSize})`,
    '& > svg': {transform: 'rotate(90deg)'},
  },
  "[data-placement^='left'] > &": {
    'right': `calc(-1 * ${arrowSize})`,
    '& > svg': {transform: 'rotate(-90deg)'},
  },
  "[data-placement^='bottom'] > &": {
    'top': `calc(-1 * ${arrowSize})`,
    '& > svg': {transform: 'rotate(180deg)'},
  },
  '& > svg': {
    display: 'block',
    lineHeight: 0,
    transformOrigin: `calc(${arrowSize} / 2) calc(${arrowSize} / 2)`,
  },
})

export const arrowStroke = css({
  stroke: 'var(--card-shadow-outline-color)',
})

export const arrowShape = css({
  fill: 'var(--card-bg-color)',
})
