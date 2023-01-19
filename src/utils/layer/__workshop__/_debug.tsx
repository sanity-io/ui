import {Code, useLayer} from '@sanity/ui'

export function LayerDebugInfo(props: {id?: string}) {
  const {id} = props
  const layer = useLayer()

  return (
    <Code id={id}>
      zIndex={layer.zIndex}, size={layer.size}
    </Code>
  )
}
