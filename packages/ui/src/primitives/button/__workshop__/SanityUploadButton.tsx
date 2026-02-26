import {UploadIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'

import {sanityUploadButton} from './styles.css'

export default function SanityUploadButtonWorkaroundStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center">
      <Button
        as="label"
        className={sanityUploadButton}
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
