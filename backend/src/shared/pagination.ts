export interface PaginationInput { page?: number; pageSize?: number; }
export function getPagination({ page = 1, pageSize = 20 }: PaginationInput) {
  const take = Math.min(Math.max(pageSize, 1), 100);
  return { skip: (Math.max(page, 1) - 1) * take, take };
}