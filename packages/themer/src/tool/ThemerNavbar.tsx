import {ColorWheelIcon} from '@sanity/icons/ColorWheel'
import {type NavbarProps} from 'sanity'

import {useThemer} from './context'

/**
 * Adds the toggle that opens and closes the themer sidebar to the Studio
 * navbar.
 *
 * @internal
 */
export function ThemerNavbar(props: NavbarProps) {
  const {open, setOpen} = useThemer()

  return props.renderDefault({
    ...props,
    __internal_actions: [
      ...(props.__internal_actions ?? []),
      {
        icon: ColorWheelIcon,
        location: 'topbar',
        name: 'themer',
        onAction: () => setOpen(!open),
        selected: open,
        title: 'Themer',
      },
    ],
  })
}
