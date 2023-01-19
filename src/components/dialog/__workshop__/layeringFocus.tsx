import {useState} from 'react'
import {Stack, Flex, Button, Text} from '../../../primitives'
import {LayerProvider} from '../../../utils'
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
        <Button text="Open dialog 1" onClick={() => setFirstDialogOpen(true)} tone="primary" />

        {firstDialogOpen && (
          <Dialog header="Dialog 1" id="1" onClose={() => setFirstDialogOpen(false)}>
            <Stack space={2} padding={3}>
              <Button mode="ghost" text="Open dialog 2" onClick={() => setSecondDialogOpen(true)} />
              <Button mode="ghost" text="Open dialog 2" onClick={() => setSecondDialogOpen(true)} />
              <Button mode="ghost" text="Open dialog 2" onClick={() => setSecondDialogOpen(true)} />
            </Stack>

            {secondDialogOpen && (
              <Dialog header="Dialog 2" id="2" onClose={() => setSecondDialogOpen(false)}>
                <Stack space={2} padding={3}>
                  <Button
                    mode="ghost"
                    text="Open dialog 3"
                    onClick={() => setThirdDialogOpen(true)}
                  />
                  <Button
                    mode="ghost"
                    text="Open dialog 3"
                    onClick={() => setThirdDialogOpen(true)}
                  />
                  <Button
                    mode="ghost"
                    text="Open dialog 3"
                    onClick={() => setThirdDialogOpen(true)}
                  />
                </Stack>

                {thirdDialogOpen && (
                  <Dialog header="Dialog 3" id="3" onClose={() => setThirdDialogOpen(false)}>
                    <Stack space={2} padding={3}>
                      <MenuButton
                        id="menu"
                        button={<Button mode="ghost" text="Open menu" />}
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
                      <Dialog header="Dialog 4" id="4" onClose={() => setFourthDialogOpen(false)}>
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
      </Flex>
    </LayerProvider>
  )
}
