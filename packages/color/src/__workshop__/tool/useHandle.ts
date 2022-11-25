import {RefObject, useEffect, useRef, useState} from 'react'
import {SLIDER_H} from './constants'

export function useHandle(props: {
  propValue: number
  wrapperRef: RefObject<HTMLDivElement>
  min: number
  max: number
}): {ref: RefObject<HTMLButtonElement>; top: number; value: number} {
  const {min, max, propValue, wrapperRef} = props
  const ref = useRef<HTMLButtonElement>(null)
  const [value, setValue] = useState(propValue)
  const [top, setTop] = useState((propValue / (max - min)) * SLIDER_H)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const handle = ref.current

    let offsetTop = 0

    function handleMouseDown(event: MouseEvent) {
      event.preventDefault()

      if (!handle) return
      if (!wrapper) return

      handle.focus()

      let scrollY = window.scrollY

      offsetTop = wrapper.offsetTop

      setTop(Math.min(Math.max(event.clientY - offsetTop + scrollY - 6, 0), SLIDER_H))

      function handleMouseMove(moveEvent: MouseEvent) {
        scrollY = window.scrollY
        moveEvent.preventDefault()
        setTop(Math.min(Math.max(moveEvent.clientY - offsetTop + scrollY - 6, 0), SLIDER_H))
      }

      function handleMouseUp() {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setTop((prev) => Math.min(prev + 1, SLIDER_H))
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setTop((prev) => Math.max(prev - 1, 0))
      }
    }

    handle?.addEventListener('mousedown', handleMouseDown)
    handle?.addEventListener('keydown', handleKeyDown)

    return () => {
      handle?.removeEventListener('mousedown', handleMouseDown)
      handle?.removeEventListener('keydown', handleKeyDown)
    }
  }, [min, max, wrapperRef])

  useEffect(() => {
    setValue(Math.round((top / SLIDER_H) * (max - min)))
  }, [max, min, top])

  return {ref, top, value}
}
