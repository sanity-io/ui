import {BoxProps} from '@sanity/ui'
import {HTMLProps, ReactElement} from 'react'
import {compose} from '../../lib/compose'
import {box} from './className'

export function Box(props: BoxProps & HTMLProps<HTMLDivElement>): ReactElement {
  const {
    as: As = 'div',
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
    // style,
    ...rest
  } = props

  return (
    <As
      className={compose(
        className,
        box({
          column,
          columnEnd,
          columnStart,
          display,
          flex,
          height,
          margin,
          marginBottom,
          marginLeft,
          marginRight,
          marginTop,
          marginX,
          marginY,
          overflow,
          padding,
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
        }),
      )}
      data-as={typeof As === 'string' ? As : undefined}
      data-ui="Box"
      {...rest}
    />
  )
}
