import {z, type ZodType} from 'zod'

export function numericEnum<TValues extends readonly number[]>(values: TValues) {
  return z.number().superRefine((val, ctx) => {
    if (!values.includes(val)) {
      ctx.addIssue({
        code: 'invalid_value',
        values: [...values],
        received: val,
      })
    }
  }) as ZodType<TValues[number]>
}
