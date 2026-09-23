import {ImageIcon} from '@sanity/icons/Image'
import {Button, ButtonProps} from '@sanity/ui'
import {useRef} from 'react'

/**
 * A button that opens the file picker for an image, and hands the chosen file
 * over — the picker is a hidden file input, so nothing is uploaded anywhere.
 *
 * @internal
 */
export function ImageFileButton(
  props: {onFile: (file: File) => void} & Pick<
    ButtonProps,
    'disabled' | 'loading' | 'mode' | 'padding' | 'text' | 'title' | 'width'
  >,
) {
  const {onFile, ...buttonProps} = props
  const inputRef = useRef<HTMLInputElement | null>(null)

  return (
    <>
      <Button
        {...buttonProps}
        aria-label={buttonProps.text ? undefined : buttonProps.title}
        icon={ImageIcon}
        onClick={() => inputRef.current?.click()}
      />
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
