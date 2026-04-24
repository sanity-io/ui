export type AttributeMapping = Record<string | number, string | boolean | number>

export type AttributeMod =
  | {type: 'remove'}
  | {type: 'rename-only'; name: string}
  | {type: 'rename-mapped'; name: string; mapping: AttributeMapping}
  | {type: 'style-only'; style: string}
  | {type: 'style-mapped'; style: string; mapping: AttributeMapping}
  | {type: 'mapped-only'; mapping: AttributeMapping}
  | {type: 'shorthand-mapped'; props: {name: string; mapping: AttributeMapping}[]}

export type AttributeMods = Record<string, AttributeMod>
