import {Flex} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import React, {useCallback, useState} from 'react'
import {CARD_TONE_OPTIONS} from '../constants'
import {DocumentPane} from './documentPane'
import {ListPane} from './listPane'

export function SelectableItemsStory() {
  const tone = useSelect('Tone', CARD_TONE_OPTIONS, 'default', 'Props')
  const loading = useBoolean('Loading', false, 'Props')

  const [list1Id, setList1Id] = useState<string | null>(null)
  const [list2Id, setList2Id] = useState<string | null>(null)

  const list1Active = !list2Id
  const list2Active = Boolean(list2Id)

  const list1 = {
    select: useCallback((id) => {
      setList1Id(id)
      setList2Id(null)
    }, []),
  }

  const list2 = {
    select: useCallback((id) => setList2Id(id), []),
  }

  return (
    <Flex height="fill">
      <ListPane
        active={list1Active}
        loading={loading}
        onSelect={list1.select}
        selectedId={list1Id}
        tone={tone}
      />
      {list1Id && (
        <ListPane
          active={list2Active}
          borderLeft
          loading={loading}
          onSelect={list2.select}
          selectedId={list2Id}
          tone={tone}
        />
      )}
      {list2Id && <DocumentPane id={list2Id} tone={tone} />}
    </Flex>
  )
}
