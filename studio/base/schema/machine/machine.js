export const machine = {
  type: 'document',
  name: 'machine',
  title: 'Machine',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'string',
      name: 'key',
      title: 'Key',
      readOnly: true,
    },
    {
      type: 'string',
      name: 'type',
      title: 'Type',
      readOnly: true,
    },
    {
      type: 'string',
      name: 'platform',
      title: 'Platform',
      readOnly: true,
    },
    {
      type: 'string',
      name: 'arch',
      title: 'Arch',
      readOnly: true,
    },
    {
      type: 'number',
      name: 'totalMemoryBytes',
      title: 'Memory',
      description: 'In bytes',
      readOnly: true,
    },
    {
      type: 'array',
      name: 'cpus',
      title: 'CPUs',
      readOnly: true,
      of: [
        {
          type: 'object',
          name: 'cpu',
          title: 'CPU',
          fields: [
            {
              type: 'string',
              name: 'model',
              title: 'Model',
            },
            {
              type: 'number',
              name: 'speed',
              title: 'Speed',
            },
          ],
        },
      ],
    },
  ],
  // __experimental_actions: ['publish', 'delete'],
  liveEdit: true,
}
