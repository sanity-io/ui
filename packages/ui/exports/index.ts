'use client'

// oxlint-disable no-deprecated -- deprecated API members are re-exported for backwards compatibility
// This entry point deliberately avoids `export *` barrels: every member of
// the public API is re-exported here directly from the module that defines
// it, keeping module graphs small for bundlers, test runners and runtimes.
export {
  type BaseTheme,
  type BoxShadow,
  createColorTheme,
  hexToRgb,
  type HSL,
  hslToRgb,
  multiply,
  parseColor,
  type RGB,
  rgba,
  rgbToHex,
  rgbToHsl,
  type RootTheme,
  screen,
  studioTheme,
  type Styles,
  type Theme,
  type ThemeColorButtonModeKey,
  type ThemeColorSchemeKey,
  type ThemeColorSyntax,
  type ThemeFont,
  type ThemeFontKey,
  type ThemeFonts,
  type ThemeFontSize,
  type ThemeFontWeight,
  type ThemeFontWeightKey,
  type ThemeLayer,
  type ThemeShadow,
} from '../src/core/_compat'
export {
  Autocomplete,
  type AutocompleteProps,
} from '../src/core/components/autocomplete/autocomplete'
export type {
  AutocompleteInputChangeMsg,
  AutocompleteInputFoocusMsg,
  AutocompleteMsg,
  AutocompleteOpenButtonProps,
  AutocompleteRootBlurMsg,
  AutocompleteRootClearMsg,
  AutocompleteRootEscapeMsg,
  AutocompleteRootOpenMsg,
  AutocompleteRootSetActiveValueMsg,
  AutocompleteRootSetListFocusedMsg,
  AutocompleteState,
  AutocompleteValueChangeMsg,
  BaseAutocompleteOption,
} from '../src/core/components/autocomplete/types'
export {Breadcrumbs, type BreadcrumbsProps} from '../src/core/components/breadcrumbs/breadcrumbs'
export {Dialog, type DialogProps} from '../src/core/components/dialog/dialog'
export {DialogContext, type DialogContextValue} from '../src/core/components/dialog/dialogContext'
export {
  DialogProvider,
  type DialogProviderProps,
} from '../src/core/components/dialog/dialogProvider'
export {useDialog} from '../src/core/components/dialog/useDialog'
export {Hotkeys, type HotkeysProps} from '../src/core/components/hotkeys/hotkeys'
export {Menu, type MenuProps} from '../src/core/components/menu/menu'
export {MenuButton, type MenuButtonProps} from '../src/core/components/menu/menuButton'
export {MenuDivider, type MenuDividerProps} from '../src/core/components/menu/menuDivider'
export {
  MenuGroup,
  type MenuGroupOwnProps,
  type MenuGroupProps,
} from '../src/core/components/menu/menuGroup'
export {
  MenuItem,
  type MenuItemOwnProps,
  type MenuItemProps,
} from '../src/core/components/menu/menuItem'
export {Skeleton, type SkeletonProps} from '../src/core/components/skeleton/skeleton'
export {
  CodeSkeleton,
  type CodeSkeletonProps,
  HeadingSkeleton,
  type HeadingSkeletonProps,
  LabelSkeleton,
  type LabelSkeletonProps,
  TextSkeleton,
  type TextSkeletonProps,
} from '../src/core/components/skeleton/textSkeleton'
export {Tab, type TabProps} from '../src/core/components/tab/tab'
export {TabList, type TabListProps} from '../src/core/components/tab/tabList'
export {TabPanel, type TabPanelProps} from '../src/core/components/tab/tabPanel'
export {Toast, type ToastProps} from '../src/core/components/toast/toast'
export {ToastProvider, type ToastProviderProps} from '../src/core/components/toast/toastProvider'
export type {ToastContextValue, ToastParams} from '../src/core/components/toast/types'
export {useToast} from '../src/core/components/toast/useToast'
export {Tree, type TreeProps} from '../src/core/components/tree/tree'
export {TreeItem, type TreeItemProps} from '../src/core/components/tree/treeItem'
export type {TreeContextValue, TreeState} from '../src/core/components/tree/types'
export {useTree} from '../src/core/components/tree/useTree'
export {_raf, _raf2} from '../src/core/helpers/animation'
export {
  _isEnterToClickElement,
  containsOrEqualsElement,
  isHTMLAnchorElement,
  isHTMLButtonElement,
  isHTMLElement,
  isHTMLInputElement,
  isHTMLSelectElement,
  isHTMLTextAreaElement,
} from '../src/core/helpers/element'
export {
  _hasFocus,
  attemptFocus,
  focusFirstDescendant,
  focusLastDescendant,
  isFocusable,
} from '../src/core/helpers/focus'
export {_isScrollable} from '../src/core/helpers/scroll'
export type {ArrayPropPrimitive} from '../src/core/hooks/useArrayProp'
export {useArrayProp} from '../src/core/hooks/useArrayProp'
export type {ClickOutsideElements, ClickOutsideListener} from '../src/core/hooks/useClickOutside'
export {useClickOutside} from '../src/core/hooks/useClickOutside'
export {
  type ClickOutsideEventElements,
  type ClickOutsideEventListener,
  useClickOutsideEvent,
} from '../src/core/hooks/useClickOutsideEvent'
export {useCustomValidity} from '../src/core/hooks/useCustomValidity'
export {useElementRect} from '../src/core/hooks/useElementRect/useElementRect'
export {useElementSize} from '../src/core/hooks/useElementSize'
export {useForwardedRef} from '../src/core/hooks/useForwardedRef'
export {useGlobalKeyDown} from '../src/core/hooks/useGlobalKeyDown'
export {useMatchMedia} from '../src/core/hooks/useMatchMedia'
export {type _MediaStore, useMediaIndex} from '../src/core/hooks/useMediaIndex/useMediaIndex'
export {usePrefersDark} from '../src/core/hooks/usePrefersDark'
export {usePrefersReducedMotion} from '../src/core/hooks/usePrefersReducedMotion'
export {
  type _ElementSizeListener,
  _elementSizeObserver,
  type _ElementSizeObserver,
  type _ElementSizeSubscriber,
  type ElementRectValue,
  type ElementSize,
} from '../src/core/observers/elementSizeObserver'
export {_ResizeObserver} from '../src/core/observers/resizeObserver'
export {Avatar, type AvatarOwnProps, type AvatarProps} from '../src/core/primitives/avatar/avatar'
export {AvatarCounter, type AvatarCounterProps} from '../src/core/primitives/avatar/avatarCounter'
export {AvatarStack, type AvatarStackProps} from '../src/core/primitives/avatar/avatarStack'
export type {
  AvatarRootStyleProps,
  ResponsiveAvatarSizeStyleProps,
} from '../src/core/primitives/avatar/types'
export {Badge, type BadgeOwnProps, type BadgeProps} from '../src/core/primitives/badge/badge'
export {Box, type BoxOwnProps, type BoxProps} from '../src/core/primitives/box/box'
export {Button, type ButtonOwnProps, type ButtonProps} from '../src/core/primitives/button/button'
export {Card, type CardOwnProps, type CardProps} from '../src/core/primitives/card/card'
export type {CardStyleProps} from '../src/core/primitives/card/types'
export {Checkbox, type CheckboxProps} from '../src/core/primitives/checkbox/checkbox'
export {Code, type CodeOwnProps, type CodeProps} from '../src/core/primitives/code/code'
export {
  Container,
  type ContainerOwnProps,
  type ContainerProps,
} from '../src/core/primitives/container/container'
export type {ResponsiveWidthStyleProps} from '../src/core/primitives/container/types'
export {Flex, type FlexOwnProps, type FlexProps} from '../src/core/primitives/flex/flex'
export {Grid, type GridOwnProps, type GridProps} from '../src/core/primitives/grid/grid'
export {
  Heading,
  type HeadingOwnProps,
  type HeadingProps,
} from '../src/core/primitives/heading/heading'
export {Inline, type InlineOwnProps, type InlineProps} from '../src/core/primitives/inline/inline'
export {KBD, type KBDOwnProps, type KBDProps} from '../src/core/primitives/kbd/kbd'
export {Label, type LabelOwnProps, type LabelProps} from '../src/core/primitives/label/label'
export {Popover, type PopoverProps} from '../src/core/primitives/popover/popover'
export type {PopoverUpdateCallback, PopoverWidth} from '../src/core/primitives/popover/types'
export {Radio, type RadioProps} from '../src/core/primitives/radio/radio'
export {Select, type SelectProps} from '../src/core/primitives/select/select'
export {Spinner, type SpinnerProps} from '../src/core/primitives/spinner/spinner'
export {Stack, type StackOwnProps, type StackProps} from '../src/core/primitives/stack/stack'
export {Switch, type SwitchProps} from '../src/core/primitives/switch/switch'
export {Text, type TextOwnProps, type TextProps} from '../src/core/primitives/text/text'
export {TextArea, type TextAreaProps} from '../src/core/primitives/textArea/textArea'
export {
  TextInput,
  type TextInputClearButtonProps,
  type TextInputProps,
  type TextInputType,
} from '../src/core/primitives/textInput/textInput'
export {Tooltip, type TooltipProps} from '../src/core/primitives/tooltip/tooltip'
export {TooltipDelayGroupContext} from '../src/core/primitives/tooltip/tooltipDelayGroup/tooltipDelayGroupContext'
export {
  TooltipDelayGroupProvider,
  type TooltipDelayGroupProviderProps,
} from '../src/core/primitives/tooltip/tooltipDelayGroup/tooltipDelayGroupProvider'
export type {TooltipDelayGroupContextValue} from '../src/core/primitives/tooltip/tooltipDelayGroup/types'
export {useTooltipDelayGroup} from '../src/core/primitives/tooltip/tooltipDelayGroup/useTooltipDelayGroup'
export type {
  Delay,
  ResponsiveBorderProps,
  ResponsiveBoxProps,
  ResponsiveFlexItemProps,
  ResponsiveFlexProps,
  ResponsiveGridItemProps,
  ResponsiveGridProps,
  ResponsiveMarginProps,
  ResponsivePaddingProps,
  ResponsiveRadiusProps,
  ResponsiveShadowProps,
  ResponsiveWidthProps,
} from '../src/core/primitives/types'
export {responsiveCodeFontStyle} from '../src/core/styles/font/codeFontStyle'
export {responsiveHeadingFont} from '../src/core/styles/font/headingFontStyle'
export {responsiveLabelFont} from '../src/core/styles/font/labelFontStyle'
export {responsiveTextAlignStyle} from '../src/core/styles/font/textAlignStyle'
export {responsiveTextFont} from '../src/core/styles/font/textFontStyle'
export type {
  FontWeightStyleProps,
  ResponsiveFontSizeStyleProps,
  ResponsiveFontStyleProps,
  ResponsiveTextAlignStyleProps,
} from '../src/core/styles/font/types'
export {
  _fillCSSObject,
  _getArrayProp,
  _getResponsiveSpace,
  _responsive,
  rem,
} from '../src/core/styles/helpers'
export type {ThemeProps} from '../src/core/styles/types'
export {
  ThemeColorProvider,
  type ThemeColorProviderProps,
} from '../src/core/theme/themeColorProvider'
export {ThemeProvider, type ThemeProviderProps} from '../src/core/theme/themeProvider'
export type {ThemeContextValue} from '../src/core/theme/types'
export {useRootTheme} from '../src/core/theme/useRootTheme'
export {useTheme, useTheme_v2} from '../src/core/theme/useTheme'
export type {AvatarPosition, AvatarSize, AvatarStatus} from '../src/core/types/avatar'
export type {BadgeTone} from '../src/core/types/badge'
export type {BadgeMode} from '../src/core/types/badge'
export type {BoxDisplay, BoxHeight, BoxOverflow, BoxSizing} from '../src/core/types/box'
export type {ButtonMode, ButtonTextAlign, ButtonTone, ButtonWidth} from '../src/core/types/button'
export type {CardTone} from '../src/core/types/card'
export type {
  Assign,
  ComponentType,
  ElementType,
  EmptyProps,
  Props,
  TagType,
} from '../src/core/types/component'
export type {DialogPosition} from '../src/core/types/dialog'
export type {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexValue,
  FlexWrap,
} from '../src/core/types/flex'
export type {GridAutoCols, GridAutoFlow, GridAutoRows} from '../src/core/types/grid'
export type {
  GridItemColumn,
  GridItemColumnEnd,
  GridItemColumnStart,
  GridItemRow,
  GridItemRowEnd,
  GridItemRowStart,
} from '../src/core/types/gridItem'
export type {Placement} from '../src/core/types/placement'
export type {PopoverMargins} from '../src/core/types/popover'
export type {Radius} from '../src/core/types/radius'
export type {SelectableTone} from '../src/core/types/selectable'
export type {TextAlign} from '../src/core/types/text'
export {Arrow} from '../src/core/utils/arrow/arrow'
export {
  BoundaryElementProvider,
  type BoundaryElementProviderProps,
} from '../src/core/utils/boundaryElement/boundaryElementProvider'
export type {BoundaryElementContextValue} from '../src/core/utils/boundaryElement/types'
export {useBoundaryElement} from '../src/core/utils/boundaryElement/useBoundaryElement'
export {ConditionalWrapper} from '../src/core/utils/conditionalWrapper/conditionalWrapper'
export {ElementQuery, type MediaQueryProps} from '../src/core/utils/elementQuery/elementQuery'
export {
  ErrorBoundary,
  type ErrorBoundaryProps,
  type ErrorBoundaryState,
} from '../src/core/utils/errorBoundary'
export {Layer, type LayerProps} from '../src/core/utils/layer/layer'
export {LayerProvider, type LayerProviderProps} from '../src/core/utils/layer/layerProvider'
export type {LayerContextValue} from '../src/core/utils/layer/types'
export {useLayer} from '../src/core/utils/layer/useLayer'
export {Portal, type PortalProps} from '../src/core/utils/portal/portal'
export {PortalProvider, type PortalProviderProps} from '../src/core/utils/portal/portalProvider'
export type {PortalContextValue} from '../src/core/utils/portal/types'
export {usePortal} from '../src/core/utils/portal/usePortal'
export {SrOnly, type SrOnlyProps} from '../src/core/utils/srOnly/srOnly'
export {
  VirtualList,
  type VirtualListChangeOpts,
  type VirtualListProps,
} from '../src/core/utils/virtualList/virtualList'
export type {
  PartialThemeColorBuilderOpts,
  ThemeColorBuilderOpts,
} from '../src/theme/build/_deprecated/color/factory'
export type {ThemeAvatar} from '../src/theme/system/v0/avatar'
export type {ThemeColorGenericState} from '../src/theme/system/v0/color/_generic'
export type {ThemeColorName, ThemeColorToneKey} from '../src/theme/system/v0/color/_system'
export type {ThemeColorBase} from '../src/theme/system/v0/color/base'
export type {
  ThemeColorButton,
  ThemeColorButtonState,
  ThemeColorButtonStates,
  ThemeColorButtonTones,
} from '../src/theme/system/v0/color/button'
export type {ThemeColorCard, ThemeColorCardState} from '../src/theme/system/v0/color/card'
export type {
  ThemeColor,
  ThemeColorScheme,
  ThemeColorSchemes,
} from '../src/theme/system/v0/color/color'
export type {
  ThemeColorInput,
  ThemeColorInputState,
  ThemeColorInputStates,
} from '../src/theme/system/v0/color/input'
export type {ThemeColorMuted, ThemeColorMutedTone} from '../src/theme/system/v0/color/muted'
export type {
  ThemeColorSelectable,
  ThemeColorSelectableState,
  ThemeColorSelectableStates,
} from '../src/theme/system/v0/color/selectable'
export type {ThemeColorSolid, ThemeColorSolidTone} from '../src/theme/system/v0/color/solid'
export type {ThemeColorSpot, ThemeColorSpotKey} from '../src/theme/system/v0/color/spot'
export type {ThemeInput} from '../src/theme/system/v0/input'
