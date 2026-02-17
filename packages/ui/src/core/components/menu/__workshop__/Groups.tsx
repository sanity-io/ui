import {
  Box,
  Button,
  Card,
  Inline,
  LayerProvider,
  Menu,
  MenuButton,
  type MenuButtonProps,
  MenuDivider,
  MenuGroup,
  MenuItem,
} from '@sanity/ui'
import {useAction} from '@sanity/ui-workshop'

const POPOVER_PROPS: MenuButtonProps['popover'] = {
  placement: 'bottom',
  portal: true,
  preventOverflow: true,
}

const NESTED_POPOVER_PROPS: MenuButtonProps['popover'] = {
  placement: 'right-start',
  portal: true,
  preventOverflow: true,
}

export default function GroupsStory(): React.JSX.Element {
  return (
    <Box padding={[4, 5, 6]}>
      <Card padding={1} radius={3} shadow={1}>
        <Inline gap={1}>
          <LayerProvider>
            <MenuButton
              button={<Button fontSize={1} mode="bleed" padding={2} text="File" />}
              id="example"
              menu={
                <Menu>
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'T']}
                    padding={2}
                    text="New tab"
                    onClick={useAction('New tab')}
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'N']}
                    padding={2}
                    text="New window"
                    onClick={useAction('New window')}
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⇧', '⌘', 'T']}
                    padding={2}
                    text="Reopen closed tab"
                    onClick={useAction('Reopen closed tab')}
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'O']}
                    padding={2}
                    text="Open file…"
                    onClick={useAction('Open file…')}
                  />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'L']}
                    padding={2}
                    text="Open location…"
                    onClick={useAction('Open location…')}
                  />
                  <MenuDivider />
                  <MenuGroup
                    fontSize={1}
                    padding={2}
                    popover={NESTED_POPOVER_PROPS}
                    text="Share"
                    onClick={useAction('Share')}
                  >
                    <MenuItem
                      fontSize={1}
                      padding={2}
                      text="Email link"
                      onClick={useAction('Share / Email link')}
                    />
                    <MenuItem
                      fontSize={1}
                      padding={2}
                      text="Messages"
                      onClick={useAction('Share / Messages')}
                    />
                    <MenuItem
                      fontSize={1}
                      padding={2}
                      text="Airdrop"
                      onClick={useAction('Share / Airdrop')}
                    />
                    <MenuItem fontSize={1} padding={2} text="Notes" onClick={useAction('Notes')} />
                    <MenuGroup
                      fontSize={1}
                      padding={2}
                      popover={NESTED_POPOVER_PROPS}
                      text="More"
                      onClick={useAction('Share / More')}
                    >
                      <MenuItem
                        fontSize={1}
                        padding={2}
                        text="Email link"
                        onClick={useAction('Share / More / Email link')}
                      />
                      <MenuItem
                        fontSize={1}
                        padding={2}
                        text="Messages"
                        onClick={useAction('Share / More / Messages')}
                      />
                      <MenuItem
                        fontSize={1}
                        padding={2}
                        text="Airdrop"
                        onClick={useAction('Share / More / Airdrop')}
                      />
                      <MenuItem
                        fontSize={1}
                        padding={2}
                        text="Notes"
                        onClick={useAction('Share / More / Notes')}
                      />
                    </MenuGroup>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuItem
                    fontSize={1}
                    hotkeys={['⌘', 'P']}
                    padding={2}
                    text="Print…"
                    onClick={useAction('Print…')}
                  />
                </Menu>
              }
              popover={POPOVER_PROPS}
            />
          </LayerProvider>

          <Button disabled fontSize={1} mode="bleed" padding={2} text="Edit" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="View" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="Window" />
          <Button disabled fontSize={1} mode="bleed" padding={2} text="Help" />
        </Inline>
      </Card>
    </Box>
  )
}
