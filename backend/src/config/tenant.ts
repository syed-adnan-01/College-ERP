export const tenantConfig = {
  headerName: "x-tenant-id",
  baseDomain: process.env.BASE_DOMAIN ?? "localhost",
} as const;