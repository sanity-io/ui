import {forwardRef} from 'react'
import styled from 'styled-components'
import {DEFAULT_POPOVER_ARROW_HEIGHT, DEFAULT_POPOVER_ARROW_WIDTH} from './constants'

const Root = styled.div`
  position: absolute;
  pointer-events: none;
  width: ${DEFAULT_POPOVER_ARROW_WIDTH}px;
  height: ${DEFAULT_POPOVER_ARROW_WIDTH}px;
  fill: none;

  :empty + & {
    display: none;
  }

  & > svg {
    display: block;
    transform-origin: ${DEFAULT_POPOVER_ARROW_WIDTH / 2}px ${DEFAULT_POPOVER_ARROW_WIDTH / 2}px;
  }

  [data-placement^='top'] > & {
    bottom: -${DEFAULT_POPOVER_ARROW_WIDTH}px;
  }

  [data-placement^='right'] > & {
    left: -${DEFAULT_POPOVER_ARROW_WIDTH}px;

    & > svg {
      transform: rotate(90deg);
    }
  }

  [data-placement^='left'] > & {
    right: -${DEFAULT_POPOVER_ARROW_WIDTH}px;

    & > svg {
      transform: rotate(-90deg);
    }
  }

  [data-placement^='bottom'] > & {
    top: -${DEFAULT_POPOVER_ARROW_WIDTH}px;

    & > svg {
      transform: rotate(180deg);
    }
  }
`

const BorderPath = styled.path`
  fill: var(--card-shadow-outline-color);
`

const ShapePath = styled.path`
  fill: var(--card-bg-color);
`

export const PopoverArrow = forwardRef(function PopoverArrow(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as'>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <Root data-ui="Popover__arrow" {...props} ref={ref}>
      <svg
        width={DEFAULT_POPOVER_ARROW_WIDTH}
        height={DEFAULT_POPOVER_ARROW_HEIGHT}
        viewBox="0 0 27 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <BorderPath d="M1.18708 1C3.29803 1.0011 5.29585 1.95479 6.62414 3.59561L11.1683 9.20895C12.369 10.6922 14.631 10.6922 15.8317 9.20894L20.3759 3.59561C21.7042 1.95478 23.702 1.0011 25.8129 1H21.9436C21.0533 1.49255 20.2545 2.15618 19.5986 2.96641L15.0545 8.57975C14.254 9.56855 12.746 9.56855 11.9455 8.57975L7.40139 2.96642C6.74548 2.15618 5.94673 1.49255 5.05643 1H1.18708Z" />
        <ShapePath d="M1.18342 0C3.59749 0 5.88246 1.0901 7.40138 2.96642L11.9455 8.57975C12.746 9.56855 14.254 9.56855 15.0545 8.57975L19.5986 2.96641C21.1175 1.0901 23.4025 0 25.8166 0H27H0H1.18342Z" />
      </svg>
    </Root>
  )
})
