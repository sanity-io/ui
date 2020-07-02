import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {CardTone} from '../card'

const Root = styled.div<{tone: CardTone}>`
  position: absolute;
  pointer-events: none;
  width: 27px;
  height: 12px;
  transform-origin: 0 0;
  & > svg {
    display: block;
    color: ${(props) => {
      const {tone, theme} = props
      return theme.color.card.tones[tone].bg
    }};
  }

  &[data-placement='top'] {
    transform-origin: left bottom;
    bottom: 1px;
    left: 50%;
    transform: rotate(180deg) translate(-50%);
  }

  &[data-placement='top-end'] {
    transform-origin: left bottom;
    bottom: 1px;
    left: calc(100% - 4px);
    transform: rotate(180deg);
  }

  &[data-placement='top-start'] {
    transform-origin: left bottom;
    bottom: 1px;
    left: 1px;
    transform: rotate(180deg) translateX(-100%);
  }

  &[data-placement='right'] {
    transform-origin: left bottom;
    transform: rotate(-90deg) translateX(-50%);
    bottom: 50%;
    left: 1px;
  }

  &[data-placement='right-end'] {
    transform-origin: left bottom;
    transform: rotate(-90deg);
    bottom: 1px;
    left: 1px;
  }

  &[data-placement='right-start'] {
    transform-origin: left bottom;
    transform: rotate(-90deg) translateX(-100%);
    bottom: calc(100% - 1px);
    left: 1px;
  }

  &[data-placement='left'] {
    transform-origin: right bottom;
    right: 1px;
    transform: rotate(90deg);
    top: calc(50% + 2px);
  }
  &[data-placement='left-start'] {
    transform-origin: right bottom;
    right: 1px;
    transform: rotate(90deg) translateX(50%);
    top: 2px;
  }

  &[data-placement='left-end'] {
    transform-origin: right bottom;
    right: 1px;
    transform: rotate(90deg) translateX(-50%);
    top: calc(100% + 1px);
  }

  &[data-placement='bottom'] {
    top: -11px;
    left: calc(50% + 1px);
    transform: translateX(-50%);
  }

  &[data-placement='bottom-end'] {
    top: -11px;
    left: calc(100% - 4px);
    transform: translateX(-100%);
  }

  &[data-placement='bottom-start'] {
    top: -11px;
    left: 4px;
  }
`

const ArrowBorderGroup = styled.g`
  & > path {
    fill: var(--card-shadow-outline-color);
  }
`

export const PopoverArrow = forwardRef(
  (
    props: React.HTMLProps<SVGGElement> & {
      as?: React.ElementType | keyof JSX.IntrinsicElements
      tone?: string
    },
    ref
  ) => {
    return (
      <Root {...props} ref={ref}>
        <svg
          width="27"
          height="11"
          viewBox="0 0 27 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ArrowBorderGroup>
            <path d="M1.18359 10.0001C3.2959 10.0001 5.29525 9.04623 6.62431 7.40445L11.1684 1.79112C12.3691 0.307911 14.6312 0.307907 15.8319 1.79112L20.376 7.40445C21.7051 9.04622 23.7044 10.0001 25.8167 10.0001H21.9437C21.0534 9.50751 20.2547 8.84388 19.5988 8.03364L15.0547 2.42031C14.2542 1.43151 12.7461 1.43151 11.9457 2.42032L7.40155 8.03365C6.74565 8.84388 5.9469 9.50751 5.05659 10.0001H1.18359Z" />
          </ArrowBorderGroup>
          <path
            d="M19.5986 8.03365L15.0545 2.42031C14.254 1.43151 12.746 1.43151 11.9455 2.42031L7.40138 8.03365C5.88246 9.90996 3.59749 11.0001 1.18342 11.0001H0H27H25.8166C23.4025 11.0001 21.1175 9.90996 19.5986 8.03365Z"
            fill="currentColor"
          />
        </svg>
      </Root>
    )
  }
)

PopoverArrow.displayName = 'PopoverArrow'
