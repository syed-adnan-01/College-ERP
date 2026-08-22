export const authConfig = {
  accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY ?? "15m",
  refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY ?? "7d",
} as const;