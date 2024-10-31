import {avatarCounter, composeClassNames, ResponsiveProp} from '@sanity/ui/css'
import {AvatarSize} from '@sanity/ui/theme'
import {ForwardedRef, forwardRef, useMemo} from 'react'

import {useArrayProp} from '../../hooks'
import {Props} from '../../types'
import {Box, BoxProps} from '../box'
import {Label} from '../label'

/**
 * @public
 */
export interface AvatarCounterProps
  extends Omit<BoxProps, 'align' | 'className' | 'display' | 'justify' | 'paddingX' | 'sizing'> {
  count: number
  size?: ResponsiveProp<AvatarSize>
  /** @deprecated No longer supported. */
  tone?: 'navbar'
}

/**
 * @public
 */
export const AvatarCounter = forwardRef(function AvatarCounter(
  props: Props<AvatarCounterProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {className, count, size: sizeProp = 1, ...restProps} = props
  const size = useArrayProp(sizeProp)

  const fontSize = useMemo(
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
      {...restProps}
      align="center"
      className={composeClassNames(className, avatarCounter({size}))}
      display="flex"
      justify="center"
      paddingX={2}
      ref={ref}
      sizing="border"
    >
      <Label align="center" as="span" size={fontSize} weight="medium">
        {count}
      </Label>
    </Box>
  )
})

AvatarCounter.displayName = 'ForwardRef(AvatarCounter)'
