import {_composeClassNames, avatarCounter, type ResponsiveProp} from '@sanity/ui/css'
import type {AvatarSize, FontLabelSize} from '@sanity/ui/theme'
import {useMemo} from 'react'

import {useArrayProp} from '../../hooks'
import type {ComponentType, Props} from '../../types'
import {Box} from '../box'
import {Label} from '../label'

/** @public */
export const DEFAULT_AVATAR_COUNTER_ELEMENT = 'div'

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
>(props: AvatarCounterProps<E>) {
  const {
    as = DEFAULT_AVATAR_COUNTER_ELEMENT,
    className,
    count,
    size: sizeProp = 1,
    ...rest
  } = props as AvatarCounterProps<typeof DEFAULT_AVATAR_COUNTER_ELEMENT>
  const size = useArrayProp(sizeProp)

  const labelSize: FontLabelSize[] = useMemo(
    () =>
      size.map((s) => {
        if (s === 1) return 1
        if (s === 2) return 3
        if (s === 3) return 5

        return 0
      }),
    [size],
  )

  return (
    <Box
      data-ui="AvatarCounter"
      {...rest}
      align="center"
      as={as}
      className={_composeClassNames(className, avatarCounter({size}))}
      display="flex"
      justify="center"
      paddingX={2}
      sizing="border"
    >
      <Label align="center" as="span" size={labelSize} weight="medium">
        {count}
      </Label>
    </Box>
  )
}

AvatarCounter.displayName = 'AvatarCounter'
