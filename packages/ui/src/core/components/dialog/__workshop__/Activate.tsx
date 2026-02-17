import {
  Button,
  Dialog,
  Flex,
  Layer,
  LayerProvider,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Text,
} from '@sanity/ui'
import {useState} from 'react'

export default function LayeringFocusStory(): React.JSX.Element {
  const [firstDialogOpen, setFirstDialogOpen] = useState<boolean>(false)
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)
  const [thirdDialogOpen, setThirdDialogOpen] = useState<boolean>(false)
  const [fourthDialogOpen, setFourthDialogOpen] = useState<boolean>(false)

  return (
    <LayerProvider>
      <Flex align="center" height="fill" justify="center">
        <Layer onActivate={({activeElement}) => activeElement?.focus()}>
          <Button
            id="open-dialog-1-button"
            text="Open dialog 1"
            onClick={() => setFirstDialogOpen(true)}
          />

          {firstDialogOpen && (
            <Dialog
              header="Dialog 1"
              id="1"
              onActivate={({activeElement}) => activeElement?.focus()}
              onClose={() => setFirstDialogOpen(false)}
            >
              <Stack gap={2} padding={3}>
                <Button
                  id="open-dialog-2-button-1"
                  mode="ghost"
                  text="Open dialog 2"
                  onClick={() => setSecondDialogOpen(true)}
                />
                <Button
                  id="open-dialog-2-button-2"
                  mode="ghost"
                  text="Open dialog 2"
                  onClick={() => setSecondDialogOpen(true)}
                />
                <Button
                  id="open-dialog-2-button-3"
                  mode="ghost"
                  text="Open dialog 2"
                  onClick={() => setSecondDialogOpen(true)}
                />
              </Stack>

              {secondDialogOpen && (
                <Dialog
                  header="Dialog 2"
                  id="2"
                  onActivate={({activeElement}) => activeElement?.focus()}
                  onClose={() => setSecondDialogOpen(false)}
                >
                  <Stack gap={2} padding={3}>
                    <Button
                      id="open-dialog-3-button-1"
                      mode="ghost"
                      text="Open dialog 3"
                      onClick={() => setThirdDialogOpen(true)}
                    />
                    <Button
                      id="open-dialog-3-button-2"
                      mode="ghost"
                      text="Open dialog 3"
                      onClick={() => setThirdDialogOpen(true)}
                    />
                    <Button
                      id="open-dialog-3-button-3"
                      mode="ghost"
                      text="Open dialog 3"
                      onClick={() => setThirdDialogOpen(true)}
                    />
                  </Stack>

                  {thirdDialogOpen && (
                    <Dialog
                      header="Dialog 3"
                      id="3"
                      onActivate={({activeElement}) => activeElement?.focus()}
                      onClose={() => setThirdDialogOpen(false)}
                    >
                      <Stack gap={2} padding={3}>
                        <MenuButton
                          button={
                            <Button id="open-dialog-4-menu-button" mode="ghost" text="Open menu" />
                          }
                          id="menu"
                          menu={
                            <Menu>
                              <MenuItem
                                text="Open dialog 4"
                                onClick={() => setFourthDialogOpen(true)}
                              />
                              <MenuItem
                                text="Open dialog 4"
                                onClick={() => setFourthDialogOpen(true)}
                              />
                              <MenuItem
                                text="Open dialog 4"
                                onClick={() => setFourthDialogOpen(true)}
                              />
                            </Menu>
                          }
                        />
                      </Stack>

                      {fourthDialogOpen && (
                        <Dialog
                          header="Dialog 4"
                          id="4"
                          onActivate={({activeElement}) => activeElement?.focus()}
                          onClose={() => setFourthDialogOpen(false)}
                        >
                          <Stack gap={2} padding={3}>
                            <Text>👋</Text>
                          </Stack>
                        </Dialog>
                      )}
                    </Dialog>
                  )}
                </Dialog>
              )}
            </Dialog>
          )}
        </Layer>
      </Flex>
    </LayerProvider>
  )
}
