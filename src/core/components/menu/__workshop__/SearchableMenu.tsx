import {
  CopyIcon,
  DocumentIcon,
  EditIcon,
  EllipsisVerticalIcon,
  LinkIcon,
  TrashIcon,
} from '@sanity/icons'
import {Box, Button, Card, LayerProvider, Menu, MenuButton, MenuItem, Text} from '@sanity/ui'
import {useAction} from '@sanity/ui-workshop'

export default function SearchableMenuStory(): React.JSX.Element {
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
            id="searchable-menu-example"
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
                <MenuItem
                  fontSize={1}
                  icon={CopyIcon}
                  onClick={useAction('Duplicate')}
                  padding={2}
                  text="Duplicate"
                />
                <MenuItem
                  fontSize={1}
                  icon={LinkIcon}
                  onClick={useAction('Copy link')}
                  padding={2}
                  text="Copy link"
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
              Try typing to filter menu items, or use arrow keys to navigate.
            </Text>
          </Box>
        </LayerProvider>
      </Card>
    </Box>
  )
}
