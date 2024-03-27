import {forwardRef} from 'react'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {Inline, KBD} from '../../primitives'
import {Radius} from '../../types'

/**
 * @public
 */
export interface HotkeysProps {
  fontSize?: number | number[]
  padding?: number | number[]
  radius?: Radius | Radius[]
  space?: number | number[]
  keys?: string[]
}

const Root = styled.kbd`
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
  const {fontSize, keys, padding, radius, space: spaceProp = 0.5, ...restProps} = props
  const space = useArrayProp(spaceProp)

  if (!keys || keys.length === 0) {
    return <></>
  }

  return (
    <Root data-ui="Hotkeys" {...restProps} ref={ref}>
      <Inline as="span" space={space}>
        {keys.map((key, i) => (
          <Key fontSize={fontSize} key={i} padding={padding} radius={radius}>
            {key}
          </Key>
        ))}
      </Inline>
    </Root>
  )
})
