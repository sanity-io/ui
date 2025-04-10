import {LinkIcon} from '@sanity/icons'
import {Box, Text, TextInput, Tree, TreeItem} from '@sanity/ui'
import {usePerfTest} from '@sanity/ui-workshop/plugin-perf'
import {useCallback, useState} from 'react'

import {perfTests} from './basic.perf'

export default function BasicStory() {
  const {ref, Wrapper} = usePerfTest(perfTests[0])

  const [id, setId] = useState('')
  const [focus, setFocus] = useState('')

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault()

    const testid = event.currentTarget.getAttribute('data-testid')

    if (testid) setId(testid)
  }, [])

  const handleFocus = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    const elementFocus = event.target.getAttribute('data-testid')
    if (elementFocus) setFocus(elementFocus)
  }, [])

  return (
    <Box padding={[4, 5, 6]}>
      <Box paddingY={3}>
        <Text muted size={1}>
          This example is to demonstrate that when you tab from an outside element (using the
          keyboard to navigate), you can still access the tree and tree item. Press the input
          beneath and start tabbing / using the arrow.
        </Text>
      </Box>
      <Box paddingY={3}>
        <Text>Focus: {focus}</Text>
      </Box>
      <Wrapper>
        <TextInput />
        <Tree ref={ref} space={1} onFocus={handleFocus}>
          <TreeItem data-testid="fruit" onClick={handleClick} expanded text="Fruit">
            <TreeItem
              data-testid="oranges"
              onClick={handleClick}
              selected={id === 'oranges'}
              text="Oranges"
            />
            <TreeItem
              data-testid="pineapples"
              onClick={handleClick}
              text="Pineapples"
              selected={id === 'pineapples'}
            />
            <TreeItem data-testid="apples" onClick={handleClick} text="Apples">
              <TreeItem
                data-testid="apples/macintosh"
                onClick={handleClick}
                href="/apples/macintosh"
                icon={LinkIcon}
                text="Macintosh"
              />
              <TreeItem
                data-testid="apples/granny-smith"
                onClick={handleClick}
                text="Granny Smith"
              />
              <TreeItem data-testid="apples/fuji" onClick={handleClick} text="Fuji" />
            </TreeItem>
            <TreeItem data-testid="bananas" onClick={handleClick} text="Bananas" />
            <TreeItem data-testid="pears" onClick={handleClick} text="Pears">
              <TreeItem data-testid="pears/anjou" onClick={handleClick} text="Anjou" />
              <TreeItem data-testid="pears/bartlett" onClick={handleClick} text="Bartlett" />
              <TreeItem data-testid="pears/bosc" onClick={handleClick} text="Bosc" />
              <TreeItem data-testid="pears/concorde" onClick={handleClick} text="Concorde" />
              <TreeItem data-testid="pears/seckel" onClick={handleClick} text="Seckel" />
              <TreeItem data-testid="pears/starkrimson" onClick={handleClick} text="Starkrimson" />
            </TreeItem>
          </TreeItem>
        </Tree>
      </Wrapper>
    </Box>
  )
}
