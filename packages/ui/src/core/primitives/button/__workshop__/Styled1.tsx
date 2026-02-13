import {Button, Flex} from '@sanity/ui'

import {styledButton1} from './styles.css'

export default function StyledButton1Story(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center">
      <Button className={styledButton1} as="a" href="#" text="Test" />
    </Flex>
  )
}
