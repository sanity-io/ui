import {DropIcon} from '@sanity/icons/Drop'
import {Button, Text} from '@sanity/ui'
import {Tooltip} from '@sanity/ui/tooltip'
import {type NavbarProps} from 'sanity'

import {useThemer} from './context'

/** The name the tool goes by in the Studio UI */
export const TOOL_TITLE = 'Themer (Legacy)'

function ThemerNavbarButton() {
  const {open, setOpen} = useThemer()

  return (
    <Tooltip content={<Text size={1}>{TOOL_TITLE}</Text>} portal>
      <Button
        aria-label={TOOL_TITLE}
        icon={DropIcon}
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
 * In the split preview every Studio copy renders its own navbar, so the
 * toggle shows up in both — they drive the same sidebar.
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
        name: 'themer-legacy-topbar',
        render: () => <ThemerNavbarButton />,
      },
      {
        icon: DropIcon,
        location: 'sidebar',
        name: 'themer-legacy-sidebar',
        onAction: () => setOpen(!open),
        selected: open,
        title: TOOL_TITLE,
      },
    ],
  })
}
