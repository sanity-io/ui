import {badge, composeClassNames, RadiusStyleProps} from '@sanity/ui/css'
import {ForwardedRef, forwardRef} from 'react'

import {BadgeMode, BadgeTone, Props} from '../../types'
import {Box, BoxProps} from '../box'
import {Text, TextProps} from '../text'

/**
 * @public
 */
export interface BadgeProps extends BoxProps, RadiusStyleProps {
  fontSize?: number | number[]
  /** @deprecated No longer used. */
  mode?: BadgeMode
  textAlign?: TextProps['align']
  tone?: BadgeTone
}

/**
 * Badges are used to tag resources.
 *
 * @public
 */
export const Badge = forwardRef(function Badge(
  props: Props<BadgeProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {
    children,
    className,
    display = 'inline-block',
    fontSize = 1,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mode: _deprecated_mode,
    padding = 1,
    radius = 2,
    textAlign,
    tone = 'default',
    ...restProps
  } = props

  return (
    <Box
      data-ui="Badge"
      {...restProps}
      className={composeClassNames(
        className,
        badge({
          radius,
          tone,
        }),
      )}
      display={display}
      padding={padding}
      ref={ref}
    >
      <Text align={textAlign} size={fontSize}>
        {children}
      </Text>
    </Box>
  )
})

Badge.displayName = 'ForwardRef(Badge)'
