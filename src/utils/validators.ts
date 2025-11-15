import { z } from 'zod';

export const proposalFormSchema = z.object({
  client_name: z
    .string()
    .min(2, 'Client name must be at least 2 characters')
    .max(100, 'Client name must be less than 100 characters'),
  project_type: z
    .string()
    .min(3, 'Project type must be at least 3 characters')
    .max(100, 'Project type must be less than 100 characters'),
  company_name: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .or(z.literal('')),
});

export type ProposalFormData = z.infer<typeof proposalFormSchema>;

export const settingsFormSchema = z.object({
  company_name: z.string().min(2, 'Company name required'),
  company_email: z.string().email('Invalid email address'),
  company_phone: z.string().optional(),
  company_address: z.string().optional(),
});

export type SettingsFormData = z.infer<typeof settingsFormSchema>;
