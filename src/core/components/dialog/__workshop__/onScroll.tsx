import {Dialog, LayerProvider, Stack, Text} from '@sanity/ui'
import {useAction} from '@sanity/ui-workshop'
import {useEffect, useRef} from 'react'

export default function OnScrollStory() {
  const ref = useRef<HTMLDivElement | null>(null)
  const handleScroll = useAction('scroll')

  useEffect(() => {
    const el = ref.current

    if (!el) return

    el.addEventListener('scroll', handleScroll, {passive: true})

    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <LayerProvider>
      <Dialog contentRef={ref} header="On scroll example" id="on-scroll-example">
        <Stack gap={4} padding={4} paddingTop={1}>
          <Text muted size={1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl at sem tempor
            hendrerit scelerisque ut libero. Maecenas iaculis efficitur lorem, ac faucibus mi
            imperdiet quis. Cras a consectetur erat. Fusce imperdiet, dolor et pellentesque iaculis,
            ex quam luctus felis, non ultrices enim sem vitae quam. Duis lorem velit, lacinia at
            rhoncus a, tempus vel neque. Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia curae; Sed id mauris quam. Nam finibus sapien non lacinia
            ultricies. Integer fermentum tortor at pellentesque faucibus. In venenatis commodo
            placerat. Curabitur commodo tortor libero, vel pellentesque elit luctus sodales. Donec
            mattis tristique nunc ac lacinia. Vestibulum non pulvinar turpis, posuere consequat
            arcu. Fusce ut urna blandit, finibus nisi a, molestie elit. Nulla sed eleifend mi.
          </Text>

          <Text muted size={1}>
            Aliquam quis finibus ex. Fusce semper lorem sed orci tempor gravida. Cras dui urna,
            congue quis ipsum in, viverra facilisis libero. Vivamus vehicula libero quam, at posuere
            leo ornare imperdiet. Cras eu neque eu tellus scelerisque iaculis ac id ex. Vestibulum
            quam enim, lacinia ac ultricies at, molestie ut nisi. Vivamus vitae elit vel ante
            feugiat iaculis. Pellentesque vel diam volutpat, luctus magna at, laoreet tellus.
            Aliquam congue id nisi at sollicitudin. In sed nisi libero. Nulla ornare, mauris et
            pulvinar hendrerit, ligula leo auctor enim, vestibulum laoreet metus nisl a nulla. Sed
            et interdum sapien. Mauris lacinia interdum nisi quis ultrices. Etiam lobortis, dui
            semper ornare fringilla, felis lacus feugiat dui, vitae rhoncus tellus tortor ut ipsum.
          </Text>
        </Stack>
      </Dialog>
    </LayerProvider>
  )
}
