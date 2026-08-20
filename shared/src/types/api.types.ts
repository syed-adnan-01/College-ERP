export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: PaginationMeta & { tenantId?: string };
  error?: ApiError;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Array<{ field: string; message: string }>;
}
