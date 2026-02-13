import {Button, Flex, LayerProvider, Menu, MenuDivider, MenuItem, Popover} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'
import {Fragment, useCallback, useState} from 'react'

const ITEMS = [...Array(8).keys()].map((num) => ({
  title: `Item ${num + 1}`,
  divider: num === 3,
}))

const OPTIONS = {first: 'first', last: 'last'}

export default function ShouldFocusStory(): React.JSX.Element {
  const shouldFocus = useSelect<keyof typeof OPTIONS>('Should focus', OPTIONS, 'first')

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
  const handleToggleOpen = useCallback(() => setPopoverOpen((v) => !v), [])

  return (
    <LayerProvider>
      <Flex align="center" justify="center" padding={4}>
        <Popover
          content={
            <Menu shouldFocus={shouldFocus}>
              {ITEMS.map((item) => {
                return (
                  <Fragment key={item.title}>
                    <MenuItem text={item.title} />
                    {item.divider && <MenuDivider />}
                  </Fragment>
                )
              })}
            </Menu>
          }
          open={popoverOpen}
          portal
        >
          <Button text="Open menu" onClick={handleToggleOpen} />
        </Popover>
      </Flex>
    </LayerProvider>
  )
}
