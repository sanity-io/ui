import {Radio, VStack} from '@sanity/ui'

// Group related radios in a <fieldset> with a <legend> so AT announces the group's purpose.
export function PlanFieldset() {
  return (
    <fieldset>
      <legend>Choose a plan</legend>
      <VStack gap={2}>
        <Radio name="plan" value="free" label="Free" defaultChecked />
        <Radio name="plan" value="pro" label="Pro" />
        <Radio name="plan" value="team" label="Team" />
      </VStack>
    </fieldset>
  )
}
