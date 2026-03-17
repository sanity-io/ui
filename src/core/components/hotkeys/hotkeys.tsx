import {forwardRef} from 'react'
import {styled} from 'styled-components'

import {Inline, KBD} from '../../primitives'
import {_getArrayProp} from '../../styles'
import {Radius} from '../../types'

/**
 * @public
 */
export interface HotkeysProps {
  fontSize?: number | number[]
  gap?: number | number[]
  padding?: number | number[]
  radius?: Radius | Radius[]
  /**
   * @deprecated Use `gap` instead. `space` will be removed in v4.
   */
  space?: number | number[]
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
export const Hotkeys = forwardRef(function Hotkeys(
  props: HotkeysProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref' | 'size'>,
  ref: React.Ref<HTMLElement>,
) {
  const {fontSize, gap, keys, padding, radius, space: deprecated_space = 0.5, ...restProps} = props
  const spacing = _getArrayProp(gap === undefined ? deprecated_space : gap)

  if (!keys || keys.length === 0) {
    return <></>
  }

  return (
    <StyledHotkeys data-ui="Hotkeys" {...restProps} ref={ref}>
      <Inline as="span" gap={spacing}>
        {keys.map((key, i) => (
          <Key fontSize={fontSize} key={i} padding={padding} radius={radius}>
            {key}
          </Key>
        ))}
      </Inline>
    </StyledHotkeys>
  )
})
Hotkeys.displayName = 'ForwardRef(Hotkeys)'
