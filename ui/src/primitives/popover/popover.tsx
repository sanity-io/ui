import {ArrowModifier} from '@popperjs/core/lib/modifiers/arrow'
import {FlipModifier} from '@popperjs/core/lib/modifiers/flip'
import {OffsetModifier} from '@popperjs/core/lib/modifiers/offset'
import {PreventOverflowModifier} from '@popperjs/core/lib/modifiers/preventOverflow'
import maxSizeModifier from 'popper-max-size-modifier'
import React, {cloneElement, forwardRef, useEffect, useMemo, useState} from 'react'
import {Modifier, usePopper} from 'react-popper'
import styled, {css} from 'styled-components'
import {EMPTY_RECORD} from '../../constants'
import {useForwardedRef} from '../../hooks'
import {ThemeColorSchemeKey, ThemeColorToneKey} from '../../theme'
import {Placement} from '../../types'
import {Layer, Portal, useBoundaryElement, usePortal} from '../../utils'
import {Card} from '../card'
import {ResponsiveWidthStyleProps} from '../container'
import {responsiveContainerWidthStyle} from '../container/styles'
import {ResponsiveRadiusProps, ResponsiveShadowProps, ResponsiveWidthProps} from '../types'
import {PopoverArrow} from './arrow'
import {applyMaxSizeModifier} from './modifiers/applyMaxSize'
import {matchReferenceWidthModifier} from './modifiers/matchReferenceWidth'

export interface PopoverProps
  extends ResponsiveRadiusProps,
    ResponsiveShadowProps,
    ResponsiveWidthProps {
  allowedAutoPlacements?: Placement[]
  arrow?: boolean
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  constrainSize?: boolean
  content?: React.ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  open?: boolean
  padding?: number | number[]
  placement?: Placement
  portal?: boolean
  preventOverflow?: boolean
  referenceElement?: HTMLElement | null
  matchReferenceWidth?: boolean
  scheme?: ThemeColorSchemeKey
  tone?: ThemeColorToneKey
}

const Root = styled(Layer)<{$preventOverflow?: boolean}>(
  ({$preventOverflow}) => css`
    pointer-events: none;
    display: flex;
    flex-direction: column;

    & > * {
      min-height: 0;
    }

    /* Hide the popover when the reference element is out of bounds */
    ${$preventOverflow &&
    css`
      &[data-popper-reference-hidden='true'] {
        display: none;
      }
    `}
  `
)

const PopoverCard = styled(Card)<
  ResponsiveWidthStyleProps & {
    $constrainSize?: boolean
    $preventOverflow?: boolean
  }
>(
  ({$constrainSize}) => css`
    flex: 1;
    max-height: ${$constrainSize && '100%'};
    pointer-events: all;

    && {
      display: flex;
    }

    flex-direction: column;

    & > * {
      min-height: 0;
    }

    ${responsiveContainerWidthStyle}
  `
)

export const Popover = forwardRef(
  (
    props: PopoverProps &
      Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content' | 'width'>,
    ref
  ) => {
    const boundaryElementContext = useBoundaryElement()
    const {
      allowedAutoPlacements,
      arrow = true,
      boundaryElement: boundaryElementProp = boundaryElementContext,
      children: child,
      content,
      constrainSize,
      disabled,
      fallbackPlacements,
      open,
      padding,
      placement: placementProp,
      portal: portalProp = false,
      preventOverflow,
      radius = 3,
      referenceElement: referenceElementProp,
      matchReferenceWidth,
      shadow = 3,
      scheme,
      style = EMPTY_RECORD,
      tone,
      width = 0,
      ...restProps
    } = props
    const forwardedRef = useForwardedRef(ref)
    const placement = typeof placementProp === 'string' ? placementProp : 'bottom'
    const portal = usePortal()
    const boundaryElement = boundaryElementProp || portal.boundaryElement
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)
    const popperReferenceElement = referenceElementProp || referenceElement
    const offset = useMemo(() => (arrow ? [0, 4] : [0, 0]), [arrow])

    const modifiers = useMemo(
      () =>
        [
          constrainSize && {
            ...maxSizeModifier,
            options: {
              boundary: boundaryElement || undefined,
              padding: 8,
            },
          },
          constrainSize && applyMaxSizeModifier,
          arrow &&
            ({
              name: 'arrow',
              options: {
                element: arrowElement,
                padding: 4,
              },
            } as ArrowModifier),
          preventOverflow &&
            ({
              name: 'preventOverflow',
              options: {
                altAxis: true,
                boundary: boundaryElement || undefined,
                padding: 8,
              },
            } as PreventOverflowModifier),
          {
            name: 'offset',
            options: {offset},
          } as OffsetModifier,
          {
            name: 'flip',
            options: {
              allowedAutoPlacements,
              boundary: boundaryElement || undefined,
              fallbackPlacements,
              padding: 8,
            },
          } as FlipModifier,
          matchReferenceWidth && matchReferenceWidthModifier,
        ].filter(Boolean) as Modifier<any, any>[],
      [
        allowedAutoPlacements,
        arrow,
        arrowElement,
        boundaryElement,
        constrainSize,
        fallbackPlacements,
        matchReferenceWidth,
        offset,
        preventOverflow,
      ]
    )

    const popper = usePopper(popperReferenceElement, popperElement, {
      placement,
      modifiers,
    })

    const {attributes, forceUpdate, styles} = popper

    useEffect(() => {
      if (forceUpdate) {
        try {
          forceUpdate()
        } catch (_) {
          // ignore caught error
        }
      }
    }, [content, forceUpdate, open, popperReferenceElement])

    if (disabled) {
      return child || <></>
    }

    const setRef = (el: HTMLElement | null) => {
      const childRef = (child as any).ref

      setReferenceElement(el)

      if (typeof childRef === 'function') {
        childRef(el)
      } else if (childRef) {
        childRef.current = el
      }
    }

    const setRootRef = (el: HTMLDivElement | null) => {
      setPopperElement(el)
      forwardedRef.current = el
    }

    // @todo: memoize?
    const popoverStyle = {...style, ...styles.popper}

    const node = (
      <Root
        data-ui="Popover"
        {...restProps}
        $preventOverflow={preventOverflow}
        ref={setRootRef}
        style={popoverStyle}
        {...attributes.popper}
      >
        <PopoverCard
          $constrainSize={constrainSize}
          data-ui="PopoverCard"
          padding={padding}
          radius={radius}
          scheme={scheme}
          shadow={shadow}
          tone={tone}
          width={width as any}
        >
          {arrow && <PopoverArrow ref={setArrowElement} style={styles.arrow} />}
          {content}
        </PopoverCard>
      </Root>
    )

    return (
      <>
        {child && !referenceElementProp ? cloneElement(child, {ref: setRef}) : child || <></>}

        {open && (
          <>
            {portalProp && <Portal>{node}</Portal>}

            {!portalProp && node}
          </>
        )}
      </>
    )
  }
)

Popover.displayName = 'Popover'
