import {Radio, VStack} from '@sanity/ui'
import {useState} from 'react'

const PLANS = ['free', 'pro', 'team']

export function PlanPicker() {
  const [plan, setPlan] = useState('free')
  return (
    <VStack gap={2}>
      {PLANS.map((value) => (
        <Radio
          key={value}
          name="plan"
          value={value}
          label={value[0].toUpperCase() + value.slice(1)}
          checked={plan === value}
          onChange={() => setPlan(value)}
        />
      ))}
    </VStack>
  )
}
