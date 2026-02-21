import {LinkIcon} from '@sanity/icons'
import {Box, Tree, TreeItem} from '@sanity/ui'
import {usePerfTest} from '@sanity/ui-workshop/plugin-perf'
import {useCallback, useState} from 'react'

import {perfTests} from './basic.perf'

export default function BasicStory(): React.JSX.Element {
  const {ref, Wrapper} = usePerfTest(perfTests[0])

  const [id, setId] = useState('')

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault()

    const testid = event.currentTarget.getAttribute('data-testid')

    if (testid) setId(testid)
  }, [])

  return (
    <Box padding={[4, 5, 6]}>
      <Wrapper>
        <Tree ref={ref} gap={1} padding={0} radius={3}>
          <TreeItem expanded text="Fruit" onClick={handleClick}>
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
            <TreeItem muted text="Bananas" onClick={handleClick} />
            <TreeItem text="Pears" onClick={handleClick}>
              <TreeItem muted text="Anjou" onClick={handleClick} />
              <TreeItem muted text="Bartlett" onClick={handleClick} />
              <TreeItem muted text="Bosc" onClick={handleClick} />
              <TreeItem muted text="Concorde" onClick={handleClick} />
              <TreeItem muted text="Seckel" onClick={handleClick} />
              <TreeItem muted text="Starkrimson" onClick={handleClick} />
            </TreeItem>
          </TreeItem>
          <TreeItem text="Vegetables" onClick={handleClick}>
            <TreeItem text="Podded vegetables" onClick={handleClick}>
              <TreeItem muted text="Lentil" onClick={handleClick} />
              <TreeItem muted text="Pea" onClick={handleClick} />
              <TreeItem muted text="Peanut" onClick={handleClick} />
            </TreeItem>
            <TreeItem text="Bulb and stem vegetables" onClick={handleClick}>
              <TreeItem muted text="Asparagus" onClick={handleClick} />
              <TreeItem muted text="Celery" onClick={handleClick} />
              <TreeItem muted text="Leek" onClick={handleClick} />
              <TreeItem muted text="Onion" onClick={handleClick} />
            </TreeItem>
            <TreeItem text="Root and tuberous vegetables" onClick={handleClick}>
              <TreeItem muted text="Carrot" onClick={handleClick} />
              <TreeItem muted text="Ginger" onClick={handleClick} />
              <TreeItem muted text="Parsnip" onClick={handleClick} />
              <TreeItem muted text="Potato" onClick={handleClick} />
            </TreeItem>
          </TreeItem>
          <TreeItem text="Grains" onClick={handleClick}>
            <TreeItem text="Cereal grains" onClick={handleClick}>
              <TreeItem muted text="Barley" onClick={handleClick} />
              <TreeItem muted text="Oats" onClick={handleClick} />
              <TreeItem muted text="Rice" onClick={handleClick} />
            </TreeItem>
            <TreeItem text="Pseudocereal grains" onClick={handleClick}>
              <TreeItem muted text="Amaranth" onClick={handleClick} />
              <TreeItem muted text="Buckwheat" onClick={handleClick} />
              <TreeItem muted text="Chia" onClick={handleClick} />
              <TreeItem muted text="Quinoa" onClick={handleClick} />
            </TreeItem>
            <TreeItem text="Oilseeds" onClick={handleClick}>
              <TreeItem muted text="India mustard" onClick={handleClick} />
              <TreeItem muted text="Safflower" onClick={handleClick} />
              <TreeItem muted text="Flax seed" onClick={handleClick} />
              <TreeItem muted text="Poppy seed" onClick={handleClick} />
            </TreeItem>
          </TreeItem>
        </Tree>
      </Wrapper>
    </Box>
  )
}
