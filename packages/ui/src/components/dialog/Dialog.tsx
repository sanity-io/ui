import {
  type ComponentType,
  focusFirstDescendant,
  focusLastDescendant,
  isHTMLElement,
  type Props,
  Z_OFFSETS,
} from '@sanity/ui/core'
import {
  type ContainerStyleProps,
  dialog,
  dialog_container,
  type ResponsiveProp,
} from '@sanity/ui/css'
import {usePrefersReducedMotion} from '@sanity/ui/hooks'
import {Container} from '@sanity/ui/primitives/container'
import {Layer, type LayerOwnProps, type LayerProps} from '@sanity/ui/primitives/layer'
import type {Radius, Shadow} from '@sanity/ui/theme'
import {BoundaryElementContext} from '@sanity/ui/utils/boundary-element'
import {Portal, usePortal} from '@sanity/ui/utils/portal'
import {type FocusEvent, type ForwardedRef, type ReactNode, use, useCallback, useRef} from 'react'

import {DialogCard} from './DialogCard'
import {isTargetWithinScope} from './isTargetWithinScope'
import type {DialogPosition} from './types'
import {useDialog} from './useDialog'

/**
 * The default HTML element type rendered by the {@link Dialog} component.
 *
 * @public
 */
export const DEFAULT_DIALOG_ELEMENT = 'div'

/**
 * Own props for the {@link Dialog} component.
 *
 * @remarks
 * Extends {@link ContainerStyleProps} and {@link LayerOwnProps} to provide
 * layout constraints and z-index stacking for modal dialog windows.
 *
 * @public
 */
export interface DialogOwnProps
  extends
    Omit<ContainerStyleProps, 'id' | 'position' | 'radius' | 'shadow'>,
    Omit<LayerOwnProps, 'id' | 'position' | 'radius' | 'shadow' | 'width'> {
  /**
   * When `true`, automatically focuses the first focusable descendant
   * when the dialog mounts.
   *
   * @beta Do not use in production.
   */
  __unstable_autoFocus?: boolean
  /**
   * When `true`, hides the close button in the dialog header.
   *
   * @beta Do not use in production.
   */
  __unstable_hideCloseButton?: boolean
  /**
   * Whether the dialog should animate in on mount.
   *
   * @beta
   */
  animate?: boolean

  /**
   * The border radius applied to the dialog card. Supports responsive values.
   */
  cardRadius?: ResponsiveProp<Radius>

  /**
   * A ref that receives the dialog's scrollable content container element.
   */
  contentRef?: ForwardedRef<HTMLDivElement>

  /**
   * Content to render in the dialog's footer area, below the scrollable content.
   */
  footer?: ReactNode

  /**
   * Content to render in the dialog's header area, above the scrollable content.
   */
  header?: ReactNode

  /**
   * A unique identifier for the dialog. Used for accessibility attributes
   * including `aria-labelledby`.
   */
  id: string

  /**
   * A callback that fires when the dialog becomes the top layer when it was
   * not the top layer before.
   */
  onActivate?: LayerProps['onActivate']

  /**
   * A callback that fires when the user clicks outside the dialog card.
   */
  onClickOutside?: () => void

  /**
   * A callback that fires when the dialog should close, such as when the
   * close button is clicked.
   */
  onClose?: () => void

  /**
   * Controls whether the dialog is visible.
   */
  open?: boolean

  /**
   * The name of the portal to render the dialog into.
   */
  portal?: string

  /**
   * The CSS position strategy for the dialog overlay. Supports responsive values.
   */
  position?: ResponsiveProp<DialogPosition>
  // scheme?: ColorScheme
  /**
   * @deprecated Not in use – will be removed in the next major version.
   */
  shadow?: ResponsiveProp<Shadow>
  // tone?: CardTone | 'inherit'
  // zOffset?: number | number[]
}

/**
 * Accepted values for the `as` prop of the {@link Dialog} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Dialog`.
 *
 * @public
 */
export type DialogElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link Dialog} component.
 *
 * @remarks
 * Combines {@link DialogOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link DialogElementType}.
 *
 * @public
 */
export type DialogProps<E extends DialogElementType = DialogElementType> = Props<DialogOwnProps, E>

/**
 * The `Dialog` component renders a modal dialog window with focus trapping,
 * a header, scrollable content area, and optional footer.
 *
 * @remarks
 * The dialog is rendered inside a {@link Portal} and a {@link Layer} to manage
 * z-index stacking. It traps focus within its content and supports
 * `onClose` and `onClickOutside` callbacks for dismissal.
 *
 * @public
 */
export function Dialog<E extends DialogElementType = typeof DEFAULT_DIALOG_ELEMENT>(
  props: DialogProps<E>,
): React.JSX.Element {
  const context = useDialog()
  const {
    __unstable_autoFocus: autoFocus = true,
    __unstable_hideCloseButton: hideCloseButton = false,
    animate: _animate = true,
    cardRadius = 5,
    children,
    className,
    contentRef,
    footer,
    header,
    id,
    onActivate,
    onClickOutside,
    onClose,
    onFocus,
    padding = 3,
    portal: portalProp,
    position: _positionProp,
    shadow: _shadow, // TODO: remove this
    width = 0,
    zOffset: _zOffsetProp,
    ...rest
  } = props as DialogProps<typeof DEFAULT_DIALOG_ELEMENT>

  const position = _positionProp ?? context.position ?? 'fixed'
  const zOffset = _zOffsetProp ?? context.zOffset ?? Z_OFFSETS.dialog
  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = prefersReducedMotion ? false : _animate
  const portal = usePortal()
  const portalElement = portalProp ? portal.elements?.[portalProp] || null : portal.element
  const boundaryElement = use(BoundaryElementContext)

  const preDivRef = useRef<HTMLDivElement | null>(null)
  const postDivRef = useRef<HTMLDivElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const focusedElementRef = useRef<HTMLElement | null>(null)

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLDivElement>) => {
      onFocus?.(event)

      const target = event.target
      const cardElement = cardRef.current

      if (cardElement && target === preDivRef.current) {
        focusLastDescendant(cardElement)

        return
      }

      if (cardElement && target === postDivRef.current) {
        focusFirstDescendant(cardElement)

        return
      }

      if (isHTMLElement(event.target)) {
        focusedElementRef.current = event.target
      }
    },
    [onFocus],
  )

  const labelId = `${id}_label`

  const rootClickTimeoutRef = useRef<NodeJS.Timeout>(undefined)

  // If the resulting active element (a.k.a. focused element) is not withing scope when clicking
  // within the dialog, then we want to focus the previously interactive element in the dialog instead.
  // This is to allow the user to tab or close the dialog by pressing escape.
  const handleRootClick = useCallback(() => {
    if (rootClickTimeoutRef.current) {
      clearTimeout(rootClickTimeoutRef.current)
    }

    rootClickTimeoutRef.current = setTimeout(() => {
      const activeElement = document.activeElement

      if (activeElement && !isTargetWithinScope(boundaryElement, portalElement, activeElement)) {
        const target = focusedElementRef.current

        if (!target || !document.body.contains(target)) {
          // No previously focused element, or it's not in the document anymore
          const cardElement = cardRef.current
          if (cardElement) focusFirstDescendant(cardElement)

          return
        }

        target.focus()
      }
    }, 0)
  }, [boundaryElement, portalElement])

  return (
    <Portal __unstable_name={portalProp}>
      <Layer
        data-ui="Dialog"
        {...rest}
        aria-labelledby={labelId}
        aria-modal
        className={dialog({className})}
        data-animate={animate ? '' : undefined}
        display="flex"
        id={id}
        inset={0}
        padding={padding}
        position={position}
        role="dialog"
        zOffset={zOffset}
        onActivate={onActivate}
        onClick={handleRootClick}
        onFocus={handleFocus}
      >
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div ref={preDivRef} tabIndex={0} />
        <Container
          alignItems="center"
          className={dialog_container()}
          data-ui="DialogCard"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width={width}
        >
          <DialogCard
            ref={cardRef}
            __unstable_autoFocus={autoFocus}
            __unstable_hideCloseButton={hideCloseButton}
            contentRef={contentRef}
            footer={footer}
            header={header}
            id={id}
            portal={portalProp}
            radius={cardRadius}
            shadow={4}
            width={width}
            onClickOutside={onClickOutside}
            onClose={onClose}
          >
            {children}
          </DialogCard>
        </Container>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div ref={postDivRef} tabIndex={0} />
      </Layer>
    </Portal>
  )
}
