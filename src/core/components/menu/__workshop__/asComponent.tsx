import {Button, Flex, Menu, MenuButton, MenuItem, Text} from '@sanity/ui'
import {forwardRef} from 'react'

const CustomLink = forwardRef(function CustomLink(
  props: {req: string} & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'href'>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
): React.JSX.Element {
  const {children, req, ...restProps} = props

  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a data-required={req} {...restProps} href="#" ref={ref}>
      {children}
    </a>
  )
})

export default function AsComponentStory() {
  const props = {href: '#'}

  return (
    <Flex align="center" height="fill" justify="center">
      <MenuButton
        button={<Button text="Menu with components" />}
        id="test"
        menu={
          <Menu>
            <MenuItem as={CustomLink} data-as="a" {...props} padding={3}>
              <Text>Component 1</Text>
            </MenuItem>
            <MenuItem as={CustomLink} data-as="a" {...props} padding={3}>
              <Text>Component 2</Text>
            </MenuItem>
            <MenuItem as={CustomLink} data-as="a" {...props} padding={3}>
              <Text>Component 3</Text>
            </MenuItem>
            <MenuItem as={CustomLink} data-as="a" {...props} padding={3}>
              <Text>Component 3</Text>
            </MenuItem>
          </Menu>
        }
      />
    </Flex>
  )
}
