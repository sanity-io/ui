import {Box, BoxProps, Heading} from '@sanity/ui'
import {forwardRef} from 'react'

const headingProps = {
  1: {
    box: undefined,
    heading: {size: [2, 2, 3, 4]},
  },
  2: {
    box: {
      marginTop: [5, 5, 6],
      marginBottom: [4, 4, 5],
    },
    heading: {size: [1, 1, 2, 3]},
  },
  3: {
    box: {
      marginTop: [5, 5, 6],
      marginBottom: [4, 4, 5],
    },
    heading: {size: [0, 0, 1, 2]},
  },
  4: {
    box: {
      marginTop: [5, 5, 6],
      marginBottom: [4, 4, 5],
    },
    heading: {size: [0, 0, 0, 1]},
  },
  5: {
    box: {
      marginTop: [5, 5, 6],
      marginBottom: [4, 4, 5],
    },
    heading: {size: [0]},
  },
  6: {
    box: {
      marginTop: [5, 5, 6],
      marginBottom: [4, 4, 5],
    },
    heading: {size: [0]},
  },
}

interface HProps extends Omit<BoxProps, 'as'> {
  children?: React.ReactNode
  level: number
}

export const H = forwardRef(function H(
  props: HProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'ref'>,
  ref: React.Ref<HTMLDivElement>
) {
  // eslint-disable-next-line react/prop-types
  const {children, level: levelProp, ...restProps} = props
  const level = Math.min(Math.max(levelProp, 1), 6)
  const p = headingProps[level as 1 | 2 | 3 | 4 | 5 | 6]

  const node = (
    <Box {...(p.box || {})} {...restProps} ref={ref}>
      <Heading as={`h${level}` as any} {...p.heading}>
        {children}
      </Heading>
    </Box>
  )

  return node
})
