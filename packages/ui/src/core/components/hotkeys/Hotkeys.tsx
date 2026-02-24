import {
  hotkeys,
  HOTKEYS_STYLE_PROP_KEYS,
  type HotkeysStyleProps,
  type ResponsiveProp,
} from '@sanity/ui/css'
import type {FontTextSize} from '@sanity/ui-tokens/system'

import {_splitKeys} from '../../_keys'
import {KBD} from '../../primitives/kbd/Kbd'
import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_HOTKEYS_ELEMENT = 'kbd'

/** @public */
export interface HotkeysOwnProps extends HotkeysStyleProps {
  /** @deprecated - no longer supported */
  fontSize?: ResponsiveProp<FontTextSize>
  keys: string[]
}

/** @public */
export type HotkeysElementType = 'kbd' | ComponentType

/** @public */
export type HotkeysProps<E extends HotkeysElementType = HotkeysElementType> = Props<
  HotkeysOwnProps,
  E
>

/**
 * Represent hotkeys (a keyboard combination) with semantic `<kbd>` elements.
 *
 * @example
 * ```tsx
 * import {Hotkeys} from '@sanity/ui'
 *
 * <Hotkeys keys={['⌘', 'K']} />
 * ```
 *
 * @public
 */
export function Hotkeys<E extends HotkeysElementType = typeof DEFAULT_HOTKEYS_ELEMENT>(
  props: HotkeysProps<E>,
): React.JSX.Element | undefined {
  const [
    styleProps,
    {
      as: Element = DEFAULT_HOTKEYS_ELEMENT,
      fontSize: _fontSize,
      keys,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as HotkeysProps<typeof DEFAULT_HOTKEYS_ELEMENT>, HOTKEYS_STYLE_PROP_KEYS)

  if (!keys || keys.length === 0) {
    return undefined
  }

  return (
    <Element data-ui="Hotkeys" {...domProps} className={hotkeys(styleProps)}>
      {keys.map((key, i) => (
        <KBD key={i}>{key}</KBD>
      ))}
    </Element>
  )
}
