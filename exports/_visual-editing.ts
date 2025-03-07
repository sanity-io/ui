/**
 * These are internal exports for usage in `@sanity/visual-editing` and `@sanity/insert-menu`,
 * which are used in environments where the regular `@sanity/ui` export is far too heavy due to imports from refractor and more.
 */
export {Box} from '../src/core/primitives/box/box'
export {Button} from '../src/core/primitives/button/button'
export {Card} from '../src/core/primitives/card/card'
export {Flex} from '../src/core/primitives/flex/flex'
export {Grid} from '../src/core/primitives/grid/grid'
export {Hotkeys} from '../src/core/components/hotkeys/hotkeys'
export {isHTMLAnchorElement, isHTMLElement} from '../src/core/helpers/element'
export {LayerProvider} from '../src/core/utils/layer/layerProvider'
export {Menu} from '../src/core/components/menu/menu'
export {MenuDivider} from '../src/core/components/menu/menuDivider'
export {MenuGroup} from '../src/core/components/menu/menuGroup'
export {MenuItem, type MenuItemProps} from '../src/core/components/menu/menuItem'
export {Popover} from '../src/core/primitives/popover/popover'
export {Portal} from '../src/core/utils/portal/portal'
export {PortalProvider} from '../src/core/utils/portal/portalProvider'
export {Spinner} from '../src/core/primitives/spinner/spinner'
export {Stack} from '../src/core/primitives/stack/stack'
export {studioTheme} from '../src/core/_compat'
export {Tab} from '../src/core/components/tab/tab'
export {TabList} from '../src/core/components/tab/tabList'
export {Text} from '../src/core/primitives/text/text'
export {TextInput} from '../src/core/primitives/textInput/textInput'
export {ThemeProvider} from '../src/core/theme/themeProvider'
export {Tooltip} from '../src/core/primitives/tooltip/tooltip'
export type {PopoverMargins} from '../src/core/types/popover'
export {usePrefersDark} from '../src/core/hooks/usePrefersDark'
export {useTheme_v2} from '../src/core/theme/useTheme'
