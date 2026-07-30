import {styled} from 'styled-components'

import {Inline} from '../../primitives/inline/inline'
import {KBD} from '../../primitives/kbd/kbd'
import {_getArrayProp} from '../../styles/helpers'
import {Radius} from '../../types/radius'

/**
 * @public
 */
export interface HotkeysProps {
  fontSize?: number | number[]
  gap?: number | number[]
  padding?: number | number[]
  radius?: Radius | Radius[]
  /**
   * @deprecated Use `gap` instead.
   */
  space?: never
  keys?: string[]
}

const StyledHotkeys = styled.kbd`
  font: inherit;
  padding: 1px;

  &:not([hidden]) {
    display: block;
  }
`

const Key = styled(KBD)`
  &:not([hidden]) {
    display: block;
  }
`

/**
 * Represent hotkeys (a keyboard combination) with semantic `<kbd>` elements.
 *
 * @public
 */
export const Hotkeys = function Hotkeys(
  props: HotkeysProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'size'>,
) {
  const {fontSize, gap = 0.5, keys, padding, radius, ref, ...restProps} = props
  const spacing = _getArrayProp(gap)

  if (!keys || keys.length === 0) {
    return <></>
  }

  return (
    <StyledHotkeys data-ui="Hotkeys" {...restProps} ref={ref}>
      <Inline as="span" gap={spacing}>
        {keys.map((key, i) => (
          // oxlint-disable-next-line no-array-index-key
          <Key fontSize={fontSize} key={i} padding={padding} radius={radius}>
            {key}
          </Key>
        ))}
      </Inline>
    </StyledHotkeys>
  )
}
