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
} from '../core/_compat'
export {Dialog, type DialogProps} from '../core/components/dialog/dialog'
export {DialogContext, type DialogContextValue} from '../core/components/dialog/dialogContext'
export {
  DialogProvider,
  type DialogProviderProps,
} from '../core/components/dialog/dialogProvider'
export {useDialog} from '../core/components/dialog/useDialog'
export {Hotkeys, type HotkeysProps} from '../core/components/hotkeys/hotkeys'
export {Skeleton, type SkeletonProps} from '../core/components/skeleton/skeleton'
export {
  CodeSkeleton,
  type CodeSkeletonProps,
  HeadingSkeleton,
  type HeadingSkeletonProps,
  LabelSkeleton,
  type LabelSkeletonProps,
  TextSkeleton,
  type TextSkeletonProps,
} from '../core/components/skeleton/textSkeleton'
export {Tab, type TabProps} from '../core/components/tab/tab'
export {TabList, type TabListProps} from '../core/components/tab/tabList'
export {TabPanel, type TabPanelProps} from '../core/components/tab/tabPanel'
export {Tree, type TreeProps} from '../core/components/tree/tree'
export {TreeItem, type TreeItemProps} from '../core/components/tree/treeItem'
export type {TreeContextValue, TreeState} from '../core/components/tree/types'
export {useTree} from '../core/components/tree/useTree'
export {_raf, _raf2} from '../core/helpers/animation'
export {
  _isEnterToClickElement,
  containsOrEqualsElement,
  isHTMLAnchorElement,
  isHTMLButtonElement,
  isHTMLElement,
  isHTMLInputElement,
  isHTMLSelectElement,
  isHTMLTextAreaElement,
} from '../core/helpers/element'
export {
  _hasFocus,
  attemptFocus,
  focusFirstDescendant,
  focusLastDescendant,
  isFocusable,
} from '../core/helpers/focus'
export {_isScrollable} from '../core/helpers/scroll'
export type {ArrayPropPrimitive} from '../core/hooks/useArrayProp'
export {useArrayProp} from '../core/hooks/useArrayProp'
export type {ClickOutsideElements, ClickOutsideListener} from '../core/hooks/useClickOutside'
export {useClickOutside} from '../core/hooks/useClickOutside'
export {
  type ClickOutsideEventElements,
  type ClickOutsideEventListener,
  useClickOutsideEvent,
} from '../core/hooks/useClickOutsideEvent'
export {useCustomValidity} from '../core/hooks/useCustomValidity'
export {useElementRect} from '../core/hooks/useElementRect/useElementRect'
export {useElementSize} from '../core/hooks/useElementSize'
export {useForwardedRef} from '../core/hooks/useForwardedRef'
export {useGlobalKeyDown} from '../core/hooks/useGlobalKeyDown'
export {useMatchMedia} from '../core/hooks/useMatchMedia'
export {type _MediaStore, useMediaIndex} from '../core/hooks/useMediaIndex/useMediaIndex'
export {usePrefersDark} from '../core/hooks/usePrefersDark'
export {usePrefersReducedMotion} from '../core/hooks/usePrefersReducedMotion'
export {
  type _ElementSizeListener,
  _elementSizeObserver,
  type _ElementSizeObserver,
  type _ElementSizeSubscriber,
  type ElementRectValue,
  type ElementSize,
} from '../core/observers/elementSizeObserver'
export {_ResizeObserver} from '../core/observers/resizeObserver'
export {Avatar, type AvatarOwnProps, type AvatarProps} from '../core/primitives/avatar/avatar'
export {AvatarCounter, type AvatarCounterProps} from '../core/primitives/avatar/avatarCounter'
export {AvatarStack, type AvatarStackProps} from '../core/primitives/avatar/avatarStack'
export type {
  AvatarRootStyleProps,
  ResponsiveAvatarSizeStyleProps,
} from '../core/primitives/avatar/types'
export {Badge, type BadgeOwnProps, type BadgeProps} from '../core/primitives/badge/badge'
export {Box, type BoxOwnProps, type BoxProps} from '../core/primitives/box/box'
export {Button, type ButtonOwnProps, type ButtonProps} from '../core/primitives/button/button'
export {Card, type CardOwnProps, type CardProps} from '../core/primitives/card/card'
export type {CardStyleProps} from '../core/primitives/card/types'
export {Checkbox, type CheckboxProps} from '../core/primitives/checkbox/checkbox'
export {
  Container,
  type ContainerOwnProps,
  type ContainerProps,
} from '../core/primitives/container/container'
export type {ResponsiveWidthStyleProps} from '../core/primitives/container/types'
export {Flex, type FlexOwnProps, type FlexProps} from '../core/primitives/flex/flex'
export {Grid, type GridOwnProps, type GridProps} from '../core/primitives/grid/grid'
export {
  Heading,
  type HeadingOwnProps,
  type HeadingProps,
} from '../core/primitives/heading/heading'
export {Inline, type InlineOwnProps, type InlineProps} from '../core/primitives/inline/inline'
export {KBD, type KBDOwnProps, type KBDProps} from '../core/primitives/kbd/kbd'
export {Label, type LabelOwnProps, type LabelProps} from '../core/primitives/label/label'
export {Radio, type RadioProps} from '../core/primitives/radio/radio'
export {Select, type SelectProps} from '../core/primitives/select/select'
export {Spinner, type SpinnerProps} from '../core/primitives/spinner/spinner'
export {Stack, type StackOwnProps, type StackProps} from '../core/primitives/stack/stack'
export {Switch, type SwitchProps} from '../core/primitives/switch/switch'
export {Text, type TextOwnProps, type TextProps} from '../core/primitives/text/text'
export {TextArea, type TextAreaProps} from '../core/primitives/textArea/textArea'
export {
  TextInput,
  type TextInputClearButtonProps,
  type TextInputProps,
  type TextInputType,
} from '../core/primitives/textInput/textInput'
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
} from '../core/primitives/types'
export {responsiveCodeFontStyle} from '../core/styles/font/codeFontStyle'
export {responsiveHeadingFont} from '../core/styles/font/headingFontStyle'
export {responsiveLabelFont} from '../core/styles/font/labelFontStyle'
export {responsiveTextAlignStyle} from '../core/styles/font/textAlignStyle'
export {responsiveTextFont} from '../core/styles/font/textFontStyle'
export type {
  FontWeightStyleProps,
  ResponsiveFontSizeStyleProps,
  ResponsiveFontStyleProps,
  ResponsiveTextAlignStyleProps,
} from '../core/styles/font/types'
export {
  _fillCSSObject,
  _getArrayProp,
  _getResponsiveSpace,
  _responsive,
  rem,
} from '../core/styles/helpers'
export type {ThemeProps} from '../core/styles/types'
export {
  ThemeColorProvider,
  type ThemeColorProviderProps,
} from '../core/theme/themeColorProvider'
export {ThemeProvider, type ThemeProviderProps} from '../core/theme/themeProvider'
export type {ThemeContextValue} from '../core/theme/types'
export {useRootTheme} from '../core/theme/useRootTheme'
export {useTheme, useTheme_v2} from '../core/theme/useTheme'
export type {AvatarPosition, AvatarSize, AvatarStatus} from '../core/types/avatar'
export type {BadgeTone} from '../core/types/badge'
export type {BadgeMode} from '../core/types/badge'
export type {BoxDisplay, BoxHeight, BoxOverflow, BoxSizing} from '../core/types/box'
export type {ButtonMode, ButtonTextAlign, ButtonTone, ButtonWidth} from '../core/types/button'
export type {CardTone} from '../core/types/card'
export type {
  Assign,
  ComponentType,
  ElementType,
  EmptyProps,
  Props,
  TagType,
} from '../core/types/component'
export type {DialogPosition} from '../core/types/dialog'
export type {
  FlexAlign,
  FlexDirection,
  FlexJustify,
  FlexValue,
  FlexWrap,
} from '../core/types/flex'
export type {GridAutoCols, GridAutoFlow, GridAutoRows} from '../core/types/grid'
export type {
  GridItemColumn,
  GridItemColumnEnd,
  GridItemColumnStart,
  GridItemRow,
  GridItemRowEnd,
  GridItemRowStart,
} from '../core/types/gridItem'
export type {Placement} from '../core/types/placement'
export type {Radius} from '../core/types/radius'
export type {SelectableTone} from '../core/types/selectable'
export type {TextAlign} from '../core/types/text'
export {Arrow} from '../core/utils/arrow/arrow'
export {
  BoundaryElementProvider,
  type BoundaryElementProviderProps,
} from '../core/utils/boundaryElement/boundaryElementProvider'
export type {BoundaryElementContextValue} from '../core/utils/boundaryElement/types'
export {useBoundaryElement} from '../core/utils/boundaryElement/useBoundaryElement'
export {ConditionalWrapper} from '../core/utils/conditionalWrapper/conditionalWrapper'
export {ElementQuery, type MediaQueryProps} from '../core/utils/elementQuery/elementQuery'
export {
  ErrorBoundary,
  type ErrorBoundaryProps,
  type ErrorBoundaryState,
} from '../core/utils/errorBoundary'
export {Layer, type LayerProps} from '../core/utils/layer/layer'
export {LayerProvider, type LayerProviderProps} from '../core/utils/layer/layerProvider'
export type {LayerContextValue} from '../core/utils/layer/types'
export {useLayer} from '../core/utils/layer/useLayer'
export {Portal, type PortalProps} from '../core/utils/portal/portal'
export {PortalProvider, type PortalProviderProps} from '../core/utils/portal/portalProvider'
export type {PortalContextValue} from '../core/utils/portal/types'
export {usePortal} from '../core/utils/portal/usePortal'
export {SrOnly, type SrOnlyProps} from '../core/utils/srOnly/srOnly'
export {
  VirtualList,
  type VirtualListChangeOpts,
  type VirtualListProps,
} from '../core/utils/virtualList/virtualList'
export type {
  PartialThemeColorBuilderOpts,
  ThemeColorBuilderOpts,
} from '../theme/build/_deprecated/color/factory'
export type {ThemeAvatar} from '../theme/system/v0/avatar'
export type {ThemeColorGenericState} from '../theme/system/v0/color/_generic'
export type {ThemeColorName, ThemeColorToneKey} from '../theme/system/v0/color/_system'
export type {ThemeColorBase} from '../theme/system/v0/color/base'
export type {
  ThemeColorButton,
  ThemeColorButtonState,
  ThemeColorButtonStates,
  ThemeColorButtonTones,
} from '../theme/system/v0/color/button'
export type {ThemeColorCard, ThemeColorCardState} from '../theme/system/v0/color/card'
export type {
  ThemeColor,
  ThemeColorScheme,
  ThemeColorSchemes,
} from '../theme/system/v0/color/color'
export type {
  ThemeColorInput,
  ThemeColorInputState,
  ThemeColorInputStates,
} from '../theme/system/v0/color/input'
export type {ThemeColorMuted, ThemeColorMutedTone} from '../theme/system/v0/color/muted'
export type {
  ThemeColorSelectable,
  ThemeColorSelectableState,
  ThemeColorSelectableStates,
} from '../theme/system/v0/color/selectable'
export type {ThemeColorSolid, ThemeColorSolidTone} from '../theme/system/v0/color/solid'
export type {ThemeColorSpot, ThemeColorSpotKey} from '../theme/system/v0/color/spot'
export type {ThemeInput} from '../theme/system/v0/input'

// Tombstones for exports that moved to their own entry points, so that
// importing the root entry point never references their heavy dependencies
// (`@floating-ui/react-dom`, `motion`, `react-refractor`). They are
// type-level only (`declare` emits no JavaScript) and exist so editors and
// agents can tell where a symbol went.

/** @deprecated Moved to `@sanity/ui/autocomplete` */
export declare const Autocomplete: never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteInputChangeMsg = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteInputFoocusMsg = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteMsg = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteOpenButtonProps = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteProps = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteRootBlurMsg = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteRootClearMsg = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteRootEscapeMsg = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteRootOpenMsg = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteRootSetActiveValueMsg = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteRootSetListFocusedMsg = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteState = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type AutocompleteValueChangeMsg = never
/** @deprecated Moved to `@sanity/ui/autocomplete` */
export type BaseAutocompleteOption = never
/** @deprecated Moved to `@sanity/ui/breadcrumbs` */
export declare const Breadcrumbs: never
/** @deprecated Moved to `@sanity/ui/breadcrumbs` */
export type BreadcrumbsProps = never
/** @deprecated Moved to `@sanity/ui/code` */
export declare const Code: never
/** @deprecated Moved to `@sanity/ui/code` */
export type CodeOwnProps = never
/** @deprecated Moved to `@sanity/ui/code` */
export type CodeProps = never
/** @deprecated Moved to `@sanity/ui/menu` */
export declare const Menu: never
/** @deprecated Moved to `@sanity/ui/menu` */
export declare const MenuButton: never
/** @deprecated Moved to `@sanity/ui/menu` */
export type MenuButtonProps = never
/** @deprecated Moved to `@sanity/ui/menu` */
export declare const MenuDivider: never
/** @deprecated Moved to `@sanity/ui/menu` */
export type MenuDividerProps = never
/** @deprecated Moved to `@sanity/ui/menu` */
export declare const MenuGroup: never
/** @deprecated Moved to `@sanity/ui/menu` */
export type MenuGroupOwnProps = never
/** @deprecated Moved to `@sanity/ui/menu` */
export type MenuGroupProps = never
/** @deprecated Moved to `@sanity/ui/menu` */
export declare const MenuItem: never
/** @deprecated Moved to `@sanity/ui/menu` */
export type MenuItemOwnProps = never
/** @deprecated Moved to `@sanity/ui/menu` */
export type MenuItemProps = never
/** @deprecated Moved to `@sanity/ui/menu` */
export type MenuProps = never
/** @deprecated Moved to `@sanity/ui/popover` */
export declare const Popover: never
/** @deprecated Moved to `@sanity/ui/popover` */
export type PopoverMargins = never
/** @deprecated Moved to `@sanity/ui/popover` */
export type PopoverProps = never
/** @deprecated Moved to `@sanity/ui/popover` */
export type PopoverUpdateCallback = never
/** @deprecated Moved to `@sanity/ui/popover` */
export type PopoverWidth = never
/** @deprecated Moved to `@sanity/ui/toast` */
export declare const Toast: never
/** @deprecated Moved to `@sanity/ui/toast` */
export type ToastContextValue = never
/** @deprecated Moved to `@sanity/ui/toast` */
export type ToastParams = never
/** @deprecated Moved to `@sanity/ui/toast` */
export type ToastProps = never
/** @deprecated Moved to `@sanity/ui/toast` */
export declare const ToastProvider: never
/** @deprecated Moved to `@sanity/ui/toast` */
export type ToastProviderProps = never
/** @deprecated Moved to `@sanity/ui/toast` */
export declare const useToast: never
/** @deprecated Moved to `@sanity/ui/tooltip` */
export declare const Tooltip: never
/** @deprecated Moved to `@sanity/ui/tooltip` */
export declare const TooltipDelayGroupContext: never
/** @deprecated Moved to `@sanity/ui/tooltip` */
export type TooltipDelayGroupContextValue = never
/** @deprecated Moved to `@sanity/ui/tooltip` */
export declare const TooltipDelayGroupProvider: never
/** @deprecated Moved to `@sanity/ui/tooltip` */
export type TooltipDelayGroupProviderProps = never
/** @deprecated Moved to `@sanity/ui/tooltip` */
export type TooltipProps = never
/** @deprecated Moved to `@sanity/ui/tooltip` */
export declare const useTooltipDelayGroup: never
