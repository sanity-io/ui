import {RefObject, useEffect, useRef, useState} from 'react'
import {SLIDER_H} from './constants'

function calcValueFromTop(min: number, max: number, top: number) {
  return Math.round((top / SLIDER_H) * (max - min))
}

function calcTopFromValue(min: number, max: number, value: number) {
  return (value / (max - min)) * SLIDER_H
}

export function useHandle(props: {
  onChange?: (value: number) => void
  onEnd?: () => void
  onStart?: () => void
  propValue: number
  wrapperRef: RefObject<HTMLDivElement>
  min: number
  max: number
}): {
  ref: RefObject<HTMLButtonElement>
  top: number
} {
  const {min, max, onChange, onEnd, onStart, propValue, wrapperRef} = props
  const ref = useRef<HTMLButtonElement>(null)
  const [top, setTop] = useState(() => (propValue / (max - min)) * SLIDER_H)

  // update `top` when props change
  useEffect(() => setTop(calcTopFromValue(min, max, propValue)), [max, min, propValue])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const handle = ref.current

    let offsetTop = 0

    function handleMouseDown(event: MouseEvent) {
      event.preventDefault()

      if (!handle) return
      if (!wrapper) return

      onStart?.()

      handle.focus()

      let scrollY = window.scrollY

      offsetTop = wrapper.offsetTop

      const nextTop = Math.min(Math.max(event.clientY - offsetTop + scrollY - 6, 0), SLIDER_H)

      setTop(nextTop)
      onChange?.(calcValueFromTop(min, max, nextTop))

      function handleMouseMove(moveEvent: MouseEvent) {
        scrollY = window.scrollY
        moveEvent.preventDefault()
        const nextTop = Math.min(Math.max(moveEvent.clientY - offsetTop + scrollY - 6, 0), SLIDER_H)

        setTop(nextTop)
        onChange?.(calcValueFromTop(min, max, nextTop))
      }

      function handleMouseUp() {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)

        onEnd?.()
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setTop((prev) => {
          const nextTop = Math.min(prev + 1, SLIDER_H)

          onChange?.(calcValueFromTop(min, max, nextTop))

          return nextTop
        })
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setTop((prev) => {
          const nextTop = Math.max(prev - 1, 0)

          onChange?.(calcValueFromTop(min, max, nextTop))

          return nextTop
        })
      }
    }

    handle?.addEventListener('mousedown', handleMouseDown)
    handle?.addEventListener('keydown', handleKeyDown)

    return () => {
      handle?.removeEventListener('mousedown', handleMouseDown)
      handle?.removeEventListener('keydown', handleKeyDown)
    }
  }, [min, max, onEnd, onStart, wrapperRef])

  return {ref, top}
}
