import {UploadIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'

import {sanityUploadButton} from './styles.css'

export default function SanityUploadButtonWorkaroundStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center">
      <Button
        className={sanityUploadButton}
        as="label"
        htmlFor="file"
        icon={UploadIcon}
        tabIndex={0}
        text="Upload"
      >
        <input type="file" />
      </Button>
    </Flex>
  )
}
