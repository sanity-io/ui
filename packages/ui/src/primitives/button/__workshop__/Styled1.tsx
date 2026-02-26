import {Button, Flex} from '@sanity/ui'

import {styledButton1} from './styles.css'

export default function StyledButton1Story(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center">
      <Button as="a" className={styledButton1} href="#" text="Test" />
    </Flex>
  )
}
