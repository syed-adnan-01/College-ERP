import { z } from 'zod';

export const createTenantSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z
    .string()
    .min(2)
    .max(40)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens'),
  domain: z.string().optional(),
  customDomain: z.string().optional(),
  logo: z.string().optional(),
  logoUrl: z.string().optional(),
  themeConfig: z
    .object({
      primaryColor: z.string().optional(),
      accentColor: z.string().optional(),
      logoUrl: z.string().optional(),
      bannerUrl: z.string().optional(),
    })
    .optional(),
  enabledModules: z.array(z.string()).optional(),
  subscriptionTier: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).optional(),
  adminEmail: z.string().email().optional(),
  adminPassword: z.string().min(8).optional(),
  adminFirstName: z.string().optional(),
  adminLastName: z.string().optional(),
});
