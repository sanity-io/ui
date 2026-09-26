import {ColorWheelIcon} from '@sanity/icons/ColorWheel'
import {SpinnerIcon} from '@sanity/icons/Spinner'
import {Button, Text} from '@sanity/ui'
import {Tooltip} from '@sanity/ui/tooltip'
import {type NavbarProps} from 'sanity'

import {useThemer} from './context'

import {spinner} from './ThemerNavbar.css'

/**
 * Starts loading the sidebar's code as the toggle is about to be pressed —
 * the same import `React.lazy` makes, which then waits for this one
 */
function preloadSidebar() {
  // A failed load is for the lazy import to report, as the sidebar opens
  import('./ResizableSidebar').catch(() => {})
}

function ThemerNavbarButton() {
  const {open, loading, send} = useThemer()

  return (
    <Tooltip animate content={<Text size={1}>Themer</Text>} portal>
      <Button
        aria-busy={loading}
        aria-label="Themer"
        // While the sidebar's code loads, a spinner takes the icon's place at
        // the icon's size — the `loading` prop would cover the button with a
        // larger one
        disabled={loading}
        icon={loading ? <SpinnerIcon className={spinner} /> : ColorWheelIcon}
        mode="bleed"
        onClick={() => send({type: 'sidebar.toggle'})}
        onFocus={preloadSidebar}
        onMouseEnter={preloadSidebar}
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
  const {open, send} = useThemer()

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
        onAction: () => send({type: 'sidebar.toggle'}),
        selected: open,
        title: 'Themer',
      },
    ],
  })
}
