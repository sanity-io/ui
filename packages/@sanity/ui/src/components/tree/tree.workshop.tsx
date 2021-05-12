import {LinkIcon} from '@sanity/icons'
import {Box, Tree, TreeItem} from '@sanity/ui'
import {defineScope} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('components/tree', 'Tree', [
  {name: 'basic', title: 'Basic', component: BasicStory},
])

function BasicStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <Tree space={1}>
        <TreeItem expanded text="Fruit" weight="bold">
          <TreeItem text="Oranges" />
          <TreeItem text="Pineapple" selected />
          <TreeItem expanded text="Apples" weight="bold">
            <TreeItem href="#apples-macintosh" icon={LinkIcon} text="Macintosh" />
            <TreeItem text="Granny Smith" />
            <TreeItem text="Fuji" />
          </TreeItem>
          <TreeItem text="Bananas" />
          <TreeItem text="Pears" weight="bold">
            <TreeItem text="Anjou" />
            <TreeItem text="Bartlett" />
            <TreeItem text="Bosc" />
            <TreeItem text="Concorde" />
            <TreeItem text="Seckel" />
            <TreeItem text="Starkrimson" />
          </TreeItem>
        </TreeItem>
        <TreeItem text="Vegetables">
          <TreeItem text="Podded vegetables">
            <TreeItem text="Lentil" />
            <TreeItem text="Pea" />
            <TreeItem text="Peanut" />
          </TreeItem>
          <TreeItem text="Bulb and stem vegetables">
            <TreeItem text="Asparagus" />
            <TreeItem text="Celery" />
            <TreeItem text="Leek" />
            <TreeItem text="Onion" />
          </TreeItem>
          <TreeItem text="Root and tuberous vegetables">
            <TreeItem text="Carrot" />
            <TreeItem text="Ginger" />
            <TreeItem text="Parsnip" />
            <TreeItem text="Potato" />
          </TreeItem>
        </TreeItem>
        <TreeItem text="Grains">
          <TreeItem text="Cereal grains">
            <TreeItem text="Barley" />
            <TreeItem text="Oats" />
            <TreeItem text="Rice" />
          </TreeItem>
          <TreeItem text="Pseudocereal grains">
            <TreeItem text="Amaranth" />
            <TreeItem text="Buckwheat" />
            <TreeItem text="Chia" />
            <TreeItem text="Quinoa" />
          </TreeItem>
          <TreeItem text="Oilseeds">
            <TreeItem text="India mustard" />
            <TreeItem text="Safflower" />
            <TreeItem text="Flax seed" />
            <TreeItem text="Poppy seed" />
          </TreeItem>
        </TreeItem>
      </Tree>
    </Box>
  )
}
