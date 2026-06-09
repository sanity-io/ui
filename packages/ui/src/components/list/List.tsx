import classNames from 'classnames'
import type {ComponentProps, ComponentPropsWithRef, ElementType} from 'react'

import type {ListTag} from '../../types/List'
import {getProps} from '../../utils/getProps'
import {Flex} from '../flex/Flex'
import {Text} from '../text/Text'
import {
  type ListItemProps,
  listItemProps,
  type ListItemTextProps,
  listItemTextProps,
  type ListProps,
} from './list.props'

function ListRoot<T extends ListTag = 'ul'>(
  props: ListProps<T> & Omit<ComponentPropsWithRef<T>, keyof ListProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, {})
  const Component = as || 'ul'

  return (
    <Component className={classNames('sui-List', className)} style={style} data-ui="List" {...rest}>
      {children}
    </Component>
  )
}

function ListItem({density = 'regular', ...props}: ListItemProps) {
  const {children, className, style, trailing, ...rest} = getProps(
    {density, ...props},
    listItemProps,
  )

  return (
    <Flex
      as="li"
      className={classNames('sui-ListItem', className)}
      style={style}
      data-ui="ListItem"
      alignItems="center"
      {...rest}
    >
      <Flex flexGrow={1} gap="inherit">
        {children}
      </Flex>

      {trailing}
    </Flex>
  )
}

function ListItemText<T extends ElementType = 'div'>(
  props: ListItemTextProps<T> & Omit<ComponentPropsWithRef<T>, keyof ListItemTextProps<T>>,
) {
  const {as, className, style, title, subtitle, ...rest} = getProps(props, listItemTextProps)
  const Component = as || 'div'

  return (
    <Flex
      as={Component}
      className={classNames('sui-ListItemText', className)}
      style={style}
      data-ui="ListItemText"
      flexDirection="column"
      justifyContent="center"
      gap={2}
      flexGrow={1}
      {...rest}
    >
      {title && (
        <Text size={1} weight="medium" trim lineClamp={1}>
          {title}
        </Text>
      )}

      {subtitle && (
        <Text size={1} muted trim lineClamp={1}>
          {subtitle}
        </Text>
      )}
    </Flex>
  )
}

function ListItemImage(props: ComponentProps<'img'>) {
  const {className, style, ...rest} = getProps(props, {})

  return (
    <img
      className={classNames('sui-ListItemImage sui-radius2', className)}
      style={style}
      data-ui="ListItemImage"
      {...rest}
    />
  )
}

ListRoot.displayName = 'List'

/** @beta */
export const List = ListRoot

ListRoot.Item = ListItem
ListRoot.ItemText = ListItemText
ListRoot.ItemImage = ListItemImage
