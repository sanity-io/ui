import {BoxProps} from '@sanity/ui'
import stylex from '@stylexjs/stylex'
import {CSSProperties, HTMLProps, ReactElement} from 'react'
import {paddingStyle} from '../../styles/padding'

const styles = stylex.create({
  root: {
    ':is(ul)': {
      listStyle: 'none',
    },
    ':is(ol)': {
      listStyle: 'none',
    },
  },

  flexItem: {
    minWidth: 0,
    minHeight: 0,
  },
})

function extendProps(
  xprops: ReturnType<typeof stylex.props>,
  props: {className?: string; style?: CSSProperties},
) {
  return {
    className: [props.className, xprops.className].filter(Boolean).join(' '),
    style: props.style ? {...xprops.style, ...props.style} : xprops.style,
  }
}

export function Box(
  props: BoxProps & Omit<HTMLProps<HTMLDivElement>, 'height' | 'ref'>,
): ReactElement {
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
    style,
    ...rest
  } = props

  return (
    <As
      data-as={typeof As === 'string' ? As : undefined}
      data-ui="Box"
      {...extendProps(stylex.props(styles.root, styles.flexItem, ...paddingStyle(padding)), {
        className,
        style,
      })}
      {...rest}
    />
  )
}
