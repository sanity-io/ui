import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Box, Button, Card, Container, Flex, ResponsiveWidthStyleProps, Text} from '../../atoms'
import {focusFirstDescendant, focusLastDescendant} from '../../helpers'
import {useClickOutside, useGlobalKeyDown} from '../../hooks'
import {responsivePaddingStyle, ResponsivePaddingStyleProps} from '../../styles'
import {ThemeColorSchemeKey} from '../../theme'
import {Layer, Portal, useLayer} from '../../utils'
import {
  dialogStyle,
  responsiveDialogPositionStyle,
  ResponsiveDialogPositionStyleProps,
} from './styles'
import {DialogPosition} from './types'

export interface DialogProps extends ResponsiveWidthStyleProps, ResponsivePaddingStyleProps {
  cardRadius?: number
  cardShadow?: number
  contentRef?: React.ForwardedRef<HTMLDivElement>
  footer?: React.ReactNode
  header?: React.ReactNode
  id: string
  onClose?: () => void
  position?: DialogPosition
  scheme?: ThemeColorSchemeKey
}

interface DialogCardProps extends ResponsiveWidthStyleProps {
  cardRadius: number
  cardShadow: number
  children: React.ReactNode
  contentRef?: React.ForwardedRef<HTMLDivElement>
  footer: React.ReactNode
  header: React.ReactNode
  id: string
  onClose?: () => void
  scheme?: ThemeColorSchemeKey
}

const Root = styled(Layer)<ResponsiveDialogPositionStyleProps & ResponsivePaddingStyleProps>(
  responsivePaddingStyle,
  dialogStyle,
  responsiveDialogPositionStyle
)

const DialogContainer = styled(Container)`
  width: 100%;
  height: 100%;
  &&:not([hidden]) {
    display: flex;
  }
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DialogCardRoot = styled(Card)`
  width: 100%;
  min-height: 0;
  max-height: 100%;
  overflow: hidden;

  &&:not([hidden]) {
    display: flex;
  }
`

const DialogLayout = styled(Flex)`
  flex: 1;
  min-height: 0;
`

const DialogHeader = styled(Card)`
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    border-bottom: 1px solid var(--card-hairline-soft-color);
  }
`

const DialogContent = styled(Box)`
  overflow: auto;
  outline: none;
`

const DialogFooter = styled(Box)`
  border-top: 1px solid var(--card-hairline-soft-color);
`

const DialogCard = forwardRef((props: DialogCardProps, ref) => {
  const {
    cardRadius,
    cardShadow,
    children,
    contentRef,
    footer,
    header,
    id,
    onClose,
    scheme,
    width,
  } = props
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const localContentRef = useRef<HTMLDivElement | null>(null)
  const {isTopLayer} = useLayer()
  const labelId = `${id}_label`

  useEffect(() => {
    // On mount: focus the first interactive element in the contents
    if (localContentRef.current) {
      focusFirstDescendant(localContentRef.current)
    }
  }, [])

  useGlobalKeyDown(
    useCallback(
      (event: KeyboardEvent) => {
        if (!isTopLayer) return

        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          if (onClose) onClose()
        }
      },
      [isTopLayer, onClose]
    )
  )

  useClickOutside(
    useCallback(() => {
      if (!isTopLayer) return
      if (onClose) onClose()
    }, [isTopLayer, onClose]),
    [rootElement]
  )

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      setRootElement(el)
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    },
    [ref]
  )

  const setContentRef = useCallback(
    (el: HTMLDivElement | null) => {
      localContentRef.current = el
      if (typeof contentRef === 'function') contentRef(el)
      else if (contentRef) contentRef.current = el
    },
    [contentRef]
  )

  return (
    <DialogContainer width={width}>
      <DialogCardRoot radius={cardRadius} ref={setRef} scheme={scheme} shadow={cardShadow}>
        <DialogLayout direction="column">
          <DialogHeader>
            <Flex>
              <Box flex={1} padding={4}>
                {header && (
                  <Text id={labelId} weight="semibold">
                    {header}
                  </Text>
                )}
              </Box>
              <Box padding={2}>
                <Button
                  aria-label="Close dialog"
                  icon="close"
                  mode="bleed"
                  onClick={onClose}
                  padding={3}
                />
              </Box>
            </Flex>
          </DialogHeader>
          <DialogContent flex={1} ref={setContentRef} tabIndex={-1}>
            {children}
          </DialogContent>
          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogLayout>
      </DialogCardRoot>
    </DialogContainer>
  )
})

DialogCard.displayName = 'DialogCard'

export const Dialog = forwardRef(
  (props: DialogProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'id' | 'width'>, ref) => {
    const {
      cardRadius = 3,
      cardShadow = 4,
      children,
      contentRef,
      footer,
      header,
      id,
      onClose,
      padding = 4,
      position = 'fixed',
      scheme,
      width = 0,
      ...restProps
    } = props
    const preDivRef = useRef<HTMLDivElement | null>(null)
    const postDivRef = useRef<HTMLDivElement | null>(null)
    const cardRef = useRef<HTMLDivElement | null>(null)

    const handleFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
      const target = event.target
      const cardElement = cardRef.current

      if (!cardElement) {
        return
      }

      if (target === preDivRef.current) {
        focusLastDescendant(cardElement)

        return
      }

      if (target === postDivRef.current) {
        focusFirstDescendant(cardElement)

        return
      }
    }, [])

    const labelId = `${id}_label`

    return (
      <Portal>
        <Root
          {...restProps}
          aria-labelledby={labelId}
          aria-modal
          id={id}
          onFocus={handleFocus}
          padding={padding}
          position={position}
          ref={ref}
          role="dialog"
        >
          <div ref={preDivRef} tabIndex={0} />
          <DialogCard
            cardRadius={cardRadius}
            cardShadow={cardShadow}
            contentRef={contentRef}
            footer={footer}
            header={header}
            id={id}
            onClose={onClose}
            ref={cardRef}
            scheme={scheme}
            width={width}
          >
            {children}
          </DialogCard>
          <div ref={postDivRef} tabIndex={0} />
        </Root>
      </Portal>
    )
  }
)

Dialog.displayName = 'Dialog'
