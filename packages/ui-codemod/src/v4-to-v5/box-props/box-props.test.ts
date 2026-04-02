import transform from './box-props'
import { defineInlineTest } from '../../utils/testUtils';

// Maybe let use pass in if they want to alias?
defineInlineTest(
  transform,
  {},
  `
  <Box sizing="content" style={{ width: '100%' }} />
  `,
  `
  <Box
    style={{
      width: '100%',
      boxSizing: "content-box"
    }} />
  `,
  'moves sizing onto style as boxSizing and removes sizing'
);

defineInlineTest(
  transform,
  {},
  `
  <Box sizing="border" />
  `,
  `
  <Box style={{
    boxSizing: "border-box"
  }} />
  `,
  'adds style when Box only had sizing'
);
