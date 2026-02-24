import {CropIcon} from '@sanity/icons'
import {Box, Heading, Stack} from '@sanity/ui'
import {vars} from '@sanity/ui/css'
import {elementTone} from '@sanity/ui-css'
import {FONT_HEADING_SIZE} from '@sanity/ui-tokens/system'

import {CardWrapper} from '$workshop'

export default function OpticalAlignment(): React.JSX.Element {
  return (
    <CardWrapper width={0}>
      <Stack gap={4}>
        {FONT_HEADING_SIZE.map((size) => (
          <Box key={size} display="flex" gap={3}>
            <Box
              className={elementTone({elementTone: 'suggest'})}
              flex="none"
              muted
              style={{outline: `0.5px solid ${vars.color.tinted.border[4]}`}}
            >
              <Heading muted size={size} weight="semibold">
                <CropIcon />
              </Heading>
            </Box>
            <Box
              className={elementTone({elementTone: 'suggest'})}
              flex={1}
              muted
              style={{outline: `0.5px solid ${vars.color.tinted.border[4]}`}}
            >
              <Heading muted size={size} textOverflow="ellipsis" weight="semibold">
                Hamburgefonstiv M
              </Heading>
            </Box>
          </Box>
        ))}
      </Stack>
    </CardWrapper>
  )
}

// import {AddCircleIcon} from '@sanity/icons'
// import {Box, Card, Flex, Heading, Stack} from '@sanity/ui'

// export default function OpticalAlignment(): React.JSX.Element {
//   return (
//     <Box padding={[4, 5, 6]}>
//       <Stack gap={1}>
//         <Flex>
//           <Card padding={0} tone="neutral">
//             <Heading size={5}>Hamburgefonstiv M</Heading>
//           </Card>
//         </Flex>

//         <Flex>
//           <Card padding={0} tone="neutral">
//             <Heading size={4}>Hamburgefonstiv M</Heading>
//           </Card>
//         </Flex>

//         <Flex>
//           <Card padding={0} tone="neutral">
//             <Heading size={3}>Hamburgefonstiv M</Heading>
//           </Card>
//         </Flex>

//         <Flex>
//           <Card padding={0} tone="neutral">
//             <Heading size={2}>Hamburgefonstiv M</Heading>
//           </Card>
//         </Flex>

//         <Flex>
//           <Card padding={0} tone="neutral">
//             <Heading size={1}>Hamburgefonstiv M</Heading>
//           </Card>
//         </Flex>

//         <Flex>
//           <Card padding={0} tone="neutral">
//             <Heading size={0}>Hamburgefonstiv M</Heading>
//           </Card>
//         </Flex>

//         <Flex>
//           <Card padding={2} tone="neutral">
//             <Heading>
//               <AddCircleIcon />
//             </Heading>
//           </Card>
//         </Flex>
//       </Stack>
//     </Box>
//   )
// }
