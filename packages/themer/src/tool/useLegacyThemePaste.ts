import {useToast} from '@sanity/ui/toast'
import {useEffect} from 'react'

import {useThemer} from './context'
import {convertLegacyTheme} from './legacyTheme'

/** The `input` types that take no pasted text, like the editor's swatches and sliders */
const nonTextInputTypes = new Set([
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
])

/** Whether a paste lands in a field that takes it as text */
function isEditable(target: EventTarget | null): boolean {
  if (target instanceof HTMLInputElement) return !nonTextInputTypes.has(target.type)

  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || target.matches('textarea, select'))
  )
}

/**
 * Imports the hosted Themer themes pasted while the sidebar shows: pasting a
 * themer.sanity.build URL — or a snippet with one in it, like the import line
 * of a Studio config — anywhere but into a text field adds its theme,
 * converted to `buildTheme` options, and opens it in the editor. Pastes
 * without such a URL are left alone.
 *
 * @internal
 */
export function useLegacyThemePaste(): void {
  const {send} = useThemer()
  const toast = useToast()

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (event.defaultPrevented || isEditable(event.target)) return

      const conversion = convertLegacyTheme(event.clipboardData?.getData('text/plain') ?? '')

      switch (conversion.status) {
        case 'missing':
          return
        case 'invalid':
          event.preventDefault()
          toast.push({
            status: 'error',
            title: 'Could not import that themer.sanity.build URL',
            description: conversion.message,
          })
          return
        case 'converted':
          event.preventDefault()
          send({type: 'theme.add', title: conversion.title, options: conversion.options})
          toast.push({
            status: 'success',
            title: `Imported “${conversion.title}”`,
            description: 'Show its code from the header to use it in your config',
          })
          return
        default:
          conversion satisfies never
      }
    }

    document.addEventListener('paste', handlePaste)

    return () => document.removeEventListener('paste', handlePaste)
  }, [send, toast])
}
