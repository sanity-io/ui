import React, {forwardRef, useCallback, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {Box, Button, Card, Container, Flex, Text} from '../../atoms'
import {focusFirstDescendant, focusLastDescendant} from '../../helpers'
import {Layer, Portal, useLayer} from '../../utils'

interface DialogProps {
  cardRadius?: number
  cardShadow?: number
  header?: React.ReactNode
  id: string
  onClose?: () => void
  width?: number
}

const Root = styled(Layer)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25em;
  outline: none;
`

const DialogContainer = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DialogCardRoot = styled(Card)`
  overflow: hidden;
  width: 100%;
  max-height: 50%;
  display: flex;
`

const DialogLayout = styled(Flex)`
  flex: 1;
  min-height: 0;
`

const DialogHeader = styled(Card)`
  border-bottom: 1px solid var(--card-hairline-soft-color);
`

const DialogContent = styled(Box)`
  overflow: auto;
  outline: none;
`

const DialogCard = forwardRef(
  (
    {
      cardRadius,
      cardShadow,
      children,
      header,
      id,
      onClose,
      width,
    }: {
      cardRadius: number
      cardShadow: number
      children: React.ReactNode
      header: React.ReactNode
      id: string
      onClose?: () => void
      width: number
    },
    ref
  ) => {
    const contentRef = useRef<HTMLDivElement | null>(null)
    const layer = useLayer()
    const {isTopLayer} = layer

    useEffect(() => {
      // On mount: focus the first interactive element in the contents
      if (contentRef.current) {
        focusFirstDescendant(contentRef.current)
      }
    }, [])

    useEffect(() => {
      if (!isTopLayer) return undefined

      const handleWindowKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          if (onClose) onClose()
        }
      }

      window.addEventListener('keydown', handleWindowKeyDown)

      return () => {
        window.removeEventListener('keydown', handleWindowKeyDown)
      }
    }, [isTopLayer, onClose])

    const labelId = `${id}_label`

    return (
      <DialogContainer width={width}>
        <DialogCardRoot radius={cardRadius} ref={ref} shadow={cardShadow}>
          <DialogLayout direction="column">
            <DialogHeader>
              <Flex>
                <Box flex={1} padding={4}>
                  {header && (
                    <Text id={labelId}>
                      <strong>{header}</strong>
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
          </DialogLayout>
        </DialogCardRoot>
      </DialogContainer>
    )
  }
)

DialogCard.displayName = 'DialogCard'

export const Dialog = forwardRef(
  (props: DialogProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'id'>, ref) => {
    const {
      cardRadius = 2,
      cardShadow = 4,
      children,
      header,
      id,
      onClose,
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
        >
          <div ref={preDivRef} tabIndex={0} />
          <DialogCard
            cardRadius={cardRadius}
            cardShadow={cardShadow}
            header={header}
            id={id}
            onClose={onClose}
            ref={cardRef}
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
