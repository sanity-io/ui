import {Button, Flex} from '@sanity/ui'
import {useCallback, useRef} from 'react'

export default function UploadButtonStory(): React.JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      inputRef.current?.click()
    }
  }, [])

  return (
    <Flex align="center" height="fill" justify="center">
      <Button
        as="label"
        htmlFor="file"
        tabIndex={0}
        text={
          <>
            Upload
            <input ref={inputRef} id="file" style={{display: 'none'}} type="file" />
          </>
        }
        onKeyDown={handleKeyDown}
      />
    </Flex>
  )
}
