import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react'
import styled, {css} from 'styled-components'
import {Box, Button, Card, Container, Flex, Text, useCard} from '../../atoms'
import {focusFirstDescendant, focusLastDescendant} from '../../helpers'
import {useClickOutside, useGlobalKeyDown} from '../../hooks'
import {ColorSchemeKey, Theme} from '../../theme'
import {Layer, Portal, useLayer} from '../../utils'

interface DialogProps {
  cardRadius?: number
  cardShadow?: number
  footer?: React.ReactNode
  header?: React.ReactNode
  id: string
  onClose?: () => void
  scheme?: ColorSchemeKey
  width?: number
}

const Root = styled(Layer)<{scheme: ColorSchemeKey}>(
  ({scheme, theme}: {scheme: ColorSchemeKey; theme: Theme}) => {
    const tone = theme.color[scheme].card.tones.default

    return css`
      && {
        position: absolute;
      }

      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.25em;
      outline: none;
      background: ${tone.enabled.shadow.penumbra};
    `
  }
)

const DialogContainer = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DialogCardRoot = styled(Card)`
  width: 100%;
  min-height: 0;
  max-height: 100%;
  overflow: hidden;
  display: flex;
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

const DialogCard = forwardRef(
  (
    {
      cardRadius,
      cardShadow,
      children,
      footer,
      header,
      id,
      onClose,
      scheme,
      width,
    }: {
      cardRadius: number
      cardShadow: number
      children: React.ReactNode
      footer: React.ReactNode
      header: React.ReactNode
      id: string
      onClose?: () => void
      scheme: ColorSchemeKey
      width: number
    },
    ref
  ) => {
    const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const {isTopLayer} = useLayer()
    const labelId = `${id}_label`

    useEffect(() => {
      // On mount: focus the first interactive element in the contents
      if (contentRef.current) {
        focusFirstDescendant(contentRef.current)
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
            <DialogContent flex={1} ref={contentRef} tabIndex={-1}>
              {children}
            </DialogContent>
            {footer && <DialogFooter>{footer}</DialogFooter>}
          </DialogLayout>
        </DialogCardRoot>
      </DialogContainer>
    )
  }
)

DialogCard.displayName = 'DialogCard'

export const Dialog = forwardRef(
  (props: DialogProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'id'>, ref) => {
    const card = useCard()
    const {
      cardRadius = 2,
      cardShadow = 4,
      children,
      footer,
      header,
      id,
      onClose,
      scheme = card.scheme,
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
          ref={ref}
          role="dialog"
          scheme={scheme}
        >
          <div ref={preDivRef} tabIndex={0} />
          <DialogCard
            cardRadius={cardRadius}
            cardShadow={cardShadow}
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
