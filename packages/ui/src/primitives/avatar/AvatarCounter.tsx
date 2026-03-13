import {_getResponsiveProp, type ComponentType, type Props} from '@sanity/ui/core'
import {avatar_counter, type ResponsiveProp} from '@sanity/ui-css'
import {Box} from '@sanity/ui/primitives/box'
import {Label} from '@sanity/ui/primitives/label'
import type {AvatarSize, FontLabelSize} from '@sanity/ui-tokens'
import {useMemo} from 'react'

/** @public */
export const DEFAULT_AVATAR_COUNTER_ELEMENT = 'span'

/** @public */
export interface AvatarCounterOwnProps {
  count: number
  size?: ResponsiveProp<AvatarSize>
}

/** @public */
export type AvatarCounterElementType = 'button' | 'div' | 'span' | ComponentType

/** @public */
export type AvatarCounterProps<E extends AvatarCounterElementType = AvatarCounterElementType> =
  Props<AvatarCounterOwnProps, E>

/** @public */
export function AvatarCounter<
  E extends AvatarCounterElementType = typeof DEFAULT_AVATAR_COUNTER_ELEMENT,
>(props: AvatarCounterProps<E>): React.JSX.Element {
  const {
    as = DEFAULT_AVATAR_COUNTER_ELEMENT,
    className,
    count,
    size: sizeProp = 1,
    ...rest
  } = props as AvatarCounterProps<typeof DEFAULT_AVATAR_COUNTER_ELEMENT>
  const size = _getResponsiveProp(sizeProp)

  const labelSize = useMemo(
    () =>
      size.map((s) => {
        if (s === 1) return 1 satisfies FontLabelSize
        if (s === 2) return 3 satisfies FontLabelSize
        if (s === 3) return 5 satisfies FontLabelSize

        return 0 satisfies FontLabelSize
      }) as ResponsiveProp<FontLabelSize>,
    [size],
  )

  return (
    <Box
      data-ui="AvatarCounter"
      {...rest}
      alignItems="center"
      as={as}
      className={avatar_counter({className, size})}
      display="flex"
      flex="none"
      justifyContent="center"
      paddingX={2}
      sizing="border"
    >
      <Label align="center" as="span" size={labelSize} weight="medium">
        {count}
      </Label>
    </Box>
  )
}
