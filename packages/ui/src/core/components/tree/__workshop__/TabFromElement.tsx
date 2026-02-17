import {LinkIcon} from '@sanity/icons'
import {Box, Text, TextInput, Tree, TreeItem} from '@sanity/ui'
import {usePerfTest} from '@sanity/ui-workshop/plugin-perf'
import {useCallback, useState} from 'react'

import {perfTests} from './basic.perf'

export default function BasicStory(): React.JSX.Element {
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
        <Tree ref={ref} gap={1} onFocus={handleFocus}>
          <TreeItem data-testid="fruit" expanded text="Fruit" onClick={handleClick}>
            <TreeItem
              data-testid="oranges"
              selected={id === 'oranges'}
              text="Oranges"
              onClick={handleClick}
            />
            <TreeItem
              data-testid="pineapples"
              selected={id === 'pineapples'}
              text="Pineapples"
              onClick={handleClick}
            />
            <TreeItem data-testid="apples" text="Apples" onClick={handleClick}>
              <TreeItem
                data-testid="apples/macintosh"
                href="/apples/macintosh"
                icon={LinkIcon}
                text="Macintosh"
                onClick={handleClick}
              />
              <TreeItem
                data-testid="apples/granny-smith"
                text="Granny Smith"
                onClick={handleClick}
              />
              <TreeItem data-testid="apples/fuji" text="Fuji" onClick={handleClick} />
            </TreeItem>
            <TreeItem data-testid="bananas" text="Bananas" onClick={handleClick} />
            <TreeItem data-testid="pears" text="Pears" onClick={handleClick}>
              <TreeItem data-testid="pears/anjou" text="Anjou" onClick={handleClick} />
              <TreeItem data-testid="pears/bartlett" text="Bartlett" onClick={handleClick} />
              <TreeItem data-testid="pears/bosc" text="Bosc" onClick={handleClick} />
              <TreeItem data-testid="pears/concorde" text="Concorde" onClick={handleClick} />
              <TreeItem data-testid="pears/seckel" text="Seckel" onClick={handleClick} />
              <TreeItem data-testid="pears/starkrimson" text="Starkrimson" onClick={handleClick} />
            </TreeItem>
          </TreeItem>
        </Tree>
      </Wrapper>
    </Box>
  )
}
