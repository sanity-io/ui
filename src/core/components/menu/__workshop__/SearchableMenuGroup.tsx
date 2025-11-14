import {
  CopyIcon,
  DocumentIcon,
  EarthGlobeIcon,
  EditIcon,
  EllipsisVerticalIcon,
  LinkIcon,
  TrashIcon,
  UserIcon,
  UsersIcon,
} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  LayerProvider,
  Menu,
  MenuButton,
  type MenuButtonProps,
  MenuDivider,
  MenuGroup,
  MenuItem,
  Text,
} from '@sanity/ui'
import {useAction} from '@sanity/ui-workshop'

const NESTED_POPOVER_PROPS: MenuButtonProps['popover'] = {
  placement: 'right-start',
  portal: true,
  preventOverflow: true,
}

export default function SearchableMenuGroupStory(): React.JSX.Element {
  return (
    <Box padding={[4, 5, 6]}>
      <Card padding={4} radius={3} shadow={2}>
        <LayerProvider>
          <MenuButton
            button={
              <Button
                fontSize={2}
                icon={EllipsisVerticalIcon}
                mode="ghost"
                padding={3}
                text="Actions"
              />
            }
            id="searchable-menu-group-example"
            menu={
              <Menu searchable searchPlaceholder="Search actions...">
                <MenuItem
                  fontSize={1}
                  icon={DocumentIcon}
                  onClick={useAction('Create document')}
                  padding={2}
                  text="Create document"
                />
                <MenuItem
                  fontSize={1}
                  icon={EditIcon}
                  onClick={useAction('Edit')}
                  padding={2}
                  text="Edit"
                />
                <MenuDivider />
                <MenuGroup
                  fontSize={1}
                  icon={UsersIcon}
                  padding={2}
                  popover={NESTED_POPOVER_PROPS}
                  searchable
                  searchPlaceholder="Search share options..."
                  text="Share"
                >
                  <MenuItem
                    fontSize={1}
                    icon={UserIcon}
                    onClick={useAction('Share with user')}
                    padding={2}
                    text="Share with user"
                  />
                  <MenuItem
                    fontSize={1}
                    icon={UsersIcon}
                    onClick={useAction('Share with team')}
                    padding={2}
                    text="Share with team"
                  />
                  <MenuItem
                    fontSize={1}
                    icon={EarthGlobeIcon}
                    onClick={useAction('Make public')}
                    padding={2}
                    text="Make public"
                  />
                  <MenuItem
                    fontSize={1}
                    icon={LinkIcon}
                    onClick={useAction('Copy share link')}
                    padding={2}
                    text="Copy share link"
                  />
                </MenuGroup>
                <MenuDivider />
                <MenuItem
                  fontSize={1}
                  icon={CopyIcon}
                  onClick={useAction('Duplicate')}
                  padding={2}
                  text="Duplicate"
                />
                <MenuItem
                  fontSize={1}
                  icon={TrashIcon}
                  onClick={useAction('Delete')}
                  padding={2}
                  text="Delete"
                  tone="critical"
                />
              </Menu>
            }
            popover={{
              placement: 'bottom-start',
              portal: true,
              preventOverflow: true,
            }}
          />

          <Box marginTop={4}>
            <Text muted size={1}>
              Both the main menu and nested MenuGroup have independent searchable functionality.
            </Text>
          </Box>
        </LayerProvider>
      </Card>
    </Box>
  )
}
