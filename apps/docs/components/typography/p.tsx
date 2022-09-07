import {Box, Text} from '@sanity/ui'
import {forwardRef} from 'react'

export const P = forwardRef(function P(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...restProps} = props

  return (
    <Box {...restProps} marginY={[4, 4, 5]} ref={ref}>
      <Text as="p" muted size={[2, 2, 3]}>
        {children}
      </Text>
    </Box>
  )
})
