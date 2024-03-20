import {ForwardedRef, HTMLProps, ReactElement, forwardRef} from 'react'
import {styled, css} from 'styled-components'
import {useTheme_v2} from '../../theme'
import {Point, compileCommands, getRoundedCommands} from './cmds'

const Root = styled.div<{$w: number}>(
  ({$w: w}) => css`
    position: absolute;
    width: ${w}px;
    height: ${w}px;

    :empty + & {
      display: none;
    }

    & > svg {
      display: block;
      line-height: 0;
      transform-origin: ${w / 2}px ${w / 2}px;
    }

    [data-placement^='top'] > & {
      bottom: -${w}px;

      & > svg {
        transform: rotate(0);
      }
    }

    [data-placement^='right'] > & {
      left: -${w}px;

      & > svg {
        transform: rotate(90deg);
      }
    }

    [data-placement^='left'] > & {
      right: -${w}px;

      & > svg {
        transform: rotate(-90deg);
      }
    }

    [data-placement^='bottom'] > & {
      top: -${w}px;

      & > svg {
        transform: rotate(180deg);
      }
    }
  `,
)

const StrokePath = styled.path`
  stroke: var(--card-shadow-outline-color);
`

const ShapePath = styled.path`
  fill: var(--card-bg-color);
`

/** @internal */
export const Arrow = forwardRef(function Arrow(
  props: {width: number; height: number; radius?: number} & Omit<
    HTMLProps<HTMLDivElement>,
    'width' | 'height'
  >,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement {
  const {width: w, height: h, radius = 0, ...restProps} = props
  const {card} = useTheme_v2()
  const strokeWidth = card.shadow.outline

  const center = w / 2

  const points: Point[] = [
    {
      x: 0,
      y: 0,
    },
    {
      x: radius,
      y: 0,
      radius,
    },
    {
      x: center,
      y: h - 1,
      radius,
    },
    {
      x: w - radius,
      y: 0,
      radius,
    },
    {
      x: w,
      y: 0,
    },
  ]

  const cmds = getRoundedCommands(points)
  const path = compileCommands(cmds)

  const strokePath = `${path}`
  const fillPath = `${path} M ${w} -1 M 0 -1 Z`

  return (
    <Root {...restProps} $w={w} ref={ref}>
      <svg width={w} height={w} viewBox={`0 0 ${w} ${w}`}>
        <mask id="stroke-mask">
          <rect x={0} y={strokeWidth} width={w} height={w} fill="white" />
        </mask>
        <StrokePath d={strokePath} mask="url(#stroke-mask)" strokeWidth={strokeWidth * 2} />
        <ShapePath d={fillPath} />
      </svg>
    </Root>
  )
})
