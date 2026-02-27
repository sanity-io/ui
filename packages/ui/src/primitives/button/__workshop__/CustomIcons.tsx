import {RocketIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import {BUTTON_MODES} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function CustomIconsStory(): React.JSX.Element {
  const mode = useSelect('Mode', BUTTON_MODES, 'default')

  return (
    <CardWrapper>
      <Flex align="center" gap={2} height="fill" justify="center">
        {/* <Inline gap={1}> */}
        <Button fontSize={1} icon={RocketIcon} mode={mode} text="Rocket" />
        <Button fontSize={1} icon={CustomIcon} mode={mode} text="Heart" />
        {/* </Inline> */}
      </Flex>
    </CardWrapper>
  )
}

function CustomIcon() {
  return (
    <svg
      fill="currentColor"
      height="1em"
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
    </svg>
  )
}
