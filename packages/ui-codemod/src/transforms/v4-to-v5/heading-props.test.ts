import {defineInlineTest} from '../../utils/testUtils'
import transform from './heading-props'

defineInlineTest(
  transform,
  {},
  `
  <Heading/>
  `,
  `
  <Heading trim={true} />
  `,
  'adds trim prop',
)
