import {Box, Text, vars} from '@sanity/ui'

export default function ResponsiveStory(): React.JSX.Element {
  return (
    <Box padding={[4, 5, 6]}>
      <Box
        display={['none', 'block', 'none', 'block', 'none', 'block', 'none']}
        flex={[1, 2, 3, 4, 5, 6, 7]}
        id="responsive-box"
        padding={3}
        style={{outline: `1px solid ${vars.color.border}`}}
      >
        <Text align="center" muted>
          This is a box with responsive props
        </Text>
      </Box>
    </Box>
  )
}
