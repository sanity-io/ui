import {avatarCounter, type ResponsiveProp} from '@sanity/ui/css'
import type {AvatarSize, FontLabelSize} from '@sanity/ui/theme'
import {useMemo} from 'react'

import {useResponsiveProp} from '../../hooks/useResponsiveProp'
import type {ComponentType, Props} from '../../types'
import {Box} from '../box/box'
import {Label} from '../label/label'

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
  const size = useResponsiveProp(sizeProp)

  const labelSize = useMemo(
    () =>
      Object.values(size).map((s) => {
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
      className={avatarCounter({className, size})}
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
