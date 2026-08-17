import {ColorWheelIcon} from '@sanity/icons/ColorWheel'
import {Button, Text} from '@sanity/ui'
import {Tooltip} from '@sanity/ui/tooltip'
import {type NavbarProps} from 'sanity'

import {useThemer} from './context'

function ThemerNavbarButton() {
  const {open, setOpen} = useThemer()

  return (
    <Tooltip content={<Text size={1}>Themer</Text>} portal>
      <Button
        aria-label="Themer"
        icon={ColorWheelIcon}
        mode="bleed"
        onClick={() => setOpen(!open)}
        // The Studio's own navbar buttons go through a wrapper that pins them
        // to this padding, where `@sanity/ui` defaults to a roomier 3
        padding={2}
        selected={open}
      />
    </Tooltip>
  )
}

/**
 * Adds the toggle that opens and closes the themer sidebar to the Studio
 * navbar — an icon button with a tooltip in the top bar (like the Tasks
 * toggle), and a regular titled action in the narrow-screen sidebar menu.
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
        location: 'topbar',
        name: 'themer-topbar',
        render: () => <ThemerNavbarButton />,
      },
      {
        icon: ColorWheelIcon,
        location: 'sidebar',
        name: 'themer-sidebar',
        onAction: () => setOpen(!open),
        selected: open,
        title: 'Themer',
      },
    ],
  })
}
