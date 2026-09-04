import {clsx} from 'clsx/lite'
import {styled} from 'styled-components'

import {Inline} from '../../primitives/inline/inline'
import {KBD} from '../../primitives/kbd/kbd'
import {_getArrayProp} from '../../styles/helpers'
import {Radius} from '../../types/radius'

import {hotkeys} from './hotkeys.css'

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

// Stays on styled-components: `display: block` has to beat KBD's runtime
// `display: inline-block` at the same specificity, which only holds while both
// rules live in the runtime stylesheet.
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
export function Hotkeys(props: HotkeysProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'size'>) {
  const {className, fontSize, gap = 0.5, keys, padding, radius, ref, ...restProps} = props
  const spacing = _getArrayProp(gap)

  if (!keys || keys.length === 0) {
    return <></>
  }

  return (
    <kbd className={clsx(hotkeys, className)} data-ui="Hotkeys" {...restProps} ref={ref}>
      <Inline as="span" gap={spacing}>
        {keys.map((key, i) => (
          // oxlint-disable-next-line no-array-index-key
          <Key key={i} fontSize={fontSize} padding={padding} radius={radius}>
            {key}
          </Key>
        ))}
      </Inline>
    </kbd>
  )
}
