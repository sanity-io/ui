import {useState} from 'react'
import {Stack, Flex, Button, Text} from '../../../primitives'
import {Layer, LayerProvider} from '../../../utils'
import {Menu, MenuButton, MenuItem} from '../../menu'
import {Dialog} from '../dialog'

export default function LayeringFocusStory() {
  const [firstDialogOpen, setFirstDialogOpen] = useState<boolean>(false)
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)
  const [thirdDialogOpen, setThirdDialogOpen] = useState<boolean>(false)
  const [fourthDialogOpen, setFourthDialogOpen] = useState<boolean>(false)

  return (
    <LayerProvider>
      <Flex align="center" height="fill" justify="center">
        <Layer onActivate={({activeElement}) => activeElement?.focus()}>
          <Button
            text="Open dialog 1"
            onClick={() => setFirstDialogOpen(true)}
            tone="primary"
            id="open-dialog-1-button"
          />

          {firstDialogOpen && (
            <Dialog
              header="Dialog 1"
              id="1"
              onActivate={({activeElement}) => activeElement?.focus()}
              onClose={() => setFirstDialogOpen(false)}
            >
              <Stack space={2} padding={3}>
                <Button
                  mode="ghost"
                  text="Open dialog 2"
                  onClick={() => setSecondDialogOpen(true)}
                  id="open-dialog-2-button-1"
                />
                <Button
                  mode="ghost"
                  text="Open dialog 2"
                  onClick={() => setSecondDialogOpen(true)}
                  id="open-dialog-2-button-2"
                />
                <Button
                  mode="ghost"
                  text="Open dialog 2"
                  onClick={() => setSecondDialogOpen(true)}
                  id="open-dialog-2-button-3"
                />
              </Stack>

              {secondDialogOpen && (
                <Dialog
                  header="Dialog 2"
                  id="2"
                  onActivate={({activeElement}) => activeElement?.focus()}
                  onClose={() => setSecondDialogOpen(false)}
                >
                  <Stack space={2} padding={3}>
                    <Button
                      mode="ghost"
                      text="Open dialog 3"
                      onClick={() => setThirdDialogOpen(true)}
                      id="open-dialog-3-button-1"
                    />
                    <Button
                      mode="ghost"
                      text="Open dialog 3"
                      onClick={() => setThirdDialogOpen(true)}
                      id="open-dialog-3-button-2"
                    />
                    <Button
                      mode="ghost"
                      text="Open dialog 3"
                      onClick={() => setThirdDialogOpen(true)}
                      id="open-dialog-3-button-3"
                    />
                  </Stack>

                  {thirdDialogOpen && (
                    <Dialog
                      header="Dialog 3"
                      id="3"
                      onActivate={({activeElement}) => activeElement?.focus()}
                      onClose={() => setThirdDialogOpen(false)}
                    >
                      <Stack space={2} padding={3}>
                        <MenuButton
                          id="menu"
                          button={
                            <Button mode="ghost" text="Open menu" id="open-dialog-4-menu-button" />
                          }
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
                          <Stack space={2} padding={3}>
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
