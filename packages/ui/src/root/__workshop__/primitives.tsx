import {SearchIcon} from '@sanity/icons'
import {Badge, Card, Checkbox, Radio, Select, Switch, TextInput} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function PrimitivesStory() {
  const disabled = useBoolean('Disabled', false)

  return (
    <CardWrapper pattern="halftone">
      <Card
        display="flex"
        flexDirection="column"
        gap={4}
        padding={4}
        radius={5}
        shadow={3}
        sizing="border"
      >
        <Badge>Badge</Badge>
        <TextInput
          disabled={disabled}
          fontSize={1}
          icon={SearchIcon}
          placeholder="Search"
          radius="full"
        />
        <div>
          <Checkbox disabled={disabled} />
        </div>
        <div>
          <Radio disabled={disabled} />
        </div>
        <div>
          <Switch disabled={disabled} />
        </div>
        <Select disabled={disabled} fontSize={1}>
          <option disabled selected>
            Choose an option
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
      </Card>
    </CardWrapper>
  )
}
