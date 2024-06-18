import {styled} from '@pigment-css/react'
import {BoxProps} from '@sanity/ui'

import {HTMLProps, ReactElement} from 'react'
import {compose} from '../../lib/compose'
import {flexStyle} from '../../styles/flex'
import {marginStyle} from '../../styles/margin'
import {paddingStyle} from '../../styles/padding'

const baseBoxStyles = {
  '&[data-as="ul"],&[data-as="ol"]': {
    listStyle: 'none',
  },
}

const baseFlexItemStyles = {
  minWidth: 0,
  minHeight: 0,
}

const Root = styled('div')(baseBoxStyles, baseFlexItemStyles)

export function Box(props: BoxProps & Omit<HTMLProps<HTMLDivElement>, 'ref'>): ReactElement {
  const {
    as = 'div',
    className,
    column,
    columnEnd,
    columnStart,
    display = 'block',
    flex,
    forwardedAs,
    height,
    margin = 0,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    marginX,
    marginY,
    overflow,
    padding = 0,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingX,
    paddingY,
    row,
    rowEnd,
    rowStart,
    sizing,
    ...rest
  } = props

  return (
    <Root
      as={as}
      className={compose(className, [
        ...flexStyle(flex ?? []),
        ...marginStyle(margin),
        ...paddingStyle(padding),
      ])}
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Box"
      {...rest}
    />
  )
}
