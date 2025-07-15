import {UploadIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import {styled} from 'styled-components'

const SanityUploadButton = styled(Button).attrs({forwardedAs: 'label'})`
  & input {
    appearance: none;
    overflow: hidden;
    overflow: clip;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    max-width: 0;
    width: -webkit-fill-available;
    width: stretch;
  }

  & > span:nth-child(2) {
    width: 0;
    flex: none;
    padding: 0;
  }
`

export default function SanityUploadButtonWorkaroundStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center">
      <SanityUploadButton htmlFor="file" icon={UploadIcon} tabIndex={0} text="Upload">
        <input type="file" />
      </SanityUploadButton>
    </Flex>
  )
}
