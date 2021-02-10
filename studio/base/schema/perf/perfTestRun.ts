export const perfTestRun = {
  type: 'document',
  name: 'perf.testRun',
  title: 'Performance test run',
  fields: [
    {type: 'string', name: 'uuid', title: 'UUID'},
    {type: 'string', name: 'sha', title: 'Commit SHA'},
    {
      type: 'array',
      name: 'results',
      title: 'Results',
      of: [
        {
          type: 'object',
          name: 'perf.result',
          title: 'Result',
          fields: [
            {
              type: 'string',
              name: 'name',
              title: 'Name',
            },
            {
              type: 'array',
              name: 'measurements',
              title: 'Measurements',
              of: [
                {
                  type: 'object',
                  name: 'perf.measurement',
                  title: 'Measurement',
                  fields: [
                    {type: 'string', name: 'name', title: 'Name'},
                    {type: 'array', name: 'times', title: 'Times', of: [{type: 'number'}]},
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'reference',
      name: 'machine',
      title: 'Machine',
      to: [{type: 'machine'}],
    },
  ],
  readOnly: true,
  __experimental_actions: ['delete'],
}
