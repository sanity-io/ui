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
        <Tree ref={ref} gap={1}>
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
            <TreeItem text="Bananas" onClick={handleClick} />
            <TreeItem text="Pears" onClick={handleClick}>
              <TreeItem text="Anjou" onClick={handleClick} />
              <TreeItem text="Bartlett" onClick={handleClick} />
              <TreeItem text="Bosc" onClick={handleClick} />
              <TreeItem text="Concorde" onClick={handleClick} />
              <TreeItem text="Seckel" onClick={handleClick} />
              <TreeItem text="Starkrimson" onClick={handleClick} />
            </TreeItem>
          </TreeItem>
          <TreeItem text="Vegetables" onClick={handleClick}>
            <TreeItem text="Podded vegetables" onClick={handleClick}>
              <TreeItem text="Lentil" onClick={handleClick} />
              <TreeItem text="Pea" onClick={handleClick} />
              <TreeItem text="Peanut" onClick={handleClick} />
            </TreeItem>
            <TreeItem text="Bulb and stem vegetables" onClick={handleClick}>
              <TreeItem text="Asparagus" onClick={handleClick} />
              <TreeItem text="Celery" onClick={handleClick} />
              <TreeItem text="Leek" onClick={handleClick} />
              <TreeItem text="Onion" onClick={handleClick} />
            </TreeItem>
            <TreeItem text="Root and tuberous vegetables" onClick={handleClick}>
              <TreeItem text="Carrot" onClick={handleClick} />
              <TreeItem text="Ginger" onClick={handleClick} />
              <TreeItem text="Parsnip" onClick={handleClick} />
              <TreeItem text="Potato" onClick={handleClick} />
            </TreeItem>
          </TreeItem>
          <TreeItem text="Grains" onClick={handleClick}>
            <TreeItem text="Cereal grains" onClick={handleClick}>
              <TreeItem text="Barley" onClick={handleClick} />
              <TreeItem text="Oats" onClick={handleClick} />
              <TreeItem text="Rice" onClick={handleClick} />
            </TreeItem>
            <TreeItem text="Pseudocereal grains" onClick={handleClick}>
              <TreeItem text="Amaranth" onClick={handleClick} />
              <TreeItem text="Buckwheat" onClick={handleClick} />
              <TreeItem text="Chia" onClick={handleClick} />
              <TreeItem text="Quinoa" onClick={handleClick} />
            </TreeItem>
            <TreeItem text="Oilseeds" onClick={handleClick}>
              <TreeItem text="India mustard" onClick={handleClick} />
              <TreeItem text="Safflower" onClick={handleClick} />
              <TreeItem text="Flax seed" onClick={handleClick} />
              <TreeItem text="Poppy seed" onClick={handleClick} />
            </TreeItem>
          </TreeItem>
        </Tree>
      </Wrapper>
    </Box>
  )
}
