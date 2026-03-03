import {ClockIcon, CommentIcon, ExpandIcon, SearchIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Grid,
  LayerProvider,
  Menu,
  MenuButton,
  type MenuButtonProps,
  MenuDivider,
  MenuItem,
} from '@sanity/ui'
import {CARD_TONES} from '@sanity/ui/theme'
import {useAction, useBoolean, useSelect} from '@sanity/ui-workshop'
import {useMemo} from 'react'

export default function MenuButtonStory(): React.JSX.Element {
  const layoutTone = useSelect('Layout tone', CARD_TONES, 'default')
  const portal = useBoolean('Portal', false)

  const popover: MenuButtonProps['popover'] = useMemo(
    () => ({
      constrainSize: true,
      portal,
    }),
    [portal],
  )

  return (
    <Card height="fill" tone={layoutTone}>
      <Box padding={[4, 5, 6]}>
        <Grid gap={2} gridTemplateColumns={3}>
          <Button id="prev-button" mode="ghost" text="Prev" />
          <LayerProvider>
            <MenuButton
              button={<Button text="Open" />}
              id="menu-button"
              menu={
                <Menu>
                  <MenuItem
                    icon={SearchIcon}
                    id="menu-item-1"
                    text="Search"
                    onClick={useAction('Search')}
                  />
                  <MenuItem
                    icon={ClockIcon}
                    id="menu-item-2"
                    text="Clock"
                    onClick={useAction('Clock')}
                  />
                  <MenuItem
                    disabled
                    icon={CommentIcon}
                    id="menu-item-3"
                    text="Comment"
                    onClick={useAction('Comment')}
                  />
                  <MenuDivider />
                  <MenuItem
                    icon={ExpandIcon}
                    id="menu-item-4"
                    text="Expand"
                    onClick={useAction('Expand')}
                  />
                </Menu>
              }
              popover={popover}
              onClose={useAction('onClose')}
              onOpen={useAction('onOpen')}
            />
          </LayerProvider>
          <Button id="next-button" mode="ghost" text="Next" />
        </Grid>
      </Box>
    </Card>
  )
}
