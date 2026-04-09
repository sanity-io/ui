import { defineInlineTest } from "../../utils/testUtils";
import transform, { BOX_PROPS_TODO } from "./box-props-3";

defineInlineTest(
  transform,
  {},
  `
  <Box borderWidth={0.5} />
  `,
  `
  <Box />
  `,
  "removes fully deprecated props",
);

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems="center" />
  `,
  `
  <Box style={{
    alignItems: "center"
  }} />
  `,
  "moves partially deprecated props to style",
);

defineInlineTest(
  transform,
  {},
  `
  <Box insetTop={0} />
  `,
  `
  <Box top={0} />
  `,
  "renames props",
);

defineInlineTest(
  transform,
  {},
  `
  <Box width="fill" />
  `,
  `
  <Box width="100%" />
  `,
  "updates prop value",
);

defineInlineTest(
  transform,
  {},
  `
  <Box border="muted" />
  `,
  `
  <Box border={true} />
  `,
  "updates boolean prop value",
);

defineInlineTest(
  transform,
  {},
  `
  <Box width={[0, 1, 2]} />
  `,
  `
  <Box width={["20rem", "40rem", "60rem"]} />
  `,
  "updates responsive prop values",
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
  "moves partially deprecated props to style and updates value",
);

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems={\`center\`} />
  `,
  `
  <Box style={{ alignItems: 'center' }} />
  `,
  "moves partially deprecated props to style and updates template literal value",
);

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems="center" style={{ background: 'blue' }} />
  `,
  `
  <Box
    style={{
      background: 'blue',
      alignItems: "center"
    }} />
  `,
  "preserves existing styles",
);

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems={["center", "flex-start"]} />
  `,
  `
  // TODO: ${BOX_PROPS_TODO}
  <Box alignItems={["center", "flex-start"]} />
  `,
  "comments if it cannot update responsive prop",
);

defineInlineTest(
  transform,
  {},
  `
  <Box sizing={["content", "box"]} />
  `,
  `
  // TODO: ${BOX_PROPS_TODO}
  <Box sizing={["content", "box"]} />
  `,
  "comments if it cannot update responsive prop",
);

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems={variable} />
  `,
  `
  // TODO: ${BOX_PROPS_TODO}
  <Box alignItems={variable} />
  `,
  "comments if it cannot update variable prop",
);

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems={variable ? 'center' : 'flex-start'} />
  `,
  `
  // TODO: ${BOX_PROPS_TODO}
  <Box alignItems={variable ? 'center' : 'flex-start'} />
  `,
  "comments if it cannot update ternary prop",
);

defineInlineTest(
  transform,
  {},
  `
  <Box alignItems={\`flex\${\`-start\`}\`} />
  `,
  `
  // TODO: ${BOX_PROPS_TODO}
  <Box alignItems={\`flex\${\`-start\`}\`} />
  `,
  "comments if prop value is a template literal (even when static)",
);
