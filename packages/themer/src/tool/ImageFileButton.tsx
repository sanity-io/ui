import {ImageIcon} from '@sanity/icons/Image'
import {ButtonProps} from '@sanity/ui'
import {useRef} from 'react'

import {TooltipButton} from './TooltipButton'

/**
 * A button that opens the file picker for an image, and hands the chosen file
 * over — the picker is a hidden file input, so nothing is uploaded anywhere.
 *
 * @internal
 */
export function ImageFileButton(
  props: {onFile: (file: File) => void; tooltip: string} & Pick<
    ButtonProps,
    'disabled' | 'loading' | 'mode' | 'padding' | 'text' | 'width'
  >,
) {
  const {onFile, ...buttonProps} = props
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <TooltipButton {...buttonProps} icon={ImageIcon} onClick={() => inputRef.current?.click()} />
      <input
        accept="image/*"
        hidden
        onChange={(event) => {
          const file = event.currentTarget.files?.[0]

          // Picking the same file again should work, so the input forgets it
          event.currentTarget.value = ''

          if (file) onFile(file)
        }}
        ref={inputRef}
        type="file"
      />
    </>
  )
}
