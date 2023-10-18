import {forwardRef} from 'react'
import styled from 'styled-components'
import {IS_APPLE_DEVICE} from '../../constants'
import {useArrayProp} from '../../hooks'
import {Inline, KBD} from '../../primitives'

/**
 * @public
 */
export interface HotkeysProps {
  fontSize?: number | number[]
  padding?: number | number[]
  radius?: number | number[]
  space?: number | number[]
  keys?: string[]
}

const Root = styled.kbd`
  &:not([hidden]) {
    display: block;
  }
  font: inherit;
`

const Key = styled(KBD)`
  &:not([hidden]) {
    display: block;
  }
`

/**
 * @public
 */
export const Hotkeys = forwardRef(function Hotkeys(
  props: HotkeysProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'ref' | 'size'>,
  ref: React.Ref<HTMLElement>,
) {
  const {fontSize, keys, padding, radius, space: spaceProp = 1, ...restProps} = props
  const space = useArrayProp(spaceProp)

  if (!keys || keys.length === 0) {
    return <></>
  }

  return (
    <Root data-ui="Hotkeys" {...restProps} ref={ref}>
      <Inline as="span" space={space}>
        {keys.map((key, i) => (
          <Key fontSize={fontSize} key={i} padding={padding} radius={radius}>
            {platformifyKey(key)}
          </Key>
        ))}
      </Inline>
    </Root>
  )
})

/**
 * Given key 'Alt', or 'Option' (case-insensitive), return the platform-appropriate key name
 * (eg 'Alt' on non-Apple devices, 'Option' on Apple devices).
 *
 * @param key - Key to platformify
 * @returns Platform-appropriate key name
 * @internal
 */
function platformifyKey(key: string): string {
  const lowerKey = key.toLowerCase()

  if (lowerKey === 'alt' && IS_APPLE_DEVICE) {
    return matchCase(key, 'option')
  }

  if (lowerKey === 'option' && !IS_APPLE_DEVICE) {
    return matchCase(key, 'alt')
  }

  return key
}

/**
 * Apply the case (lowercase/uppercase) of `original` to `target`, character by character,
 * eg matching ALL CAPS, all lowercase or Mixed Case.
 *
 * @param original - The original string to match case of
 * @param target - The target string to apply case to
 * @returns Target string with case applied from original
 * @internal
 */
function matchCase(original: string, target: string): string {
  const orgLength = original.length

  return target.replace(/./g, (char, i) => {
    // Replace character by character matching case of original
    // If running out of original, just return the target case as-is
    return i < orgLength && original[i] === original[i].toUpperCase() ? char.toUpperCase() : char
  })
}
