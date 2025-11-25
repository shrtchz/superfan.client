import * as z from 'zod';

export const resetPasswordStep1Schema = z.object({
  contact: z.string().min(1, 'This field is required'),
}).superRefine((data, ctx) => {
  // Validation will be done based on contactType from store
  // No email/phone specific validation here since contactType comes from signin
  if (!data.contact) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'This field is required',
      path: ['contact'],
    });
  }
});

export const resetPasswordStep2Schema = z.object({
  code: z.string().length(6, 'Code must be 6 digits').regex(/^\d+$/, 'Code must contain only digits'),
});

export type ResetPasswordStep1FormValues = z.infer<typeof resetPasswordStep1Schema>;
export type ResetPasswordStep2FormValues = z.infer<typeof resetPasswordStep2Schema>;
